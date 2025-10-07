import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/app/auth/supabase';
import { detectLanguage, translateText } from '@/lib/translation';
import { trimContextAround } from '@/lib/context';
import { validateTextField } from '@/lib/validation';
import { getClientKey, isRateLimited } from '@/lib/rateLimit';

export async function POST(request: NextRequest) {
  try {
    let body: any;
    try {
      body = await request.json();
    } catch (err: any) {
      // request.json() throws a SyntaxError for malformed JSON; map that to 400
      if (err instanceof SyntaxError || err?.message?.toLowerCase()?.includes('expected')) {
        return NextResponse.json({ error: 'Malformed JSON body' }, { status: 400 });
      }
      throw err;
    }
  const { text, target, source } = body;

    const maybeResp = validateTextField(text);
    if (maybeResp) return maybeResp;

    // Rate limiting (per-client)
    const ip = request.headers.get('x-forwarded-for') || undefined;
    const key = getClientKey(ip);
    const rl = isRateLimited(key);
    if (rl.limited) {
      return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429, headers: { 'Retry-After': String(Math.ceil((rl.reset - Date.now()) / 1000)) } });
    }

  // compute small context window (3 chars before + word + 3 chars after)
  const targetWord = (body && body.word && typeof body.word === 'string') ? body.word : (text.trim().split(/\s+/)[0] || '');
  const contextTrim = targetWord ? trimContextAround(text, targetWord, 3) : undefined;
    if (!target || typeof target !== 'string') {
      return NextResponse.json({ error: 'Missing or invalid `target` language' }, { status: 400 });
    }

    // Optional: enforce authenticated caller
    // const user = await auth();
    // if (!user) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    let src = source;

    const translation = await translateText(text, target, src || undefined, contextTrim);
    if (!translation) {
      return NextResponse.json({ error: 'Translation failed' }, { status: 502 });
    }

    return NextResponse.json({ success: true, result: translation });
  } catch (err) {
    console.error('Translate API error', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

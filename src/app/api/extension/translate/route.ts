import { NextRequest, NextResponse } from 'next/server';
// import { auth } from '@/app/auth/supabase';
import { detectLanguage, translateText } from '@/lib/translation';
import { trimContextAround } from '@/lib/context';
import { validateTextField } from '@/lib/validation';
import { getClientKey, isRateLimited } from '@/lib/rateLimit';

export async function POST(request: NextRequest) {
  try {
    let body: unknown;
    try {
      body = await request.json();
    } catch (err: unknown) {
      // request.json() throws a SyntaxError for malformed JSON; map that to 400
      if (err instanceof SyntaxError || (typeof err === 'object' && err !== null && String((err as { message?: unknown }).message).toLowerCase().includes('expected'))) {
        return NextResponse.json({ error: 'Malformed JSON body' }, { status: 400 });
      }
      throw err;
    }

    const b = (typeof body === 'object' && body !== null) ? body as Record<string, unknown> : {};
    const text = typeof b.text === 'string' ? b.text : '';
    const target = typeof b.target === 'string' ? b.target : undefined;
    const source = typeof b.source === 'string' ? b.source : undefined;
    const context = typeof b.context === 'string' ? b.context : undefined;

    const maybeResp = validateTextField(text);
    if (maybeResp) return maybeResp;

    // Rate limiting (per-client)
    const ip = request.headers.get('x-forwarded-for') || undefined;
    const key = getClientKey(ip);
    const rl = isRateLimited(key);
    if (rl.limited) {
      return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429, headers: { 'Retry-After': String(Math.ceil((rl.reset - Date.now()) / 1000)) } });
    }

  // compute small context window (3 words before + word + 3 words after)
  const targetWord = (b && typeof b.word === 'string') ? b.word as string : (text.trim().split(/\s+/)[0] || '');
  // If client sent a `context` string, trim that around the target word; otherwise use the original text.
  const sourceForContext = (context && typeof context === 'string') ? context : text;
  const contextTrim = targetWord ? trimContextAround(sourceForContext, targetWord, 3) : undefined;
    if (!target || typeof target !== 'string') {
      return NextResponse.json({ error: 'Missing or invalid `target` language' }, { status: 400 });
    }

    // Optional: enforce authenticated caller
    // const user = await auth();
    // if (!user) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

  const src = source;

  const translation = await translateText(text, target as string, src || undefined, contextTrim);
    if (!translation) {
      return NextResponse.json({ error: 'Translation failed' }, { status: 502 });
    }

    return NextResponse.json({ success: true, result: translation });
  } catch (err) {
    console.error('Translate API error', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

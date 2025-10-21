import { NextRequest, NextResponse } from 'next/server';
import { detectLanguage } from '@/lib/translation';
import { trimContextAround } from '@/lib/context';
import { validateTextField } from '@/lib/validation';
import { getClientKey, isRateLimited } from '@/lib/rateLimit';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text } = body;

    const maybeResp = validateTextField(text);
    if (maybeResp) return maybeResp;

    // Rate limit per client key (proxy-friendly)
  const ip = request.headers.get('x-forwarded-for') || undefined;
    const key = getClientKey(ip);
    const rl = isRateLimited(key);
    if (rl.limited) {
      return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429, headers: { 'Retry-After': String(Math.ceil((rl.reset - Date.now()) / 1000)) } });
    }

    // compute small context window (3 chars before + word + 3 chars after)
    const targetWord = (body && body.word && typeof body.word === 'string') ? body.word : (text.trim().split(/\s+/)[0] || '');
    const context = targetWord ? trimContextAround(text, targetWord, 3) : undefined;

    // Optional: verify caller is an authenticated user (keeps parity with other extension APIs)
    // const user = await auth();
    // if (!user) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

  const result = await detectLanguage(text, context);
    if (!result) {
      return NextResponse.json({ error: 'Detection failed' }, { status: 502 });
    }

    return NextResponse.json({ success: true, result });
  } catch (err) {
    console.error('Detect API error', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

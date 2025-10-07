import { NextResponse } from 'next/server';

// Validate text: must be a string with <= 5 words
export function validateTextField(text: unknown, fieldName = 'text'): NextResponse | null {
  if (typeof text !== 'string') {
    return NextResponse.json({ error: `Missing or invalid \`${fieldName}\`` }, { status: 400 });
  }

  // Split on any sequence of characters that are not letters, numbers, or apostrophes.
  // This treats punctuation (`,`, `.`, `;`, `/`, `-`, etc.) as separators.
  const words = text.trim().split(/[^^\p{L}\p{N}']+/u).filter(Boolean);
  if (words.length === 0) {
    return NextResponse.json({ error: `Missing or invalid \`${fieldName}\`` }, { status: 400 });
  }

  if (words.length > 5) {
    return NextResponse.json({ error: `\`${fieldName}\` must be 5 words or fewer` }, { status: 400 });
  }

  return null;
}

export default { validateTextField };

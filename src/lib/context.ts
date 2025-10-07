/**
 * Extract a small context window around a target word inside a larger text.
 * Returns up to `pad` characters before the first occurrence of `word`, the
 * `word` itself, and up to `pad` characters after it. If `word` is not found
 * (case-insensitive fallback), will return a reasonable nearby slice.
 */
export function trimContextAround(text: string, word: string, pad = 3): string {
  if (!text || !word) return '';

  // Find all word matches with indices using Unicode-aware regex
  const wordRe = /\p{L}[\p{L}\p{N}'’\-]*/gu;
  const matches = Array.from(text.matchAll(wordRe));
  if (matches.length === 0) return '';

  // Find the first match that equals the target word (case-insensitive)
  const targetLower = word.toLowerCase();
  let matchIndex = matches.findIndex(m => (m[0] as string).toLowerCase() === targetLower);
  if (matchIndex === -1) {
    // fallback: try substring match (case-insensitive)
    matchIndex = matches.findIndex(m => (m[0] as string).toLowerCase().includes(targetLower));
  }
  if (matchIndex === -1) {
    // fallback: use first word
    matchIndex = 0;
  }

  const startMatch = Math.max(0, matchIndex - pad);
  const endMatch = Math.min(matches.length - 1, matchIndex + pad);

  const startPos = matches[startMatch].index ?? 0;
  const last = matches[endMatch];
  const endPos = (last.index ?? 0) + last[0].length;

  return text.slice(startPos, endPos);
}

export default { trimContextAround };

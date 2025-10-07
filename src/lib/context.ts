/**
 * Extract a small context window around a target word inside a larger text.
 * Returns up to `pad` characters before the first occurrence of `word`, the
 * `word` itself, and up to `pad` characters after it. If `word` is not found
 * (case-insensitive fallback), will return a reasonable nearby slice.
 */
export function trimContextAround(text: string, word: string, pad = 3): string {
  if (!text || !word) return '';

  const idx = text.indexOf(word);
  if (idx !== -1) {
    const start = Math.max(0, idx - pad);
    const end = Math.min(text.length, idx + word.length + pad);
    return text.slice(start, end);
  }

  // Case-insensitive fallback
  const lower = text.toLowerCase();
  const wlower = word.toLowerCase();
  const idx2 = lower.indexOf(wlower);
  if (idx2 !== -1) {
    const start = Math.max(0, idx2 - pad);
    const end = Math.min(text.length, idx2 + word.length + pad);
    return text.slice(start, end);
  }

  // If still not found, return empty
  return "";
}

export default { trimContextAround };

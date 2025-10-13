// Simple in-memory rate limiter for Next.js route handlers.
// Not durable across multiple server instances. Good for dev and simple deployments.

type Entry = { ts: number; count: number };

const store = new Map<string, Entry>();

const DEFAULT_MAX = parseInt(process.env.RATE_LIMIT_MAX || '1', 10); // 1 request
const DEFAULT_WINDOW = parseInt(process.env.RATE_LIMIT_WINDOW_MS || String(3 * 1000), 10); // 3 seconds

export function getClientKey(reqIp?: string) {
  return reqIp || 'unknown';
}

export function isRateLimited(key: string, max = DEFAULT_MAX, windowMs = DEFAULT_WINDOW) {
  const now = Date.now();
  const entry = store.get(key);
  if (!entry || now - entry.ts > windowMs) {
    store.set(key, { ts: now, count: 1 });
    return { limited: false, remaining: max - 1, reset: now + windowMs };
  }

  if (entry.count >= max) {
    return { limited: true, remaining: 0, reset: entry.ts + windowMs };
  }

  entry.count += 1;
  store.set(key, entry);
  return { limited: false, remaining: max - entry.count, reset: entry.ts + windowMs };
}

export default { isRateLimited, getClientKey };

const WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS = 10;

const hits = new Map<string, number[]>();

/** Returns true if the request is allowed (and records it), false if rate-limited. */
export function checkRateLimit(ip: string, now: number = Date.now()): boolean {
  const windowStart = now - WINDOW_MS;
  const recent = (hits.get(ip) ?? []).filter((t) => t > windowStart);
  if (recent.length >= MAX_REQUESTS) {
    hits.set(ip, recent);
    return false;
  }
  recent.push(now);
  hits.set(ip, recent);
  return true;
}

/** Test helper. */
export function resetRateLimit(): void {
  hits.clear();
}

type RateLimiterOptions = {
  windowMs: number;
  maxRequests: number;
  maxEntries?: number;
};

type RequestRecord = {
  count: number;
  resetAt: number;
};

const DEFAULT_MAX_ENTRIES = 10_000;
const OVERFLOW_KEY = "__rate_limit_overflow__";

export function createRateLimiter({
  windowMs,
  maxRequests,
  maxEntries = DEFAULT_MAX_ENTRIES,
}: RateLimiterOptions) {
  const records = new Map<string, RequestRecord>();

  function sweepExpired(now: number) {
    for (const [key, record] of records) {
      if (record.resetAt <= now) records.delete(key);
    }
  }

  const sweepTimer = setInterval(() => sweepExpired(Date.now()), windowMs);
  sweepTimer.unref?.();

  return {
    isLimited(key: string) {
      const now = Date.now();
      let effectiveKey = key;

      if (!records.has(effectiveKey) && records.size >= maxEntries) {
        sweepExpired(now);

        if (records.size >= maxEntries) {
          effectiveKey = OVERFLOW_KEY;
        }
      }

      const record = records.get(effectiveKey);

      if (!record || record.resetAt <= now) {
        records.set(effectiveKey, { count: 1, resetAt: now + windowMs });
        return false;
      }

      record.count += 1;
      return record.count > maxRequests;
    },
  };
}

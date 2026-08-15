type RateLimiterOptions = {
  windowMs: number;
  maxRequests: number;
};

type RequestRecord = {
  count: number;
  resetAt: number;
};

export function createRateLimiter({ windowMs, maxRequests }: RateLimiterOptions) {
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
      const record = records.get(key);

      if (!record || record.resetAt <= now) {
        records.set(key, { count: 1, resetAt: now + windowMs });
        return false;
      }

      record.count += 1;
      return record.count > maxRequests;
    },
  };
}

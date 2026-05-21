type RateLimitOptions = {
  keyPrefix: string;
  limit?: number;
  windowMs?: number;
};

const DEFAULT_WINDOW_MS = 60_000;
const DEFAULT_LIMIT = 20;
const buckets = new Map<string, { count: number; resetAt: number }>();

export function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function sanitizeText(value: unknown, maxLength = 1_000) {
  if (typeof value !== "string") return "";
  return value.replace(/\s+/g, " ").trim().slice(0, maxLength);
}

export function isNonEmptyString(value: unknown, maxLength = 1_000) {
  const text = sanitizeText(value, maxLength);
  return text.length > 0;
}

export function isValidEmail(value: unknown) {
  const email = sanitizeText(value, 254);
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function formText(formData: FormData, key: string, maxLength = 1_000) {
  return sanitizeText(formData.get(key), maxLength);
}

export function enforceSameOrigin(req: Request) {
  const origin = req.headers.get("origin");
  const host = req.headers.get("host");

  if (!origin || !host) return null;

  try {
    const originUrl = new URL(origin);
    const originValue = `${originUrl.protocol}//${originUrl.host}`;
    const allowedOrigins = new Set([
      `https://${host}`,
      `http://${host}`,
      "https://www.athenatec.com",
      "https://athenatec.com",
    ]);

    if (allowedOrigins.has(originValue)) return null;
  } catch {
    return Response.json(
      { error: "Invalid request origin." },
      { status: 403 },
    );
  }

  return Response.json(
    { error: "Invalid request origin." },
    { status: 403 },
  );
}

export function rateLimit(req: Request, options: RateLimitOptions) {
  const windowMs = options.windowMs ?? DEFAULT_WINDOW_MS;
  const limit = options.limit ?? DEFAULT_LIMIT;
  const forwardedFor = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const clientIp =
    req.headers.get("cf-connecting-ip") ||
    req.headers.get("x-real-ip") ||
    forwardedFor ||
    "unknown";
  const key = `${options.keyPrefix}:${clientIp}`;
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return null;
  }

  bucket.count += 1;

  if (bucket.count <= limit) return null;

  const retryAfter = Math.ceil((bucket.resetAt - now) / 1_000);

  return Response.json(
    { error: "Too many requests. Please try again shortly." },
    {
      status: 429,
      headers: {
        "Retry-After": String(retryAfter),
      },
    },
  );
}

import { isIP } from "node:net";
import { NextResponse } from "next/server";
import { siteConfig } from "@/shared/config/site";
import { getSmtpConfiguration, sendContactInquiry } from "./mailer";
import { createRateLimiter } from "./rate-limiter";
import {
  validateContactPayload,
  type ContactPayload,
} from "./contact-validation";

const REQUEST_WINDOW_MS = 10 * 60 * 1000;
const REQUEST_LIMIT = 5;
const MAX_BODY_BYTES = 20_000;
const MAX_RATE_LIMIT_ENTRIES = 10_000;
const RETRY_AFTER_SECONDS = Math.ceil(REQUEST_WINDOW_MS / 1000);
const LOOPBACK_HOSTNAMES = new Set(["localhost", "127.0.0.1", "::1"]);

const rateLimiter = createRateLimiter({
  windowMs: REQUEST_WINDOW_MS,
  maxRequests: REQUEST_LIMIT,
  maxEntries: MAX_RATE_LIMIT_ENTRIES,
});

function normalizeClientAddress(value: string | null) {
  const candidate = value?.trim();

  return candidate && isIP(candidate) ? candidate.toLowerCase() : null;
}

function getClientAddress(request: Request) {
  const realIp = normalizeClientAddress(request.headers.get("x-real-ip"));

  if (realIp) return realIp;

  const forwardedAddresses = request.headers
    .get("x-forwarded-for")
    ?.split(",")
    .map((address) => normalizeClientAddress(address))
    .filter((address): address is string => Boolean(address));

  return forwardedAddresses?.at(-1) ?? "unknown";
}

function isTrustedOrigin(request: Request) {
  const candidate =
    request.headers.get("origin") ?? request.headers.get("referer");

  if (!candidate) return true;

  try {
    const candidateUrl = new URL(candidate);
    const requestUrl = new URL(request.url);
    const isLocalOrigin =
      LOOPBACK_HOSTNAMES.has(candidateUrl.hostname) &&
      LOOPBACK_HOSTNAMES.has(requestUrl.hostname) &&
      candidateUrl.protocol === requestUrl.protocol &&
      candidateUrl.port === requestUrl.port;

    return candidateUrl.origin === siteConfig.url || isLocalOrigin;
  } catch {
    return false;
  }
}

function jsonResponse(
  body: Record<string, unknown>,
  status = 200,
  headers?: HeadersInit,
) {
  return NextResponse.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
      ...Object.fromEntries(new Headers(headers)),
    },
  });
}

function isBodyTooLarge(request: Request) {
  const contentLength = Number(request.headers.get("content-length") ?? "0");
  return Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES;
}

async function readRequestBody(request: Request) {
  const reader = request.body?.getReader();

  if (!reader) return { ok: true as const, body: "" };

  const decoder = new TextDecoder();
  let body = "";
  let totalBytes = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();

      if (done) break;

      totalBytes += value.byteLength;

      if (totalBytes > MAX_BODY_BYTES) {
        await reader.cancel();
        return { ok: false as const };
      }

      body += decoder.decode(value, { stream: true });
    }

    body += decoder.decode();
    return { ok: true as const, body };
  } finally {
    reader.releaseLock();
  }
}

export async function POST(request: Request) {
  const contentType = request.headers
    .get("content-type")
    ?.split(";")[0]
    ?.trim()
    .toLowerCase();

  if (contentType !== "application/json") {
    return jsonResponse(
      { error: "Content-Type must be application/json." },
      415,
    );
  }

  if (!isTrustedOrigin(request)) {
    return jsonResponse({ error: "Invalid request origin." }, 403);
  }

  if (isBodyTooLarge(request)) {
    return jsonResponse({ error: "Request payload is too large." }, 413);
  }

  if (rateLimiter.isLimited(getClientAddress(request))) {
    return jsonResponse(
      { error: "Too many requests. Please try again in a few minutes." },
      429,
      { "Retry-After": String(RETRY_AFTER_SECONDS) },
    );
  }

  let payload: ContactPayload;

  try {
    const requestBody = await readRequestBody(request);

    if (!requestBody.ok) {
      return jsonResponse({ error: "Request payload is too large." }, 413);
    }

    const parsedPayload: unknown = JSON.parse(requestBody.body);

    if (
      !parsedPayload ||
      typeof parsedPayload !== "object" ||
      Array.isArray(parsedPayload)
    ) {
      return jsonResponse({ error: "Invalid request body." }, 400);
    }

    payload = parsedPayload as ContactPayload;
  } catch {
    return jsonResponse({ error: "Invalid request body." }, 400);
  }

  const validation = validateContactPayload(payload);

  if (!validation.ok) {
    return jsonResponse({ error: validation.error }, 400);
  }

  if (validation.data.isLikelySpam) {
    return jsonResponse({ ok: true });
  }

  const smtp = getSmtpConfiguration();

  if (!smtp) {
    console.error("Contact form SMTP environment variables are incomplete.");
    return jsonResponse(
      { error: "The contact channel is temporarily unavailable." },
      503,
    );
  }

  try {
    await sendContactInquiry(smtp, validation.data);
    return jsonResponse({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown SMTP error";
    console.error("Unable to deliver contact form message:", message);
    return jsonResponse(
      { error: "We could not send your inquiry. Please try WhatsApp instead." },
      502,
    );
  }
}

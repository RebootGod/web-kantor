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

const rateLimiter = createRateLimiter({
  windowMs: REQUEST_WINDOW_MS,
  maxRequests: REQUEST_LIMIT,
});

function getClientAddress(request: Request) {
  return (
    request.headers.get("x-real-ip") ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown"
  );
}

function isTrustedOrigin(request: Request) {
  const candidate =
    request.headers.get("origin") ?? request.headers.get("referer");

  if (!candidate) return true;

  try {
    const candidateOrigin = new URL(candidate).origin;
    const requestOrigin = new URL(request.url).origin;
    const forwardedHost =
      request.headers.get("x-forwarded-host")?.split(",")[0]?.trim() ??
      request.headers.get("host");
    const forwardedProtocol =
      request.headers.get("x-forwarded-proto")?.split(",")[0]?.trim() ??
      new URL(request.url).protocol.replace(":", "");
    const forwardedOrigin = forwardedHost
      ? `${forwardedProtocol}://${forwardedHost}`
      : null;

    return (
      candidateOrigin === requestOrigin ||
      candidateOrigin === forwardedOrigin ||
      candidateOrigin === siteConfig.url
    );
  } catch {
    return false;
  }
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
    return NextResponse.json(
      { error: "Content-Type must be application/json." },
      { status: 415 },
    );
  }

  if (!isTrustedOrigin(request)) {
    return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  }

  if (isBodyTooLarge(request)) {
    return NextResponse.json(
      { error: "Request payload is too large." },
      { status: 413 },
    );
  }

  if (rateLimiter.isLimited(getClientAddress(request))) {
    return NextResponse.json(
      { error: "Too many requests. Please try again in a few minutes." },
      { status: 429 },
    );
  }

  let payload: ContactPayload;

  try {
    const requestBody = await readRequestBody(request);

    if (!requestBody.ok) {
      return NextResponse.json(
        { error: "Request payload is too large." },
        { status: 413 },
      );
    }

    const parsedPayload: unknown = JSON.parse(requestBody.body);

    if (
      !parsedPayload ||
      typeof parsedPayload !== "object" ||
      Array.isArray(parsedPayload)
    ) {
      return NextResponse.json(
        { error: "Invalid request body." },
        { status: 400 },
      );
    }

    payload = parsedPayload as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const validation = validateContactPayload(payload);

  if (!validation.ok) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  if (validation.data.isLikelySpam) {
    return NextResponse.json({ ok: true });
  }

  const smtp = getSmtpConfiguration();

  if (!smtp) {
    console.error("Contact form SMTP environment variables are incomplete.");
    return NextResponse.json(
      { error: "The contact channel is temporarily unavailable." },
      { status: 503 },
    );
  }

  try {
    await sendContactInquiry(smtp, validation.data);
    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown SMTP error";
    console.error("Unable to deliver contact form message:", message);
    return NextResponse.json(
      { error: "We could not send your inquiry. Please try WhatsApp instead." },
      { status: 502 },
    );
  }
}

import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const SERVICE_OPTIONS = new Set([
  "Penetration Testing",
  "Secure Coding Training Platform",
  "Cybersecurity Consulting",
  "Other security inquiry",
]);

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const REQUEST_WINDOW_MS = 10 * 60 * 1000;
const REQUEST_LIMIT = 5;

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  company?: unknown;
  service?: unknown;
  message?: unknown;
  website?: unknown;
};

type RequestRecord = {
  count: number;
  resetAt: number;
};

const requestRecords = new Map<string, RequestRecord>();

function readText(value: unknown, maximumLength: number) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maximumLength);
}

function getClientAddress(request: Request) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

function isRateLimited(address: string) {
  const now = Date.now();
  const record = requestRecords.get(address);

  if (!record || record.resetAt <= now) {
    requestRecords.set(address, {
      count: 1,
      resetAt: now + REQUEST_WINDOW_MS,
    });
    return false;
  }

  record.count += 1;
  return record.count > REQUEST_LIMIT;
}

function getSmtpConfiguration() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 465);
  const user = process.env.SMTP_USER;
  const password = process.env.SMTP_PASSWORD;
  const from = process.env.CONTACT_FROM || user;
  const to = process.env.CONTACT_TO;

  if (!host || !Number.isInteger(port) || !user || !password || !from || !to) {
    return null;
  }

  return {
    host,
    port,
    secure: process.env.SMTP_SECURE !== "false",
    auth: { user, pass: password },
    from,
    to,
  };
}

export async function POST(request: Request) {
  if (isRateLimited(getClientAddress(request))) {
    return NextResponse.json(
      { error: "Too many requests. Please try again in a few minutes." },
      { status: 429 },
    );
  }

  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = readText(payload.name, 100);
  const email = readText(payload.email, 254).toLowerCase();
  const company = readText(payload.company, 120);
  const service = readText(payload.service, 80);
  const message = readText(payload.message, 5000);
  const website = readText(payload.website, 200);

  if (website) {
    return NextResponse.json({ ok: true });
  }

  if (!name || name.length < 2) {
    return NextResponse.json(
      { error: "Please enter your name." },
      { status: 400 },
    );
  }

  if (!EMAIL_PATTERN.test(email) || /[\r\n]/.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid work email." },
      { status: 400 },
    );
  }

  if (!SERVICE_OPTIONS.has(service)) {
    return NextResponse.json(
      { error: "Please choose a valid service." },
      { status: 400 },
    );
  }

  if (message.length < 20) {
    return NextResponse.json(
      { error: "Please describe your inquiry in at least 20 characters." },
      { status: 400 },
    );
  }

  const smtp = getSmtpConfiguration();

  if (!smtp) {
    console.error("Contact form SMTP environment variables are incomplete.");
    return NextResponse.json(
      { error: "The contact channel is temporarily unavailable." },
      { status: 503 },
    );
  }

  const transporter = nodemailer.createTransport({
    host: smtp.host,
    port: smtp.port,
    secure: smtp.secure,
    auth: smtp.auth,
  });

  try {
    await transporter.sendMail({
      from: smtp.from,
      to: smtp.to,
      replyTo: email,
      subject: `Website inquiry: ${service}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Company: ${company || "Not provided"}`,
        `Service: ${service}`,
        "",
        "Message:",
        message,
      ].join("\n"),
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Unable to deliver contact form message.", error);
    return NextResponse.json(
      { error: "We could not send your inquiry. Please try WhatsApp instead." },
      { status: 502 },
    );
  }
}

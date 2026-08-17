import { CONTACT_SERVICE_OPTIONS } from "@/app/contact/shared/contact-options";

const SERVICE_OPTION_SET = new Set<string>(CONTACT_SERVICE_OPTIONS);
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type ContactPayload = {
  name?: unknown;
  email?: unknown;
  company?: unknown;
  service?: unknown;
  message?: unknown;
  website?: unknown;
};

export type ContactInquiry = {
  name: string;
  email: string;
  company: string;
  service: string;
  message: string;
  isLikelySpam: boolean;
};

export type ContactValidationResult =
  | { ok: true; data: ContactInquiry }
  | { ok: false; error: string };

function readText(value: unknown, maximumLength: number) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maximumLength);
}

function containsHeaderInjection(value: string) {
  return /[\r\n]/.test(value);
}

export function validateContactPayload(
  payload: ContactPayload,
): ContactValidationResult {
  const name = readText(payload.name, 100);
  const email = readText(payload.email, 254).toLowerCase();
  const company = readText(payload.company, 120);
  const service = readText(payload.service, 80);
  const message = readText(payload.message, 5000);
  const website = readText(payload.website, 200);

  if (website) {
    return {
      ok: true,
      data: { name, email, company, service, message, isLikelySpam: true },
    };
  }

  if (!name || name.length < 2 || containsHeaderInjection(name)) {
    return { ok: false, error: "Please enter your name." };
  }

  if (
    !EMAIL_PATTERN.test(email) ||
    containsHeaderInjection(email) ||
    email.length > 254
  ) {
    return { ok: false, error: "Please enter a valid work email." };
  }

  if (containsHeaderInjection(company)) {
    return { ok: false, error: "Please enter a valid company name." };
  }

  if (!SERVICE_OPTION_SET.has(service)) {
    return { ok: false, error: "Please choose a valid service." };
  }

  if (message.length < 20) {
    return {
      ok: false,
      error: "Please describe your inquiry in at least 20 characters.",
    };
  }

  return {
    ok: true,
    data: { name, email, company, service, message, isLikelySpam: false },
  };
}

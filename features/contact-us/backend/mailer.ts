import nodemailer from "nodemailer";
import type { ContactInquiry } from "./contact-validation";

type SmtpConfiguration = {
  host: string;
  port: number;
  secure: boolean;
  auth: { user: string; pass: string };
  from: string;
  to: string;
};

const CONNECTION_TIMEOUT_MS = 10_000;
let cachedTransporter: ReturnType<typeof nodemailer.createTransport> | null = null;
let cachedTransporterKey = "";

export function getSmtpConfiguration(): SmtpConfiguration | null {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 465);
  const user = process.env.SMTP_USER;
  const password = process.env.SMTP_PASSWORD;
  const from = process.env.CONTACT_FROM || user;
  const to = process.env.CONTACT_TO;
  const secure = process.env.SMTP_SECURE
    ? process.env.SMTP_SECURE === "true"
    : port === 465;

  if (
    !host ||
    !Number.isInteger(port) ||
    port < 1 ||
    port > 65_535 ||
    !user ||
    !password ||
    !from ||
    !to
  ) {
    return null;
  }

  return {
    host,
    port,
    secure,
    auth: { user, pass: password },
    from,
    to,
  };
}

export async function sendContactInquiry(
  smtp: SmtpConfiguration,
  inquiry: ContactInquiry,
) {
  const transporterKey = [
    smtp.host,
    smtp.port,
    smtp.secure,
    smtp.auth.user,
    smtp.auth.pass,
  ].join(":");

  if (!cachedTransporter || cachedTransporterKey !== transporterKey) {
    cachedTransporter = nodemailer.createTransport({
      host: smtp.host,
      port: smtp.port,
      secure: smtp.secure,
      auth: smtp.auth,
      connectionTimeout: CONNECTION_TIMEOUT_MS,
      greetingTimeout: CONNECTION_TIMEOUT_MS,
      socketTimeout: CONNECTION_TIMEOUT_MS,
    });
    cachedTransporterKey = transporterKey;
  }

  await cachedTransporter.sendMail({
    from: smtp.from,
    to: smtp.to,
    replyTo: inquiry.email,
    subject: `Website inquiry: ${inquiry.service}`,
    text: [
      `Name: ${inquiry.name}`,
      `Email: ${inquiry.email}`,
      `Company: ${inquiry.company || "Not provided"}`,
      `Service: ${inquiry.service}`,
      "",
      "Message:",
      inquiry.message,
    ].join("\n"),
  });
}

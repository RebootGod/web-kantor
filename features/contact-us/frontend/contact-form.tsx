"use client";

import { useState, type FormEvent } from "react";
import { CONTACT_SERVICE_OPTIONS } from "@/features/contact-us/shared/contact-options";

type FormStatus =
  | { state: "idle" }
  | { state: "submitting" }
  | { state: "success"; message: string }
  | { state: "error"; message: string };

const REQUEST_TIMEOUT_MS = 15_000;

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>({ state: "idle" });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());
    const controller = new AbortController();
    const timeout = window.setTimeout(
      () => controller.abort(),
      REQUEST_TIMEOUT_MS,
    );

    setStatus({ state: "submitting" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      const result = (await response.json().catch(() => ({}))) as {
        error?: string;
      };

      if (!response.ok) {
        throw new Error(result.error || "Unable to send your inquiry.");
      }

      form.reset();
      setStatus({
        state: "success",
        message: "Your inquiry has been sent. We will get back to you shortly.",
      });
    } catch (error) {
      setStatus({
        state: "error",
        message:
          error instanceof DOMException && error.name === "AbortError"
            ? "The request timed out. Please try again or use WhatsApp."
            : error instanceof Error
            ? error.message
            : "Unable to send your inquiry. Please try again.",
      });
    } finally {
      window.clearTimeout(timeout);
    }
  }

  return (
    <form
      className="contact-form"
      onSubmit={handleSubmit}
      aria-busy={status.state === "submitting"}
    >
      <div className="contact-form-row">
        <label>
          <span>Name</span>
          <input
            name="name"
            type="text"
            autoComplete="name"
            minLength={2}
            maxLength={100}
            required
          />
        </label>
        <label>
          <span>Work email</span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            maxLength={254}
            required
          />
        </label>
      </div>

      <div className="contact-form-row">
        <label>
          <span>Company</span>
          <input
            name="company"
            type="text"
            autoComplete="organization"
            maxLength={120}
          />
        </label>
        <label>
          <span>Service</span>
          <select name="service" defaultValue="Penetration Testing" required>
            {CONTACT_SERVICE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label>
        <span>How can we help?</span>
        <textarea name="message" rows={7} minLength={20} maxLength={5000} required />
      </label>

      <label className="contact-form-honeypot" aria-hidden="true">
        <span>Website</span>
        <input name="website" type="text" tabIndex={-1} autoComplete="off" />
      </label>

      <button
        className="button button-primary contact-form-submit"
        type="submit"
        disabled={status.state === "submitting"}
      >
        {status.state === "submitting" ? "Sending inquiry..." : "Send inquiry"}{" "}
        <span aria-hidden="true">↗</span>
      </button>
      {status.state === "success" || status.state === "error" ? (
        <p
          className={`contact-form-status is-${status.state}`}
          role={status.state === "error" ? "alert" : "status"}
          aria-live="polite"
        >
          {status.message}
        </p>
      ) : null}
    </form>
  );
}

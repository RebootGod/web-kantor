"use client";

import { useState, type FormEvent } from "react";

type FormStatus =
  | { state: "idle" }
  | { state: "submitting" }
  | { state: "success"; message: string }
  | { state: "error"; message: string };

const REQUEST_TIMEOUT_MS = 15_000;

export function useContactForm() {
  const [status, setStatus] = useState<FormStatus>({ state: "idle" });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());
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

  return { status, handleSubmit };
}

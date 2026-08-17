"use client";

import { CONTACT_SERVICE_OPTIONS } from "@/app/contact/shared/contact-options";
import { useContactForm } from "./hooks/use-contact-form";

export function ContactForm() {
  const { status, handleSubmit } = useContactForm();

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

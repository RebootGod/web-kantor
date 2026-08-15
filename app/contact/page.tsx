import type { Metadata } from "next";
import { ContactForm } from "./contact-form";
import { SiteHeader } from "../site-header";

export const metadata: Metadata = {
  title: "Contact Us — Forsecure",
  description:
    "Contact Forsecure about penetration testing, secure coding training, and cybersecurity consulting.",
};

export default function ContactPage() {
  return (
    <div className="site-shell">
      <SiteHeader />
      <main>
        <section className="page-hero section-pad" aria-labelledby="contact-page-title">
          <div>
            <p className="eyebrow">
              <span className="status-dot" aria-hidden="true" />
              Direct security channel
            </p>
            <h1 id="contact-page-title">Contact Us.</h1>
          </div>
          <p>
            Tell us what you need tested, the risks you are facing, or the
            security capability you want to build. We will help define the right
            next step.
          </p>
        </section>

        <section className="contact-page-grid section-pad">
          <aside className="contact-channel-panel">
            <p className="kicker">Talk to us directly</p>
            <h2>Start with WhatsApp.</h2>
            <p>
              Reach our team for an initial discussion about scope, timeline,
              or the security problem you are working through.
            </p>
            <a
              className="whatsapp-link"
              href="https://wa.me/6281280456338"
              target="_blank"
              rel="noreferrer"
            >
              <span>
                <small>WHATSAPP</small>
                +62 812-8045-6338
              </span>
              <b aria-hidden="true">↗</b>
            </a>
          </aside>

          <div className="contact-form-panel">
            <p className="kicker">Send an inquiry</p>
            <h2>Send your message.</h2>
            <ContactForm />
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-brand">
          <span className="brand-mark brand-mark-small" aria-hidden="true"><span>F</span><span>S</span></span>
          <div><b>Forsecure</b><span>Offensive Security &amp; Secure Engineering</span></div>
        </div>
        <p>Direct security conversations.</p>
        <p className="copyright">© {new Date().getFullYear()} Forsecure</p>
      </footer>
    </div>
  );
}

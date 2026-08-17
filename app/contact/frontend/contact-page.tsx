import { siteConfig } from "@/shared/config/site";
import { SiteFooter } from "@/shared/frontend/components/site-footer";
import { SiteHeader } from "@/shared/frontend/components/site-header";
import { JsonLd } from "@/shared/seo/json-ld";
import { createBreadcrumbSchema, createSchemaGraph } from "@/shared/seo/schema";
import { ContactForm } from "./contact-form";

export default function ContactPage() {
  const contactPageSchema = {
    "@type": "ContactPage",
    name: "Contact Forsecure",
    description:
      "Contact Forsecure for penetration testing, secure coding training, and cybersecurity consulting.",
    url: `${siteConfig.url}/contact`,
  };
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Contact Us", path: "/contact" },
  ]);

  return (
    <div className="site-shell">
      <JsonLd data={createSchemaGraph([contactPageSchema, breadcrumbSchema])} />
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
              href={siteConfig.whatsappUrl}
              target="_blank"
              rel="noreferrer"
            >
              <span>
                <small>WHATSAPP</small>
                {siteConfig.phone}
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

      <SiteFooter context="Direct security conversations." />
    </div>
  );
}

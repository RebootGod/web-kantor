import Link from "next/link";

type ContactCtaProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  ctaLabel?: string;
};

export function ContactCta({
  eyebrow = "Start a conversation",
  title,
  description,
  ctaLabel = "Contact Forsecure",
}: ContactCtaProps) {
  return (
    <section className="service-detail-cta section-pad">
      <div>
        <p className="kicker">{eyebrow}</p>
        <h2>{title}</h2>
        {description ? <p>{description}</p> : null}
      </div>
      <Link className="contact-button" href="/contact">
        <span>
          <small>SECURE CHANNEL</small>
          {ctaLabel}
        </span>
        <b aria-hidden="true">↗</b>
      </Link>
    </section>
  );
}

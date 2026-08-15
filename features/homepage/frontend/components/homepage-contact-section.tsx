import Link from "next/link";

export function HomepageContactSection() {
  return (
    <section className="contact section-pad" id="contact" aria-labelledby="contact-title">
      <div className="contact-glow" aria-hidden="true" />
      <div className="contact-copy">
        <p className="kicker kicker-dark">Start a conversation</p>
        <h2 id="contact-title">Ready to see what an attacker sees?</h2>
        <p>
          Tell us what you need tested, the risks you are facing, or the
          security capability you want to build. We will help define the
          right next step.
        </p>
      </div>
      <Link className="contact-button" href="/contact">
        <span>
          <small>SECURE CHANNEL</small>
          Contact Forsecure
        </span>
        <b aria-hidden="true">↗</b>
      </Link>
    </section>
  );
}

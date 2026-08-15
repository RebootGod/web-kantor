import Link from "next/link";

export function ResearchCta() {
  return (
    <section className="research-contact section-pad">
      <div>
        <p className="kicker kicker-dark">Work with us</p>
        <h2>Have a security problem worth exploring?</h2>
      </div>
      <Link className="button button-primary" href="/contact">
        Start a conversation <span aria-hidden="true">↗</span>
      </Link>
    </section>
  );
}

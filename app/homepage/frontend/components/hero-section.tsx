import Link from "next/link";

export function HeroSection() {
  return (
    <section className="hero section-pad" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="eyebrow">
          <span className="status-dot" aria-hidden="true" />
          Offensive security × secure engineering
        </p>
        <h1 id="hero-title">
          Think Like an Attacker.
          <span>Build with Security.</span>
        </h1>
        <p className="hero-lede">
          Forsecure helps organizations uncover risk before attackers do—then
          turns technical findings into systems that are more secure,
          resilient, and ready to scale.
        </p>
        <div className="hero-actions">
          <Link className="button button-primary" href="/contact">
            Start a security assessment
            <span aria-hidden="true">↗</span>
          </Link>
          <a className="button button-secondary" href="#services">
            Explore services
            <span aria-hidden="true">↓</span>
          </a>
        </div>
      </div>

      <div
        className="hero-console"
        aria-label="Forsecure assessment flow visualization"
      >
        <div className="console-grid" aria-hidden="true" />
        <div className="console-topline">
          <span>EXPLOIT CHAIN / 01</span>
          <span className="live-state">
            <i /> ACTIVE
          </span>
        </div>
        <div className="chain-map" aria-hidden="true">
          <div className="chain-track">
            <div className="chain-node">
              <span>01</span>
              <strong>ENTRY</strong>
            </div>
            <div className="chain-node">
              <span>02</span>
              <strong>ACCESS</strong>
            </div>
            <div className="chain-node">
              <span>03</span>
              <strong>IMPACT</strong>
            </div>
            <div className="chain-node">
              <span>04</span>
              <strong>FIX</strong>
            </div>
            <i className="chain-pulse" />
          </div>
          <div className="chain-status">
            <span>PATH VERIFIED</span>
            <b>04 / 04</b>
          </div>
        </div>
        <div className="console-readout">
          <div>
            <span>MODE</span>
            <strong>ATTACKER-LED</strong>
          </div>
          <div>
            <span>OUTPUT</span>
            <strong>ACTIONABLE</strong>
          </div>
          <div>
            <span>IMPACT</span>
            <strong>MEASURABLE</strong>
          </div>
        </div>
      </div>
    </section>
  );
}

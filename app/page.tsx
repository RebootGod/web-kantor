import Link from "next/link";
import { SiteHeader } from "./site-header";
import { services } from "./services/service-data";

const approach = [
  {
    step: "01",
    title: "Map the exposure",
    copy: "We map the architecture, business flows, attack surface, and the assets that matter most to your organization.",
  },
  {
    step: "02",
    title: "Think like an attacker",
    copy: "We identify realistic attack paths, connect weaknesses, and safely prove their impact.",
  },
  {
    step: "03",
    title: "Translate risk",
    copy: "Findings are translated into business context, technical evidence, and clear remediation priorities.",
  },
  {
    step: "04",
    title: "Build resilience",
    copy: "We support remediation so engineering and security teams can strengthen systems over time.",
  },
];

const capabilities = [
  "Offensive security expertise",
  "Application security",
  "Security automation",
  "Secure software engineering",
];

export default function Home() {
  return (
    <div className="site-shell">
      <SiteHeader />

      <main id="top">
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

          <div className="hero-console" aria-label="Forsecure assessment flow visualization">
            <div className="console-grid" aria-hidden="true" />
            <div className="console-topline">
              <span>EXPLOIT CHAIN / 01</span>
              <span className="live-state"><i /> ACTIVE</span>
            </div>
            <div className="chain-map" aria-hidden="true">
              <div className="chain-track">
                <div className="chain-node"><span>01</span><strong>ENTRY</strong></div>
                <div className="chain-node"><span>02</span><strong>ACCESS</strong></div>
                <div className="chain-node"><span>03</span><strong>IMPACT</strong></div>
                <div className="chain-node"><span>04</span><strong>FIX</strong></div>
                <i className="chain-pulse" />
              </div>
              <div className="chain-status"><span>PATH VERIFIED</span><b>04 / 04</b></div>
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

        <section className="proof-strip" aria-label="Forsecure core values">
          <p>Security beyond the checklist.</p>
          <div className="proof-items">
            <span><b>01</b> Realistic attack paths</span>
            <span><b>02</b> Engineering-ready findings</span>
            <span><b>03</b> Security by design</span>
          </div>
        </section>

        <section className="services section-pad" id="services" aria-labelledby="services-title">
          <div className="section-heading">
            <div>
              <p className="kicker">What we secure</p>
              <h2 id="services-title">From attack surface to source code.</h2>
            </div>
            <p>
              Offensive testing, developer enablement, and source-code security
              work together to reduce risk across the software lifecycle.
            </p>
          </div>

          <div className="service-grid">
            {services.map((service) => (
              <Link
                className="service-card"
                href={`/services/${service.slug}`}
                key={service.number}
                aria-label={`Learn more about ${service.title}`}
              >
                <div className="card-meta">
                  <span>{service.number}</span>
                  <span>{service.tag}</span>
                </div>
                <div>
                  <h3>{service.title}</h3>
                  <p>{service.copy}</p>
                </div>
                <span className="service-card-action">
                  View service <span aria-hidden="true">↗</span>
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="approach section-pad" id="approach" aria-labelledby="approach-title">
          <div className="approach-intro">
            <p className="kicker kicker-dark">Our approach</p>
            <h2 id="approach-title">We do not stop at “vulnerable”.</h2>
            <p>
              Our attacker mindset connects vulnerabilities to realistic attack
              scenarios, business impact, and mitigation steps that engineering
              and security teams can put into practice.
            </p>
          </div>

          <ol className="approach-list">
            {approach.map((item) => (
              <li key={item.step}>
                <span className="step-number">{item.step}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </div>
                <span className="step-arrow" aria-hidden="true">→</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="platform section-pad" id="platform" aria-labelledby="platform-title">
          <div className="platform-panel">
            <div className="platform-copy">
              <p className="kicker">Prevent earlier</p>
              <h2 id="platform-title">Secure coding that lives inside the developer workflow.</h2>
              <p>
                The Secure Coding Training Platform helps developers understand
                how vulnerabilities emerge, practice how to fix them, and build
                safer engineering habits from the start.
              </p>
              <Link className="text-link" href="/services/secure-coding-training">
                Explore the platform <span aria-hidden="true">↗</span>
              </Link>
            </div>

            <div className="code-window" aria-label="Secure coding module example">
              <div className="window-bar">
                <div aria-hidden="true"><span /><span /><span /></div>
                <p>LAB / ACCESS_CONTROL</p>
                <span>12:48</span>
              </div>
              <div className="code-lines" aria-hidden="true">
                <p><span className="line-no">01</span><span className="code-dim">{"// Detect the trust boundary"}</span></p>
                <p><span className="line-no">02</span><span className="code-blue">const</span> user = <span className="code-blue">await</span> session.get();</p>
                <p><span className="line-no">03</span><span className="code-blue">if</span> (!canAccess(user, resource)) &#123;</p>
                <p className="code-highlight"><span className="line-no">04</span>&nbsp;&nbsp;<span className="code-blue">throw new</span> Forbidden();</p>
                <p><span className="line-no">05</span>&#125;</p>
                <p><span className="line-no">06</span><span className="code-dim">{"// Verify. Fix. Remember."}</span></p>
              </div>
              <div className="lab-footer">
                <span><i /> VULNERABILITY MITIGATED</span>
                <b>+120 XP</b>
              </div>
            </div>
          </div>
        </section>

        <section className="capability section-pad" aria-labelledby="capability-title">
          <div>
            <p className="kicker">One security partner</p>
            <h2 id="capability-title">Offensive insight. Defensive outcome.</h2>
          </div>
          <div className="capability-copy">
            <p>
              Forsecure combines an attacker mindset with deep engineering
              expertise. The result is risk-relevant guidance that teams can
              realistically implement and continue using long after the
              assessment ends.
            </p>
            <ul>
              {capabilities.map((capability, index) => (
                <li key={capability}>
                  <span>0{index + 1}</span>
                  {capability}
                </li>
              ))}
            </ul>
          </div>
        </section>

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
      </main>

      <footer>
        <div className="footer-brand">
          <span className="brand-mark brand-mark-small" aria-hidden="true"><span>F</span><span>S</span></span>
          <div><b>Forsecure</b><span>Offensive Security & Secure Engineering</span></div>
        </div>
        <p>Think Like an Attacker. Build with Security.</p>
        <p className="copyright">© {new Date().getFullYear()} Forsecure</p>
      </footer>
    </div>
  );
}

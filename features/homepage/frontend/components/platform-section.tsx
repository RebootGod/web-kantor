import Link from "next/link";

export function PlatformSection() {
  return (
    <section
      className="platform section-pad"
      id="platform"
      aria-labelledby="platform-title"
    >
      <div className="platform-panel">
        <div className="platform-copy">
          <p className="kicker">Prevent earlier</p>
          <h2 id="platform-title">
            Secure coding that lives inside the developer workflow.
          </h2>
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
            <div aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <p>LAB / ACCESS_CONTROL</p>
            <span>12:48</span>
          </div>
          <div className="code-lines" aria-hidden="true">
            <p>
              <span className="line-no">01</span>
              <span className="code-dim">{"// Detect the trust boundary"}</span>
            </p>
            <p>
              <span className="line-no">02</span>
              <span className="code-blue">const</span> user = <span className="code-blue">await</span> session.get();
            </p>
            <p>
              <span className="line-no">03</span>
              <span className="code-blue">if</span> (!canAccess(user, resource)) &#123;
            </p>
            <p className="code-highlight">
              <span className="line-no">04</span>&nbsp;&nbsp;
              <span className="code-blue">throw new</span> Forbidden();
            </p>
            <p>
              <span className="line-no">05</span>&#125;
            </p>
            <p>
              <span className="line-no">06</span>
              <span className="code-dim">{"// Verify. Fix. Remember."}</span>
            </p>
          </div>
          <div className="lab-footer">
            <span>
              <i /> VULNERABILITY MITIGATED
            </span>
            <b>+120 XP</b>
          </div>
        </div>
      </div>
    </section>
  );
}

import type { approachSteps } from "@/app/homepage/backend";

type ApproachSectionProps = {
  steps: typeof approachSteps;
};

export function ApproachSection({ steps }: ApproachSectionProps) {
  return (
    <section
      className="approach section-pad"
      id="approach"
      aria-labelledby="approach-title"
    >
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
        {steps.map((item) => (
          <li key={item.step}>
            <span className="step-number">{item.step}</span>
            <div>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </div>
            <span className="step-arrow" aria-hidden="true">
              →
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}

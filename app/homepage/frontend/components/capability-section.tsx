type CapabilitySectionProps = {
  capabilities: readonly string[];
};

export function CapabilitySection({ capabilities }: CapabilitySectionProps) {
  return (
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
  );
}

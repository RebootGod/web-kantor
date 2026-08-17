import type { Service } from "@/app/services/backend";
import { ServiceDetailList } from "./service-detail-list";

export function ServiceDetailPanels({ service }: { service: Service }) {
  const hasVisualDetails = [...service.coverage, ...service.deliverables].some(
    (item) => item.icon,
  );

  return (
    <section
      className={`service-detail-grid section-pad${hasVisualDetails ? " service-detail-grid-has-visuals" : ""}`}
    >
      <article className="service-detail-panel">
        <p className="kicker">What we cover</p>
        <h2>Assessment scope</h2>
        <ServiceDetailList
          items={service.coverage}
          hasVisualDetails={hasVisualDetails}
        />
      </article>

      <article className="service-detail-panel service-detail-panel-dark">
        <p className="kicker kicker-dark">What you receive</p>
        <h2>Clear, actionable output</h2>
        <ServiceDetailList
          items={service.deliverables}
          hasVisualDetails={hasVisualDetails}
        />
      </article>
    </section>
  );
}

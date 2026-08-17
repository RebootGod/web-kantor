import Link from "next/link";
import type { Service } from "@/app/services/backend";

export function ServiceDetailHero({ service }: { service: Service }) {
  return (
    <section className="service-detail-hero section-pad" aria-labelledby="service-title">
      <div className="service-detail-intro">
        <Link className="service-back-link" href="/#services">
          <span aria-hidden="true">←</span> All services
        </Link>
        <p className="eyebrow">
          <span className="status-dot" aria-hidden="true" />
          {service.eyebrow}
        </p>
        <h1 id="service-title">{service.title}</h1>
        <p className="service-detail-headline">{service.headline}</p>
      </div>

      <aside className="service-detail-summary" aria-label={`${service.title} summary`}>
        <div className="card-meta">
          <span>SERVICE / {service.number}</span>
          <span>{service.tag}</span>
        </div>
        <p>{service.description}</p>
        <Link className="button button-primary" href="/contact">
          Discuss your scope <span aria-hidden="true">↗</span>
        </Link>
      </aside>
    </section>
  );
}

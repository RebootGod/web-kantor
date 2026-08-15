import Link from "next/link";
import type { Service } from "@/features/services/backend/service-catalog";

type ServicesGridProps = {
  services: Service[];
};

export function ServicesGrid({ services }: ServicesGridProps) {
  return (
    <section
      className="services section-pad"
      id="services"
      aria-labelledby="services-title"
    >
      <div className="section-heading">
        <div>
          <p className="kicker">What we secure</p>
          <h2 id="services-title">From attack surface to security governance.</h2>
        </div>
        <p>
          Offensive testing, developer enablement, and cybersecurity
          consulting work together to reduce technical and organizational risk.
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
  );
}

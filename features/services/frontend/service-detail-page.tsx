import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getService, services } from "@/features/services/backend/service-catalog";
import { absoluteUrl } from "@/shared/config/site";
import { ContactCta } from "@/shared/frontend/components/contact-cta";
import { SiteFooter } from "@/shared/frontend/components/site-footer";
import { SiteHeader } from "@/shared/frontend/components/site-header";
import { JsonLd } from "@/shared/seo/json-ld";
import { createPageMetadata } from "@/shared/seo/metadata";
import {
  createBreadcrumbSchema,
  createSchemaGraph,
  organizationSchema,
} from "@/shared/seo/schema";
import { ServiceDetailIcon } from "./service-detail-icon";

export type ServiceDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateServiceStaticParams() {
  return services.map(({ slug }) => ({ slug }));
}

export async function generateServiceMetadata({
  params,
}: ServiceDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) return {};

  return createPageMetadata({
    title: service.title,
    description: service.copy,
    path: `/services/${service.slug}`,
  });
}

export async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) notFound();

  const hasVisualDetails = [...service.coverage, ...service.deliverables].some(
    (item) => item.icon,
  );
  const servicePath = `/services/${service.slug}`;
  const serviceSchema = {
    "@type": "Service",
    "@id": `${absoluteUrl(servicePath)}#service`,
    name: service.title,
    serviceType: service.title,
    description: service.description,
    url: absoluteUrl(servicePath),
    areaServed: { "@type": "Country", name: "Indonesia" },
    provider: { "@id": organizationSchema["@id"] },
  };
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: service.title, path: servicePath },
  ]);

  return (
    <div className="site-shell service-detail-shell">
      <JsonLd data={createSchemaGraph([serviceSchema, breadcrumbSchema])} />
      <SiteHeader />

      <main>
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

        <section
          className={`service-detail-grid section-pad${hasVisualDetails ? " service-detail-grid-has-visuals" : ""}`}
        >
          <article className="service-detail-panel">
            <p className="kicker">What we cover</p>
            <h2>Assessment scope</h2>
            <ul
              className={`service-detail-list${hasVisualDetails ? " service-detail-list-visual" : ""}`}
            >
              {service.coverage.map((item, index) => (
                <li
                  key={item.title}
                  className={
                    `${item.icon ? "has-icon" : ""}${item.highlight ? " is-highlighted" : ""}`.trim() ||
                    undefined
                  }
                >
                  <span className="service-detail-item-number">0{index + 1}</span>
                  {item.icon ? (
                    <span className="service-detail-item-figure" aria-hidden="true">
                      <ServiceDetailIcon name={item.icon} />
                    </span>
                  ) : null}
                  <span className="service-detail-item-copy">
                    <b>{item.title}</b>
                    {item.description ? <em>{item.description}</em> : null}
                  </span>
                </li>
              ))}
            </ul>
          </article>

          <article className="service-detail-panel service-detail-panel-dark">
            <p className="kicker kicker-dark">What you receive</p>
            <h2>Clear, actionable output</h2>
            <ul
              className={`service-detail-list${hasVisualDetails ? " service-detail-list-visual" : ""}`}
            >
              {service.deliverables.map((item, index) => (
                <li
                  key={item.title}
                  className={
                    `${item.icon ? "has-icon" : ""}${item.highlight ? " is-highlighted" : ""}`.trim() ||
                    undefined
                  }
                >
                  <span className="service-detail-item-number">0{index + 1}</span>
                  {item.icon ? (
                    <span className="service-detail-item-figure" aria-hidden="true">
                      <ServiceDetailIcon name={item.icon} />
                    </span>
                  ) : null}
                  <span className="service-detail-item-copy">
                    <b>{item.title}</b>
                    {item.description ? <em>{item.description}</em> : null}
                  </span>
                </li>
              ))}
            </ul>
          </article>
        </section>

        <ContactCta title="Define the right security engagement." />
      </main>

      <SiteFooter context={`${service.shortTitle} / Forsecure`} />
    </div>
  );
}

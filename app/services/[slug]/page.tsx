import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteHeader } from "../../site-header";
import { getService, services } from "../service-data";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return services.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) return {};

  return {
    title: `${service.title} — ForSecure`,
    description: service.copy,
    openGraph: {
      title: `${service.title} — ForSecure`,
      description: service.copy,
    },
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) notFound();

  return (
    <div className="site-shell service-detail-shell">
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

        <section className="service-detail-grid section-pad">
          <article className="service-detail-panel">
            <p className="kicker">What we cover</p>
            <h2>Assessment scope</h2>
            <ul>
              {service.coverage.map((item, index) => (
                <li key={item}>
                  <span>0{index + 1}</span>
                  {item}
                </li>
              ))}
            </ul>
          </article>

          <article className="service-detail-panel service-detail-panel-dark">
            <p className="kicker kicker-dark">What you receive</p>
            <h2>Clear, actionable output</h2>
            <ul>
              {service.deliverables.map((item, index) => (
                <li key={item}>
                  <span>0{index + 1}</span>
                  {item}
                </li>
              ))}
            </ul>
          </article>
        </section>

        <section className="service-detail-cta section-pad">
          <div>
            <p className="kicker">Start a conversation</p>
            <h2>Define the right security engagement.</h2>
          </div>
          <Link className="contact-button" href="/contact">
            <span>
              <small>SECURE CHANNEL</small>
              Contact ForSecure
            </span>
            <b aria-hidden="true">↗</b>
          </Link>
        </section>
      </main>

      <footer>
        <div className="footer-brand">
          <span className="brand-mark brand-mark-small" aria-hidden="true"><span>F</span><span>S</span></span>
          <div><b>ForSecure</b><span>Offensive Security &amp; Secure Engineering</span></div>
        </div>
        <p>{service.shortTitle} / ForSecure</p>
        <p className="copyright">© {new Date().getFullYear()} ForSecure</p>
      </footer>
    </div>
  );
}

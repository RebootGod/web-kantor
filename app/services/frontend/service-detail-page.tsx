import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getService, services } from "@/app/services/backend";
import { ContactCta } from "@/shared/frontend/components/contact-cta";
import { SiteFooter } from "@/shared/frontend/components/site-footer";
import { SiteHeader } from "@/shared/frontend/components/site-header";
import { JsonLd } from "@/shared/seo/json-ld";
import { createPageMetadata } from "@/shared/seo/metadata";
import { ServiceDetailHero } from "./components/service-detail-hero";
import { ServiceDetailPanels } from "./components/service-detail-panels";
import { createServiceDetailSchema } from "./service-detail-schema";

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

  return (
    <div className="site-shell service-detail-shell">
      <JsonLd data={createServiceDetailSchema(service)} />
      <SiteHeader />

      <main>
        <ServiceDetailHero service={service} />
        <ServiceDetailPanels service={service} />

        <ContactCta title="Define the right security engagement." />
      </main>

      <SiteFooter context={`${service.shortTitle} / Forsecure`} />
    </div>
  );
}

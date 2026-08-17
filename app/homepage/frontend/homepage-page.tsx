import { approachSteps, capabilities } from "@/app/homepage/backend";
import { services } from "@/app/services/backend";
import { absoluteUrl } from "@/shared/config/site";
import { SiteFooter } from "@/shared/frontend/components/site-footer";
import { SiteHeader } from "@/shared/frontend/components/site-header";
import { JsonLd } from "@/shared/seo/json-ld";
import { createSchemaGraph, organizationSchema } from "@/shared/seo/schema";
import { ApproachSection } from "./components/approach-section";
import { CapabilitySection } from "./components/capability-section";
import { HeroSection } from "./components/hero-section";
import { HomepageContactSection } from "./components/homepage-contact-section";
import { PlatformSection } from "./components/platform-section";
import { ProofStrip } from "./components/proof-strip";
import { ServicesGrid } from "./components/services-grid";

export default function HomePage() {
  const servicesSchema = {
    "@type": "ItemList",
    name: "Forsecure cybersecurity services",
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name: service.title,
        description: service.copy,
        url: absoluteUrl(`/services/${service.slug}`),
        provider: { "@id": organizationSchema["@id"] },
      },
    })),
  };

  return (
    <div className="site-shell">
      <JsonLd data={createSchemaGraph([servicesSchema])} />
      <SiteHeader />
      <main id="top">
        <HeroSection />
        <ProofStrip />
        <ServicesGrid services={services} />
        <ApproachSection steps={approachSteps} />
        <PlatformSection />
        <CapabilitySection capabilities={capabilities} />
        <HomepageContactSection />
      </main>
      <SiteFooter context="Think Like an Attacker. Build with Security." />
    </div>
  );
}

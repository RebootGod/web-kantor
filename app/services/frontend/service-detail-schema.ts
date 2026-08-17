import type { Service } from "@/app/services/backend";
import { absoluteUrl } from "@/shared/config/site";
import {
  createBreadcrumbSchema,
  createSchemaGraph,
  organizationSchema,
} from "@/shared/seo/schema";

export function createServiceDetailSchema(service: Service) {
  const servicePath = `/services/${service.slug}`;

  return createSchemaGraph([
    {
      "@type": "Service",
      "@id": `${absoluteUrl(servicePath)}#service`,
      name: service.title,
      serviceType: service.title,
      description: service.description,
      url: absoluteUrl(servicePath),
      areaServed: { "@type": "Country", name: "Indonesia" },
      provider: { "@id": organizationSchema["@id"] },
    },
    createBreadcrumbSchema([
      { name: "Home", path: "/" },
      { name: service.title, path: servicePath },
    ]),
  ]);
}

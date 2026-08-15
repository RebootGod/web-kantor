import { absoluteUrl, siteConfig } from "@/shared/config/site";

export const organizationSchema = {
  "@type": "Organization",
  "@id": `${siteConfig.url}/#organization`,
  name: siteConfig.legalName,
  url: siteConfig.url,
  logo: absoluteUrl("/forsecure-logo.png"),
  description: siteConfig.description,
  email: siteConfig.email,
  telephone: siteConfig.phone,
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    email: siteConfig.email,
    telephone: siteConfig.phone,
    availableLanguage: ["English", "Indonesian"],
  },
};

export const websiteSchema = {
  "@type": "WebSite",
  "@id": `${siteConfig.url}/#website`,
  url: siteConfig.url,
  name: siteConfig.name,
  description: siteConfig.description,
  publisher: { "@id": organizationSchema["@id"] },
  inLanguage: "en",
};

export function createBreadcrumbSchema(
  items: Array<{ name: string; path: string }>,
) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function createSchemaGraph(items: Array<Record<string, unknown>>) {
  return {
    "@context": "https://schema.org",
    "@graph": items,
  };
}

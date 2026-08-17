import type { MetadataRoute } from "next";
import { getResearchArticles } from "@/app/research/backend";
import { services } from "@/app/services/backend";
import { absoluteUrl } from "@/shared/config/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getResearchArticles();

  return [
    {
      url: absoluteUrl("/"),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: absoluteUrl("/research"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/contact"),
      changeFrequency: "yearly",
      priority: 0.6,
    },
    ...services.map((service) => ({
      url: absoluteUrl(`/services/${service.slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...articles.map((article) => ({
      url: absoluteUrl(`/research/${article.slug}`),
      lastModified: new Date(article.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}

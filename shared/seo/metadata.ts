import type { Metadata } from "next";
import { absoluteUrl, siteConfig, siteOgImage } from "@/shared/config/site";

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  publishedTime?: string;
  authors?: string[];
  useAbsoluteTitle?: boolean;
};

export function createPageMetadata({
  title,
  description,
  path,
  type = "website",
  publishedTime,
  authors,
  useAbsoluteTitle = false,
}: PageMetadataOptions): Metadata {
  const url = absoluteUrl(path);
  const socialTitle = useAbsoluteTitle ? title : `${title} | ${siteConfig.name}`;
  const openGraph =
    type === "article"
      ? {
          title: socialTitle,
          description,
          url,
          siteName: siteConfig.name,
          locale: siteConfig.locale,
          type: "article" as const,
          publishedTime,
          authors,
          images: [siteOgImage],
        }
      : {
          title: socialTitle,
          description,
          url,
          siteName: siteConfig.name,
          locale: siteConfig.locale,
          type: "website" as const,
          images: [siteOgImage],
        };

  return {
    title: useAbsoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph,
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [siteOgImage.url],
    },
  };
}

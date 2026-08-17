import type { Metadata, Viewport } from "next";
import { siteConfig, siteOgImage } from "@/shared/config/site";
import { JsonLd } from "@/shared/seo/json-ld";
import {
  createSchemaGraph,
  organizationSchema,
  websiteSchema,
} from "@/shared/seo/schema";
import "@/shared/frontend/styles/base.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  keywords: [
    "penetration testing Indonesia",
    "cybersecurity consulting",
    "secure coding training",
    "offensive security",
    "ISO 27001 consulting",
  ],
  category: "technology",
  icons: {
    icon: [{ url: "/forsecure_fs_ico.ico", type: "image/x-icon" }],
    shortcut: ["/forsecure_fs_ico.ico"],
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Forsecure — Think Like an Attacker. Build with Security.",
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
    locale: siteConfig.locale,
    images: [siteOgImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Forsecure — Think Like an Attacker. Build with Security.",
    description: siteConfig.description,
    images: [siteOgImage.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#071914",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <JsonLd
          data={createSchemaGraph([organizationSchema, websiteSchema])}
        />
        {children}
      </body>
    </html>
  );
}

const DEFAULT_SITE_URL = "https://forsecure.id";

function resolveSiteUrl() {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL;

  if (!configuredUrl) return DEFAULT_SITE_URL;

  try {
    return new URL(configuredUrl).origin;
  } catch {
    return DEFAULT_SITE_URL;
  }
}

export const siteConfig = {
  name: "Forsecure",
  legalName: "Forsecure",
  url: resolveSiteUrl(),
  title: "Forsecure — Offensive Security & Secure Engineering",
  description:
    "Forsecure helps organizations identify and reduce cybersecurity risk through penetration testing, secure coding training, and cybersecurity consulting.",
  locale: "en_US",
  email: "hello@forsecure.id",
  phone: "+62 812-8045-6338",
  whatsappUrl: "https://wa.me/6281280456338",
} as const;

export function absoluteUrl(path = "/") {
  return new URL(path, `${siteConfig.url}/`).toString();
}

export const siteOgImage = {
  url: absoluteUrl("/og.png"),
  width: 1733,
  height: 907,
  alt: "Forsecure — Think Like an Attacker. Build with Security.",
} as const;

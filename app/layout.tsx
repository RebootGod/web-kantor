import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://forsecure.id",
  ),
  title: "ForSecure — Offensive Security & Secure Engineering",
  description:
    "ForSecure helps organizations identify and mitigate risk through penetration testing, secure coding training, and static application security testing.",
  openGraph: {
    title: "ForSecure — Think Like an Attacker. Build with Security.",
    description:
      "Offensive security, application security, and secure engineering for more resilient systems.",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og.png",
        width: 1733,
        height: 907,
        alt: "ForSecure — Think Like an Attacker. Build with Security.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ForSecure — Think Like an Attacker. Build with Security.",
    description:
      "Offensive security, application security, and secure engineering for more resilient systems.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

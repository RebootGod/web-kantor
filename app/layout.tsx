import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://Forsecure.id",
  ),
  title: "Forsecure — Offensive Security & Secure Engineering",
  description:
    "Forsecure helps identify and mitigate risk through penetration testing, secure coding training, and cybersecurity consulting.",
  icons: {
    icon: [{ url: "/forsecure_fs_ico.ico", type: "image/x-icon" }],
    shortcut: ["/forsecure_fs_ico.ico"],
  },
  openGraph: {
    title: "Forsecure — Think Like an Attacker. Build with Security.",
    description:
      "Offensive security, application security, and secure engineering for more resilient systems.",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og.png",
        width: 1733,
        height: 907,
        alt: "Forsecure — Think Like an Attacker. Build with Security.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Forsecure — Think Like an Attacker. Build with Security.",
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

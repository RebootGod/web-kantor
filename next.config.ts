import type { NextConfig } from "next";

const isProduction = process.env.NODE_ENV === "production";
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isProduction ? "" : " 'unsafe-eval'"}`,
  "script-src-attr 'none'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  ...(isProduction ? ["upgrade-insecure-requests"] : []),
].join("; ");

const SECURITY_HEADERS = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000",
  },
  {
    key: "Content-Security-Policy",
    value: contentSecurityPolicy,
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
  { key: "X-Permitted-Cross-Domain-Policies", value: "none" },
];

const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,

  async headers() {
    return [
      {
        source: "/:path*",
        headers: SECURITY_HEADERS,
      },
    ];
  },

  async redirects() {
    return [
      {
        source: "/services/static-application-security-testing",
        destination: "/services/cybersecurity-consulting",
        permanent: true,
      },
    ];
  },

  outputFileTracingIncludes: {
    "/*": ["./app/research/backend/content/**/*.mdx"],
  },

  experimental: {
    webpackMemoryOptimizations: true,

    // Kurangi jumlah worker build
    cpus: 1,

    // Hanya proses 1 page secara concurrent per worker
    staticGenerationMaxConcurrency: 1,

    // Project kita cuma sekitar 10 static pages,
    // jadi nilai besar ini mencegah Next.js membuat banyak worker
    staticGenerationMinPagesPerWorker: 100,
  },
};

export default nextConfig;

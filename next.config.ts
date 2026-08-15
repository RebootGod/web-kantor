import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",

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
    "/*": ["./content/research/**/*.mdx"],
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

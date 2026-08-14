import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",

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
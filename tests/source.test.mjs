import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

function read(path) {
  return readFile(new URL(path, root), "utf8");
}

test("keeps App Router files as thin feature adapters", async () => {
  const homepageRoute = await read("app/page.tsx");
  const contactRoute = await read("app/contact/page.tsx");
  const researchRoute = await read("app/research/page.tsx");
  const contactApiRoute = await read("app/api/contact/route.ts");

  assert.match(homepageRoute, /features\/homepage\/frontend/);
  assert.match(contactRoute, /features\/contact-us\/frontend/);
  assert.match(researchRoute, /features\/research\/frontend/);
  assert.match(contactApiRoute, /features\/contact-us\/backend/);
});

test("keeps server and client Contact concerns separated", async () => {
  const form = await read("features/contact-us/frontend/contact-form.tsx");
  const route = await read("features/contact-us/backend/contact-route.ts");
  const validation = await read(
    "features/contact-us/backend/contact-validation.ts",
  );

  assert.match(form, /^"use client";/);
  assert.match(route, /MAX_BODY_BYTES/);
  assert.match(route, /request\.body\?\.getReader\(\)/);
  assert.match(route, /isTrustedOrigin/);
  assert.match(route, /createRateLimiter/);
  assert.match(validation, /containsHeaderInjection/);
  assert.match(validation, /SERVICE_OPTION_SET/);
});

test("configures technical SEO and structured data", async () => {
  const layout = await read("app/layout.tsx");
  const sitemap = await read("app/sitemap.ts");
  const robots = await read("app/robots.ts");
  const schema = await read("shared/seo/schema.ts");

  assert.match(layout, /template: `%s \| \$\{siteConfig\.name\}`/);
  assert.doesNotMatch(layout, /generator:/);
  assert.match(layout, /JsonLd/);
  assert.match(sitemap, /getResearchArticles/);
  assert.match(sitemap, /services\.map/);
  assert.match(robots, /sitemap\.xml/);
  assert.match(schema, /BreadcrumbList/);
  assert.match(schema, /Organization/);
});

test("configures production security headers", async () => {
  const nextConfig = await read("next.config.ts");

  assert.match(nextConfig, /poweredByHeader: false/);
  assert.match(nextConfig, /Content-Security-Policy/);
  assert.match(nextConfig, /Strict-Transport-Security/);
  assert.match(nextConfig, /X-Content-Type-Options/);
  assert.match(nextConfig, /frame-ancestors 'none'/);
});

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

  assert.match(homepageRoute, /app\/homepage\/frontend/);
  assert.match(contactRoute, /app\/contact\/frontend/);
  assert.match(researchRoute, /app\/research\/frontend/);
  assert.match(contactApiRoute, /app\/contact\/backend/);
});

test("keeps server and client Contact concerns separated", async () => {
  const form = await read("app/contact/frontend/contact-form.tsx");
  const route = await read("app/contact/backend/contact-route.ts");
  const rateLimiter = await read("app/contact/backend/rate-limiter.ts");
  const mailer = await read("app/contact/backend/mailer.ts");
  const validation = await read(
    "app/contact/backend/contact-validation.ts",
  );

  assert.match(form, /^"use client";/);
  assert.match(route, /MAX_BODY_BYTES/);
  assert.match(route, /request\.body\?\.getReader\(\)/);
  assert.match(route, /isTrustedOrigin/);
  assert.match(route, /isIP/);
  assert.match(route, /LOOPBACK_HOSTNAMES/);
  assert.match(route, /candidateUrl\.protocol === requestUrl\.protocol/);
  assert.match(route, /candidateUrl\.port === requestUrl\.port/);
  assert.match(route, /Cache-Control/);
  assert.match(route, /Retry-After/);
  assert.match(route, /createRateLimiter/);
  assert.match(rateLimiter, /DEFAULT_MAX_ENTRIES/);
  assert.match(rateLimiter, /OVERFLOW_KEY/);
  assert.match(mailer, /requireTLS: !smtp\.secure/);
  assert.match(mailer, /minVersion: MINIMUM_TLS_VERSION/);
  assert.match(mailer, /disableFileAccess: true/);
  assert.match(mailer, /disableUrlAccess: true/);
  assert.match(validation, /containsHeaderInjection/);
  assert.match(validation, /SERVICE_OPTION_SET/);
});

test("keeps unpublished Research content private by default", async () => {
  const repository = await read(
    "app/research/backend/research-repository.ts",
  );

  assert.match(
    repository,
    /data\.status === "Published" \? "Published" : "Draft"/,
  );
});

test("keeps responsive page grids inside their owning stylesheets", async () => {
  const baseStyles = await read("shared/frontend/styles/base.css");
  const homepageStyles = await read(
    "app/homepage/frontend/styles/homepage.css",
  );
  const researchStyles = await read(
    "app/research/frontend/styles/research.css",
  );
  const contactStyles = await read("app/contact/frontend/styles/contact.css");

  assert.doesNotMatch(baseStyles, /\.research-contact,|\.contact-page-grid/);
  assert.match(
    homepageStyles,
    /\.approach,[\s\S]*\.platform-panel,[\s\S]*grid-template-columns: 1fr/,
  );
  assert.match(researchStyles, /\.research-contact \{ grid-template-columns: 1fr; \}/);
  assert.match(contactStyles, /\.contact-page-grid \{[\s\S]*grid-template-columns: 1fr/);
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
  assert.match(nextConfig, /script-src-attr 'none'/);
  assert.match(nextConfig, /X-Permitted-Cross-Domain-Policies/);
  assert.match(nextConfig, /frame-ancestors 'none'/);
});

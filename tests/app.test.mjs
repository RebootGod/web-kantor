import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("creates a Next.js standalone production server", async () => {
  await access(new URL(".next/standalone/server.js", root));
  await access(new URL(".next/static", root));
});

test("includes all public application routes in the build manifest", async () => {
  const manifest = JSON.parse(
    await readFile(new URL(".next/server/app-paths-manifest.json", root), "utf8"),
  );
  const routes = Object.keys(manifest);

  for (const route of [
    "/page",
    "/contact/page",
    "/research/page",
    "/research/[slug]/page",
    "/services/[slug]/page",
    "/api/contact/route",
  ]) {
    assert.ok(routes.includes(route), `Expected ${route} in app paths manifest`);
  }
});

test("keeps Research content and contact configuration deployable", async () => {
  const article = await readFile(
    new URL("content/research/introducing-forsecure-research.mdx", root),
    "utf8",
  );
  const envExample = await readFile(new URL(".env.example", root), "utf8");

  assert.match(article, /status: "Published"/);
  assert.match(envExample, /SMTP_HOST=/);
  assert.match(envExample, /CONTACT_TO=/);
  assert.doesNotMatch(envExample, /^SMTP_PASSWORD=$/m);
});

test("publishes the current service offering", async () => {
  const serviceData = await readFile(
    new URL("app/services/service-data.ts", root),
    "utf8",
  );
  const contactForm = await readFile(
    new URL("app/contact/contact-form.tsx", root),
    "utf8",
  );

  assert.match(serviceData, /slug: "cybersecurity-consulting"/);
  assert.match(serviceData, /ISO\/IEC 27001/);
  assert.match(serviceData, /ISO\/IEC 27701/);
  assert.match(serviceData, /Tested\. Hardened\. Production-ready applications\./);
  assert.match(contactForm, /<option>Cybersecurity Consulting<\/option>/);
  assert.doesNotMatch(serviceData, /title: "Static Application Security Testing"/);
});

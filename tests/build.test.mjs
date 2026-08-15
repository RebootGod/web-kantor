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
    "/sitemap.xml/route",
    "/robots.txt/route",
    "/manifest.webmanifest/route",
  ]) {
    assert.ok(routes.includes(route), `Expected ${route} in app paths manifest`);
  }
});

test("keeps Research content and contact configuration deployable", async () => {
  const article = await readFile(
    new URL(
      "features/research/backend/content/introducing-forsecure-research.mdx",
      root,
    ),
    "utf8",
  );
  const envExample = await readFile(new URL(".env.example", root), "utf8");

  assert.match(article, /status: "Published"/);
  assert.match(envExample, /SMTP_HOST=/);
  assert.match(envExample, /CONTACT_TO=/);
  assert.doesNotMatch(envExample, /^SMTP_PASSWORD=$/m);
});

test("ships the Forsecure logo and favicon", async () => {
  const layout = await readFile(new URL("app/layout.tsx", root), "utf8");
  const header = await readFile(
    new URL("shared/frontend/components/site-header.tsx", root),
    "utf8",
  );

  await access(new URL("public/forsecure-logo.png", root));
  await access(new URL("public/forsecure_fs_ico.ico", root));
  assert.match(layout, /forsecure_fs_ico\.ico/);
  assert.match(header, /forsecure-logo\.png/);
});

test("publishes the current service offering", async () => {
  const serviceCatalog = await readFile(
    new URL("features/services/backend/service-catalog.ts", root),
    "utf8",
  );
  const contactOptions = await readFile(
    new URL("features/contact-us/shared/contact-options.ts", root),
    "utf8",
  );

  assert.match(serviceCatalog, /slug: "cybersecurity-consulting"/);
  assert.match(serviceCatalog, /ISO\/IEC 27001/);
  assert.match(serviceCatalog, /ISO\/IEC 27701/);
  assert.match(serviceCatalog, /Android and iOS Application/);
  assert.match(serviceCatalog, /Network and Infrastructure/);
  assert.match(serviceCatalog, /\["Hands-on vulnerable code labs", "code-lab"\]/);
  assert.match(
    serviceCatalog,
    /\["ISO\/IEC 27701 privacy information management", "privacy"\]/,
  );
  assert.match(
    serviceCatalog,
    /Tested\. Hardened\. Production-ready applications\./,
  );
  assert.match(contactOptions, /"Cybersecurity Consulting"/);
  assert.doesNotMatch(
    serviceCatalog,
    /title: "Static Application Security Testing"/,
  );
});

test("keeps the cPanel deployment workflow repeatable", async () => {
  const cpanelConfig = await readFile(new URL(".cpanel.yml", root), "utf8");
  const deployScript = await readFile(
    new URL("scripts/deploy-cpanel.sh", root),
    "utf8",
  );

  assert.match(cpanelConfig, /scripts\/deploy-cpanel\.sh/);
  assert.match(deployScript, /ln -s "\$VENV_MODULES" node_modules/);
  assert.match(deployScript, /npm run build/);
  assert.match(deployScript, /git checkout -- next-env\.d\.ts/);
  assert.match(deployScript, /touch tmp\/restart\.txt/);
});

test("bundles Research content into the standalone deployment", async () => {
  await access(
    new URL(
      ".next/standalone/features/research/backend/content/introducing-forsecure-research.mdx",
      root,
    ),
  );
});

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
      "app/research/backend/content/introducing-forsecure-research.mdx",
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
    new URL("app/services/backend/service-catalog.ts", root),
    "utf8",
  );
  const serviceDefinitions = (
    await Promise.all(
      [
        "cybersecurity-consulting.ts",
        "penetration-testing.ts",
        "secure-coding-training.ts",
      ].map((filename) =>
        readFile(
          new URL(`app/services/backend/services/${filename}`, root),
          "utf8",
        ),
      ),
    )
  ).join("\n");
  const contactOptions = await readFile(
    new URL("app/contact/shared/contact-options.ts", root),
    "utf8",
  );

  assert.match(serviceCatalog, /cybersecurityConsulting/);
  assert.match(serviceCatalog, /penetrationTesting/);
  assert.match(serviceCatalog, /secureCodingTraining/);
  assert.match(serviceDefinitions, /slug: "cybersecurity-consulting"/);
  assert.match(serviceDefinitions, /ISO\/IEC 27001/);
  assert.match(serviceDefinitions, /ISO\/IEC 27701/);
  assert.match(serviceDefinitions, /Android and iOS Application/);
  assert.match(serviceDefinitions, /Network and Infrastructure/);
  assert.match(
    serviceDefinitions,
    /\["Hands-on vulnerable code labs", "code-lab"\]/,
  );
  assert.match(
    serviceDefinitions,
    /\["ISO\/IEC 27701 privacy information management", "privacy"\]/,
  );
  assert.match(
    serviceDefinitions,
    /Tested\. Hardened\. Production-ready applications\./,
  );
  assert.match(contactOptions, /"Cybersecurity Consulting"/);
  assert.doesNotMatch(
    serviceDefinitions,
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
      ".next/standalone/app/research/backend/content/introducing-forsecure-research.mdx",
      root,
    ),
  );
});

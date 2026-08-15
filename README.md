# Forsecure Website

Production website for Forsecure, built with Next.js App Router and deployed as a Node.js application.

## Stack

- Next.js 16 with React and TypeScript
- Node.js 22
- Local MDX files for Research publications
- Nodemailer with cPanel SMTP for contact inquiries
- Standalone Next.js output for cPanel deployment

## Project Structure

The codebase is organized by feature. Each page owns its frontend and backend code, and cross-page code lives in `shared`.

```text
app/                              App Router adapters (routing, metadata, SEO routes)
features/
  homepage/{frontend,backend}     Homepage sections and static content
  services/{frontend,backend}     Service detail pages and the service catalog
  research/{frontend,backend}     Research pages, MDX repository, and article content
  contact-us/{frontend,backend,shared}
                                  Contact page, contact API, validation, mailer
shared/
  config/                         Site-wide configuration (URL, brand, contact details)
  frontend/components/            Header, footer, and reusable call-to-action blocks
  frontend/styles/                Global stylesheet
  seo/                            Metadata helpers and structured data
```

Files under `app/` stay thin: they re-export page components and metadata from `features/*`. Add new pages by creating a feature folder and wiring a small route file.

## Local Development

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

Use these checks before deployment:

```bash
npm run lint
npm run typecheck
npm test
```

## Environment Variables

Copy `.env.example` to `.env.local` for development. Configure the same keys in cPanel for production.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical public website URL |
| `SMTP_HOST` | cPanel mail server hostname |
| `SMTP_PORT` | SMTP port, normally `465` or `587` |
| `SMTP_SECURE` | `true` for port 465, `false` for port 587 |
| `SMTP_USER` | cPanel mailbox username |
| `SMTP_PASSWORD` | cPanel mailbox password |
| `CONTACT_FROM` | Sender shown on website inquiries |
| `CONTACT_TO` | Mailbox receiving inquiries |

Never commit `.env.local` or production SMTP credentials.

## Publishing Research

Add an `.mdx` file to `features/research/backend/content`. The filename becomes the article URL slug.

```mdx
---
title: "Article title"
excerpt: "Short summary used on the Research page and in metadata."
category: "Security Research"
publishedAt: "2026-08-13"
author: "Forsecure Research"
status: "Published"
---

Article content starts here.
```

- Use `status: "Draft"` to keep an article out of the website.
- Published articles are sorted by `publishedAt`, newest first.
- The Research listing shows up to nine cards per page.
- Rebuild and restart the Node.js application after publishing an article.

## cPanel Deployment

The hosting environment supports Node.js `22.22.0`. The repository includes a `.cpanel.yml` deployment task that installs dependencies, builds the application, and restarts it automatically whenever a deployment runs from **Git Version Control**.

Production builds use Webpack because the shared hosting operating system cannot load the native SWC bindings required by Turbopack. Keep the `--webpack` flag in the `build` script.

### Recommended: Git Version Control Auto Deploy

When pulling from GitHub through cPanel's interface, deployment runs in two steps: fetch the latest commit, then run the deployment task. Direct pushes to a cPanel-managed repository can deploy automatically through its post-receive hook; see [cPanel's Git Deployment guide](https://docs.cpanel.net/knowledge-base/web-services/guide-to-git-deployment/).

1. Push to `main` on GitHub.
2. In cPanel, open **Git Version Control → forsecure_app → Manage → Pull or Deploy**.
3. Click **Update from Remote** to fetch the new commit.
4. Click **Deploy HEAD Commit**. cPanel reads `.cpanel.yml` and runs `scripts/deploy-cpanel.sh`, which:
   - Verifies (and repairs if needed) the CloudLinux `node_modules` symlink.
   - Runs `npm install --include=dev`.
   - Rebuilds with `npm run build` (Webpack, single worker).
   - Touches `tmp/restart.txt` so Passenger restarts the Node.js application.

No manual Terminal steps are required once this is set up. If `Deploy HEAD Commit` fails, check **Last Deployment Information** in the same screen for the task output.

### Alternative: Standalone Bundle

Build the upload-ready directory locally or through cPanel Terminal:

```bash
npm install
npm run build:cpanel
```

Upload the contents of `.cpanel-build` to the cPanel application root. In **Setup Node.js App**, use:

- Node.js version: `22.22.0`
- Application mode: `Production`
- Application root: the directory containing the uploaded standalone bundle
- Application URL: `https://forsecure.id`
- Application startup file: `server.js`

Set `NODE_ENV=production` if cPanel does not add it automatically.

Add every variable from `.env.example` through the cPanel Node.js application environment-variable interface. Then restart the application.

### Alternative: Build on the Server

If the repository is cloned directly on the server:

```bash
source /DATA/forsecur/nodevenv/forsecure_app/22/bin/activate
cd /DATA/forsecur/forsecure_app

VENV_ROOT="$(dirname "$(dirname "$(which node)")")"
mkdir -p "$VENV_ROOT/lib/node_modules"
rm -rf node_modules
ln -s "$VENV_ROOT/lib/node_modules" node_modules

npm install --include=dev
rm -rf .next
npm run build
```

CloudLinux expects the application's `node_modules` path to point to the Node.js virtual environment. Verify it before installing dependencies:

```bash
ls -ld node_modules
```

The expected destination is `/DATA/forsecur/nodevenv/forsecure_app/22/lib/node_modules`.

The build is intentionally configured to use Webpack, one build CPU, and one static-generation page at a time. This prevents the shared-hosting memory limit from killing a build that would otherwise start nine workers. Native SWC warnings about `GLIBC_2.29` are expected on this server; Next.js falls back to its WASM bindings.

Set the application startup file to `server.cjs`, configure the environment variables, and restart the app. This mode keeps the full repository and production dependencies on the server.

## Updating Production

For a standalone deployment:

1. Pull or upload the latest source.
2. Run `npm install` when dependencies change.
3. Run `npm run build:cpanel`.
4. Replace the application-root files with `.cpanel-build`.
5. Restart the Node.js application in cPanel.

For a repository deployment on the server:

```bash
source /DATA/forsecur/nodevenv/forsecure_app/22/bin/activate
cd /DATA/forsecur/forsecure_app
git pull origin main
npm install --include=dev
rm -rf .next
npm run build
```

Keep the existing `node_modules` symlink intact when updating the application.

## Contact Form Troubleshooting

- Confirm the cPanel mailbox exists and the SMTP password is current.
- Use port `465` with `SMTP_SECURE=true`, or port `587` with `SMTP_SECURE=false`.
- Check the Node.js application log when the form returns an error.
- Confirm `CONTACT_FROM` uses a mailbox or domain accepted by the cPanel mail server.
- WhatsApp remains available at `https://wa.me/6281280456338` if email delivery is temporarily unavailable.

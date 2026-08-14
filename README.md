# ForSecure Website

Production website for ForSecure, built with Next.js App Router and deployed as a Node.js application.

## Stack

- Next.js 16 with React and TypeScript
- Node.js 22
- Local MDX files for Research publications
- Nodemailer with cPanel SMTP for contact inquiries
- Standalone Next.js output for cPanel deployment

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

Add an `.mdx` file to `content/research`. The filename becomes the article URL slug.

```mdx
---
title: "Article title"
excerpt: "Short summary used on the Research page and in metadata."
category: "Security Research"
publishedAt: "2026-08-13"
author: "ForSecure Research"
status: "Published"
---

Article content starts here.
```

- Use `status: "Draft"` to keep an article out of the website.
- Published articles are sorted by `publishedAt`, newest first.
- The Research listing shows up to nine cards per page.
- Rebuild and restart the Node.js application after publishing an article.

## cPanel Deployment

The hosting environment supports Node.js `22.22.0`. Two deployment modes are available.

Production builds use Webpack because the shared hosting operating system cannot load the native SWC bindings required by Turbopack. Keep the `--webpack` flag in the `build` script.

### Recommended: Standalone Bundle

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
npm install
npm run build
```

Set the application startup file to `server.cjs`, configure the environment variables, and restart the app. This mode keeps the full repository and production dependencies on the server.

## Updating Production

For a standalone deployment:

1. Pull or upload the latest source.
2. Run `npm install` when dependencies change.
3. Run `npm run build:cpanel`.
4. Replace the application-root files with `.cpanel-build`.
5. Restart the Node.js application in cPanel.

## Contact Form Troubleshooting

- Confirm the cPanel mailbox exists and the SMTP password is current.
- Use port `465` with `SMTP_SECURE=true`, or port `587` with `SMTP_SECURE=false`.
- Check the Node.js application log when the form returns an error.
- Confirm `CONTACT_FROM` uses a mailbox or domain accepted by the cPanel mail server.
- WhatsApp remains available at `https://wa.me/6281280456338` if email delivery is temporarily unavailable.

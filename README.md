# Aqua Protocol Documentation

Documentation site for the [Aqua Protocol](https://aqua-protocol.org). An open-source cryptographic trust infrastructure for the AI era, providing verifiable identity, access control, and tamper-proof provenance.

Built with [Specra](https://specra-docs.com/) and [Next.js](https://nextjs.org).

## Getting Started

Install dependencies and run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the docs locally.

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Landing page
│   └── docs/               # Documentation pages
├── docs/                   # MDX documentation files
│   ├── v1.1.0/             # Version 1.1.0 docs
│   ├── v2.0.2/             # Version 2.0.2 docs
│   ├── v3.0.2/             # Version 3.0.2 docs
│   └── v4.0.0/             # Version 4.0.0 docs (active version, published)
├── public/                 # Static assets
├── scripts/                # Build & indexing scripts
├── specra.config.json      # Site configuration
└── next.config.mjs         # Next.js configuration
```

## Version 4 status

Version 4 is published (2026-08-08) and is the active version
(`site.activeVersion` in `specra.config.json`). The former teaser gate in
`app/docs/[version]/[...slug]/page.tsx` and the teaser component were removed
when v4 went live; v4 pages render their MDX, carry per-page canonicals, and
are included in the sitemap. `/docs/v4.0.0` redirects to `/docs/v4.0.0/welcome`
as the deterministic entry point, and `/v4` remains a temporary redirect entry
in `redirects.json` so the URL stays available for a dedicated landing page.

The v4 content documents an experimental protocol release: the wording around
status (breaking changes expected, limited scope of the published crates, no
backward-compatibility guarantees yet) is deliberate and should be kept intact
when editing pages. The wire schema version URL every v4 revision carries,
`https://aqua-protocol.org/docs/v4/schema`, must always resolve — it is a
redirect entry in `redirects.json` pointing at the Protocol Reference.

## Writing Documentation

Add MDX files under the active version directory (`docs/v4.0.0`):

```mdx
---
title: "My Page"
description: 'One-line summary shown in search and cards'
icon: "book-open"
sidebar_position: 3
---

Your content here...
```

Conventions for v4 pages:

- Frontmatter carries the title; do **not** repeat it as a leading `# H1`.
- Always set `sidebar_position` (and `position` in `_category_.json` for
  folders) — unordered pages fall back to filename order.
- Icons are kebab-case [lucide](https://lucide.dev) names.
- Available MDX components (from `specra/mdx-components`): `Callout`
  (`type`: info | warning | note | tip), `Card`/`CardGrid`, `Steps`/`Step`,
  `Tabs`/`Tab`, `Accordion`, `Badge`, `Mermaid`.
- Technical claims about the protocol must be grounded in the normative
  specification (`aqua-rs-sdk-core/protocol-specification/`) or the published
  crates' code; end pages with a `## See Also` link list.

## Redirects

Redirects are managed in `redirects.json`. There are two ways to add redirects:

### 1. Auto-generated redirects

The script `scripts/generate-redirects.mjs` automatically generates redirects from:

- **Frontmatter**: Add a `redirect_from` field to your MDX file:
  ```mdx
  ---
  title: My Page
  redirect_from:
    - /docs/v3/old-path
    - /docs/old/other-path
  ---
  ```
- **Folder redirects**: Category folders automatically redirect to their first child page.

Run the script to regenerate:
```bash
node scripts/generate-redirects.mjs
```

### 2. Manual redirects

You can also add redirects directly to `redirects.json`. Manual entries are preserved when the script runs — it only adds or updates generated entries without removing manually added ones.

Add an entry with the following format:
```json
{
  "source": "/docs/v4/schema",
  "destination": "/docs/v4.0.0/schema-reference/introduction",
  "permanent": false
}
```

| Field         | Description                                                       |
|---------------|-------------------------------------------------------------------|
| `source`      | The old URL path that should redirect                             |
| `destination` | The new URL path to redirect to                                   |
| `permanent`   | `true` for 301 (permanent), `false` for 302 (temporary) redirect |

## Configuration

Edit `specra.config.json` to customize the site (title, navigation, social links, footer, etc.).

## Building for Production

```bash
# Standard build (server mode)
npm run build
npm run start

# Static export (GitHub Pages)
npm run build:export
```

## Deployment

The site is configured for GitHub Pages deployment with a custom domain at [aqua-protocol.org](https://aqua-protocol.org).

## Links

- [Aqua Protocol](https://aqua-protocol.org)
- [GitHub — inblockio](https://github.com/inblockio)
- [Next.js Documentation](https://nextjs.org/docs)

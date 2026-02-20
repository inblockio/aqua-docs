# Aqua Protocol Documentation

Documentation site for the [Aqua Protocol](https://aqua-protocol.org). An open-source cryptographic trust infrastructure for the AI era, providing verifiable identity, access control, and tamper-proof provenance.

Built with [Specra](https://https://specra-docs.com/) and [Next.js](https://nextjs.org).

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
│   └── v4.0.0/             # Version 4.0.0 docs (active)
├── public/                 # Static assets
├── scripts/                # Build & indexing scripts
├── specra.config.json      # Site configuration
└── next.config.mjs         # Next.js configuration
```

## Writing Documentation

Add MDX files under the active version directory (`docs/v4.0.0`):

```mdx
---
title: My Page
description: This is my documentation page
---

# My Page

Your content here...
```

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

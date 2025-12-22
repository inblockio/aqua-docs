# Specra Documentation Site

Welcome to your new Specra documentation site! This project was created with `create-specra`.

## Getting Started

First, install dependencies and run the development server:

```bash
npm install
npm run dev
# or
yarn install
yarn dev
# or
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see your documentation site.

## Project Structure

```
├── app/              # Next.js app directory
│   ├── layout.tsx    # Root layout
│   ├── page.tsx      # Home page
│   └── docs/         # Documentation pages
├── components/       # Reusable components
│   ├── docs/        # Documentation-specific components
│   └── ui/          # UI components
├── docs/            # Your MDX documentation files
│   └── v1.0.0/     # Version 1.0.0 docs
├── lib/             # Utility functions
│   ├── mdx.ts      # MDX processing
│   ├── config.ts   # Configuration
│   └── parsers/    # API parsers
├── public/          # Static assets
└── specra.config.json  # Specra configuration
```

## Writing Documentation

Add your MDX files in the `docs/v1.0.0/` directory:

```mdx
---
title: My Page
description: This is my documentation page
---

# My Page

Your content here...
```

### Using Components

Import and use components in your MDX:

```mdx
import { Callout } from '@/components/docs/callout'
import { CodeBlock } from '@/components/docs/code-block'
import { Tabs, Tab } from '@/components/docs/tabs'

<Callout type="info">
  This is an info callout!
</Callout>

<Tabs>
  <Tab title="JavaScript">
    ```js
    console.log('Hello World')
    ```
  </Tab>
  <Tab title="TypeScript">
    ```ts
    console.log('Hello World')
    ```
  </Tab>
</Tabs>
```

## Configuration

Edit `specra.config.json` to customize your site:

```json
{
  "site": {
    "title": "Your Docs",
    "description": "Your documentation site",
    "url": "https://yourdocs.com"
  },
  "navigation": {
    "links": [
      { "title": "Home", "href": "/" },
      { "title": "Docs", "href": "/docs" }
    ]
  }
}
```

## Building for Production

```bash
npm run build
npm run start
```

## Learn More

- [Specra Documentation](https://specra.dev/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [MDX Documentation](https://mdxjs.com)

## Deployment

Deploy your Specra documentation site to Vercel, Netlify, or any hosting platform that supports Next.js.

### Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start)

## Need Help?

- Check the [documentation](https://specra.dev/docs)
- Report issues on [GitHub](https://github.com/yourusername/specra/issues)

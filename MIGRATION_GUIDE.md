
# Migration Guide: Mintlify to v0-Documentation-Library This document describes the migration from Mintlify to the v0-documentation-library static site generator. ## Migration Summary ✅ **Completed:** - Copied v0-documentation-library framework to aqua-docs - Created version-based directory structure (docs/v1.0.0, v2.0.0, v3.0.0, v4.0.0)
 - Migrated all 39 MDX files from Mintlify format
 - Converted Mintlify components to v0-library components
 - Created category metadata files (_category_.json)
 - Created specra.config.json configuration
 - Copied assets (images, logos, icons)
 - Set up Next.js and PostCSS configuration

 ## Component Conversions

 The following Mintlify components were automatically converted:

 | Mintlify | v0-Library |
 |----------|------------|
 | `<Note>` | `<Callout type="info">` |
 | `<Info>` | `<Callout type="info">` |
 | `<Tip>` | `<Callout type="tip">` |
 | `<Warning>` | `<Callout type="warning">` |
 | `<CardGroup>` | `<CardGrid>` |
 | `<Card>` | `<Card>` (mostly compatible) |
 | `<Tabs>` + `<Tab>` | `<Tabs>` + `<TabsList>` + `<TabsTrigger>` + `<TabsContent>` |
 | `<AccordionGroup>` | `<Accordion type="single" collapsible">` |
 | `<Accordion>` | `<AccordionItem>` + `<AccordionTrigger>` + `<AccordionContent>` |
 | `<Steps>` + `<Step>` | `<Steps>` + `<Step>` (compatible) |
 | `<Badge>` | `<Badge>` (compatible) |

 ## File Structure

 ### Old Structure (Mintlify)
 ```
 aqua-docs-mintlify/
 ├── index.mdx
 ├── quickstart.mdx
 ├── development.mdx
 ├── use_cases/
 ├── dev_tools/
 ├── schema_reference/
 └── previous_versions/
     ├── version_1/
     ├── version_2/
     ├── version_3/
     └── version_4/
 ```

 ### New Structure (v0-Documentation-Library)
 ```
 aqua-docs/
 ├── docs/
 │   ├── v1.0.0/           # Version 1 (deprecated)
 │   ├── v2.0.0/           # Version 2 (deprecated)
 │   ├── v3.0.0/           # Version 3 (stable)
 │   └── v4.0.0/           # Version 4 (beta - current)
 │       ├── index.mdx
 │       ├── getting-started/
 │       │   ├── _category_.json
 │       │   ├── quickstart.mdx
 │       │   └── development.mdx
 │       ├── use-cases/
 │       │   ├── _category_.json
 │       │   └── ...
 # Migration Guide: Mintlify to v0-Documentation-Library

This document describes the migration from Mintlify to the v0-documentation-library static site generator.

## Migration Summary

✅ **Completed:**
- Copied v0-documentation-library framework to aqua-docs
- Created version-based directory structure (docs/v1.0.0, v2.0.0, v3.0.0, v4.0.0)
- Migrated all 39 MDX files from Mintlify format
- Converted Mintlify components to v0-library components
- Created category metadata files (_category_.json)
- Created specra.config.json configuration
- Copied assets (images, logos, icons)
- Set up Next.js and PostCSS configuration

## Component Conversions

The following Mintlify components were automatically converted:

| Mintlify | v0-Library |
|----------|------------|
| `<Note>` | `<Callout type="info">` |
| `<Info>` | `<Callout type="info">` |
| `<Tip>` | `<Callout type="tip">` |
| `<Warning>` | `<Callout type="warning">` |
| `<CardGroup>` | `<CardGrid>` |
| `<Card>` | `<Card>` (mostly compatible) |
| `<Tabs>` + `<Tab>` | `<Tabs>` + `<TabsList>` + `<TabsTrigger>` + `<TabsContent>` |
| `<AccordionGroup>` | `<Accordion type="single" collapsible">` |
| `<Accordion>` | `<AccordionItem>` + `<AccordionTrigger>` + `<AccordionContent>` |
| `<Steps>` + `<Step>` | `<Steps>` + `<Step>` (compatible) |
| `<Badge>` | `<Badge>` (compatible) |

## File Structure

### Old Structure (Mintlify)
```
aqua-docs-mintlify/
├── index.mdx
├── quickstart.mdx
├── development.mdx
├── use_cases/
├── dev_tools/
├── schema_reference/
└── previous_versions/
     ├── version_1/
     ├── version_2/
     ├── version_3/
     └── version_4/
```

### New Structure (v0-Documentation-Library)
```
aqua-docs/
├── docs/
│   ├── v1.0.0/           # Version 1 (deprecated)
│   ├── v2.0.0/           # Version 2 (deprecated)
│   ├── v3.0.0/           # Version 3 (stable)
│   └── v4.0.0/           # Version 4 (beta - current)
│       ├── index.mdx
│       ├── getting-started/
│       │   ├── _category_.json
│       │   ├── quickstart.mdx
│       │   └── development.mdx
│       ├── use-cases/
│       │   ├── _category_.json
│       │   └── ...
│       ├── dev-tools/
│       │   ├── _category_.json
│       │   └── ...
│       └── schema-reference/
│           ├── _category_.json
│           ├── revision/
│           │   ├── _category_.json
│           │   └── ...
│           └── ...
├── app/
├── components/
├── lib/
├── public/
├── scripts/
├── specra.config.json
└── package.json
```

## Configuration Files

### specra.config.json
The main configuration file that replaces Mintlify's `docs.json`. Key sections:
- **site**: Basic site information
- **theme**: Theming and appearance
- **navigation**: Sidebar and navigation options
- **social**: Social media links
- **search**: MeiliSearch configuration
- **footer**: Footer content and links
- **banner**: Site-wide banner
- **features**: Feature flags (versioning, tags, etc.)
- **env**: Environment variables for use in docs

## Next Steps

1. **Free up disk space** (installation failed due to low disk space)
2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Generate redirects:**
    ```bash
    npm run generate:redirects
    ```

4. **Start development server:**
    ```bash
    npm run dev
    ```
    The site will be available at http://localhost:3000

5. **Review and test:**
    - Check that all pages render correctly
    - Verify component conversions
    - Test navigation and sidebar
    - Verify search functionality (requires MeiliSearch)
    - Test version switching

6. **Manual adjustments needed:**
    - Review converted Tabs components (complex nesting may need manual fixes)
    - Check Accordion components for proper structure
    - Verify all internal links work correctly
    - Update any hardcoded URLs in MDX files
    - Test all code examples and syntax highlighting

7. **Optional: Set up MeiliSearch for search:**
    ```bash
    # Install and run MeiliSearch
    # Update specra.config.json with your MeiliSearch host/key
    npm run index:search
    ```

8. **Build for production:**
    ```bash
    npm run build
    npm run start
    ```

## Clean Up

Once verified working, you can remove:
- Old Mintlify files: `index.mdx`, `quickstart.mdx`, etc. (root level)
- `docs.json` (Mintlify config)
- `essentials/` directory (Mintlify examples)
- `snippets/` directory (if using v0-library components instead)
- Old directories: `use_cases/`, `dev_tools/`, `schema_reference/`, `previous_versions/`

## Differences from Mintlify

### Pros of v0-Documentation-Library:
1. **Version-based routing**: Built-in support for multiple versions
2. **React components**: Full React/Next.js ecosystem
3. **Customizable**: More control over styling and behavior
4. **Self-hosted**: No dependency on Mintlify service
5. **Type-safe**: TypeScript support throughout

### Considerations:
1. **More setup required**: Need to manage Next.js, build process, etc.
2. **Search requires MeiliSearch**: Need to set up separate search service
3. **Deployment**: Need to handle your own hosting/CI-CD
4. **Component differences**: Some Mintlify components work differently

## Troubleshooting

### Pages not showing
- Check that MDX files have proper frontmatter
- Verify directory structure matches routing
- Check _category_.json files exist

### Components not rendering
- Verify component imports in mdx-components.tsx
- Check console for component errors
- Review converted component syntax

### Build errors
- Run `npm run lint` to check for errors
- Check TypeScript types
- Verify all imports are correct

### Search not working
- Ensure MeiliSearch is running
- Check specra.config.json has correct MeiliSearch settings
- Run `npm run index:search` to index documents

## Support

For issues specific to:
- **v0-documentation-library**: Check the v0-documentation-library repository
- **Aqua Protocol docs**: Contact the Aqua team
- **Migration**: Review this guide and the generated files

## Migration Script

The migration was performed using `scripts/migrate-mintlify.ts`, which:
1. Reads MDX files from aqua-docs-mintlify
2. Converts Mintlify components to v0-library components
3. Writes to the appropriate version directory in docs/
4. Maintains frontmatter and content structure

To re-run migration (if needed):
```bash
npx tsx scripts/migrate-mintlify.ts
```
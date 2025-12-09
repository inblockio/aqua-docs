# Aqua Protocol Documentation

Comprehensive documentation for the Aqua Protocol - a cryptographic protocol for creating verifiable, timestamped revision chains with signatures and blockchain anchoring.

## About Aqua Protocol

Aqua Protocol is a decentralized protocol for data integrity and provenance tracking. It enables users to:

- **Create Verifiable Trees**: Link revisions cryptographically to maintain audit trails
- **Sign Data**: Add cryptographic signatures for authentication and non-repudiation
- **Timestamp via Blockchain**: Anchor data to Ethereum, Nostr, or TSA for immutable timestamps
- **Link Dependencies**: Create relationships between separate revision chains
- **Verify Integrity**: Cryptographically verify entire chains of revisions

### Use Cases

- Document notarization and legal evidence
- Supply chain provenance tracking
- Multi-party approval workflows
- Verifiable credentials and identity
- Content versioning with accountability
- Audit trails and compliance

## Documentation Structure

This repository contains documentation for multiple version documetataion  of the Aqua Protocol:

```
aqua-docs/
├── introduction.mdx              # Getting started with Aqua Protocol
├── quick-start.mdx               # Quick start guide
├── schema_reference/             # Current version (v4) schema specs
│   ├── introduction.mdx
│   ├── object_revision.mdx
│   ├── template_revision.mdx
│   ├── signing_revision.mdx
│   ├── witness_revision.mdx
│   └── link_revision.mdx
├── previous_versions/
│   ├── version_1/                # Legacy version documentation
│   ├── version_2/                # Version 2 documentation
│   │   ├── introduction.mdx
│   │   ├── concepts.mdx
│   │   └── tooling.mdx
│   ├── version_3/                # Version 3 (JS SDK)
│   │   ├── introduction.mdx
│   │   ├── concepts.mdx
│   │   ├── tooling.mdx
│   │   └── schema.mdx
│   └── version_4/                # Version 4 (Current - Rust SDK)
│       └── introduction.mdx
└── docs.json                     # Documentation configuration
```

## Protocol Versions

### Version 4 (Current - Beta)
- **Language**: Rust with WASM support
- **SDK**: [aqua-rs-sdk](https://github.com/inblockio/aqua-rs-sdk)
- **Features**: Template system with JSON Schema, formal type system, cross-platform
- **Status**: Beta, recommended for new projects

### Version 3 (Stable)
- **Language**: JavaScript/TypeScript
- **SDK**: [aqua-js-sdk](https://github.com/inblockio/aqua-verifier-js-lib)
- **Features**: Multi-platform (Node.js, Web, React Native), comprehensive signing methods
- **Status**: Production-ready, mature implementation

### Version 2 & 1 (Legacy)
- Historical versions for reference
- Not recommended for new projects

## Local Development

### Prerequisites

- Node.js v20.9.0 or later
- npm or yarn

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd aqua-docs
   ```

2. **Install Mintlify CLI**

   The documentation is built with Mintlify for rendering. Install the CLI globally:
   ```bash
   npm install -g mint
   ```

3. **Start the development server**

   Run the following command in the root directory (where `docs.json` is located):
   ```bash
   mint dev
   ```

4. **View the documentation**

   Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

The documentation will auto-reload when you make changes to any `.mdx` files.

### Troubleshooting

**Dev environment not running:**
```bash
mint update
```

**Page loads as 404:**
- Ensure you're in a directory with a valid `docs.json`
- Check that the page is listed in `docs.json` navigation

**Changes not reflecting:**
- Restart the dev server
- Clear browser cache
- Check for syntax errors in your `.mdx` files

## Documentation Format

Documentation files use MDX (Markdown + JSX) with frontmatter:

```mdx
---
title: "Page Title"
description: "Brief description for SEO and navigation"
---

# Main Heading

Your content here with standard Markdown syntax.

## Subheading

- Lists
- Code blocks
- Tables
- And more
```

### Writing Guidelines

1. **Use Clear Titles**: Make titles descriptive and searchable
2. **Include Examples**: Provide code examples for all concepts
3. **Link Between Pages**: Use relative links to connect related content
4. **Maintain Consistency**: Follow the existing structure and style
5. **Version-Specific**: Keep version-specific content in the appropriate directory

## Project Structure

### Core Documentation

- **introduction.mdx**: Overview of Aqua Protocol
- **quick-start.mdx**: Quick start guide for new users
- **schema_reference/**: Detailed specifications for v4

### Version Archives

Each version has its own directory with:
- Introduction and getting started
- Core concepts
- SDK/tooling documentation
- Schema specifications

### Configuration

- **docs.json**: Navigation structure and site configuration
- **mint.json** (if present): Additional Mintlify settings

## Contributing

We welcome contributions to improve the Aqua Protocol documentation!

### How to Contribute

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b docs/improve-section-name
   ```
3. **Make your changes**
   - Follow the writing guidelines
   - Test locally with `mint dev`
   - Check for broken links
4. **Commit with clear messages**
   ```bash
   git commit -m "docs: improve explanation of witness revisions"
   ```
5. **Push and create a Pull Request**
   ```bash
   git push origin docs/improve-section-name
   ```

### What to Contribute

- **Fix errors**: Typos, incorrect information, broken links
- **Improve clarity**: Better explanations, more examples
- **Add examples**: Real-world use cases and code samples
- **Update for new versions**: Document new features and changes
- **Translate**: Help make docs accessible in other languages

### Style Guide

- Use present tense ("creates" not "created")
- Use active voice ("the SDK provides" not "is provided by the SDK")
- Keep paragraphs short (3-5 sentences)
- Use code blocks for all commands and code snippets
- Include both success and error examples
- Explain the "why" not just the "how"

## Building for Production

The documentation is automatically built and deployed when changes are pushed to the main branch (if CI/CD is configured).

For manual builds:
```bash
mint build
```

## Documentation Versions

When documenting a new protocol version:

1. Create a new directory: `previous_versions/version_X/`
2. Include these core files:
   - `introduction.mdx` - Version overview
   - `concepts.mdx` - Core concepts
   - `tooling.mdx` - SDK and tools
   - `schema.mdx` - Technical specifications
3. Update `docs.json` navigation
4. Link from main introduction page

## Resources

### Aqua Protocol
- **GitHub Organization**: [github.com/inblockio](https://github.com/inblockio)
- **Rust SDK**: [aqua-rs-sdk](https://github.com/inblockio/aqua-rs-sdk)
- **JS SDK**: [aqua-js-sdk](https://github.com/inblockio/aqua-verifier-js-lib)

### Documentation Tools
- **Mintlify Docs**: [mintlify.com/docs](https://mintlify.com/docs)
- **MDX Documentation**: [mdxjs.com](https://mdxjs.com)

## Support

### Getting Help

- **Issues**: Report documentation issues on GitHub
- **Discussions**: Join community discussions
- **SDK Issues**: Report SDK-specific issues in respective repositories

### Quick Links

- [Introduction to Aqua Protocol](/introduction)
- [Quick Start Guide](/quick-start)
- [Version 4 Schema Reference](/schema_reference/introduction)
- [Version 3 Documentation](/previous_versions/version_3/introduction)

## License

Documentation content is available under the terms specified in the LICENSE file.

The Aqua Protocol implementations are licensed separately - see their respective repositories for details.

## Changelog

### Recent Updates

- **2024-01**: Added comprehensive v3 documentation (JavaScript SDK)
- **2024-01**: Added v4 schema reference documentation (Rust SDK)
- **2024-01**: Restructured previous versions organization
- **2023-12**: Added v2 tooling documentation

See individual version documentation for version-specific changelogs.

---

**Note**: This is the documentation repository for Aqua Protocol. For protocol implementations, see the SDK repositories linked above.

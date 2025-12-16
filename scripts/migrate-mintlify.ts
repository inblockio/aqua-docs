import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Component conversion mappings
const convertMintlifyToV0 = (content: string): string => {
  let converted = content;

  // Convert Note/Info/Warning/Tip to Callout
  converted = converted.replace(/<Note>([\s\S]*?)<\/Note>/g, '<Callout type="info">$1</Callout>');
  converted = converted.replace(/<Info>([\s\S]*?)<\/Info>/g, '<Callout type="info">$1</Callout>');
  converted = converted.replace(/<Tip>([\s\S]*?)<\/Tip>/g, '<Callout type="tip">$1</Callout>');
  converted = converted.replace(/<Warning>([\s\S]*?)<\/Warning>/g, '<Callout type="warning">$1</Callout>');

  // Convert CardGroup to CardGrid
  converted = converted.replace(/<CardGroup(\s+[^>]*)>/g, (match, attrs) => {
    return `<CardGrid${attrs}>`;
  });
  converted = converted.replace(/<\/CardGroup>/g, '</CardGrid>');

  // Convert Card components - keep mostly the same but adjust attributes
  converted = converted.replace(/<Card\s+/g, '<Card ');

  // Convert Tabs and Tab to the new format
  // This is more complex - Mintlify uses <Tab title="..."> but v0 uses TabsList/TabsTrigger/TabsContent
  // For now, we'll keep the structure and add a comment for manual review
  const tabPattern = /<Tabs>([\s\S]*?)<\/Tabs>/g;
  converted = converted.replace(tabPattern, (match, content) => {
    const tabs = [];
    const tabContentPattern = /<Tab\s+title="([^"]+)">([\s\S]*?)<\/Tab>/g;
    let tabMatch;
    let index = 0;

    const tabIds: string[] = [];
    const tabContents: string[] = [];
    const tabTitles: string[] = [];

    while ((tabMatch = tabContentPattern.exec(content)) !== null) {
      const title = tabMatch[1];
      const tabContent = tabMatch[2];
      const id = title.toLowerCase().replace(/[^a-z0-9]/g, '-');

      tabIds.push(id);
      tabTitles.push(title);
      tabContents.push(tabContent);
    }

    if (tabIds.length === 0) return match;

    let result = `<Tabs defaultValue="${tabIds[0]}">\n  <TabsList>\n`;
    tabIds.forEach((id, i) => {
      result += `    <TabsTrigger value="${id}">${tabTitles[i]}</TabsTrigger>\n`;
    });
    result += `  </TabsList>\n`;

    tabIds.forEach((id, i) => {
      result += `  <TabsContent value="${id}">\n${tabContents[i]}\n  </TabsContent>\n`;
    });
    result += `</Tabs>`;

    return result;
  });

  // Convert Steps and Step - these might be similar
  // Keep Steps as is, might work

  // Convert AccordionGroup and Accordion
  converted = converted.replace(/<AccordionGroup>([\s\S]*?)<\/AccordionGroup>/g, (match, content) => {
    // Extract individual accordions
    const accordionPattern = /<Accordion\s+title="([^"]+)">([\s\S]*?)<\/Accordion>/g;
    let accordions = '';
    let accordionMatch;

    while ((accordionMatch = accordionPattern.exec(content)) !== null) {
      const title = accordionMatch[1];
      const accordionContent = accordionMatch[2];
      accordions += `  <AccordionItem value="item-${Math.random().toString(36).substr(2, 9)}">\n`;
      accordions += `    <AccordionTrigger>${title}</AccordionTrigger>\n`;
      accordions += `    <AccordionContent>\n${accordionContent}\n    </AccordionContent>\n`;
      accordions += `  </AccordionItem>\n`;
    }

    return `<Accordion type="single" collapsible>\n${accordions}</Accordion>`;
  });

  // Badge stays the same mostly

  return converted;
};

// File mapping based on docs.json structure
const fileMapping = [
  // v4.0.0 - current version (main content)
  { src: 'index.mdx', dest: 'docs/v4.0.0/index.mdx' },
  { src: 'quickstart.mdx', dest: 'docs/v4.0.0/getting-started/quickstart.mdx' },
  { src: 'development.mdx', dest: 'docs/v4.0.0/getting-started/development.mdx' },

  // Use Cases
  { src: 'use_cases/introduction.mdx', dest: 'docs/v4.0.0/use-cases/introduction.mdx' },
  { src: 'use_cases/supply_chain.mdx', dest: 'docs/v4.0.0/use-cases/supply-chain.mdx' },
  { src: 'use_cases/identity_attestation.mdx', dest: 'docs/v4.0.0/use-cases/identity-attestation.mdx' },
  { src: 'use_cases/document_verification.mdx', dest: 'docs/v4.0.0/use-cases/document-verification.mdx' },

  // Development Tools
  { src: 'dev_tools/aqua_sdk.mdx', dest: 'docs/v4.0.0/dev-tools/aqua-sdk.mdx' },
  { src: 'dev_tools/aquafier_api.mdx', dest: 'docs/v4.0.0/dev-tools/aquafier-api.mdx' },
  { src: 'dev_tools/aqua_cli.mdx', dest: 'docs/v4.0.0/dev-tools/aqua-cli.mdx' },

  // Schema Reference
  { src: 'schema_reference/introduction.mdx', dest: 'docs/v4.0.0/schema-reference/introduction.mdx' },
  { src: 'schema_reference/aqua_tree.mdx', dest: 'docs/v4.0.0/schema-reference/aqua-tree.mdx' },
  { src: 'schema_reference/file_index.mdx', dest: 'docs/v4.0.0/schema-reference/file-index.mdx' },
  { src: 'schema_reference/revision.mdx', dest: 'docs/v4.0.0/schema-reference/revision/revision.mdx' },
  { src: 'schema_reference/witness_revision.mdx', dest: 'docs/v4.0.0/schema-reference/revision/witness-revision.mdx' },
  { src: 'schema_reference/signing_revision.mdx', dest: 'docs/v4.0.0/schema-reference/revision/signing-revision.mdx' },
  { src: 'schema_reference/link_revision.mdx', dest: 'docs/v4.0.0/schema-reference/revision/link-revision.mdx' },
  { src: 'schema_reference/template_revision.mdx', dest: 'docs/v4.0.0/schema-reference/revision/template-revision.mdx' },
  { src: 'schema_reference/object_revision.mdx', dest: 'docs/v4.0.0/schema-reference/revision/object-revision.mdx' },

  // Previous versions
  { src: 'previous_versions/version_1/introduction.mdx', dest: 'docs/v1.0.0/introduction.mdx' },
  { src: 'previous_versions/version_1/concepts.mdx', dest: 'docs/v1.0.0/concepts.mdx' },
  { src: 'previous_versions/version_1/whitepaper.mdx', dest: 'docs/v1.0.0/whitepaper.mdx' },
  { src: 'previous_versions/version_1/idenity_protocol.mdx', dest: 'docs/v1.0.0/identity-protocol.mdx' },
  { src: 'previous_versions/version_1/name_resolution.mdx', dest: 'docs/v1.0.0/name-resolution.mdx' },
  { src: 'previous_versions/version_1/assurance_levels.mdx', dest: 'docs/v1.0.0/assurance-levels.mdx' },
  { src: 'previous_versions/version_1/data_accounting.mdx', dest: 'docs/v1.0.0/data-accounting.mdx' },
  { src: 'previous_versions/version_1/data_governance.mdx', dest: 'docs/v1.0.0/data-governance.mdx' },
  { src: 'previous_versions/version_1/delegated_witnessing.mdx', dest: 'docs/v1.0.0/delegated-witnessing.mdx' },
  { src: 'previous_versions/version_1/design_principles.mdx', dest: 'docs/v1.0.0/design-principles.mdx' },
  { src: 'previous_versions/version_1/guardian.mdx', dest: 'docs/v1.0.0/guardian.mdx' },
  { src: 'previous_versions/version_1/immutable_hyperlinks.mdx', dest: 'docs/v1.0.0/immutable-hyperlinks.mdx' },

  { src: 'previous_versions/version_2/introduction.mdx', dest: 'docs/v2.0.0/introduction.mdx' },
  { src: 'previous_versions/version_2/concepts.mdx', dest: 'docs/v2.0.0/concepts.mdx' },
  { src: 'previous_versions/version_2/tooling.mdx', dest: 'docs/v2.0.0/tooling.mdx' },

  { src: 'previous_versions/version_3/introduction.mdx', dest: 'docs/v3.0.0/introduction.mdx' },
  { src: 'previous_versions/version_3/concepts.mdx', dest: 'docs/v3.0.0/concepts.mdx' },
  { src: 'previous_versions/version_3/tooling.mdx', dest: 'docs/v3.0.0/tooling.mdx' },
  { src: 'previous_versions/version_3/schema.mdx', dest: 'docs/v3.0.0/schema.mdx' },

  { src: 'previous_versions/version_4/version_4.mdx', dest: 'docs/v4.0.0/version-info.mdx' },
];

async function migrateFiles() {
  const srcBase = 'C:\\Users\\ADMIN\\Desktop\\Development\\Typescript\\aqua-docs-mintlify';
  const destBase = 'C:\\Users\\ADMIN\\Desktop\\Development\\Typescript\\aqua-docs';

  let migrated = 0;
  let failed = 0;

  for (const mapping of fileMapping) {
    const srcPath = path.join(srcBase, mapping.src);
    const destPath = path.join(destBase, mapping.dest);

    try {
      // Check if source exists
      if (!fs.existsSync(srcPath)) {
        console.log(`⚠️  Source not found: ${mapping.src}`);
        continue;
      }

      // Read source file
      const content = fs.readFileSync(srcPath, 'utf-8');

      // Convert components
      const converted = convertMintlifyToV0(content);

      // Ensure destination directory exists
      const destDir = path.dirname(destPath);
      if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
      }

      // Write destination file
      fs.writeFileSync(destPath, converted, 'utf-8');

      console.log(`✓ Migrated: ${mapping.src} → ${mapping.dest}`);
      migrated++;
    } catch (error) {
      console.error(`✗ Failed to migrate ${mapping.src}:`, error);
      failed++;
    }
  }

  console.log(`\n📊 Migration Summary:`);
  console.log(`   ✓ Migrated: ${migrated} files`);
  console.log(`   ✗ Failed: ${failed} files`);
}

migrateFiles().catch(console.error);

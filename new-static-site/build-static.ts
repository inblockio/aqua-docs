import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import { glob } from 'glob';
import { compile } from '@mdx-js/mdx';
import remarkGfm from 'remark-gfm';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import { generateImprovedCSS } from './generate-better-css.js';
import { generateHTMLTemplate } from './generate-html-template.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const docsRoot = path.join(__dirname, '..');
const outputDir = path.join(__dirname, 'dist-static');

interface DocsConfig {
  name: string;
  colors: {
    primary: string;
    light: string;
    dark: string;
  };
  logo: {
    light: string;
    dark: string;
  };
  navigation: any;
}

async function buildStaticSite() {
  console.log('🚀 Starting static site generation...');

  // Clean output directory
  await fs.emptyDir(outputDir);

  // Read docs.json configuration
  const docsConfig: DocsConfig = await fs.readJson(path.join(docsRoot, 'docs.json'));

  // Find all MDX files
  const mdxFiles = await glob('**/*.mdx', {
    cwd: docsRoot,
    ignore: ['node_modules/**', 'static-site/**'],
  });

  console.log(`📄 Found ${mdxFiles.length} MDX files`);

  // Generate CSS file
  await generateCSS(docsConfig);

  // Process each MDX file
  for (const mdxFile of mdxFiles) {
    await processMDXFile(mdxFile, docsConfig);
  }

  // Copy assets
  await copyAssets();

  console.log('✅ Static site generation complete!');
  console.log(`📂 Output directory: ${outputDir}`);
}

async function generateCSS(docsConfig: DocsConfig) {
  console.log('🎨 Generating CSS...');

  const css = generateImprovedCSS(docsConfig);

  await fs.writeFile(path.join(outputDir, 'styles.css'), css);
  console.log('  ✅ CSS generated');
}

async function processMDXFile(mdxFile: string, docsConfig: DocsConfig) {
  const mdxPath = path.join(docsRoot, mdxFile);
  const mdxContent = await fs.readFile(mdxPath, 'utf-8');

  console.log(`📝 Processing: ${mdxFile}`);

  try {
    // Compile MDX to JSX
    const compiled = await compile(mdxContent, {
      remarkPlugins: [
        remarkGfm,
        remarkFrontmatter,
        [remarkMdxFrontmatter, { name: 'frontmatter' }],
      ],
      outputFormat: 'program',
      jsxImportSource: 'react',
    });

    // Generate HTML for this page
    const currentPath = mdxFile.replace(/\.mdx$/, '');
    const html = await generateHTMLPage(currentPath, docsConfig, mdxContent);

    // Determine output path
    const outputPath = path.join(
      outputDir,
      mdxFile.replace(/\.mdx$/, '.html')
    );

    // Ensure directory exists
    await fs.ensureDir(path.dirname(outputPath));

    // Write HTML file
    await fs.writeFile(outputPath, html);

    console.log(`  ✅ Generated: ${path.relative(outputDir, outputPath)}`);
  } catch (error) {
    console.error(`  ❌ Error processing ${mdxFile}:`, error);
  }
}

async function generateHTMLPage(currentPath: string, docsConfig: DocsConfig, mdxContent: string): Promise<string> {
  const title = currentPath
    .split('/')
    .pop()
    ?.replace(/_/g, ' ')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase()) || 'Home';

  // Remove frontmatter properly
  let content = mdxContent.replace(/^---[\s\S]*?---\n*/m, '');

  // Convert custom MDX components to HTML
  content = convertMDXComponentsToHTML(content);

  // Convert markdown to HTML
  content = convertMarkdownToHTML(content);

  return generateFullHTMLDocument(title, currentPath, docsConfig, content);
}

function convertMDXComponentsToHTML(content: string): string {
  // Convert <Note> components
  content = content.replace(/<Note>([\s\S]*?)<\/Note>/g, (_, inner) => {
    const iconSVG = `<svg class="callout-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`;
    return `<div class="callout callout-note">
      ${iconSVG}
      <div class="callout-content">${inner.trim()}</div>
    </div>`;
  });

  // Convert <Tip> components
  content = content.replace(/<Tip>([\s\S]*?)<\/Tip>/g, (_, inner) => {
    const iconSVG = `<svg class="callout-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>`;
    return `<div class="callout callout-tip">
      ${iconSVG}
      <div class="callout-content">${inner.trim()}</div>
    </div>`;
  });

  // Convert <Warning> components
  content = content.replace(/<Warning>([\s\S]*?)<\/Warning>/g, (_, inner) => {
    const iconSVG = `<svg class="callout-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>`;
    return `<div class="callout callout-warning">
      ${iconSVG}
      <div class="callout-content">${inner.trim()}</div>
    </div>`;
  });

  // Convert <Badge> components
  content = content.replace(/<Badge([^>]*)>([\s\S]*?)<\/Badge>/g, (_, props, inner) => {
    const colorMatch = props.match(/color="([^"]*)"/);
    const color = colorMatch ? colorMatch[1] : 'gray';
    const iconMatch = props.match(/icon="([^"]*)"/);

    let iconSVG = '';
    if (iconMatch && iconMatch[1] === 'circle-check') {
      iconSVG = `<svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`;
    }

    const badgeClass = color === 'green' ? 'badge-green' :
                      color === 'blue' ? 'badge-blue' :
                      'badge-gray';

    return `<span class="badge ${badgeClass}">${iconSVG}${inner.trim()}</span>`;
  });

  // Convert <Card> components
  content = content.replace(/<Card([^>]*)>([\s\S]*?)<\/Card>/g, (_, props, inner) => {
    const titleMatch = props.match(/title="([^"]*)"/);
    const hrefMatch = props.match(/href="([^"]*)"/);
    const title = titleMatch ? titleMatch[1] : '';
    let href = hrefMatch ? hrefMatch[1] : '';

    // Convert .mdx links to .html
    if (href && href.endsWith('.mdx')) {
      href = href.replace('.mdx', '.html');
    } else if (href && !href.startsWith('http') && !href.startsWith('#')) {
      href = href + '.html';
    }

    const tag = href ? 'a' : 'div';
    const hrefAttr = href ? `href="${href}"` : '';

    return `<${tag} ${hrefAttr} class="card">
      <h3 class="card-title">${title}</h3>
      <p class="card-description">${inner.trim()}</p>
    </${tag}>`;
  });

  // Convert <CardGroup> components
  content = content.replace(/<CardGroup([^>]*)>([\s\S]*?)<\/CardGroup>/g, (_, props, inner) => {
    const colsMatch = props.match(/cols=\{?(\d+)\}?/);
    const cols = colsMatch ? colsMatch[1] : '2';

    return `<div class="card-grid card-grid-${cols}">${inner}</div>`;
  });

  return content;
}

function convertMarkdownToHTML(content: string): string {
  // Split content into code blocks and regular content
  const parts: Array<{type: 'code' | 'text', content: string}> = [];
  const codeBlockRegex = /```(\w*)\n([\s\S]*?)```/g;
  let lastIndex = 0;
  let match;

  while ((match = codeBlockRegex.exec(content)) !== null) {
    // Add text before code block
    if (match.index > lastIndex) {
      parts.push({
        type: 'text',
        content: content.substring(lastIndex, match.index)
      });
    }

    // Add code block
    const lang = match[1] || '';
    const code = match[2].trim();
    parts.push({
      type: 'code',
      content: `<pre class="p-4 rounded-lg bg-gray-900 overflow-x-auto my-6"><code class="text-gray-100">${escapeHtml(code)}</code></pre>`
    });

    lastIndex = match.index + match[0].length;
  }

  // Add remaining text
  if (lastIndex < content.length) {
    parts.push({
      type: 'text',
      content: content.substring(lastIndex)
    });
  }

  // Process text parts only
  const processedParts = parts.map(part => {
    if (part.type === 'code') {
      return part.content;
    }

    let text = part.content;

    // Convert headings with IDs
    text = text.replace(/^# (.*$)/gm, (_, heading) => {
      return `<h1>${heading}</h1>`;
    });
    text = text.replace(/^## (.*$)/gm, (_, heading) => {
      const id = heading.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      return `<h2 id="${id}">${heading}</h2>`;
    });
    text = text.replace(/^### (.*$)/gm, (_, heading) => {
      const id = heading.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      return `<h3 id="${id}">${heading}</h3>`;
    });

    // Convert bold and italic (before inline code to avoid conflicts)
    text = text.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
    text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    text = text.replace(/\*(.+?)\*/g, '<em>$1</em>');

    // Convert inline code
    text = text.replace(/`([^`]+)`/g, '<code class="bg-gray-100 dark:bg-gray-800 rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold text-gray-900 dark:text-gray-200">$1</code>');

    // Convert links - handle .mdx links
    text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, linkText, url) => {
      let finalUrl = url;
      if (url.endsWith('.mdx')) {
        finalUrl = url.replace('.mdx', '.html');
      } else if (!url.startsWith('http') && !url.startsWith('#') && !url.endsWith('.html')) {
        finalUrl = url + '.html';
      }
      return `<a href="${finalUrl}" class="font-medium text-primary hover:underline">${linkText}</a>`;
    });

    // Convert lists
    text = text.replace(/^- (.+)$/gm, '<li>$1</li>');
    text = text.replace(/(<li>.*<\/li>\n?)+/g, '<ul class="my-6 ml-6 list-disc [&>li]:mt-2 text-gray-700 dark:text-gray-300">$&</ul>');

    text = text.replace(/^\d+\. (.+)$/gm, '<li>$1</li>');
    text = text.replace(/(<li>.*<\/li>\n?)+/g, '<ol class="my-6 ml-6 list-decimal [&>li]:mt-2 text-gray-700 dark:text-gray-300">$&</ol>');

    // Convert paragraphs (split by double newlines)
    const paragraphs = text.split(/\n\n+/).map(p => p.trim()).filter(p => p.length > 0);
    text = paragraphs.map(p => {
      // Don't wrap if it's already an HTML element
      if (p.startsWith('<h') || p.startsWith('<div') || p.startsWith('<ul') || p.startsWith('<ol') || p.startsWith('<pre') || p.startsWith('<a ')) {
        return p;
      }
      // Remove single newlines within paragraphs
      p = p.replace(/\n/g, ' ');
      return `<p class="leading-7 text-gray-700 dark:text-gray-300 mb-4">${p}</p>`;
    }).join('\n');

    return text;
  });

  return processedParts.join('\n');
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

function generateFullHTMLDocument(title: string, currentPath: string, docsConfig: DocsConfig, content: string): string {
  // Generate navigation HTML
  const navHTML = generateNavigationHTML(docsConfig, currentPath);

  // Use the new HTML template generator
  return generateHTMLTemplate(title, currentPath, docsConfig, content, navHTML);
}

// Keep the old template for reference if needed
function generateFullHTMLDocumentOld(title: string, currentPath: string, docsConfig: DocsConfig, content: string): string {
  // Generate navigation HTML
  const navHTML = generateNavigationHTML(docsConfig, currentPath);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} - ${docsConfig.name}</title>
  <link rel="stylesheet" href="/styles.css">
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
      background-color: #ffffff;
    }
  </style>
</head>
<body>
  <div class="min-h-screen bg-white dark:bg-gray-950 flex flex-col md:flex-row">
    <!-- Mobile Header -->
    <div class="md:hidden flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 sticky top-0 z-20">
      <div class="flex items-center gap-2 font-bold text-lg text-gray-900 dark:text-white">
        <img src="${docsConfig.logo.dark}" class="h-8" alt="Logo" />
        ${docsConfig.name}
      </div>
      <button id="mobile-menu-toggle" class="p-2 text-gray-600">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>
    </div>

    <!-- Sidebar -->
    <aside id="sidebar" class="fixed inset-y-0 left-0 z-10 w-64 bg-gray-50/50 dark:bg-gray-900/50 border-r border-gray-200 dark:border-gray-800 backdrop-blur-xl transform -translate-x-full md:translate-x-0 transition-transform duration-200 ease-in-out md:static md:h-screen md:sticky md:top-0 overflow-y-auto">
      <div class="p-6">
        <div class="hidden md:flex items-center gap-2 font-bold text-lg text-gray-900 dark:text-white mb-8">
          <img src="${docsConfig.logo.dark}" class="h-8" alt="Logo" />
          <span class="text-sm">${docsConfig.name}</span>
        </div>

        <div class="relative mb-6">
          <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
          <input
            type="text"
            placeholder="Search..."
            class="w-full pl-9 pr-4 py-1.5 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        <nav>
          ${navHTML}
        </nav>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 min-w-0 px-4 py-8 md:px-12 md:py-12 max-w-5xl mx-auto w-full">
      <div class="prose prose-slate dark:prose-invert max-w-none">
        ${content}
      </div>
    </main>
  </div>

  <script>
    // Mobile menu toggle
    const toggle = document.getElementById('mobile-menu-toggle');
    const sidebar = document.getElementById('sidebar');

    if (toggle && sidebar) {
      toggle.addEventListener('click', () => {
        sidebar.classList.toggle('-translate-x-full');
        sidebar.classList.toggle('translate-x-0');
      });

      // Close sidebar when clicking outside on mobile
      document.addEventListener('click', (e) => {
        if (window.innerWidth < 768) {
          if (!sidebar.contains(e.target) && !toggle.contains(e.target)) {
            sidebar.classList.add('-translate-x-full');
            sidebar.classList.remove('translate-x-0');
          }
        }
      });
    }
  </script>
</body>
</html>`;
}

function generateNavigationHTML(docsConfig: DocsConfig, currentPath: string): string {
  let html = '';

  for (const tab of docsConfig.navigation.tabs) {
    html += '<div class="sidebar-section">';

    if (docsConfig.navigation.tabs.length > 1) {
      html += `<div class="sidebar-section-title">${tab.tab}</div>`;
    }

    for (const group of tab.groups) {
      html += generateGroupHTML(group, currentPath);
    }

    html += '</div>';
  }

  return html;
}

function generateGroupHTML(group: any, currentPath: string, nested = false): string {
  let html = '';

  // Check if this group has any nested groups
  const hasNestedGroups = group.pages.some((page: any) => typeof page !== 'string');

  if (!nested && hasNestedGroups) {
    // Collapsible group with toggle
    const chevronIcon = `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>`;
    html += `<button class="sidebar-group-toggle">${group.group}${chevronIcon}</button>`;
    html += '<div class="sidebar-group-content">';
  } else if (!nested) {
    // Non-collapsible group
    html += `<div class="sidebar-group-title">${group.group}</div>`;
  }

  for (const page of group.pages) {
    if (typeof page === 'string') {
      const path = page.replace('.mdx', '');
      const href = path === 'index' ? '/index.html' : `/${path}.html`;
      const isActive = currentPath === path;
      const label = path
        .split('/')
        .pop()
        ?.replace(/_/g, ' ')
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase()) || path;

      const activeClass = isActive ? 'sidebar-link active' : 'sidebar-link';

      html += `<a href="${href}" class="${activeClass}">${label}</a>`;
    } else {
      // Nested group - also collapsible
      const chevronIcon = `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>`;
      html += '<div class="sidebar-nested">';
      html += `<button class="sidebar-group-toggle">${page.group}${chevronIcon}</button>`;
      html += '<div class="sidebar-group-content">';
      html += generateGroupHTML(page, currentPath, true);
      html += '</div>';
      html += '</div>';
    }
  }

  if (!nested && hasNestedGroups) {
    html += '</div>'; // Close sidebar-group-content
  }

  return html;
}

async function copyAssets() {
  console.log('📦 Copying assets...');

  // Copy public directory assets
  const publicDir = path.join(__dirname, 'public');
  if (await fs.pathExists(publicDir)) {
    await fs.copy(publicDir, outputDir, { overwrite: true });
    console.log('  ✅ Copied public directory');
  }

  // Copy images from parent directory if they exist
  const imagesDir = path.join(docsRoot, 'images');
  if (await fs.pathExists(imagesDir)) {
    await fs.copy(imagesDir, path.join(outputDir, 'images'), { overwrite: true });
    console.log('  ✅ Copied images directory');
  }

  // Copy logo from parent directory
  const logoDir = path.join(docsRoot, 'logo');
  if (await fs.pathExists(logoDir)) {
    await fs.copy(logoDir, path.join(outputDir, 'logo'), { overwrite: true });
    console.log('  ✅ Copied logo directory');
  }
}

// Run the build
buildStaticSite().catch(console.error);

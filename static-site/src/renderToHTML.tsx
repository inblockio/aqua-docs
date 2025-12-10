import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { MDXProvider } from '@mdx-js/react';
import StaticLayout from './components/StaticLayout';
import StaticMDXComponents from './components/StaticMDXComponents';
import * as runtime from 'react/jsx-runtime';

interface RenderOptions {
  mdxCode: string;
  currentPath: string;
  docsConfig: any;
}

export async function renderMDXToHTML({ mdxCode, currentPath, docsConfig }: RenderOptions): Promise<string> {
  try {
    // Create a function from the MDX code
    const { default: MDXContent } = await evaluateMDX(mdxCode);

    // Render the MDX content with layout
    const element = React.createElement(
      StaticLayout,
      { docsConfig, currentPath },
      React.createElement(
        MDXProvider,
        { components: StaticMDXComponents },
        React.createElement(MDXContent)
      )
    );

    // Render to static HTML
    const html = ReactDOMServer.renderToStaticMarkup(element);

    return html;
  } catch (error) {
    console.error('Error rendering MDX:', error);
    throw error;
  }
}

async function evaluateMDX(mdxCode: string): Promise<any> {
  // Evaluate the MDX function body
  // The compiled MDX is a function body that expects certain imports

  const func = new Function(
    '_jsx',
    '_jsxs',
    '_Fragment',
    'React',
    mdxCode
  );

  // Execute the function with the necessary imports
  const result = func(
    runtime.jsx,
    runtime.jsxs,
    runtime.Fragment,
    React
  );

  return result;
}

export function generateHTMLDocument(bodyHTML: string, pageTitle: string, docsConfig: any): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${pageTitle} - ${docsConfig.name}</title>
  <link rel="stylesheet" href="/styles.css">
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
      background-color: #ffffff;
    }
    svg {
      display: inline-block;
      vertical-align: middle;
    }
  </style>
</head>
<body>
  ${bodyHTML}
  <script>
    // Mobile menu toggle
    const toggle = document.getElementById('mobile-menu-toggle');
    const sidebar = document.getElementById('sidebar');

    if (toggle && sidebar) {
      toggle.addEventListener('click', () => {
        const isOpen = sidebar.classList.contains('-translate-x-full');
        if (isOpen) {
          sidebar.classList.remove('-translate-x-full');
          sidebar.classList.add('translate-x-0');
        } else {
          sidebar.classList.remove('translate-x-0');
          sidebar.classList.add('-translate-x-full');
        }
      });

      // Close sidebar when clicking outside on mobile
      document.addEventListener('click', (e) => {
        if (window.innerWidth < 768) {
          const target = e.target;
          if (!sidebar.contains(target) && !toggle.contains(target)) {
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

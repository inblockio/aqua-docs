import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'AQUA Protocol',
  tagline: 'Account & Verify data in seconds using Aqua Protocol.',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://aqua-protocol.org/',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'inblockio', // Usually your GitHub org/user name.
  projectName: 'AQUA PKC', // Usually your repo name.

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/inblockio',
          versions: {
           '1.1.0': {
              label: 'v1',
              path: 'v1',
              banner: 'none',
            },
            '1.2.0': {
              label: 'v2',
              path: 'v2',
              banner: 'none',
            },
            '1.3.2': {
              label: 'v3',
              path: 'v3',
              banner: 'none',
            },
          }
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/inblockio',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: '/featured-background.png',
    navbar: {
      title: 'Aqua Protocol',
      logo: {
        alt: 'Aqua Protocol',
        src: '/favicons/android-192x192.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'right',
          label: 'Documentation',
          href: "/docs/v3/intro"
        },
        {
          href: '/community',
          label: 'Community',
          position: 'right',
        },
        {
          href: 'https://github.com/inblockio',
          label: 'GitHub',
          position: 'right',
        },
        {
          type: 'docsVersionDropdown',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {
              label: 'Docs',
              to: '/docs/v3/intro',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            //{
            //  label: 'Matrix',
            //  href: 'https://matrix.org',
            //},
            {
              label: 'X',
              href: 'https://github.com/inblockio',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/inblockio',
            },
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} AQUA Protocol. All right reserved.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;

import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/__docusaurus/debug',
    component: ComponentCreator('/__docusaurus/debug', '5ff'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/config',
    component: ComponentCreator('/__docusaurus/debug/config', '5ba'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/content',
    component: ComponentCreator('/__docusaurus/debug/content', 'a2b'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/globalData',
    component: ComponentCreator('/__docusaurus/debug/globalData', 'c3c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/metadata',
    component: ComponentCreator('/__docusaurus/debug/metadata', '156'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/registry',
    component: ComponentCreator('/__docusaurus/debug/registry', '88c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/routes',
    component: ComponentCreator('/__docusaurus/debug/routes', '000'),
    exact: true
  },
  {
    path: '/blog',
    component: ComponentCreator('/blog', 'b2f'),
    exact: true
  },
  {
    path: '/blog/archive',
    component: ComponentCreator('/blog/archive', '182'),
    exact: true
  },
  {
    path: '/blog/authors',
    component: ComponentCreator('/blog/authors', '0b7'),
    exact: true
  },
  {
    path: '/blog/authors/all-sebastien-lorber-articles',
    component: ComponentCreator('/blog/authors/all-sebastien-lorber-articles', '4a1'),
    exact: true
  },
  {
    path: '/blog/authors/yangshun',
    component: ComponentCreator('/blog/authors/yangshun', 'a68'),
    exact: true
  },
  {
    path: '/blog/first-blog-post',
    component: ComponentCreator('/blog/first-blog-post', '89a'),
    exact: true
  },
  {
    path: '/blog/long-blog-post',
    component: ComponentCreator('/blog/long-blog-post', '9ad'),
    exact: true
  },
  {
    path: '/blog/mdx-blog-post',
    component: ComponentCreator('/blog/mdx-blog-post', 'e9f'),
    exact: true
  },
  {
    path: '/blog/tags',
    component: ComponentCreator('/blog/tags', '287'),
    exact: true
  },
  {
    path: '/blog/tags/docusaurus',
    component: ComponentCreator('/blog/tags/docusaurus', '704'),
    exact: true
  },
  {
    path: '/blog/tags/facebook',
    component: ComponentCreator('/blog/tags/facebook', '858'),
    exact: true
  },
  {
    path: '/blog/tags/hello',
    component: ComponentCreator('/blog/tags/hello', '299'),
    exact: true
  },
  {
    path: '/blog/tags/hola',
    component: ComponentCreator('/blog/tags/hola', '00d'),
    exact: true
  },
  {
    path: '/blog/welcome',
    component: ComponentCreator('/blog/welcome', 'd2b'),
    exact: true
  },
  {
    path: '/docs',
    component: ComponentCreator('/docs', '7a9'),
    routes: [
      {
        path: '/docs/v1',
        component: ComponentCreator('/docs/v1', '49c'),
        routes: [
          {
            path: '/docs/v1',
            component: ComponentCreator('/docs/v1', '253'),
            routes: [
              {
                path: '/docs/v1/intro',
                component: ComponentCreator('/docs/v1/intro', '5ea'),
                exact: true
              }
            ]
          }
        ]
      },
      {
        path: '/docs/v2',
        component: ComponentCreator('/docs/v2', 'ff0'),
        routes: [
          {
            path: '/docs/v2',
            component: ComponentCreator('/docs/v2', 'f90'),
            routes: [
              {
                path: '/docs/v2/Components/containers/aquafier',
                component: ComponentCreator('/docs/v2/Components/containers/aquafier', 'ab9'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/v2/Components/containers/media-wiki',
                component: ComponentCreator('/docs/v2/Components/containers/media-wiki', 'c0f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/v2/Components/guardian',
                component: ComponentCreator('/docs/v2/Components/guardian', 'c59'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/v2/Components/intro',
                component: ComponentCreator('/docs/v2/Components/intro', 'a55'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/v2/Components/verifier/',
                component: ComponentCreator('/docs/v2/Components/verifier/', 'c54'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/v2/Components/verifier/aqua-cli-javascript',
                component: ComponentCreator('/docs/v2/Components/verifier/aqua-cli-javascript', 'a2a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/v2/Components/verifier/aqua-cli-rust',
                component: ComponentCreator('/docs/v2/Components/verifier/aqua-cli-rust', '0ac'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/v2/Components/verifier/webextension',
                component: ComponentCreator('/docs/v2/Components/verifier/webextension', '36f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/v2/contribution-guidelines',
                component: ComponentCreator('/docs/v2/contribution-guidelines', 'a7d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/v2/getting-started',
                component: ComponentCreator('/docs/v2/getting-started', '192'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/v2/prologue',
                component: ComponentCreator('/docs/v2/prologue', 'd96'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/v2/references',
                component: ComponentCreator('/docs/v2/references', '241'),
                exact: true,
                sidebar: "tutorialSidebar"
              }
            ]
          }
        ]
      },
      {
        path: '/docs',
        component: ComponentCreator('/docs', 'cc4'),
        routes: [
          {
            path: '/docs',
            component: ComponentCreator('/docs', 'd49'),
            routes: [
              {
                path: '/docs/contribution-guidelines',
                component: ComponentCreator('/docs/contribution-guidelines', '2a1'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/implementations/reference-architecture',
                component: ComponentCreator('/docs/implementations/reference-architecture', '81f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/intro',
                component: ComponentCreator('/docs/intro', '61d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/protocol/aqua_protocol_v1_2',
                component: ComponentCreator('/docs/protocol/aqua_protocol_v1_2', '538'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/protocol/aqua-identity-protocol',
                component: ComponentCreator('/docs/protocol/aqua-identity-protocol', '8fd'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/protocol/aqua-name-resolution',
                component: ComponentCreator('/docs/protocol/aqua-name-resolution', '409'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/protocol/aqua-protocol-version_1.3',
                component: ComponentCreator('/docs/protocol/aqua-protocol-version_1.3', 'b06'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/protocol/assurance-levels-aal',
                component: ComponentCreator('/docs/protocol/assurance-levels-aal', '9b6'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/protocol/data-accounting',
                component: ComponentCreator('/docs/protocol/data-accounting', '619'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/protocol/data-governance',
                component: ComponentCreator('/docs/protocol/data-governance', '039'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/protocol/delegated-witnessing',
                component: ComponentCreator('/docs/protocol/delegated-witnessing', 'dd1'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/protocol/design-principles',
                component: ComponentCreator('/docs/protocol/design-principles', 'e3e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/protocol/guardian',
                component: ComponentCreator('/docs/protocol/guardian', 'b7a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/protocol/immutable-hyperlinks',
                component: ComponentCreator('/docs/protocol/immutable-hyperlinks', 'bc9'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/protocol/whitepaper',
                component: ComponentCreator('/docs/protocol/whitepaper', '07b'),
                exact: true,
                sidebar: "tutorialSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/',
    component: ComponentCreator('/', 'e5f'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];

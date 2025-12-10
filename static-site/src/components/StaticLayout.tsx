import React from 'react';
import { Menu, X, ChevronRight, Search } from 'lucide-react';
import clsx from 'clsx';

// Type definitions for docs.json structure
type DocPage = string | { group: string; pages: DocPage[] };
type NavGroup = { group: string; pages: DocPage[] };
type Tab = { tab: string; groups: NavGroup[] };

interface StaticLayoutProps {
  children: React.ReactNode;
  docsConfig: any;
  currentPath: string;
}

const SidebarItem = ({ page, currentPath }: { page: string; currentPath: string }) => {
  // Clean up path: remove .mdx if present, ensure leading slash
  const path = page.replace('.mdx', '');
  const href = path === 'index' ? '/index.html' : `/${path}.html`;
  const isActive = currentPath === path || (currentPath === 'index' && path === 'index');

  const label = path.split('/').pop()?.replace(/_/g, ' ').replace(/-/g, ' ') || path;

  // Format label: Capitalize first letter of each word
  const formattedLabel = label.replace(/\b\w/g, c => c.toUpperCase());

  return (
    <a
      href={href}
      className={clsx(
        "block px-3 py-1.5 text-sm rounded-md transition-colors",
        isActive
          ? "bg-primary/10 text-primary font-medium"
          : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100"
      )}
    >
      {formattedLabel}
    </a>
  );
};

const SidebarGroup = ({ group, pages, currentPath }: { group: string; pages: DocPage[]; currentPath: string }) => {
  return (
    <div className="mb-6">
      <h3 className="px-3 mb-2 text-xs font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wider">
        {group}
      </h3>
      <div className="space-y-0.5">
        {pages.map((page, idx) => {
          if (typeof page === 'string') {
            return <SidebarItem key={idx} page={page} currentPath={currentPath} />;
          } else {
            // Nested group
            return (
              <div key={idx} className="ml-3 mt-2 border-l border-gray-200 dark:border-gray-800 pl-3">
                <SidebarGroup group={page.group} pages={page.pages} currentPath={currentPath} />
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default function StaticLayout({ children, docsConfig, currentPath }: StaticLayoutProps) {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 sticky top-0 z-20">
        <div className="flex items-center gap-2 font-bold text-lg text-gray-900 dark:text-white">
           <img src={docsConfig.logo.dark} className="h-8" alt="Logo" />
           {docsConfig.name}
        </div>
        <button id="mobile-menu-toggle" className="p-2 text-gray-600">
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Sidebar */}
      <aside id="sidebar" className="fixed inset-y-0 left-0 z-10 w-64 bg-gray-50/50 dark:bg-gray-900/50 border-r border-gray-200 dark:border-gray-800 backdrop-blur-xl transform transition-transform duration-200 ease-in-out -translate-x-full md:translate-x-0 md:static md:h-screen md:sticky md:top-0 overflow-y-auto">
        <div className="p-6">
          <div className="hidden md:flex items-center gap-2 font-bold text-lg text-gray-900 dark:text-white mb-8">
             {/* Use absolute path for logo since it's in public or parent */}
             <img src={docsConfig.logo.dark} className="h-8" alt="Logo" />
             <span className="text-sm">{docsConfig.name}</span>
          </div>

          <div className="relative mb-6">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
             <input
               type="text"
               placeholder="Search..."
               className="w-full pl-9 pr-4 py-1.5 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
             />
          </div>

          <nav>
            {docsConfig.navigation.tabs.map((tab: Tab, tabIdx: number) => (
               <div key={tabIdx} className="mb-8">
                 {docsConfig.navigation.tabs.length > 1 && (
                   <h4 className="px-3 mb-4 text-sm font-bold text-primary">{tab.tab}</h4>
                 )}
                 {tab.groups.map((group: NavGroup, grpIdx: number) => (
                    <SidebarGroup key={grpIdx} group={group.group} pages={group.pages} currentPath={currentPath} />
                 ))}
               </div>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 px-4 py-8 md:px-12 md:py-12 max-w-5xl mx-auto w-full">
        <div className="prose prose-slate dark:prose-invert max-w-none">
          {children}
        </div>
      </main>
    </div>
  );
}

export function generateImprovedCSS(docsConfig: any): string {
  return `
/* Reset and Base Styles */
*, ::before, ::after {
  box-sizing: border-box;
  border-width: 0;
  border-style: solid;
  border-color: #e5e7eb;
}

html {
  line-height: 1.6;
  -webkit-text-size-adjust: 100%;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Helvetica Neue', sans-serif;
  scroll-behavior: smooth;
  font-size: 16px;
}

body {
  margin: 0;
  line-height: inherit;
  background-color: #fafafa;
  color: #1f2937;
}

/* CSS Variables */
:root {
  --color-primary: ${docsConfig.colors.primary};
  --color-light: ${docsConfig.colors.light};
  --color-dark: ${docsConfig.colors.dark};
  --sidebar-width: 280px;
  --navbar-height: 64px;
  --toc-width: 240px;
}

/* Top Navigation Bar */
.top-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--navbar-height);
  background: white;
  border-bottom: 1px solid #e5e7eb;
  z-index: 50;
  display: flex;
  align-items: center;
  padding: 0 1.5rem;
  justify-content: space-between;
}

.top-nav-left {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.top-nav-logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  font-size: 1.125rem;
  color: #111827;
}

.top-nav-logo img {
  height: 32px;
  width: auto;
}

.top-nav-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.top-nav-search {
  position: relative;
  width: 400px;
}

.top-nav-search input {
  width: 100%;
  padding: 0.5rem 0.75rem 0.5rem 2.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  background: #f9fafb;
}

.top-nav-search input:focus {
  outline: none;
  border-color: var(--color-primary);
  background: white;
}

.search-icon {
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
}

.top-nav-button {
  padding: 0.5rem 1rem;
  background: var(--color-primary);
  color: white;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  transition: opacity 0.2s;
}

.top-nav-button:hover {
  opacity: 0.9;
}

.top-nav-link {
  color: #6b7280;
  font-size: 0.875rem;
  transition: color 0.2s;
}

.top-nav-link:hover {
  color: #111827;
}

/* Main Layout */
.main-container {
  display: flex;
  min-height: 100vh;
  padding-top: var(--navbar-height);
}

/* Sidebar */
.sidebar {
  position: fixed;
  left: 0;
  top: var(--navbar-height);
  bottom: 0;
  width: var(--sidebar-width);
  background: white;
  border-right: 1px solid #e5e7eb;
  overflow-y: auto;
  z-index: 40;
}

.sidebar-content {
  padding: 1.5rem;
}

/* Sidebar Tabs */
.sidebar-tabs {
  display: flex;
  gap: 0.5rem;
  padding: 1rem 1.5rem 0;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 1rem;
}

.sidebar-tab {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #6b7280;
  border-bottom: 2px solid transparent;
  cursor: pointer;
  transition: all 0.2s;
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  margin-bottom: -1px;
}

.sidebar-tab:hover {
  color: #111827;
}

.sidebar-tab.active {
  color: var(--color-primary);
  border-bottom-color: var(--color-primary);
}

.sidebar::-webkit-scrollbar {
  width: 6px;
}

.sidebar::-webkit-scrollbar-track {
  background: transparent;
}

.sidebar::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 3px;
}

.sidebar::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}

.sidebar-section {
  margin-bottom: 2rem;
}

.sidebar-section-title {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-primary);
  margin-bottom: 0.75rem;
  padding: 0 0.75rem;
}

.sidebar-group-title {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #6b7280;
  margin-bottom: 0.5rem;
  margin-top: 1rem;
  padding: 0 0.75rem;
}

.sidebar-group-toggle {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #6b7280;
  margin-bottom: 0.5rem;
  margin-top: 1rem;
  padding: 0.5rem 0.75rem;
  cursor: pointer;
  border-radius: 0.375rem;
  transition: background-color 0.15s;
  background: none;
  border: none;
  width: 100%;
  text-align: left;
}

.sidebar-group-toggle:hover {
  background: #f3f4f6;
}

.sidebar-group-toggle svg {
  width: 16px;
  height: 16px;
  transition: transform 0.2s;
}

.sidebar-group-toggle.collapsed svg {
  transform: rotate(-90deg);
}

.sidebar-group-content {
  max-height: 2000px;
  overflow: hidden;
  transition: max-height 0.3s ease-out;
}

.sidebar-group-content.collapsed {
  max-height: 0;
}

.sidebar-link {
  display: flex;
  align-items: center;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  color: #4b5563;
  border-radius: 0.375rem;
  transition: all 0.15s;
  margin-bottom: 0.125rem;
}

.sidebar-link:hover {
  background: #f3f4f6;
  color: #111827;
}

.sidebar-link.active {
  background: #eff6ff;
  color: var(--color-primary);
  font-weight: 500;
}

.sidebar-nested {
  margin-left: 0.75rem;
  padding-left: 0.75rem;
  border-left: 1px solid #e5e7eb;
  margin-top: 0.25rem;
}

/* Main Content Area */
.content-wrapper {
  flex: 1;
  margin-left: var(--sidebar-width);
  display: flex;
  justify-content: center;
}

.content-container {
  max-width: 900px;
  width: 100%;
  padding: 2rem 3rem;
}

/* Table of Contents (Right Sidebar) */
.toc-wrapper {
  width: var(--toc-width);
  padding: 2rem 1.5rem;
}

.toc {
  position: sticky;
  top: calc(var(--navbar-height) + 2rem);
}

.toc-title {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #6b7280;
  margin-bottom: 1rem;
}

.toc-link {
  display: block;
  font-size: 0.8125rem;
  color: #6b7280;
  padding: 0.25rem 0;
  transition: color 0.15s;
  line-height: 1.5;
}

.toc-link:hover {
  color: var(--color-primary);
}

.toc-link.active {
  color: var(--color-primary);
  font-weight: 500;
}

/* Breadcrumbs */
.breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 1.5rem;
}

.breadcrumb-separator {
  color: #d1d5db;
}

/* Typography */
.content h1 {
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.2;
  color: #111827;
  margin: 0 0 1.5rem 0;
  letter-spacing: -0.025em;
}

.content h2 {
  font-size: 1.875rem;
  font-weight: 600;
  line-height: 1.3;
  color: #111827;
  margin: 3rem 0 1.25rem 0;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #e5e7eb;
  letter-spacing: -0.025em;
}

.content h3 {
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1.4;
  color: #111827;
  margin: 2rem 0 1rem 0;
}

.content h4 {
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.5;
  color: #111827;
  margin: 1.5rem 0 0.75rem 0;
}

.content p {
  font-size: 1rem;
  line-height: 1.75;
  color: #374151;
  margin: 0 0 1.25rem 0;
}

.content a {
  color: var(--color-primary);
  font-weight: 500;
  transition: opacity 0.15s;
}

.content a:hover {
  opacity: 0.8;
  text-decoration: underline;
}

.content strong {
  font-weight: 600;
  color: #111827;
}

.content em {
  font-style: italic;
}

.content code {
  background: #f3f4f6;
  color: #111827;
  padding: 0.2rem 0.4rem;
  border-radius: 0.25rem;
  font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
  font-size: 0.875em;
  font-weight: 600;
}

.content pre {
  background: #1f2937;
  padding: 1.25rem;
  border-radius: 0.5rem;
  overflow-x: auto;
  margin: 1.5rem 0;
  line-height: 1.6;
}

.content pre code {
  background: transparent;
  color: #f3f4f6;
  padding: 0;
  font-size: 0.875rem;
  font-weight: normal;
}

.content ul, .content ol {
  margin: 1.5rem 0;
  padding-left: 1.75rem;
}

.content li {
  margin: 0.5rem 0;
  line-height: 1.75;
  color: #374151;
}

.content ul {
  list-style-type: disc;
}

.content ol {
  list-style-type: decimal;
}

.content blockquote {
  border-left: 3px solid #e5e7eb;
  padding-left: 1rem;
  margin: 1.5rem 0;
  color: #6b7280;
  font-style: italic;
}

/* Callout Boxes */
.callout {
  padding: 1rem 1.25rem;
  border-radius: 0.5rem;
  margin: 1.5rem 0;
  border-left: 3px solid;
  display: flex;
  gap: 0.75rem;
}

.callout-icon {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  margin-top: 0.125rem;
}

.callout-content {
  flex: 1;
  font-size: 0.9375rem;
  line-height: 1.6;
}

.callout-content p {
  margin: 0;
}

.callout-content p + p {
  margin-top: 0.75rem;
}

.callout-note {
  background: #eff6ff;
  border-left-color: #3b82f6;
  color: #1e40af;
}

.callout-tip {
  background: #f0fdf4;
  border-left-color: #22c55e;
  color: #166534;
}

.callout-warning {
  background: #fef9c3;
  border-left-color: #eab308;
  color: #854d0e;
}

.callout-danger {
  background: #fef2f2;
  border-left-color: #ef4444;
  color: #991b1b;
}

/* Badge */
.badge {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.25rem 0.625rem;
  border-radius: 0.375rem;
  font-size: 0.8125rem;
  font-weight: 500;
}

.badge-green {
  background: #dcfce7;
  color: #166534;
}

.badge-blue {
  background: #dbeafe;
  color: #1e40af;
}

.badge-gray {
  background: #f3f4f6;
  color: #374151;
}

/* Card */
.card {
  display: block;
  padding: 1.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  background: white;
  transition: all 0.2s;
  margin: 1.5rem 0;
}

.card:hover {
  border-color: var(--color-primary);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.card-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
  margin: 0 0 0.5rem 0;
}

.card-description {
  font-size: 0.9375rem;
  color: #6b7280;
  margin: 0;
  line-height: 1.6;
}

.card-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  margin: 1.5rem 0;
}

@media (min-width: 768px) {
  .card-grid-2 { grid-template-columns: repeat(2, 1fr); }
  .card-grid-3 { grid-template-columns: repeat(3, 1fr); }
  .card-grid-4 { grid-template-columns: repeat(4, 1fr); }
}

/* Mobile Styles */
@media (max-width: 1024px) {
  .toc-wrapper {
    display: none;
  }

  .content-container {
    max-width: 100%;
  }
}

@media (max-width: 768px) {
  :root {
    --sidebar-width: 0;
  }

  .sidebar {
    transform: translateX(-100%);
    transition: transform 0.3s;
  }

  .sidebar.open {
    transform: translateX(0);
  }

  .content-wrapper {
    margin-left: 0;
  }

  .content-container {
    padding: 1.5rem;
  }

  .top-nav-search {
    display: none;
  }

  .mobile-menu-btn {
    display: block;
    padding: 0.5rem;
    color: #6b7280;
  }
}

@media (min-width: 769px) {
  .mobile-menu-btn {
    display: none;
  }
}

/* Utility Classes */
.hidden { display: none; }
.block { display: block; }
.flex { display: flex; }
.inline-flex { display: inline-flex; }
.grid { display: grid; }
.items-center { align-items: center; }
.justify-between { justify-content: space-between; }
.gap-1 { gap: 0.25rem; }
.gap-2 { gap: 0.5rem; }
.gap-3 { gap: 0.75rem; }
.gap-4 { gap: 1rem; }
.m-0 { margin: 0; }
.mt-2 { margin-top: 0.5rem; }
.mb-4 { margin-bottom: 1rem; }
.w-full { width: 100%; }
`;
}

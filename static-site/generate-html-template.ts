export function generateHTMLTemplate(
  title: string,
  currentPath: string,
  docsConfig: any,
  content: string,
  navHTML: string
): string {
  // Extract headings from content for table of contents
  const headings = extractHeadings(content);
  const tocHTML = generateTOC(headings);

  // Generate breadcrumb
  const breadcrumbHTML = generateBreadcrumb(currentPath);

  // Generate tabs HTML
  const tabs = docsConfig.navigation.tabs || [];
  const tabsHTML = tabs.length > 1 ? `
    <div class="sidebar-tabs">
      ${tabs.map((tab: any, index: number) => `
        <button class="sidebar-tab ${index === 0 ? 'active' : ''}" data-tab="${index}">
          ${tab.tab}
        </button>
      `).join('')}
    </div>
  ` : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} - ${docsConfig.name}</title>
  <link rel="stylesheet" href="/styles.css">
</head>
<body>
  <!-- Top Navigation -->
  <nav class="top-nav">
    <div class="top-nav-left">
      <a href="/index.html" class="top-nav-logo">
        <img src="${docsConfig.logo.dark}" alt="${docsConfig.name}" />
        <span>${docsConfig.name}</span>
      </a>
    </div>

    <div class="top-nav-right">
      <div class="top-nav-search">
        <svg class="search-icon" width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
        <input type="text" placeholder="Search..." />
        <span style="position: absolute; right: 0.75rem; top: 50%; transform: translateY(-50%); font-size: 0.75rem; color: #9ca3af;">Ctrl K</span>
      </div>

      <a href="mailto:info@inblock.io" class="top-nav-link">Support</a>

      ${docsConfig.navbar?.primary ? `
      <a href="${docsConfig.navbar.primary.href}" class="top-nav-button">
        ${docsConfig.navbar.primary.label}
      </a>
      ` : ''}
    </div>

    <button class="mobile-menu-btn" id="mobile-menu-btn" aria-label="Toggle menu">
      <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
      </svg>
    </button>
  </nav>

  <!-- Main Container -->
  <div class="main-container">
    <!-- Sidebar -->
    <aside class="sidebar" id="sidebar">
      ${tabsHTML}
      <div class="sidebar-content">
        ${navHTML}
      </div>
    </aside>

    <!-- Content Wrapper -->
    <div class="content-wrapper">
      <div class="content-container">
        ${breadcrumbHTML}

        <div class="content">
          ${content}
        </div>
      </div>

      <!-- Table of Contents -->
      ${headings.length > 0 ? `
      <aside class="toc-wrapper">
        <div class="toc">
          <div class="toc-title">On this page</div>
          ${tocHTML}
        </div>
      </aside>
      ` : ''}
    </div>
  </div>

  <script>
    // Mobile menu toggle
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const sidebar = document.getElementById('sidebar');

    if (mobileBtn && sidebar) {
      mobileBtn.addEventListener('click', () => {
        sidebar.classList.toggle('open');
      });

      // Close sidebar when clicking outside on mobile
      document.addEventListener('click', (e) => {
        if (window.innerWidth < 769) {
          if (!sidebar.contains(e.target) && !mobileBtn.contains(e.target)) {
            sidebar.classList.remove('open');
          }
        }
      });
    }

    // Sidebar tabs switching
    const sidebarTabs = document.querySelectorAll('.sidebar-tab');
    const sidebarSections = document.querySelectorAll('.sidebar-section');

    sidebarTabs.forEach((tab, index) => {
      tab.addEventListener('click', () => {
        // Remove active class from all tabs
        sidebarTabs.forEach(t => t.classList.remove('active'));
        // Add active class to clicked tab
        tab.classList.add('active');

        // Hide all sections
        sidebarSections.forEach(section => section.style.display = 'none');
        // Show corresponding section
        if (sidebarSections[index]) {
          sidebarSections[index].style.display = 'block';
        }
      });
    });

    // Collapsible sidebar groups
    const groupToggles = document.querySelectorAll('.sidebar-group-toggle');
    groupToggles.forEach(toggle => {
      toggle.addEventListener('click', () => {
        toggle.classList.toggle('collapsed');
        const content = toggle.nextElementSibling;
        if (content && content.classList.contains('sidebar-group-content')) {
          content.classList.toggle('collapsed');
        }
      });
    });

    // Table of Contents - Active link highlighting
    const tocLinks = document.querySelectorAll('.toc-link');
    const headings = document.querySelectorAll('.content h2, .content h3');

    function updateActiveTOCLink() {
      let current = '';
      headings.forEach(heading => {
        const rect = heading.getBoundingClientRect();
        if (rect.top < 150) {
          current = heading.id;
        }
      });

      tocLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
          link.classList.add('active');
        }
      });
    }

    if (headings.length > 0) {
      window.addEventListener('scroll', updateActiveTOCLink);
      updateActiveTOCLink();
    }

    // Initialize - hide all sections except first
    if (sidebarSections.length > 1) {
      sidebarSections.forEach((section, index) => {
        if (index !== 0) section.style.display = 'none';
      });
    }
  </script>
</body>
</html>`;
}

function extractHeadings(content: string): Array<{id: string, text: string, level: number}> {
  const headings: Array<{id: string, text: string, level: number}> = [];
  const h2Regex = /<h2[^>]*>(.*?)<\/h2>/g;
  const h3Regex = /<h3[^>]*>(.*?)<\/h3>/g;

  let match;
  while ((match = h2Regex.exec(content)) !== null) {
    const text = match[1].replace(/<[^>]*>/g, '').trim();
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    headings.push({ id, text, level: 2 });
  }

  while ((match = h3Regex.exec(content)) !== null) {
    const text = match[1].replace(/<[^>]*>/g, '').trim();
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    headings.push({ id, text, level: 3 });
  }

  return headings.sort((a, b) => {
    return content.indexOf(`<h${a.level}`) - content.indexOf(`<h${b.level}`);
  });
}

function generateTOC(headings: Array<{id: string, text: string, level: number}>): string {
  return headings.map(h => {
    const indent = h.level === 3 ? 'padding-left: 0.75rem;' : '';
    return `<a href="#${h.id}" class="toc-link" style="${indent}">${h.text}</a>`;
  }).join('\n');
}

function generateBreadcrumb(currentPath: string): string {
  const parts = currentPath.split('/').filter(p => p);
  if (parts.length === 0 || currentPath === 'index') {
    return `<div class="breadcrumb">
      <span>Getting started</span>
    </div>`;
  }

  let breadcrumb = '<div class="breadcrumb">';
  breadcrumb += '<a href="/index.html">Home</a>';

  parts.forEach((part, index) => {
    breadcrumb += '<span class="breadcrumb-separator">›</span>';
    const label = part.replace(/_/g, ' ').replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

    if (index === parts.length - 1) {
      breadcrumb += `<span>${label}</span>`;
    } else {
      const path = parts.slice(0, index + 1).join('/');
      breadcrumb += `<a href="/${path}.html">${label}</a>`;
    }
  });

  breadcrumb += '</div>';
  return breadcrumb;
}

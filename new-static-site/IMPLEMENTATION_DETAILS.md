# Static Documentation Site Implementation

This directory contains a custom static site generator built with React, Vite, and MDX to render the Aqua Protocol documentation. It is designed to replicate the structure and styling of the original Mintlify documentation while offering full control over the build process.

## 🛠 Tech Stack

- **Framework**: React + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + `@tailwindcss/typography`
- **Content**: MDX (Markdown + JSX)
- **Routing**: `react-router-dom` (Dynamic routing based on file structure)
- **Icons**: `lucide-react`

## 🚀 Key Implementation Details

### 1. Configuration (`vite.config.ts`)
- Configured **MDX** support using `@mdx-js/rollup`.
- Added **Remark plugins** (`remark-gfm`, `remark-frontmatter`) to support GitHub Flavored Markdown and YAML frontmatter.
- Configured file system access to allow importing `.mdx` files from the parent directory (`../`), which contains the actual documentation content.
- Set up path aliases (`@docs`) to easily reference the parent root.

### 2. Styling (`tailwind.config.js` & `postcss.config.js`)
- Initialized **Tailwind CSS** with specific brand colors (`primary`, `light`, `dark`).
- Added the **Typography plugin** (`@tailwindcss/typography`) to automatically style raw Markdown content (headers, lists, code blocks).
- Created a `postcss.config.js` to ensure Tailwind styles are processed correctly.

### 3. Dynamic Routing (`App.tsx`)
- Uses `import.meta.glob('../**/*.mdx')` to scan the parent directory for all documentation files.
- Automatically generates routes based on the file path (e.g., `../getting-started.mdx` -> `/getting-started`).
- Implements **Lazy Loading** (`React.lazy` + `Suspense`) for better performance.

### 4. Layout & Navigation (`components/Layout.tsx`)
- **Sidebar**: Parsed `docs.json` (from the parent directory) to generate the sidebar navigation dynamically.
- **Responsiveness**: Added a mobile-friendly header with a toggleable sidebar.
- **Active States**: Highlights the current page in the sidebar using `NavLink`.

### 5. Custom MDX Components (`components/MDXComponents.tsx`)
- Mapped standard HTML elements (h1, p, a, code) to Tailwind-styled components.
- Implemented custom Mintlify-style components found in the raw MDX:
  - `<Card>` & `<CardGroup>`
  - `<Note>`, `<Tip>`, `<Warning>`
  - `<Badge>`
- Fixed dynamic class issues in `CardGroup` to ensure grid layouts work with Tailwind's JIT compiler.

### 6. Assets
- Copied `logo/` and `images/` from the root project into `static-site/public/` to ensure images referenced in the markdown are served correctly by the dev server.

## 🏃‍♂️ How to Run

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Access the site at `http://localhost:5173`.

3. **Build for Production**:
   ```bash
   npm run build
   ```
   The static assets will be generated in the `dist` folder.

## 📂 Project Structure

```
static-site/
├── src/
│   ├── components/
│   │   ├── Layout.tsx        # Main page layout with Sidebar
│   │   └── MDXComponents.tsx # Custom UI components for Markdown
│   ├── App.tsx               # Routing logic
│   ├── main.tsx              # Entry point
│   └── index.css             # Global styles
├── public/
│   ├── logo/                 # Copied logos
│   └── images/               # Copied content images
├── vite.config.ts            # Vite & MDX configuration
└── tailwind.config.js        # Theme configuration
```

import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MDXProvider } from '@mdx-js/react';
import Layout from './components/Layout';
import MDXComponents from './components/MDXComponents';

// Import all MDX files from the parent directory
// eager: false (default) means they are lazy loaded
const modules = import.meta.glob('../**/*.mdx');

function App() {
  // Generate routes from the glob pattern
  const routes = Object.keys(modules).map((path) => {
    // path is like "../index.mdx" or "../folder/file.mdx"
    // Remove "../" and ".mdx"
    const routePath = path.replace(/^\.\.\//, '').replace(/\.mdx$/, '');
    
    // Lazy load the component
    const Component = React.lazy(modules[path] as any);

    return {
      path: routePath === 'index' ? '/' : `/${routePath}`,
      Component
    };
  });

  return (
    <MDXProvider components={MDXComponents}>
      <Router>
        <Routes>
          <Route element={<Layout />}>
             {routes.map(({ path, Component }) => (
               <Route 
                 key={path} 
                 path={path} 
                 element={
                   <Suspense fallback={<div className="p-10">Loading...</div>}>
                     <div className="w-full max-w-4xl">
                       <Component />
                     </div>
                   </Suspense>
                 } 
               />
             ))}
             {/* 404 Route */}
             <Route path="*" element={<div className="p-10">404 - Page Not Found</div>} />
          </Route>
        </Routes>
      </Router>
    </MDXProvider>
  );
}

export default App;
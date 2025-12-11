import React from 'react';
import * as Icons from 'lucide-react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

// Helper to resolve icons dynamically
const Icon = ({ name, className }: { name: string; className?: string }) => {
  // Convert kebab-case to PascalCase (e.g., "book-open" -> "BookOpen")
  const iconName = name
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('') as keyof typeof Icons;

  const LucideIcon = Icons[iconName] as React.ElementType;

  if (!LucideIcon) return null;
  return <LucideIcon className={className} />;
};

export const Card = ({ title, icon, href, children, horizontal }: any) => {
  const Wrapper = href ? 'a' : 'div';
  const props = href ? { href: href.endsWith('.mdx') ? href.replace('.mdx', '.html') : href } : {};

  return (
    <Wrapper
      {...props}
      className={twMerge(
        "block p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-primary/50 transition-colors no-underline",
        horizontal ? "flex items-center gap-4" : "flex flex-col gap-2"
      )}
    >
      {icon && (
        <div className="w-8 h-8 flex items-center justify-center text-primary bg-primary/10 rounded-lg shrink-0">
          <Icon name={icon} className="w-5 h-5" />
        </div>
      )}
      <div>
        <h3 className="font-semibold text-gray-900 dark:text-white m-0 text-lg">{title}</h3>
        <p className="text-gray-600 dark:text-gray-400 m-0 text-sm mt-1">{children}</p>
      </div>
    </Wrapper>
  );
};

export const CardGroup = ({ children, cols = 2 }: any) => {
  const gridCols: Record<number, string> = {
    1: 'md:grid-cols-1',
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-4',
  };

  const colClass = gridCols[cols] || 'md:grid-cols-2';

  return (
    <div className={`grid gap-4 grid-cols-1 ${colClass} my-6`}>
      {children}
    </div>
  );
};

export const Note = ({ children }: any) => (
  <div className="my-4 p-4 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 rounded-r-lg">
    <div className="text-blue-900 dark:text-blue-100 [&>p]:m-0">{children}</div>
  </div>
);

export const Tip = ({ children }: any) => (
  <div className="my-4 p-4 bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 rounded-r-lg">
     <div className="text-green-900 dark:text-green-100 [&>p]:m-0">{children}</div>
  </div>
);

export const Warning = ({ children }: any) => (
  <div className="my-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 rounded-r-lg">
     <div className="text-yellow-900 dark:text-yellow-100 [&>p]:m-0">{children}</div>
  </div>
);

export const Badge = ({ children, color = 'gray', icon }: any) => (
  <span className={clsx(
    "inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium",
    color === 'green' && "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    color === 'blue' && "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    color === 'gray' && "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
  )}>
    {icon && <Icon name={icon} className="w-3 h-3" />}
    {children}
  </span>
);

const StaticMDXComponents = {
  Card,
  CardGroup,
  Note,
  Tip,
  Warning,
  Badge,
  // Add standard HTML overrides if needed for styling
  h1: (props: any) => <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-6" {...props} />,
  h2: (props: any) => <h2 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white mt-10 mb-4 border-b border-gray-200 dark:border-gray-800 pb-2" {...props} />,
  h3: (props: any) => <h3 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white mt-8 mb-4" {...props} />,
  p: (props: any) => <p className="leading-7 text-gray-700 dark:text-gray-300 mb-4" {...props} />,
  ul: (props: any) => <ul className="my-6 ml-6 list-disc [&>li]:mt-2 text-gray-700 dark:text-gray-300" {...props} />,
  a: (props: any) => {
    // Convert .mdx links to .html
    const href = props.href?.endsWith('.mdx') ? props.href.replace('.mdx', '.html') : props.href;
    return <a {...props} href={href} className="font-medium text-primary hover:underline" />;
  },
  pre: (props: any) => <pre className="p-4 rounded-lg bg-gray-900 overflow-x-auto mb-4" {...props} />,
  code: (props: any) => <code className="bg-gray-100 dark:bg-gray-800 rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold text-gray-900 dark:text-gray-200" {...props} />,
};

export default StaticMDXComponents;

import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function getAssetPath(path: string) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || '';
  
  // Normalize base path: remove trailing slash, ensure leading slash
  const normalizedBase = base
    ? (base.startsWith('/') ? base : `/${base}`).replace(/\/$/, '')
    : '';
  
  // Normalize asset path: remove leading slash
  const normalizedPath = path.startsWith('/') ? path.slice(1) : path;
  
  // In production with basePath, combine them
  if (process.env.NODE_ENV === 'production' && normalizedBase) {
    return `${normalizedBase}/${normalizedPath}`;
  }
  
  // In development or no basePath, just add leading slash
  // return `/${normalizedPath}`;
  return path
}
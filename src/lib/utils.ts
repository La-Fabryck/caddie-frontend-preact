import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility used by Shadcn to handle class names merge
 */
export function classNameMerger(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

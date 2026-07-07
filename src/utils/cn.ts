import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge class names conditionally (clsx) and de-duplicate conflicting
 * Tailwind utilities (tailwind-merge). The standard `cn()` helper.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

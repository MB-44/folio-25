import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** @param {import('clsx').ClassValue[]} inputs */
export function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

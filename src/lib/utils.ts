import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const jsonParser = <T>(value: unknown): T | null => {
  if (!value) return null;
  try {
    return JSON.parse(value as string) as T;
  } catch (error) {
    return null;
  }
};

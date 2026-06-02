import { CalcInputs } from '@/types';

export function encodeInputs(inputs: CalcInputs): string {
  const json = JSON.stringify(inputs);
  if (typeof window !== 'undefined') {
    return btoa(encodeURIComponent(json));
  }
  return Buffer.from(encodeURIComponent(json)).toString('base64');
}

export function decodeInputs(slug: string): CalcInputs | null {
  try {
    let json: string;
    if (typeof window !== 'undefined') {
      json = decodeURIComponent(atob(slug));
    } else {
      json = decodeURIComponent(Buffer.from(slug, 'base64').toString('utf-8'));
    }
    return JSON.parse(json) as CalcInputs;
  } catch {
    return null;
  }
}

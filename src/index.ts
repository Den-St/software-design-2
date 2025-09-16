import * as dotenv from 'dotenv';

dotenv.config();

/** Ті самі утиліти, але вже з базовою типізацією */
export function add(a: number, b: number): number {
  return a + b;
}

export function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

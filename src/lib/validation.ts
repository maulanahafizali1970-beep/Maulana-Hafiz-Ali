export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidPhone(phone: string): boolean {
  return /^\+?[0-9\s\-()]{7,20}$/.test(phone);
}

export function cleanString(value: unknown, max = 2000): string {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, max);
}

export function cleanOptional(value: unknown, max = 500): string | null {
  const s = cleanString(value, max);
  return s === '' ? null : s;
}

export function cleanEmail(value: unknown): string | null {
  const s = cleanString(value, 254).toLowerCase();
  return isValidEmail(s) ? s : null;
}

export function cleanPhone(value: unknown): string | null {
  const s = cleanString(value, 20).replace(/[\s\-()]/g, '');
  return isValidPhone(s) ? s : null;
}

export function asBoolean(value: unknown): boolean {
  return value === true || value === 'true' || value === '1' || value === 1;
}

export function asInt(value: unknown, fallback = 1, min = 1, max = 100000): number {
  const n = typeof value === 'string' ? parseInt(value, 10) : typeof value === 'number' ? value : NaN;
  if (Number.isNaN(n)) return fallback;
  return Math.min(max, Math.max(min, n));
}
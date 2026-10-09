import type { Moneda } from './types';

const locales: Record<Moneda, string> = { EUR: 'es-ES', ARS: 'es-AR' };

export function formatPrice(amount: number | null, currency: Moneda | null): string | null {
  if (amount == null || currency == null) return null;
  return new Intl.NumberFormat(locales[currency], {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
    useGrouping: true,
  }).format(amount);
}

export function formatDate(iso: string | null, options: Intl.DateTimeFormatOptions): string | null {
  if (!iso) return null;
  const date = new Date(iso.length === 10 ? `${iso}T00:00:00Z` : iso);
  if (Number.isNaN(date.getTime())) return null;
  return new Intl.DateTimeFormat('es-AR', { timeZone: 'UTC', ...options }).format(date);
}

import { intlLocale, type Locale } from '../i18n/config';
import type { Moneda } from './types';

export function formatPrice(amount: number | null, currency: Moneda | null, lang: Locale): string | null {
  if (amount == null || currency == null) return null;
  // es-AR escribe "EUR 1.500"; para euros en español se usa es-ES ("1.500 €").
  const locale = lang === 'es' && currency === 'EUR' ? 'es-ES' : intlLocale[lang];
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
    useGrouping: 'always',
  }).format(amount);
}

export function formatDate(
  iso: string | null,
  options: Intl.DateTimeFormatOptions,
  lang: Locale,
): string | null {
  if (!iso) return null;
  const date = new Date(iso.length === 10 ? `${iso}T00:00:00Z` : iso);
  if (Number.isNaN(date.getTime())) return null;
  return new Intl.DateTimeFormat(intlLocale[lang], { timeZone: 'UTC', ...options }).format(date);
}

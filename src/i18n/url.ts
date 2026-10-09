import { isLocale, type Locale } from './config';

/** `/es/obras` → `/en/obras`. Fuera de una ruta con idioma, lleva al inicio del idioma. */
export function switchLocale(pathname: string, target: Locale): string {
  const [, first, ...rest] = pathname.split('/');
  if (!isLocale(first)) return `/${target}`;
  return `/${[target, ...rest].filter(Boolean).join('/')}`;
}

export const localizedPath = (lang: Locale, path = ''): string => `/${lang}${path}`;

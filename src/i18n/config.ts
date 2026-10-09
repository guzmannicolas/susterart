/** Idiomas del sitio. Los códigos coinciden con `languages.code` en Directus. */
export const locales = ['es', 'en', 'gsw'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'es';

/** Nombre de cada idioma en su propio idioma (para el selector). */
export const localeNames: Record<Locale, string> = {
  es: 'Español',
  en: 'English',
  gsw: 'Schwiizerdütsch',
};

/** Locale de Intl para fechas y precios (Intl no conoce `gsw`: se usa de-CH). */
export const intlLocale: Record<Locale, string> = {
  es: 'es-AR',
  en: 'en-GB',
  gsw: 'de-CH',
};

export const isLocale = (value: string | undefined): value is Locale =>
  locales.includes(value as Locale);

export const localePaths = () => locales.map((lang) => ({ params: { lang }, props: { lang } }));

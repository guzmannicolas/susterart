/** Idiomas del sitio. Los códigos coinciden con `languages.code` en Directus. */
export const locales = ['es', 'en', 'de'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'es';

/** Nombre de cada idioma en su propio idioma (para el selector). */
export const localeNames: Record<Locale, string> = {
  es: 'Español',
  en: 'English',
  de: 'Deutsch',
};

/** Valor del atributo `lang` de <html> (alemán estándar de Suiza = de-CH). */
export const htmlLang: Record<Locale, string> = {
  es: 'es-AR',
  en: 'en-GB',
  de: 'de-CH',
};

/** Locale de Intl para fechas y precios. */
export const intlLocale: Record<Locale, string> = {
  es: 'es-AR',
  en: 'en-GB',
  de: 'de-CH',
};

export const isLocale = (value: string | undefined): value is Locale =>
  locales.includes(value as Locale);

export const localePaths = () => locales.map((lang) => ({ params: { lang }, props: { lang } }));

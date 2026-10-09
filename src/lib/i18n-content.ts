import { defaultLocale, type Locale } from '../i18n/config';

const isFilled = (v: unknown): boolean =>
  v !== null && v !== undefined && v !== '' && !(Array.isArray(v) && v.length === 0);

/**
 * Resuelve los campos traducibles de un ítem de Directus para un idioma.
 * Orden de preferencia por campo: idioma pedido → español → valor por defecto.
 */
export function localize<B extends { translations?: unknown }, F extends object>(
  item: B,
  lang: Locale,
  defaults: F,
): Omit<B, 'translations'> & F {
  const { translations, ...base } = item;
  const list = (translations ?? []) as ({ languages_code: string } & Partial<F>)[];
  const wanted = list.find((t) => t.languages_code === lang);
  const fallback = list.find((t) => t.languages_code === defaultLocale);
  const resolved = { ...defaults };
  for (const key of Object.keys(defaults) as (keyof F)[]) {
    const own = wanted?.[key];
    const spanish = fallback?.[key];
    if (isFilled(own)) resolved[key] = own as F[keyof F];
    else if (isFilled(spanish)) resolved[key] = spanish as F[keyof F];
  }
  return { ...base, ...resolved };
}

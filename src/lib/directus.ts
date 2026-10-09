/**
 * Cliente mínimo de Directus (REST) pensado para el build estático.
 *
 * - Solo lectura: usa un token estático de un usuario con rol de lectura.
 * - DIRECTUS_TOKEN no tiene prefijo PUBLIC_, por lo que Astro nunca lo
 *   incluye en el código que llega al navegador.
 */

import { DEMO_PREFIX, demoData, demoEnabled } from './demo';

const baseUrl = (import.meta.env.PUBLIC_DIRECTUS_URL ?? '').replace(/\/+$/, '');
const token = import.meta.env.DIRECTUS_TOKEN ?? '';

export const directusConfigured = baseUrl.length > 0;

type Params = Record<string, string | number | boolean>;

const cache = new Map<string, Promise<unknown>>();

function assertConfigured(): void {
  if (!directusConfigured) {
    throw new Error(
      'Falta PUBLIC_DIRECTUS_URL. Copia .env.example a .env (o configúrala en Vercel).',
    );
  }
}

async function request<T>(path: string, params: Params = {}): Promise<T> {
  assertConfigured();
  const url = new URL(`${baseUrl}${path}`);
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, String(value));
  }
  const key = url.toString();
  const hit = cache.get(key);
  if (hit) return hit as Promise<T>;

  const promise = (async () => {
    const res = await fetch(url, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    if (!res.ok) {
      throw new Error(`Directus ${res.status} ${res.statusText} en ${path}`);
    }
    const json = (await res.json()) as { data: T };
    return json.data;
  })();
  cache.set(key, promise);
  return promise;
}

/** Lista de una colección. `filter` usa la sintaxis de Directus (JSON). */
export function getItems<T>(
  collection: string,
  options: { filter?: object; sort?: string; translations?: boolean } = {},
): Promise<T[]> {
  if (demoEnabled) return Promise.resolve((demoData[collection] ?? []) as T[]);
  const params: Params = { limit: -1, fields: options.translations ? '*,translations.*' : '*' };
  if (options.sort) params.sort = options.sort;
  if (options.filter) params.filter = JSON.stringify(options.filter);
  return request<T[]>(`/items/${collection}`, params);
}

/** Singleton: devuelve null si todavía no tiene contenido. */
export async function getSingleton<T>(
  collection: string,
  options: { translations?: boolean } = {},
): Promise<T | null> {
  if (demoEnabled) return (demoData[collection] ?? null) as T | null;
  const fields = options.translations ? '*,translations.*' : '*';
  const data = await request<T | null>(`/items/${collection}`, { fields });
  return data && typeof data === 'object' ? data : null;
}

interface AssetOptions {
  width?: number;
  quality?: number;
}

/** URL pública de un archivo (requiere permiso de lectura público en directus_files). */
export function assetUrl(id: string, { width, quality = 80 }: AssetOptions = {}): string {
  if (id.startsWith(DEMO_PREFIX)) return `/demo/${id}.svg`;
  const url = new URL(`${baseUrl}/assets/${id}`);
  if (width) url.searchParams.set('width', String(width));
  url.searchParams.set('format', 'webp');
  url.searchParams.set('quality', String(quality));
  return url.toString();
}

/** Atributos `src` y `srcset` responsivos para una imagen de Directus. */
export function imageSources(id: string, widths = [480, 800, 1200, 1800]) {
  return {
    src: assetUrl(id, { width: 1200 }),
    srcset: widths.map((w) => `${assetUrl(id, { width: w })} ${w}w`).join(', '),
  };
}

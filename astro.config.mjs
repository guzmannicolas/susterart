import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Sitio 100% estático: Directus se consulta durante el build.
export default defineConfig({
  site: 'https://suster.art',
  output: 'static',
  integrations: [
    sitemap({
      i18n: { defaultLocale: 'es', locales: { es: 'es-AR', en: 'en-GB', de: 'de-CH' } },
    }),
  ],
  trailingSlash: 'never',
});

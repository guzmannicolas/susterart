interface ImportMetaEnv {
  /** URL base de Directus (https, sin barra final). Se usa también para las URLs públicas de imágenes. */
  readonly PUBLIC_DIRECTUS_URL?: string;
  /** Token estático de SOLO LECTURA. Solo servidor / build: nunca se envía al navegador. */
  readonly DIRECTUS_TOKEN?: string;
  /** "true" = contenido de ejemplo sin Directus, solo para revisar el diseño. */
  readonly DEMO_CONTENT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

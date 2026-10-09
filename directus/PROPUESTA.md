# Propuesta de modelo de datos en Directus

> **Esto es una propuesta. No se ejecutó nada en tu Directus.**
> Cuando la apruebes, se puede aplicar a mano desde *Settings → Data Model*, o con un script.

## Principios

- **Todas las imágenes se administran en Directus** (campos de tipo *file*), incluidos el favicon y la imagen para compartir en redes. En el código no hay imágenes fijas; el único respaldo es `public/favicon.svg` si no se carga uno.
- **Cada imagen tiene texto alternativo (`alt_imagen`) traducible**, para accesibilidad.
- **Multilingüe: `es` (por defecto), `en` y `de` (alemán estándar de Suiza, `de-CH`, ortografía suiza sin ß)** con el patrón estándar de traducciones de Directus. Si falta una traducción, el sitio muestra el texto en español campo por campo.
- Las imágenes dentro de textos markdown (blog) pueden insertarse con la URL de un archivo de Directus: `![alt](https://TU-DIRECTUS/assets/<id>)`.

## Cambios respecto al modelo original (para que los apruebes)

1. **Traducciones**: colección `languages` y una colección `<nombre>_translations` por cada colección con texto (ver abajo).
2. **`status` (draft | published | archived)** en `obras`, `entradas_blog` y `cv_items`: lo no confirmado queda como borrador. `cursos` ya usa `activo`.
3. **`inicio`** suma `bloques` (traducible) y `videos` (IDs de YouTube).
4. **`contacto`** suma `nombre_autoria` (nombre del aviso de derechos de autor).
5. **`cursos`** suma `moneda` (ARS | EUR).
6. **`ajustes` (singleton, nuevo)**: `favicon`, `imagen_compartir` y descripción del sitio (traducible).
7. `slug` es único y **no se traduce** (la misma URL en los tres idiomas: `/es/obras/azul`, `/en/obras/azul`, `/de/obras/azul`).

## Idiomas

### `languages`
| Campo | Tipo | Notas |
|---|---|---|
| code | string (**clave primaria**) | `es`, `en`, `de` |
| name | string | Español, English, Deutsch |

Todas las colecciones `*_translations` tienen: `id` (autoincremental), `<coleccion>_id` (M2O a la colección), `languages_code` (M2O a `languages`) y los campos traducibles. En cada colección principal el campo `translations` es un O2M hacia su colección de traducciones (con la interfaz *Translations* de Directus).

## Colecciones

### `inicio` (singleton)
| Campo | Tipo | Traducible |
|---|---|---|
| imagen | file (image) | no |
| videos | json — `["GYHAOp7buvE", …]` | no |
| presentacion | text | **sí** |
| bloques | json — `[{"titulo":"Tierra","texto":"…"}, …]` | **sí** |
| alt_imagen | string | **sí** |

### `obras`
| Campo | Tipo | Traducible |
|---|---|---|
| status | dropdown draft (default) / published / archived | no |
| slug | string, requerido, único | no |
| anio | integer, nullable | no |
| medidas | string, nullable | no |
| precio | decimal, EUR, nullable | no |
| estado | dropdown disponible / consultar / agotado | no |
| imagen | file (image) | no |
| orden | integer | no |
| titulo | string, requerido (en `es`) | **sí** |
| tecnica | string | **sí** |
| descripcion | text | **sí** |
| alt_imagen | string | **sí** |

### `cursos`
| Campo | Tipo | Traducible |
|---|---|---|
| modalidad | dropdown presencial / online | no |
| inicio | date, nullable | no |
| precio | decimal, nullable | no |
| moneda | dropdown ARS / EUR | no |
| activo | boolean, default false | no |
| nombre | string, requerido (en `es`) | **sí** |
| descripcion | text (markdown): temario / propuesta | **sí** |
| duracion | string, ej. "2 meses" | **sí** |
| horario | string | **sí** |

### `entradas_blog`
| Campo | Tipo | Traducible |
|---|---|---|
| status | dropdown draft (default) / published / archived | no |
| slug | string, requerido, único | no |
| fecha | date | no |
| imagen | file (image) | no |
| titulo | string, requerido (en `es`) | **sí** |
| contenido | text (markdown; los saltos de línea simples se respetan, para poemas) | **sí** |
| alt_imagen | string | **sí** |

### `cv_items`
| Campo | Tipo | Traducible |
|---|---|---|
| status | dropdown draft (default) / published / archived | no |
| tipo | dropdown formacion / exposicion_individual / exposicion_colectiva / premio / residencia / otro | no |
| anio | integer | no |
| orden | integer | no |
| titulo | string, requerido (en `es`) | **sí** |
| lugar | string | **sí** |
| descripcion | text | **sí** |

### `contacto` (singleton, sin traducciones)
`email`, `whatsapp` (URL), `instagram` (URL), `youtube` (URL), `nombre_autoria` (string).

### `ajustes` (singleton)
| Campo | Tipo | Traducible |
|---|---|---|
| favicon | file (image, png o svg cuadrado) | no |
| imagen_compartir | file (image, ~1200×630) | no |
| descripcion | text (descripción para buscadores) | **sí** |

## Textos fijos de la interfaz

Menús, etiquetas ("Año", "Técnica", "Adquirir"…), estados y el aviso de copyright viven en el código (`src/i18n/ui.ts`), no en Directus. Las versiones en `en` y `de` son **borradores** que debe revisar una persona nativa. El aviso de copyright toma el nombre de `contacto.nombre_autoria`.

## Permisos (seguridad)

Crear un **rol "Sitio web (solo lectura)"** y un **usuario "web-build"** con token estático:

- Acceso a la app/admin desactivado.
- Solo permiso **Read** sobre: `inicio`, `obras`, `cursos`, `entradas_blog`, `cv_items`, `contacto`, `ajustes`, **todas las `*_translations`** y `languages`.
- Ese token es `DIRECTUS_TOKEN` (solo se usa en el build, en el servidor).

Las imágenes se muestran en el navegador de los visitantes, así que **el rol *Public* necesita permiso Read sobre `directus_files`** (idealmente limitado a la carpeta del portfolio con un filtro por `folder`). No pongas el token en URLs de imágenes.

## Actualizaciones automáticas

El sitio es estático: un cambio en Directus se ve tras un nuevo deploy. Crear un **Deploy Hook** en Vercel y un **Flow** en Directus (evento: items create/update/delete en esas colecciones → Webhook POST a la URL del hook). Subir o cambiar un archivo no dispara el flow por sí solo: al reemplazar una imagen, editá también el ítem que la usa (o agregá `directus_files` al evento).

## Contenido inicial

Ver `seed/*.json` (importable más adelante; los ítems traen `translations` anidadas). Criterios:

- Solo se carga el texto en **español** (`es`). Las traducciones a `en` y `de` se completan en Directus (ver pendientes).
- Todas las **obras** quedan en `draft`: faltan fotos y años/técnicas. Se publican a medida que se suban las imágenes.
- Todos los **cursos** con `activo = false` hasta confirmar fechas y precios.
- La entrada **Somos** queda en `draft` y sin contenido (el texto del poema no fue entregado).
- **cv_items** vacío.

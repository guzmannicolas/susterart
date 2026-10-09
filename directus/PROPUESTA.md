# Propuesta de modelo de datos en Directus

> **Esto es una propuesta. No se ejecutó nada en tu Directus.**
> Cuando la apruebes, se puede aplicar a mano desde *Settings → Data Model*, o con un script.

## Cambios respecto al modelo original (para que los apruebes)

1. **`status` (draft | published | archived)** en `obras`, `entradas_blog` y `cv_items`: así "lo no confirmado" queda como borrador y el sitio solo muestra `published`. `cursos` ya usa `activo`.
2. **`inicio`** suma `bloques` (JSON: lista de `{titulo, texto}` para Tierra / Cuerpo / Ritual) y `videos` (JSON: lista de IDs de YouTube).
3. **`contacto`** suma `nombre_autoria` (nombre del aviso de derechos de autor del pie de página).
4. **`cursos`** suma `moneda` (ARS | EUR), para indicar la moneda del precio.
5. Todas las colecciones usan `id` entero autoincremental; `slug` es único.

## Colecciones

### `inicio` (singleton)
| Campo | Tipo | Notas |
|---|---|---|
| presentacion | text | |
| imagen | file (image) | imagen principal |
| bloques | json | `[{"titulo":"Tierra","texto":"La materia tiene historia."}, …]` |
| videos | json | `["GYHAOp7buvE", …]` |

### `obras`
| Campo | Tipo | Notas |
|---|---|---|
| status | dropdown | draft (default) / published / archived |
| titulo | string | requerido |
| slug | string | requerido, único |
| anio | integer | nullable |
| tecnica | string | nullable |
| medidas | string | nullable |
| precio | decimal | EUR, nullable |
| estado | dropdown | disponible / consultar / agotado |
| descripcion | text | |
| imagen | file (image) | |
| orden | integer | |

### `cursos`
| Campo | Tipo | Notas |
|---|---|---|
| nombre | string | requerido |
| descripcion | text (markdown) | temario / propuesta |
| modalidad | dropdown | presencial / online |
| inicio | date | nullable |
| duracion | string | ej. "2 meses" |
| horario | string | |
| precio | decimal | nullable |
| moneda | dropdown | ARS / EUR |
| activo | boolean | default false |

### `entradas_blog`
| Campo | Tipo | Notas |
|---|---|---|
| status | dropdown | draft (default) / published / archived |
| titulo | string | requerido |
| slug | string | requerido, único |
| fecha | date | |
| contenido | text (markdown) | los saltos de línea simples se respetan (poemas) |
| imagen | file (image) | |

### `cv_items`
| Campo | Tipo | Notas |
|---|---|---|
| status | dropdown | draft (default) / published / archived |
| tipo | dropdown | formacion / exposicion_individual / exposicion_colectiva / premio / residencia / otro |
| titulo | string | requerido |
| anio | integer | |
| lugar | string | |
| descripcion | text | |
| orden | integer | |

### `contacto` (singleton)
| Campo | Tipo |
|---|---|
| email | string |
| whatsapp | string (URL) |
| instagram | string (URL) |
| youtube | string (URL) |
| nombre_autoria | string |

## Permisos (seguridad)

Crear un **rol "Sitio web (solo lectura)"** y un **usuario "web-build"** con token estático:

- Acceso a la app/admin desactivado.
- Solo permiso **Read** sobre: `inicio`, `obras`, `cursos`, `entradas_blog`, `cv_items`, `contacto`.
- Ese token es el `DIRECTUS_TOKEN` (solo se usa en el build, en el servidor).

Las imágenes se muestran en el navegador de los visitantes, así que **el rol *Public* necesita permiso Read sobre `directus_files`** (idealmente limitado a la carpeta del portfolio con un filtro por `folder`). No pongas el token en URLs de imágenes.

Además: en `.env` de Directus, `CORS_ENABLED=true` no hace falta para el build (es servidor a servidor); solo se necesita si algún día se consulta desde el navegador.

## Actualizaciones automáticas

Como el sitio es estático, un cambio en Directus se ve tras un nuevo deploy. Crear un **Deploy Hook** en Vercel y un **Flow** en Directus (evento: items create/update/delete en esas colecciones → Webhook POST a la URL del hook).

## Contenido inicial

Ver `seed/*.json` (importable más adelante). Criterios:

- Todas las **obras** quedan en `draft`: faltan fotos y años/técnicas. Se publican a medida que se suban las imágenes.
- Todos los **cursos** con `activo = false` hasta confirmar fechas y precios.
- La entrada **Somos** queda en `draft` y sin contenido (el texto del poema no fue entregado).
- **cv_items** vacío.

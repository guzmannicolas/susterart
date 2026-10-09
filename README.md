# suster.art

Portfolio de **Belen Sustersic**, artista visual. Sitio estático hecho con [Astro](https://astro.build) (TypeScript estricto) cuyo contenido se administra en [Directus](https://directus.io) y se despliega en Vercel.

Secciones: Inicio, Obras (con ficha por obra), Cursos, Blog, CV y Contacto.

## Estructura

```
src/
  components/   Header, Footer, ObraCard, ObraGrid, DirectusImage, YouTube
  layouts/      BaseLayout (head, SEO, salto al contenido)
  lib/          directus.ts (cliente), content.ts (consultas), types.ts, markdown.ts, format.ts
  pages/        index, obras/, cursos, blog/, cv, contacto, 404
  styles/       global.css
directus/       Propuesta de modelo de datos + contenido inicial (seed/*.json)
```

## Correr en local

Requisitos: Node 22+.

```bash
npm install
cp .env.example .env     # completar PUBLIC_DIRECTUS_URL y DIRECTUS_TOKEN
npm run dev              # http://localhost:4321
npm run check            # tipos (astro check)
npm run build            # genera dist/
```

| Variable | Descripción |
|---|---|
| `PUBLIC_DIRECTUS_URL` | URL HTTPS de Directus, sin barra final. Es pública (se usa en las URLs de imágenes). |
| `DIRECTUS_TOKEN` | Token estático de **solo lectura**. Solo se usa en el servidor durante el build; sin prefijo `PUBLIC_` para que nunca llegue al navegador. |

Si falta `PUBLIC_DIRECTUS_URL` el build falla con un mensaje claro.

## Directus

1. Revisar y aprobar [`directus/PROPUESTA.md`](directus/PROPUESTA.md) (colecciones, campos, permisos).
2. Crear las colecciones y cargar `directus/seed/*.json`.
3. Crear un rol de solo lectura + usuario con token estático (ver propuesta) y darle permiso *Read* al rol *Public* sobre `directus_files` para que se vean las imágenes.

El sitio solo muestra obras, entradas y CV con `status = published`, y cursos con `activo = true`. Lo que falte confirmar queda en borrador.

## Despliegue en Vercel

1. En Vercel: **Add New → Project** e importar este repositorio de GitHub. Se detecta Astro automáticamente (build `npm run build`, salida `dist`).
2. En *Settings → Environment Variables* agregar `PUBLIC_DIRECTUS_URL` y `DIRECTUS_TOKEN` (Production y Preview).
3. En *Settings → Domains* añadir `suster.art`.
4. **Redeploy automático al editar contenido:** en Vercel crear un *Deploy Hook* (Settings → Git) y en Directus un *Flow* (evento al crear/actualizar/borrar ítems de las colecciones → Webhook `POST` a la URL del hook). Como el sitio es estático, sin esto los cambios en Directus no se ven hasta el próximo deploy.

## Accesibilidad

HTML semántico, enlace "Saltar al contenido", foco visible, `aria-current` en la navegación, contraste alto (modo claro y oscuro), `alt` en imágenes, videos con `title` y `youtube-nocookie`, respeto de `prefers-reduced-motion`.

> Las imágenes de obras **no** se incluyen en el repositorio: se suben a Directus en alta resolución. Mientras falten, se muestra "Imagen pendiente".

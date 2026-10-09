/**
 * Acceso tipado al contenido, ya resuelto para un idioma.
 * Todo lo "no confirmado" se filtra aquí: en Directus se marca como borrador
 * (status != published) o activo = false. Un ítem sin título/nombre en ningún
 * idioma (ni en español) se omite.
 */
import type { Locale } from '../i18n/config';
import { getItems, getSingleton } from './directus';
import { localize } from './i18n-content';
import type {
  Ajustes,
  AjustesFields,
  AjustesRaw,
  Contacto,
  Curso,
  CursoFields,
  CursoRaw,
  CvItem,
  CvItemFields,
  CvItemRaw,
  EntradaBlog,
  EntradaFields,
  EntradaRaw,
  Inicio,
  InicioFields,
  InicioRaw,
  Obra,
  ObraFields,
  ObraRaw,
} from './types';

const published = { status: { _eq: 'published' } };

const inicioDefaults: InicioFields = { presentacion: null, bloques: null, alt_imagen: null };
const ajustesDefaults: AjustesFields = { descripcion: null };
const obraDefaults: ObraFields = { titulo: '', tecnica: null, descripcion: null, alt_imagen: null };
const cursoDefaults: CursoFields = { nombre: '', descripcion: null, duracion: null, horario: null };
const entradaDefaults: EntradaFields = { titulo: '', contenido: null, alt_imagen: null };
const cvDefaults: CvItemFields = { titulo: '', lugar: null, descripcion: null };

export async function getInicio(lang: Locale): Promise<Inicio | null> {
  const raw = await getSingleton<InicioRaw>('inicio', { translations: true });
  return raw ? localize(raw, lang, inicioDefaults) : null;
}

export async function getAjustes(lang: Locale): Promise<Ajustes | null> {
  const raw = await getSingleton<AjustesRaw>('ajustes', { translations: true });
  return raw ? localize(raw, lang, ajustesDefaults) : null;
}

export const getContacto = () => getSingleton<Contacto>('contacto');

export async function getObras(lang: Locale): Promise<Obra[]> {
  const raw = await getItems<ObraRaw>('obras', {
    filter: published,
    sort: 'orden,-anio',
    translations: true,
  });
  return raw.map((o) => localize(o, lang, obraDefaults)).filter((o) => o.titulo);
}

export async function getCursos(lang: Locale): Promise<Curso[]> {
  const raw = await getItems<CursoRaw>('cursos', {
    filter: { activo: { _eq: true } },
    sort: 'inicio',
    translations: true,
  });
  return raw.map((c) => localize(c, lang, cursoDefaults)).filter((c) => c.nombre);
}

export async function getEntradas(lang: Locale): Promise<EntradaBlog[]> {
  const raw = await getItems<EntradaRaw>('entradas_blog', {
    filter: published,
    sort: '-fecha',
    translations: true,
  });
  return raw.map((e) => localize(e, lang, entradaDefaults)).filter((e) => e.titulo);
}

export async function getCvItems(lang: Locale): Promise<CvItem[]> {
  const raw = await getItems<CvItemRaw>('cv_items', {
    filter: published,
    sort: 'orden,-anio',
    translations: true,
  });
  return raw.map((i) => localize(i, lang, cvDefaults)).filter((i) => i.titulo);
}

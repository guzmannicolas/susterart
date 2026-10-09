/**
 * Acceso tipado al contenido. Todo lo "no confirmado" se filtra aquí:
 * en Directus se marca como borrador (status != published) o activo = false.
 */
import { getItems, getSingleton } from './directus';
import type { Contacto, Curso, CvItem, EntradaBlog, Inicio, Obra } from './types';

const published = { status: { _eq: 'published' } };

export const getInicio = () => getSingleton<Inicio>('inicio');
export const getContacto = () => getSingleton<Contacto>('contacto');

export const getObras = () =>
  getItems<Obra>('obras', { filter: published, sort: 'orden,-anio,titulo' });

export const getCursos = () =>
  getItems<Curso>('cursos', { filter: { activo: { _eq: true } }, sort: 'inicio' });

export const getEntradas = () =>
  getItems<EntradaBlog>('entradas_blog', { filter: published, sort: '-fecha' });

export const getCvItems = () =>
  getItems<CvItem>('cv_items', { filter: published, sort: 'orden,-anio' });

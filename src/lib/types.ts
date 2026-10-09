/**
 * Tipos del modelo de datos de Directus (ver directus/PROPUESTA.md).
 *
 * Patrón de traducciones estándar de Directus: cada colección con texto
 * traducible tiene una colección `<nombre>_translations` (campo `translations`)
 * con una fila por idioma. Aquí cada tipo se define como:
 *   XBase    → campos que no cambian por idioma
 *   XFields  → campos traducibles
 *   XRaw     → lo que devuelve la API (Base + translations)
 *   X        → resultado ya resuelto para un idioma (Base + Fields)
 */
import type { Locale } from '../i18n/config';

export type Estado = 'disponible' | 'consultar' | 'agotado';
export type Modalidad = 'presencial' | 'online';
export type Moneda = 'ARS' | 'EUR';
export type CvTipo =
  | 'formacion'
  | 'exposicion_individual'
  | 'exposicion_colectiva'
  | 'premio'
  | 'residencia'
  | 'otro';

/** Id de archivo de Directus (uuid) o null si falta la imagen. */
export type FileId = string | null;

export interface Translated<F> {
  translations: (Partial<F> & { languages_code: Locale })[] | null;
}

export interface Bloque {
  titulo: string;
  texto: string;
}

// ── inicio (singleton)
export interface InicioBase {
  imagen: FileId;
  /** IDs de video de YouTube. */
  videos: string[] | null;
}
export interface InicioFields {
  presentacion: string | null;
  bloques: Bloque[] | null;
  alt_imagen: string | null;
}
export type InicioRaw = InicioBase & Translated<InicioFields>;
export type Inicio = InicioBase & InicioFields;

// ── obras
export interface ObraBase {
  id: number;
  slug: string;
  anio: number | null;
  medidas: string | null;
  /** EUR. */
  precio: number | null;
  estado: Estado;
  imagen: FileId;
  orden: number | null;
}
export interface ObraFields {
  titulo: string;
  tecnica: string | null;
  descripcion: string | null;
  alt_imagen: string | null;
}
export type ObraRaw = ObraBase & Translated<ObraFields>;
export type Obra = ObraBase & ObraFields;

// ── cursos
export interface CursoBase {
  id: number;
  modalidad: Modalidad | null;
  inicio: string | null;
  precio: number | null;
  moneda: Moneda | null;
  activo: boolean;
}
export interface CursoFields {
  nombre: string;
  descripcion: string | null;
  duracion: string | null;
  horario: string | null;
}
export type CursoRaw = CursoBase & Translated<CursoFields>;
export type Curso = CursoBase & CursoFields;

// ── entradas_blog
export interface EntradaBase {
  id: number;
  slug: string;
  fecha: string | null;
  imagen: FileId;
}
export interface EntradaFields {
  titulo: string;
  /** Markdown. */
  contenido: string | null;
  alt_imagen: string | null;
}
export type EntradaRaw = EntradaBase & Translated<EntradaFields>;
export type EntradaBlog = EntradaBase & EntradaFields;

// ── cv_items
export interface CvItemBase {
  id: number;
  tipo: CvTipo;
  anio: number | null;
  orden: number | null;
}
export interface CvItemFields {
  titulo: string;
  lugar: string | null;
  descripcion: string | null;
}
export type CvItemRaw = CvItemBase & Translated<CvItemFields>;
export type CvItem = CvItemBase & CvItemFields;

// ── contacto (singleton, sin traducciones)
export interface Contacto {
  email: string | null;
  whatsapp: string | null;
  instagram: string | null;
  youtube: string | null;
  /** Nombre que aparece en el aviso de derechos de autor. */
  nombre_autoria: string | null;
}

// ── ajustes (singleton): imágenes globales y descripción para buscadores
export interface AjustesBase {
  /** Ícono de pestaña del navegador (png/svg). */
  favicon: FileId;
  /** Imagen por defecto al compartir el sitio en redes. */
  imagen_compartir: FileId;
}
export interface AjustesFields {
  descripcion: string | null;
}
export type AjustesRaw = AjustesBase & Translated<AjustesFields>;
export type Ajustes = AjustesBase & AjustesFields;

/** Tipos del modelo de datos de Directus (ver directus/PROPUESTA.md). */

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

export interface Bloque {
  titulo: string;
  texto: string;
}

export interface Inicio {
  presentacion: string | null;
  imagen: FileId;
  bloques: Bloque[] | null;
  /** IDs de video de YouTube. */
  videos: string[] | null;
}

export interface Obra {
  id: number;
  titulo: string;
  slug: string;
  anio: number | null;
  tecnica: string | null;
  medidas: string | null;
  /** EUR. */
  precio: number | null;
  estado: Estado;
  descripcion: string | null;
  imagen: FileId;
  orden: number | null;
}

export interface Curso {
  id: number;
  nombre: string;
  descripcion: string | null;
  modalidad: Modalidad | null;
  inicio: string | null;
  duracion: string | null;
  horario: string | null;
  precio: number | null;
  moneda: Moneda | null;
  activo: boolean;
}

export interface EntradaBlog {
  id: number;
  titulo: string;
  slug: string;
  fecha: string | null;
  /** Markdown. */
  contenido: string | null;
  imagen: FileId;
}

export interface CvItem {
  id: number;
  tipo: CvTipo;
  titulo: string;
  anio: number | null;
  lugar: string | null;
  descripcion: string | null;
  orden: number | null;
}

export interface Contacto {
  email: string | null;
  whatsapp: string | null;
  instagram: string | null;
  youtube: string | null;
  /** Nombre que aparece en el aviso de derechos de autor. */
  nombre_autoria: string | null;
}

/**
 * Contenido de EJEMPLO para revisar el diseño sin Directus (DEMO_CONTENT=true).
 * Las imágenes son formas abstractas de public/demo. Nunca usar en producción.
 */
export const demoEnabled = import.meta.env.DEMO_CONTENT === 'true';
export const DEMO_PREFIX = 'demo-';

const es = <T extends object>(fields: T) => [{ languages_code: 'es', ...fields }];

const obras: [string, number, 'disponible' | 'agotado'][] = [
  ['El costo de la distracción', 1500, 'disponible'],
  ['TransfHerencia', 2500, 'disponible'],
  ['¿Quien es el ladrón?', 1500, 'disponible'],
  ['Remisión', 2500, 'disponible'],
  ['Somos', 2500, 'disponible'],
  ['Japon envejece I', 1500, 'agotado'],
  ['Japon envejece II', 2500, 'disponible'],
  ['Introspección', 1500, 'agotado'],
  ['Retrospección', 1500, 'agotado'],
];

const slugify = (t: string) =>
  t.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export const demoData: Record<string, unknown> = {
  inicio: {
    imagen: 'demo-1',
    videos: ['GYHAOp7buvE', '54ySjPuckSc', 'yI73igkXY5o'],
    translations: es({
      presentacion:
        'Soy artista visual de Fiske Menuco, Rio Negro, tierra sagrada, punto de la ancestralidad, donde la materia da cuenta de una historia y de una identidad, la mia; la nuestra.',
      alt_imagen: 'Imagen de ejemplo',
      bloques: [
        { titulo: 'Arte', texto: 'Reconozco en el arte el proceso de la existencia como una constante fluctuacion materica y energética, una perspectiva que rompe con el limite de la vida y la muerte.' },
        { titulo: 'Tierra', texto: 'La materia tiene historia.' },
        { titulo: 'Cuerpo', texto: 'Nosotros también.' },
        { titulo: 'Ritual', texto: 'Vivamos concientes.' },
      ],
    }),
  },
  ajustes: { favicon: null, imagen_compartir: null, translations: [] },
  contacto: {
    email: 'mbelensustersic@gmail.com',
    whatsapp: 'https://api.whatsapp.com/qr/EEHHXK6C3NF4L1',
    instagram: 'https://www.instagram.com/suster.art/',
    youtube: 'https://www.youtube.com/channel/UCaqjkGma5KXcoVk1GJftsMQ',
    nombre_autoria: 'Belen Sustersic',
  },
  obras: obras.map(([titulo, precio, estado], i) => ({
    id: i + 1,
    slug: slugify(titulo),
    anio: i === 0 ? 2023 : null,
    medidas: i === 0 ? '80 × 100 cm' : null,
    precio,
    estado,
    imagen: `demo-${(i % 6) + 1}`,
    orden: i + 1,
    translations: es({
      titulo,
      tecnica: i === 0 ? 'Técnica de ejemplo' : null,
      descripcion: i === 0 ? 'Descripción de ejemplo para ver cómo se ve el texto de una obra.' : null,
      alt_imagen: 'Imagen de ejemplo',
    }),
  })),
  cursos: [
    { id: 1, modalidad: 'online', inicio: '2023-04-01', precio: 30000, moneda: 'ARS', activo: true,
      translations: es({ nombre: 'Breve historia del arte', duracion: '2 meses', horario: 'Miércoles 19:00 a 21:00',
        descripcion: '- **Edad Antigua:** Mesopotamia, Egipto, Grecia, Roma\n- **Edad Media:** bizantino, románico, gótico\n- **Edad Moderna:** Renacimiento, Manierismo, Barroco, Rococó, Neoclásico\n- **Edad Contemporánea:** actualidad y tendencias' }) },
    { id: 2, modalidad: 'presencial', inicio: '2023-03-14', precio: 15000, moneda: 'ARS', activo: true,
      translations: es({ nombre: 'Historia del arte feminista', duracion: '3 meses', horario: 'Lunes 19:00 a 21:00', descripcion: null }) },
  ],
  entradas_blog: [
    { id: 1, slug: 'somos', fecha: '2023-05-01', imagen: null,
      translations: es({ titulo: 'Somos', alt_imagen: null, contenido: 'Texto de ejemplo.\nSegundo verso de ejemplo.\n\nOtra estrofa de ejemplo.' }) },
  ],
  cv_items: [
    { id: 1, tipo: 'formacion', anio: 2015, orden: 1, translations: es({ titulo: 'Ejemplo de formación', lugar: 'Lugar de ejemplo', descripcion: null }) },
    { id: 2, tipo: 'exposicion_colectiva', anio: 2022, orden: 2, translations: es({ titulo: 'Ejemplo de exposición colectiva', lugar: 'Lugar de ejemplo', descripcion: 'Descripción de ejemplo.' }) },
  ],
};

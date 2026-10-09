/**
 * Textos fijos de la interfaz (lo que NO se edita en Directus).
 * es = original · en/gsw = borradores a revisar por una persona nativa.
 */
import type { Locale } from './config';

export interface Dict {
  skip: string;
  navLabel: string;
  langLabel: string;
  external: string;
  imagePending: string;
  comingSoon: string;
  siteDescription: string;
  nav: { home: string; works: string; courses: string; blog: string; cv: string; contact: string };
  home: { h1: string; heroAlt: string; axes: string; works: string; allWorks: string; videos: string; video: (n: number) => string };
  works: {
    title: string;
    description: string;
    back: string;
    pager: string;
    status: { disponible: string; consultar: string; agotado: string };
    statusLong: { disponible: string; consultar: string; agotado: string };
    year: string;
    technique: string;
    size: string;
    state: string;
    price: string;
    acquire: string;
    whatsapp: string;
    subject: (title: string) => string;
  };
  courses: {
    title: string;
    description: string;
    none: string;
    contactPrefix: string;
    contactSuffix: string;
    modality: { presencial: string; online: string };
    mode: string;
    start: string;
    duration: string;
    schedule: string;
    price: string;
  };
  blog: { title: string; description: string; back: string };
  cv: {
    title: string;
    description: string;
    sections: { formacion: string; exposicion_individual: string; exposicion_colectiva: string; premio: string; residencia: string; otro: string };
  };
  contact: { title: string; description: string; email: string; whatsapp: string; whatsappText: string; instagram: string; youtube: string; youtubeText: string };
  footer: { rights: (name: string) => string };
  notFound: { title: string; home: string };
}

const es: Dict = {
  skip: 'Saltar al contenido',
  navLabel: 'Principal',
  langLabel: 'Idioma',
  external: '(se abre en una pestaña nueva)',
  imagePending: 'Imagen pendiente',
  comingSoon: 'Próximamente.',
  siteDescription: 'Portfolio de Belen Sustersic, artista visual de Fiske Menuco, Río Negro.',
  nav: { home: 'Inicio', works: 'Obras', courses: 'Cursos', blog: 'Blog', cv: 'CV', contact: 'Contacto' },
  home: {
    h1: 'Belen Sustersic, artista visual',
    heroAlt: 'Obra de Belen Sustersic',
    axes: 'Ejes de trabajo',
    works: 'Obras',
    allWorks: 'Ver todas las obras',
    videos: 'Videos',
    video: (n) => `Video ${n} de Belen Sustersic`,
  },
  works: {
    title: 'Obras',
    description: 'Obras de Belen Sustersic.',
    back: '← Todas las obras',
    pager: 'Obras',
    status: { disponible: 'Disponible', consultar: 'Consultar', agotado: 'Agotada' },
    statusLong: { disponible: 'Disponible', consultar: 'Precio a consultar', agotado: 'Agotada' },
    year: 'Año',
    technique: 'Técnica',
    size: 'Medidas',
    state: 'Estado',
    price: 'Precio',
    acquire: 'Adquirir',
    whatsapp: 'WhatsApp',
    subject: (t) => `Consulta por la obra "${t}"`,
  },
  courses: {
    title: 'Cursos',
    description: 'Cursos y talleres de Belen Sustersic.',
    none: 'Por el momento no hay cursos abiertos.',
    contactPrefix: ' Escribime a ',
    contactSuffix: ' para recibir novedades.',
    modality: { presencial: 'Presencial', online: 'Online' },
    mode: 'Modalidad',
    start: 'Inicio',
    duration: 'Duración',
    schedule: 'Horario',
    price: 'Precio',
  },
  blog: { title: 'Blog', description: 'Textos y poemas de Belen Sustersic.', back: '← Blog' },
  cv: {
    title: 'CV',
    description: 'Currículum de Belen Sustersic.',
    sections: {
      formacion: 'Formación',
      exposicion_individual: 'Exposiciones individuales',
      exposicion_colectiva: 'Exposiciones colectivas',
      premio: 'Premios',
      residencia: 'Residencias',
      otro: 'Otros',
    },
  },
  contact: {
    title: 'Contacto',
    description: 'Contacto con Belen Sustersic.',
    email: 'Email',
    whatsapp: 'WhatsApp',
    whatsappText: 'Escribir por WhatsApp',
    instagram: 'Instagram',
    youtube: 'YouTube',
    youtubeText: 'Canal de YouTube',
  },
  footer: { rights: (n) => `Todas las obras son de autoría de ${n}, su réplica parcial o total está estrictamente prohibida.` },
  notFound: { title: 'Página no encontrada', home: 'Volver al inicio' },
};

const en: Dict = {
  skip: 'Skip to content',
  navLabel: 'Main',
  langLabel: 'Language',
  external: '(opens in a new tab)',
  imagePending: 'Image pending',
  comingSoon: 'Coming soon.',
  siteDescription: 'Portfolio of Belen Sustersic, visual artist from Fiske Menuco, Río Negro.',
  nav: { home: 'Home', works: 'Works', courses: 'Courses', blog: 'Blog', cv: 'CV', contact: 'Contact' },
  home: {
    h1: 'Belen Sustersic, visual artist',
    heroAlt: 'Artwork by Belen Sustersic',
    axes: 'Areas of work',
    works: 'Works',
    allWorks: 'See all works',
    videos: 'Videos',
    video: (n) => `Video ${n} by Belen Sustersic`,
  },
  works: {
    title: 'Works',
    description: 'Works by Belen Sustersic.',
    back: '← All works',
    pager: 'Works',
    status: { disponible: 'Available', consultar: 'Enquire', agotado: 'Sold out' },
    statusLong: { disponible: 'Available', consultar: 'Price on request', agotado: 'Sold out' },
    year: 'Year',
    technique: 'Technique',
    size: 'Size',
    state: 'Status',
    price: 'Price',
    acquire: 'Acquire',
    whatsapp: 'WhatsApp',
    subject: (t) => `Enquiry about the work "${t}"`,
  },
  courses: {
    title: 'Courses',
    description: 'Courses and workshops by Belen Sustersic.',
    none: 'There are no open courses at the moment.',
    contactPrefix: ' Write to ',
    contactSuffix: ' to receive news.',
    modality: { presencial: 'In person', online: 'Online' },
    mode: 'Format',
    start: 'Start',
    duration: 'Duration',
    schedule: 'Schedule',
    price: 'Price',
  },
  blog: { title: 'Blog', description: 'Texts and poems by Belen Sustersic.', back: '← Blog' },
  cv: {
    title: 'CV',
    description: 'Curriculum vitae of Belen Sustersic.',
    sections: {
      formacion: 'Education',
      exposicion_individual: 'Solo exhibitions',
      exposicion_colectiva: 'Group exhibitions',
      premio: 'Awards',
      residencia: 'Residencies',
      otro: 'Other',
    },
  },
  contact: {
    title: 'Contact',
    description: 'Get in touch with Belen Sustersic.',
    email: 'Email',
    whatsapp: 'WhatsApp',
    whatsappText: 'Write on WhatsApp',
    instagram: 'Instagram',
    youtube: 'YouTube',
    youtubeText: 'YouTube channel',
  },
  footer: { rights: (n) => `All works are by ${n}. Partial or total reproduction is strictly prohibited.` },
  notFound: { title: 'Page not found', home: 'Back to home' },
};

const gsw: Dict = {
  skip: 'Zum Inhalt spring',
  navLabel: 'Hauptmenü',
  langLabel: 'Sprach',
  external: '(öffnet sich i emene neue Tab)',
  imagePending: 'Bild fehlt no',
  comingSoon: 'Chunnt bald.',
  siteDescription: 'Portfolio vo Belen Sustersic, visuelli Chünstlerin us Fiske Menuco, Río Negro.',
  nav: { home: 'Startsiite', works: 'Wärk', courses: 'Kurse', blog: 'Blog', cv: 'CV', contact: 'Kontakt' },
  home: {
    h1: 'Belen Sustersic, visuelli Chünstlerin',
    heroAlt: 'Wärk vo Belen Sustersic',
    axes: 'Schwerpünkt',
    works: 'Wärk',
    allWorks: 'Alli Wärk aaluege',
    videos: 'Videos',
    video: (n) => `Video ${n} vo Belen Sustersic`,
  },
  works: {
    title: 'Wärk',
    description: 'Wärk vo Belen Sustersic.',
    back: '← Alli Wärk',
    pager: 'Wärk',
    status: { disponible: 'Verfüegbar', consultar: 'Aafrage', agotado: 'Usverchauft' },
    statusLong: { disponible: 'Verfüegbar', consultar: 'Priis uf Aafrag', agotado: 'Usverchauft' },
    year: 'Johr',
    technique: 'Technik',
    size: 'Grössi',
    state: 'Status',
    price: 'Priis',
    acquire: 'Erwärbe',
    whatsapp: 'WhatsApp',
    subject: (t) => `Aafrag zum Wärk "${t}"`,
  },
  courses: {
    title: 'Kurse',
    description: 'Kurse und Workshops vo Belen Sustersic.',
    none: 'Im Momänt sind kei Kurse offe.',
    contactPrefix: ' Schriib a ',
    contactSuffix: ', go Neuigkeite überchoo.',
    modality: { presencial: 'Vor Ort', online: 'Online' },
    mode: 'Form',
    start: 'Start',
    duration: 'Dauer',
    schedule: 'Zyt',
    price: 'Priis',
  },
  blog: { title: 'Blog', description: 'Täxt und Gedicht vo Belen Sustersic.', back: '← Blog' },
  cv: {
    title: 'CV',
    description: 'Läbenslauf vo Belen Sustersic.',
    sections: {
      formacion: 'Usbildig',
      exposicion_individual: 'Einzelusstellige',
      exposicion_colectiva: 'Gruppeusstellige',
      premio: 'Uuszeichnige',
      residencia: 'Residänze',
      otro: 'Anders',
    },
  },
  contact: {
    title: 'Kontakt',
    description: 'Kontakt zu Belen Sustersic.',
    email: 'Email',
    whatsapp: 'WhatsApp',
    whatsappText: 'Per WhatsApp schriibe',
    instagram: 'Instagram',
    youtube: 'YouTube',
    youtubeText: 'YouTube-Kanal',
  },
  footer: { rights: (n) => `Alli Wärk sind vo ${n}. Es isch strängstens verbote, sie ganz oder teilwiis nachzmache.` },
  notFound: { title: 'Siite nöd gfunde', home: 'Zrugg zur Startsiite' },
};

export const ui: Record<Locale, Dict> = { es, en, gsw };

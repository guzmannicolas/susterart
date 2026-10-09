import { Marked } from 'marked';

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// El HTML crudo se escapa: solo se admite markdown. Los saltos de línea
// simples se respetan (importante para poemas).
const marked = new Marked({
  gfm: true,
  breaks: true,
  renderer: {
    html: ({ text }) => escapeHtml(text),
  },
});

export const renderMarkdown = (source: string | null | undefined): string =>
  source ? (marked.parse(source, { async: false }) as string) : '';

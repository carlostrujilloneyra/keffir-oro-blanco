import type { Metadata } from 'next';
import { stripInlineMarkdown } from '@/lib/inlineMarkdown';
import { SITE_NAME } from '@/lib/site';

const TITLE_SUFFIX = ` | ${SITE_NAME}`;
const MAX_TITLE = 60;
const MAX_DESCRIPTION = 158;

/* Imagen global (`app/opengraph-image.png`). Next deja de heredarla en cuanto una página define `openGraph`. */
const DEFAULT_SHARE_IMAGE = {
  url: '/opengraph-image.png',
  width: 1200,
  height: 630,
  alt: `Logo de ${SITE_NAME}: Cuida tu salud con nosotros`,
};

export const SITE_OPEN_GRAPH = {
  siteName: SITE_NAME,
  locale: 'es_PE',
  type: 'website',
} as const;

/* Recorta por oraciones completas; si la primera ya no entra, corta en la última palabra. */
export const toMetaDescription = (text: string): string => {
  const plain = stripInlineMarkdown(text).replace(/\s+/g, ' ').trim();
  if (plain.length <= MAX_DESCRIPTION) return plain;

  const sentences = plain.match(/[^.!?]+[.!?]+/g) ?? [];
  let fitted = '';
  for (const sentence of sentences) {
    const next = `${fitted} ${sentence.trim()}`.trim();
    if (next.length > MAX_DESCRIPTION) break;
    fitted = next;
  }
  if (fitted) return fitted;

  const cut = plain.slice(0, MAX_DESCRIPTION);
  return `${cut.slice(0, cut.lastIndexOf(' '))}…`;
};

/* Google corta los títulos largos: sin el sufijo de marca si no entra. */
const toTitle = (title: string): Metadata['title'] =>
  title.length + TITLE_SUFFIX.length > MAX_TITLE ? { absolute: title } : title;

interface PageMetadataInput {
  title: string;
  description: string;
  path: string;
  /* Si se omite, se usa la imagen global de la marca. */
  image?: string;
}

/*
  Next no fusiona `openGraph` / `twitter` con los del layout: los reemplaza.
  Por eso cada página arma los suyos completos aquí.
*/
export const buildPageMetadata = ({ title, description, path, image }: PageMetadataInput): Metadata => {
  const metaDescription = toMetaDescription(description);
  const images = [image ?? DEFAULT_SHARE_IMAGE];

  return {
    title: toTitle(title),
    description: metaDescription,
    alternates: { canonical: path },
    openGraph: { ...SITE_OPEN_GRAPH, title, description: metaDescription, url: path, images },
    twitter: { card: 'summary_large_image', title, description: metaDescription, images },
  };
};

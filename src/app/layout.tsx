import type { Metadata } from 'next';
import { DM_Sans, Inter } from 'next/font/google';
import { Header } from '@/components/sections/Header/Header';
import { Footer } from '@/components/sections/Footer/Footer';
import { SITE_NAME, SITE_URL } from '@/lib/site';
import './globals.css';

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const keywords = [
  'TRIALFERI',

  /* Kéfir de leche — el producto ancla */
  'kéfir natural Perú',
  'kéfir de leche de vaca',
  'kéfir de leche de cabra',
  'kéfir artesanal',
  'búlgaros de kéfir',
  'nódulos de kéfir',

  /* Kéfires frutados */
  'kéfir frutado',
  'kéfir con fresa',
  'kéfir con arándanos',
  'kéfir con aguaymanto',
  'kéfir con frutos del bosque',
  'kéfir con chocolate',
  'crema de kéfir con aceitunas',

  /* Bebidas fermentadas sin lácteos */
  'kéfir de agua',
  'kombucha natural',
  'kombucha artesanal Perú',

  /* Fermentados y tradicionales */
  'chucrut morado fermentado',
  'manteca de cerdo artesanal',
  'mermelada de quito quito Oxapampa',
  'mermelada de fresa natural',
  'sal rosada de Maras',
  'vinagre de manzana artesanal',

  /* Categoría y beneficio */
  'probióticos naturales',
  'productos fermentados',
  'cultivos probióticos vivos',
  'salud intestinal',
  'microbiota saludable',
  'digestión natural',

  /* Marca y procedencia */
  'kéfir artesanal Perú',
  'leche de cabra del valle de Canta',
  'alimentación natural Perú',
  'sin conservantes',
  'productos naturales Lima',
  'Silvia Neyra',
];

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'TRIALFERI | Cuida tu salud con nosotros',
    template: '%s | TRIALFERI',
  },
  /* Máximo ~160 caracteres: Google recorta el resto en los resultados. */
  description:
    'Kéfir de leche de vaca y cabra, kéfires frutados, kéfir de agua, kombucha, chucrut y mermeladas. Fermentos vivos artesanales del Perú, sin conservantes.',
  keywords,
  creator: SITE_NAME,
  publisher: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  applicationName: 'TRIALFERI | Productos Artesanales Naturales',
  category: 'food',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  openGraph: {
    title: 'TRIALFERI | Cuida tu salud con nosotros',
    description:
      'Kéfir de leche, kéfires frutados (fresa, arándanos, frutos del bosque, chocolate y aguaymanto), kéfir de agua, kombucha y tradicionales. Fermentos vivos elaborados a mano, lote a lote.',
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: 'es_PE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TRIALFERI | Cuida tu salud con nosotros',
    description: 'Kéfir de leche, kéfires frutados, kombucha y tradicionales. 100% artesanal, sin conservantes.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='es'>
      <body className={`${dmSans.variable} ${inter.variable}`}>
        <Header />
        <main className='container-max w-full px-4 tablet:p-8 lg:px-12'>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import { Inter, League_Spartan } from 'next/font/google';
import { Header } from '@/components/shared/Header/Header';
import './globals.css';

const league_spartan = League_Spartan({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-league-spartan',
  style: ['normal'],
});

const inter = Inter({
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-inter',
  style: ['normal'],
});

export const metadata: Metadata = {
  title: 'Oro Blanco - SN | Productos Artesanales y Probióticos Naturales en Perú',
  description:
    'Descubre la auténtica alimentación natural con Oro Blanco - SN. Ofrecemos kéfir de leche y agua, queso de cabra artesanal, mantequilla casera, manteca de cerdo tradicional, kombucha fermentada y mermelada de quito quito. Productos 100% artesanales sin conservantes, elaborados en Canta para nutrir tu familia con lo mejor de la naturaleza peruana.',
  keywords:
    'Oro Blanco - SN, kéfir natural Perú, kéfir de agua, kéfir de leche vaca cabra, búlgaros de kéfir, hongos de kéfir, gránulos de kéfir, cultivos probióticos, queso de cabra artesanal, mantequilla artesanal, manteca de cerdo natural, kombucha probióticos, mermelada quito quito Oxapampa, productos fermentados, probióticos naturales, lácteos artesanales, salud intestinal, microorganismos beneficiosos, fermentación natural, productos tradicionales Canta, alimentación natural Perú, sin conservantes, productos orgánicos Lima, Silvia Neyra, microbiota saludable, digestión natural',
  creator: 'Carlos Trujillo',
  authors: [{ name: 'Carlos Trujillo', url: 'https://portfolio-carlos-trujillo.vercel.app/' }],
  applicationName: 'Oro Blanco - SN | Productos Artesanales Naturales',
  openGraph: {
    title: 'Oro Blanco - SN | Productos Artesanales y Probióticos Naturales',
    description:
      'Kéfir natural, queso de cabra, mantequilla artesanal y más productos 100% naturales elaborados en Canta, Perú.',
    url: 'https://oro-blanco-sn.com',
    siteName: 'Oro Blanco - SN',
    images: [
      {
        url: '/og-image.png',
        width: 1080,
        height: 1080,
        alt: 'Logo Oro Blanco - SN: Productos naturales y probióticos artesanales',
        type: 'image/png',
      },
    ],
    locale: 'es_PE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Oro Blanco - SN | Productos Naturales',
    description: 'Kéfir natural, queso de cabra y productos artesanales 100% naturales de Canta, Perú.',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='es'>
      <body className={`${league_spartan.variable} ${inter.variable}`}>
        <Header />
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import { DM_Sans, Inter } from 'next/font/google';
import { Header } from '@/components/sections/Header/Header';
import { Footer } from '@/components/sections/Footer/Footer';
import { SITE_NAME, SITE_URL } from '@/lib/site';
import { SITE_OPEN_GRAPH } from '@/lib/metadata';
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

const HOME_TITLE = 'TRIALFERI | Kéfir y fermentos artesanales del Perú';
const HOME_DESCRIPTION =
  'Kéfir de leche de vaca y cabra, kéfires frutados, kéfir de agua, kombucha, chucrut y mermeladas. Fermentos vivos artesanales del Perú, sin conservantes.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: HOME_TITLE, template: `%s | ${SITE_NAME}` },
  description: HOME_DESCRIPTION,
  creator: SITE_NAME,
  publisher: SITE_NAME,
  applicationName: SITE_NAME,
  category: 'food',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  openGraph: { ...SITE_OPEN_GRAPH, title: HOME_TITLE, description: HOME_DESCRIPTION, url: '/' },
  twitter: { card: 'summary_large_image', title: HOME_TITLE, description: HOME_DESCRIPTION },
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

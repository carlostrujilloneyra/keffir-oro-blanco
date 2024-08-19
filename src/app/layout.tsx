import type { Metadata } from 'next';
import { League_Spartan, Public_Sans } from 'next/font/google';
import './globals.css';

const league_spartan = League_Spartan({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-league-spartan',
  style: ['normal'],
});

const public_sans = Public_Sans({
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-public-sans',
  style: ['normal'],
});

export const metadata: Metadata = {
  title: 'Keffir en Perú | Silvia Neyra',
  description:
    '¡Bienvenido a Keffir en Perú | Silvia Neyra! Aquí, te ofrecemos lo mejor de la naturaleza con nuestra exclusiva selección de kéfir natural. Descubre los beneficios únicos de nuestros productos: kéfir de agua, kéfir de leche y kéfir de guanábana, todos elaborados para nutrir y revitalizar tu cuerpo. Con probióticos naturales que mejoran tu digestión, fortalecen tu sistema inmunológico y promueven un bienestar integral, nuestros kéfirs son la elección perfecta para quienes buscan una vida más saludable. Haz que el bienestar sea parte de tu rutina diaria con nuestras deliciosas opciones naturales.',
  keywords:
    'kéfir natural, kéfir de agua, kéfir de leche, kéfir de guanábana, probióticos naturales, salud intestinal, bienestar general, bebida saludable, fortalecimiento inmunológico, productos naturales, nutrición y salud, kéfir en Perú, estilo de vida saludable, productos fermentados, Silvia Neyra',
  creator: 'Carlos Trujillo',
  authors: [{ name: 'Carlos Trujillo', url: 'https://portfolio-carlos-trujillo.vercel.app/' }],
  applicationName: 'Landing para Keffir en Perú de Silvia Neyra',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='es'>
      <body className={`${league_spartan.variable} ${public_sans.variable}`}>{children}</body>
    </html>
  );
}

import Link from 'next/link';
import { ArrowUpRight, Mail, Phone } from 'lucide-react';
import { BackToTop } from './components/BackToTop';
import { FooterReveal } from './components/FooterReveal';
import { FOOTER_LINKS, SOCIAL_LINKS } from './data';
import { Button } from '@/components/ui/Button/Button';
import { CONTACT_EMAIL, WHATSAPP_DISPLAY, WHATSAPP_URL } from '@/lib/site';

const currentYear = new Date().getFullYear();

export const Footer = () => (
  <footer className='w-full bg-bosque text-papel'>
    <div className='container-max px-6 py-14 tablet:px-10 lg:px-18 lg:py-16'>
      {/* Marca + CTA */}
      <FooterReveal className='flex flex-col gap-8 border-b border-papel/10 pb-10 lg:flex-row lg:items-end lg:justify-between'>
        <div className='max-w-md'>
          <Link href='/' aria-label='Ir al inicio' className='inline-flex'>
            <span className='font-display text-3xl font-bold tracking-tight text-papel lg:text-[2.5rem]'>
              TRIALFERI
            </span>
          </Link>
          <p className='mt-3 text-sm leading-relaxed text-papel/70 lg:text-base'>
            Fermentos vivos y productos tradicionales, hechos a mano y sin conservantes.
          </p>
        </div>

        <Button asChild variant='light'>
          <Link href={WHATSAPP_URL} target='_blank' rel='noopener noreferrer'>
            Escríbenos por WhatsApp
            <ArrowUpRight className='h-4 w-4' />
          </Link>
        </Button>
      </FooterReveal>

      {/* Enlaces esenciales + contacto y redes */}
      <FooterReveal delay={0.08} className='flex flex-col gap-8 py-10 md:flex-row md:items-start md:justify-between'>
        <nav aria-label='Pie de página'>
          <ul className='flex flex-wrap gap-x-6'>
            {FOOTER_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className='inline-flex min-h-11 items-center text-sm text-papel/80 transition-colors hover:text-papel lg:text-[15px]'
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className='flex flex-col gap-1 text-sm text-papel/80 lg:text-[15px]'>
          <Link
            href={WHATSAPP_URL}
            target='_blank'
            rel='noopener noreferrer'
            className='flex min-h-11 items-center gap-3 transition-colors hover:text-papel'
          >
            <Phone className='h-4 w-4 shrink-0 text-miel' />
            {WHATSAPP_DISPLAY}
          </Link>

          {CONTACT_EMAIL && (
            <Link
              href={`mailto:${CONTACT_EMAIL}`}
              className='flex min-h-11 items-center gap-3 break-all transition-colors hover:text-papel'
            >
              <Mail className='h-4 w-4 shrink-0 text-miel' />
              {CONTACT_EMAIL}
            </Link>
          )}

          <ul className='-ml-3 flex items-center'>
            {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
              <li key={label}>
                <Link
                  href={href}
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label={label}
                  className='flex h-11 w-11 items-center justify-center text-papel/70 transition-colors hover:text-papel'
                >
                  <Icon className='h-5 w-5' />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </FooterReveal>

      {/* Legal + volver arriba */}
      <FooterReveal
        delay={0.16}
        className='flex flex-col gap-4 border-t border-papel/10 pt-6 md:flex-row md:items-center md:justify-between'
      >
        <p className='text-xs text-papel/50 lg:text-sm'>© {currentYear} TRIALFERI. Todos los derechos reservados.</p>
        <BackToTop />
      </FooterReveal>
    </div>
  </footer>
);

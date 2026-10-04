import Link from 'next/link';
import { ArrowUpRight, Mail, Phone } from 'lucide-react';
import { BackToTop } from './components/BackToTop';
import { FooterReveal } from './components/FooterReveal';
import { cn } from '@/lib/utils';
import { CONTACT_EMAIL, FOOTER_COLUMNS, SITE_VERSION, SOCIAL_LINKS, WHATSAPP_DISPLAY, WHATSAPP_URL } from './data';

const currentYear = new Date().getFullYear();

export const Footer = () => {
  return (
    <footer className='relative w-full overflow-hidden bg-bosque text-papel'>
      <div className='h-1 w-full bg-gradient-to-r from-verde via-fucsia to-miel' />

      <span
        aria-hidden
        className='pointer-events-none absolute -bottom-6 left-1/2 hidden -translate-x-1/2 select-none whitespace-nowrap font-display text-[22vw] font-bold leading-none tracking-tighter text-papel/[0.03] lg:block'
      >
        TRIALFERI
      </span>

      <div className='container-max relative px-6 py-16 tablet:px-10 lg:px-18 lg:py-20'>
        {/* ── Bloque superior: marca + CTA ──────────────────────────── */}
        <FooterReveal className='flex flex-col gap-10 border-b border-papel/10 pb-12 lg:flex-row lg:items-end lg:justify-between'>
          <div className='max-w-md'>
            <Link href='/' aria-label='Ir al inicio' className='inline-flex items-baseline'>
              <span className='font-display text-3xl font-bold tracking-tight text-papel lg:text-[2.5rem]'>
                TRIALFERI
              </span>
            </Link>
            <p className='mt-4 text-sm leading-relaxed text-papel/70 lg:text-base'>
              Fermentos vivos y productos artesanales. Kéfir, kombucha y saberes tradicionales, elaborados a mano y sin
              conservantes para cuidar tu vida.
            </p>
          </div>

          <Link
            href={WHATSAPP_URL}
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex w-fit items-center gap-2 rounded-full bg-papel px-6 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-tinta transition-all duration-200 hover:bg-miel hover:text-tinta active:scale-[0.98] lg:text-sm'
          >
            Escríbenos por WhatsApp
            <ArrowUpRight className='h-4 w-4' />
          </Link>
        </FooterReveal>

        {/* ── Columnas: enlaces + contacto ──────────────────────────── */}
        <FooterReveal delay={0.08} className='grid grid-cols-2 gap-x-8 gap-y-10 py-12 md:grid-cols-4 lg:gap-x-12'>
          {FOOTER_COLUMNS.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h3 className='flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-papel/50'>
                <span className='h-1.5 w-1.5 rounded-full bg-fucsia' />
                {column.title}
              </h3>
              <ul className='mt-5 flex flex-col gap-3'>
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className='text-sm text-papel/70 transition-colors hover:text-papel lg:text-[15px]'
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Columna de contacto. */}
          <div>
            <h3 className='flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-papel/50'>
              <span className='h-1.5 w-1.5 rounded-full bg-miel' />
              Contacto
            </h3>
            <ul className='mt-5 flex flex-col gap-4 text-sm text-papel/70 lg:text-[15px]'>
              <li>
                <Link
                  href={WHATSAPP_URL}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-start gap-3 transition-colors hover:text-papel'
                >
                  <Phone className='mt-0.5 h-4 w-4 shrink-0 text-miel' />
                  {WHATSAPP_DISPLAY}
                </Link>
              </li>
              <li>
                <Link
                  href={`mailto:${CONTACT_EMAIL}`}
                  className='flex items-start gap-3 break-all transition-colors hover:text-papel'
                >
                  <Mail className='mt-0.5 h-4 w-4 shrink-0 text-miel' />
                  {CONTACT_EMAIL}
                </Link>
              </li>
            </ul>
          </div>
        </FooterReveal>

        {/* ── Barra inferior: legal + redes + volver arriba ─────────── */}
        <FooterReveal
          delay={0.16}
          className='flex flex-col gap-6 border-t border-papel/10 pt-8 md:flex-row md:items-center md:justify-between'
        >
          <div className='flex flex-wrap items-center gap-x-3 gap-y-1'>
            <p className='text-xs text-papel/50 lg:text-sm'>
              © {currentYear} TRIALFERI. Todos los derechos reservados.
            </p>
            <span className='rounded-full border border-papel/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-papel/60'>
              {SITE_VERSION}
            </span>
          </div>

          <div className='flex items-center gap-4'>
            {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
              <Link
                key={label}
                href={href}
                target='_blank'
                rel='noopener noreferrer'
                aria-label={label}
                className={cn(
                  'flex h-9 w-9 items-center justify-center rounded-full border border-papel/20 text-papel/70',
                  'transition-all duration-200 hover:border-papel/50 hover:text-papel',
                )}
              >
                <Icon className='h-4 w-4' />
              </Link>
            ))}
          </div>

          <BackToTop />
        </FooterReveal>
      </div>
    </footer>
  );
};

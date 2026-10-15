import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion, type Variants } from 'motion/react';
import { ArrowUpRight, ChevronDown, X } from 'lucide-react';
import { NAV_ITEMS, SUB_MENUS, type NavSlug } from '@/components/sections/Header/data/navItems';
import { Eyebrow } from '@/components/ui/Eyebrow/Eyebrow';
import { cn } from '@/lib/utils';
import { WHATSAPP_URL } from '@/lib/site';
import { Button } from '@/components/ui/Button/Button';
import { PackCard } from '@/features/products/components/PackCard';

type Props = {
  open: boolean;
  onClose: () => void;
};

const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const panelVariants: Variants = {
  hidden: { x: '100%' },
  visible: {
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 34,
      when: 'beforeChildren',
      delayChildren: 0.05,
      staggerChildren: 0.045,
    },
  },
  exit: { x: '100%', transition: { duration: 0.2, ease: 'easeIn' } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: 24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.28, ease: 'easeOut' } },
};

export const MobileMenu = ({ open, onClose }: Props) => {
  const [expanded, setExpanded] = useState<NavSlug | null>(null);
  const reduce = useReducedMotion();

  const panel: Variants = reduce
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { when: 'beforeChildren' } }, exit: { opacity: 0 } }
    : panelVariants;
  const item: Variants = reduce ? { hidden: { opacity: 0 }, visible: { opacity: 1 } } : itemVariants;

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) window.addEventListener('keydown', onKey);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  // Colapsa los submenús al cerrar.
  useEffect(() => {
    if (!open) setExpanded(null);
  }, [open]);

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.button
            key='overlay'
            type='button'
            aria-label='Cerrar menú'
            onClick={onClose}
            variants={overlayVariants}
            initial='hidden'
            animate='visible'
            exit='hidden'
            transition={{ duration: 0.25 }}
            className='fixed inset-0 z-50 bg-tinta/50 backdrop-blur-sm lg:hidden'
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          /* Panel modal, no contenido tangencial: <div role='dialog'>, no <aside>. */
          <motion.div
            key='panel'
            variants={panel}
            initial='hidden'
            animate='visible'
            exit='exit'
            role='dialog'
            aria-modal='true'
            aria-label='Menú de navegación'
            className='fixed right-0 top-0 z-50 flex h-full w-[86%] max-w-sm flex-col bg-papel lg:hidden'
          >
            <motion.div
              variants={item}
              className='flex items-center justify-between border-b border-papel-sombra/60 px-6 py-5'
            >
              <span className='text-sm font-semibold text-tinta-suave'>Menú</span>
              <button
                type='button'
                onClick={onClose}
                aria-label='Cerrar menú'
                className='flex h-11 w-11 items-center justify-center rounded-full text-tinta transition-colors hover:bg-papel-hueso'
              >
                <X className='h-6 w-6' />
              </button>
            </motion.div>

            <nav aria-label='Principal (móvil)' className='flex-1 overflow-y-auto px-4 py-4'>
              <ul>
                {NAV_ITEMS.map(({ label, href, slug }) => {
                  const isOpen = expanded === slug;
                  const subMenu = SUB_MENUS[slug];
                  const hasSub = subMenu.groups.some((group) => group.entries.length > 0);

                  return (
                    <motion.li key={slug} variants={item} className='border-b border-papel-sombra/50'>
                      {hasSub ? (
                        // Con submenú: el tap NO navega, solo abre/cierra (evita salir sin querer).
                        <button
                          type='button'
                          onClick={() => setExpanded(isOpen ? null : slug)}
                          aria-expanded={isOpen}
                          className='flex w-full items-center justify-between gap-2 py-4 text-left'
                        >
                          <span className='font-display text-lg font-semibold text-tinta'>{label}</span>
                          <span className='flex h-10 w-10 items-center justify-center rounded-full text-tinta'>
                            <ChevronDown
                              className={cn('h-5 w-5 transition-transform duration-300', isOpen && 'rotate-180')}
                            />
                          </span>
                        </button>
                      ) : (
                        <Link
                          href={href}
                          onClick={onClose}
                          className='block py-4 font-display text-lg font-semibold text-tinta'
                        >
                          {label}
                        </Link>
                      )}

                      {hasSub && (
                        <div
                          className={cn(
                            'grid transition-[grid-template-rows] duration-300 ease-in-out',
                            isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
                          )}
                        >
                          <div className='overflow-hidden pb-3'>
                            {/* Enlace explícito a la categoría (la navegación intencional). */}
                            <Link
                              href={href}
                              onClick={onClose}
                              className='block rounded-[8px] px-2 py-2.5 text-sm font-semibold text-verde underline decoration-verde/30 underline-offset-4'
                            >
                              Ver los {subMenu.total} productos de {label}
                            </Link>

                            {subMenu.groups.map((group, groupIndex) => (
                              <div key={group.title ?? groupIndex} className='mt-2'>
                                {group.title && <Eyebrow className='mb-1 ml-2'>{group.title}</Eyebrow>}
                                <ul>
                                  {group.entries.map(({ label: subLabel, href: subHref, description, icon, chips }) => (
                                    /* Enlace estirado, igual que en el SubMenu de escritorio. */
                                    <li
                                      key={subHref}
                                      className='relative flex items-start gap-3 rounded-[8px] px-2 py-3'
                                    >
                                      <span className='flex h-6 w-6 shrink-0 items-center justify-center text-verde'>
                                        {icon}
                                      </span>

                                      <div className='min-w-0'>
                                        <Link
                                          href={subHref}
                                          onClick={onClose}
                                          className="text-sm font-semibold text-tinta transition-colors after:absolute after:inset-0 after:rounded-[8px] after:content-[''] hover:text-verde"
                                        >
                                          {subLabel}
                                        </Link>

                                        {description && (
                                          <p className='mt-0.5 line-clamp-2 text-xs leading-snug text-tinta-suave'>
                                            {description}
                                          </p>
                                        )}

                                        {chips.length > 0 && (
                                          <ul className='mt-2 flex flex-wrap gap-1.5'>
                                            {chips.map((chip) => (
                                              <li key={chip.href}>
                                                <Link
                                                  href={chip.href}
                                                  onClick={onClose}
                                                  /* Mismo velo que en escritorio (ver SubMenu). */
                                                  className='relative z-10 inline-flex rounded-[4px] bg-tinta/[0.06] px-2.5 py-1.5 text-xs font-medium text-tinta-media transition-colors hover:bg-verde/15 hover:text-verde'
                                                >
                                                  {chip.label}
                                                </Link>
                                              </li>
                                            ))}
                                          </ul>
                                        )}
                                      </div>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}

                            {subMenu.pack && (
                              <div className='mt-3'>
                                <PackCard pack={subMenu.pack} onSelect={onClose} />
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </motion.li>
                  );
                })}
              </ul>
            </nav>

            <motion.div variants={item} className='border-t border-papel-sombra/60 p-4'>
              <Button asChild variant='primary' className='w-full py-3'>
                <Link href={WHATSAPP_URL} target='_blank' rel='noopener noreferrer' onClick={onClose}>
                  Contáctanos
                  <ArrowUpRight className='h-4 w-4' />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

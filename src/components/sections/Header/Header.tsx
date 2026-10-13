'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import { ArrowUpRight, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { WHATSAPP_URL } from '@/lib/site';
import { NavBar } from './components/NavBar/NavBar';
import { MobileMenu } from './components/MobileMenu';
import { Button } from '@/components/ui/Button/Button';
import { useStaggerVariants } from '@/components/ui/Motion/Motion';

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Histéresis: con un solo umbral, al encogerse el header el scroll lo reabría en bucle.
  useEffect(() => {
    const onScroll = () => setScrolled((prev) => (prev ? window.scrollY > 8 : window.scrollY > 40));
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const { container: containerV, item: itemV } = useStaggerVariants({
    stagger: 0.14,
    delay: 0.12,
    y: -14,
    duration: 0.7,
    ease: 'easeOut',
  });

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full border-b transition-[background-color,border-color,box-shadow] duration-300',
        scrolled
          ? 'border-papel-sombra/70 bg-papel/85 shadow-[0_1px_24px_rgba(30,58,47,0.07)] backdrop-blur-md'
          : 'border-transparent bg-papel-hueso',
      )}
    >
      <motion.div
        variants={containerV}
        initial='hidden'
        animate='visible'
        className={cn(
          'container-max flex items-center justify-between gap-4 px-6 tablet:px-10 lg:px-18',
          'transition-[min-height,padding] duration-300',
          scrolled
            ? 'min-h-[68px] py-2.5 tablet:min-h-[78px] tablet:py-3'
            : 'min-h-[72px] py-3 tablet:min-h-[88px] tablet:py-4',
        )}
      >
        <motion.div variants={itemV}>
          <Link
            href='/'
            aria-label='Ir al inicio'
            className={cn(
              'relative block shrink-0 transition-[height,width] duration-300',
              scrolled ? 'h-8 w-[124px] lg:h-10 lg:w-[154px]' : 'h-9 w-[140px] lg:h-12 lg:w-[184px]',
            )}
          >
            <Image
              priority
              fill
              sizes='184px'
              src='/assets/images/ui/logos/trialferi-wordmark.png'
              alt='TRIALFERI'
              className='object-contain object-left'
            />
          </Link>
        </motion.div>

        <motion.div variants={itemV} className='hidden lg:block'>
          <NavBar className='flex' />
        </motion.div>

        <motion.div variants={itemV} className='flex items-center gap-3'>
          <Button asChild variant='primary' className='hidden lg:inline-flex'>
            <Link href={WHATSAPP_URL} target='_blank' rel='noopener noreferrer'>
              Contáctanos
              <ArrowUpRight className='h-4 w-4' />
            </Link>
          </Button>

          <motion.button
            type='button'
            onClick={() => setMenuOpen(true)}
            aria-label='Abrir menú'
            whileTap={{ scale: 0.9 }}
            className='flex h-11 w-11 items-center justify-center rounded-full text-tinta transition-colors hover:bg-papel-hueso lg:hidden'
          >
            <Menu className='h-6 w-6' />
          </motion.button>
        </motion.div>
      </motion.div>

      <MobileMenu open={menuOpen} onClose={closeMenu} />
    </header>
  );
};

'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import { NAV_ITEMS, SUB_MENUS_ITEMS } from '@/constants/navItems';
import { SubMenu } from './SubMenu/SubMenu';
import { cn } from '@/lib/utils';

export const NavBar = ({ className }: { className?: string }) => {
  const pathname = usePathname();

  // El submenú se mantiene abierto por :focus-within cuando el link clicado
  // conserva el foco tras navegar. Al cambiar de ruta quitamos el foco para cerrarlo.
  useEffect(() => {
    (document.activeElement as HTMLElement | null)?.blur();
  }, [pathname]);

  return (
    /* Un menú es una lista de enlaces: <nav> con nombre + <ul>/<li>. */
    <nav aria-label='Principal' className={className}>
      <ul className={cn('flex items-center gap-1')}>
        {NAV_ITEMS.map(({ label, href, slug, hasSubMenu }) => {
          /* La sección actual queda pintada en verde. */
          const isActive = pathname === href;

          return (
            <li key={slug} className='group relative'>
              <Link
                href={href}
                aria-current={isActive ? 'page' : undefined}
                onClick={(e) => e.currentTarget.blur()}
                className={cn(
                  'inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-200 hover:bg-papel-hueso hover:text-verde focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-verde md:text-base',
                  isActive ? 'bg-verde/10 text-verde' : 'text-tinta',
                )}
              >
                {label}
                {hasSubMenu && (
                  <ChevronDown className='h-4 w-4 transition-transform duration-200 group-hover:rotate-180' />
                )}
              </Link>

              {hasSubMenu && SUB_MENUS_ITEMS[slug] && <SubMenu slug={slug} />}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

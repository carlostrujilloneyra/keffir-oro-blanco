'use client';

import { SubMenu } from './SubMenu/SubMenu';

import Link from 'next/link';
import { NAV_ITEMS, SUB_MENUS_ITEMS } from '@/common/constants/navItems';
import styles from './styles.module.css';
import { cn } from '@/lib/utils';

export const NavBar = () => {
  return (
    <nav className='hidden bg-[#DADADA] font-bold text-white md:order-2 md:block md:rounded-lg md:text-slate-700'>
      <ul className='flex space-x-6 px-6 py-2 md:px-7 md:py-1'>
        {NAV_ITEMS.map(({ label, href, slug, hasSubMenu }) => {
          return (
            <li key={slug} className={cn(styles.item, 'group relative')}>
              <Link
                href={href}
                className={cn(
                  styles.root,
                  'flex h-full items-center text-sm tracking-wide md:px-2 md:py-3 md:text-base',
                )}
              >
                {label}
              </Link>

              {/* Submenú solo si existe */}

              {hasSubMenu && SUB_MENUS_ITEMS[slug] && <SubMenu slug={slug} />}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

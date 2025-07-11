'use client';

import Link from 'next/link';
import { NAV_ITEMS, SUB_MENUS_ITEMS } from '../../constants/navItems';
import clsx from 'clsx';
import { IoMdArrowDropdown } from 'react-icons/io';
import { SubMenu } from './SubMenu/SubMenu';
import styles from './styles.module.css';

export const NavBar = () => {
  return (
    <nav className='hidden bg-neutral-100 font-bold text-white md:order-2 md:block md:rounded-lg md:text-slate-700'>
      <ul className='flex space-x-6 px-6 py-2 md:px-7 md:py-1'>
        {NAV_ITEMS.map(({ label, href, slug, hasSubMenu }) => {
          return (
            <li key={slug} className={clsx(styles.item, 'group relative')}>
              <Link
                href={href}
                className={clsx(
                  styles.root,
                  'flex h-full items-center text-sm tracking-wide md:px-2 md:py-3 md:text-base',
                )}
              >
                {label}
                {hasSubMenu && <IoMdArrowDropdown className='h-5 w-5' />}
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

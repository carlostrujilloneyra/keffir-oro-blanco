import Link from 'next/link';
import clsx from 'clsx';
import { NAV_ITEMS } from '../../constants/navItems';
import styles from './styles.module.css';

export const NavBar = () => {
  return (
    <nav
      className={clsx(
        'z-10 hidden bg-black bg-transparent font-bold text-white md:order-2 md:flex md:items-center md:justify-center',
      )}
    >
      <ul className='list-header flex h-full w-auto flex-col items-center justify-center sm:flex-row'>
        {NAV_ITEMS.map(({ href, label }, i) => (
          <li className='header-item group text-center md:mx-4' key={i}>
            <Link
              className={clsx(
                styles.root,
                'relative flex w-full items-center uppercase tracking-wide md:text-[15px] lg:h-full',
              )}
              href={href}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

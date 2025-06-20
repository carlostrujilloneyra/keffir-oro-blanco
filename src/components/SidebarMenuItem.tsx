'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export interface SidebarMenuItemProps {
  path: string;
  icon: JSX.Element;
  title: string;
  subtitle: string;
}

export const SidebarMenuItem = ({ path, icon, title, subtitle }: SidebarMenuItemProps) => {
  const pathName = usePathname();

  const isPathActive = pathName === path;

  return (
    <Link
      href={path}
      className={`inline-flex w-full items-center space-x-2 border-b ${isPathActive && 'bg-blue-600'} border-slate-700 px-2 py-3 transition duration-150 ease-linear hover:bg-white/5`}
    >
      <div>{icon}</div>

      <div className='flex flex-col'>
        <span className='text-lg font-bold leading-5 text-white'>{title}</span>
        <span className='hidden text-sm text-white/50 md:block'>{subtitle}</span>
      </div>
    </Link>
  );
};

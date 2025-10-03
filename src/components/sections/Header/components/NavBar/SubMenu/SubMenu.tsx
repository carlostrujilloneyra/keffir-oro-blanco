import { NavSlug, SUB_MENUS_ITEMS } from '@/common/constants/navItems';
import Link from 'next/link';

interface Props {
  slug: NavSlug;
}

export const SubMenu = ({ slug }: Props) => {
  return (
    <ul className='absolute left-1/2 top-full z-50 hidden max-h-[360px] w-full min-w-[360px] max-w-[720px] -translate-x-1/2 flex-col space-y-2 overflow-y-auto rounded-xl bg-white p-4 text-sm text-black shadow-[0_6px_20px_rgba(0,0,0,0.15)] group-hover:flex'>
      {SUB_MENUS_ITEMS[slug]?.map(({ label, href, description, icon }, index) => {
        return (
          <li key={index} className='w-full'>
            <Link
              href={href}
              className='grid cursor-pointer grid-cols-[max-content_1fr] gap-3 rounded-lg transition duration-300 hover:bg-[#d6d5d5] hover:ease-in-out lg:px-4 lg:py-3'
            >
              <span className='flex h-6 w-6 items-center justify-center'>{icon}</span>

              <div>
                <h3 className='mb-1 text-[15px] uppercase'>{label}</h3>
                <p className='text-justify font-normal leading-[1.2]'>{description}</p>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

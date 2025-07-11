import Link from 'next/link';
import { NavSlug, SUB_MENUS_ITEMS } from '../../../constants/navItems';
import { LuMilk } from 'react-icons/lu';

interface Props {
  slug: NavSlug;
}

export const SubMenu = ({ slug }: Props) => {
  return (
    <ul className='absolute left-0 top-full z-50 hidden w-full min-w-[400px] max-w-[700px] flex-col space-y-2 rounded-xl bg-white p-4 text-sm text-black shadow-[0_6px_20px_rgba(0,0,0,0.15)] group-hover:flex'>
      {SUB_MENUS_ITEMS[slug]?.map(({ label, href, description, icon }, index) => {
        return (
          <li key={index} className='w-full'>
            <Link
              href={href}
              className='grid cursor-pointer grid-cols-[max-content_1fr] gap-3 rounded-lg transition duration-300 hover:bg-[#f7f7f5] hover:ease-in-out lg:px-4 lg:py-3'
            >
              <span className='text-primary flex h-6 w-6 items-center justify-center'>
                {icon ?? <LuMilk className='h-5 w-5' />}
              </span>

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

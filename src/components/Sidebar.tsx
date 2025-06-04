import { IoBrowsersOutline, IoCalculator, IoLogoReact } from 'react-icons/io5';
import { SidebarMenuItem, SidebarMenuItemProps } from './SidebarMenuItem';
import Image from 'next/image';

const menuItems: SidebarMenuItemProps[] = [
  {
    path: '/dashboard/main',
    icon: <IoBrowsersOutline size={40} />,
    title: 'Dashboard',
    subtitle: 'Visualización',
  },

  {
    path: '/dashboard/counter',
    icon: <IoCalculator size={40} />,
    title: 'Counter',
    subtitle: 'Contador Client Side',
  },
];

export const Sidebar = () => {
  return (
    <div
      id='menu'
      style={{ width: '400px' }}
      className='left-0 z-10 h-screen min-h-screen w-64 overflow-y-scroll bg-gray-900 text-slate-300'
    >
      <div id='logo' className='my-4 px-6'>
        <h1 className='flex items-center text-lg font-bold text-white md:text-2xl'>
          <IoLogoReact className='mr-2' />
          <span>Dash</span>
          <span className='text-blue-500'>8</span>.
        </h1>
        <p className='text-sm text-slate-500'>Manage your actions and activities</p>
      </div>

      <div id='profile' className='px-6 py-10'>
        <p className='text-slate-500'>Welcome back,</p>
        <a href='/' className='inline-flex items-center space-x-2'>
          <div>
            <Image
              className='h-8 w-8 rounded-full'
              width={40}
              height={40}
              src='https://images.unsplash.com/photo-1592602228110-2a482b293e42'
              alt='profile-image'
            />
          </div>
          <span className='text-sm font-bold md:text-base'>Carlos Trujillo</span>
        </a>
      </div>

      <div id='nav' className='w-full px-6'>
        {menuItems.map(({ path, icon, title, subtitle }, i) => {
          return <SidebarMenuItem key={i} path={path} icon={icon} title={title} subtitle={subtitle} />;
        })}
      </div>
    </div>
  );
};

import Image from 'next/image';
import { Button } from '../Button/Button';
import { MainHamburger } from './components/MainHamburger';
import { NavBar } from './components/NavBar/NavBar';

export const Header = () => {
  return (
    <header className='container-max grid w-full grid-cols-[36px_1fr_max-content] items-center justify-items-center bg-black px-6 py-8 md:bg-transparent md:px-10 md:py-6 lg:h-[120px] lg:grid-cols-[120px_1fr_max-content] lg:px-20'>
      <MainHamburger />

      {/* <Logo /> */}
      <div className='relative h-[64px] w-[230px] min-[1300px]:w-[240px]'>
        <Image
          priority
          className='object-cover'
          fill
          sizes='100vw'
          src='/assets/images/logos/black-logo.png'
          alt='Logo Oro Blanco - SN'
        />
      </div>

      <NavBar />

      {/* Botón de Más información que te manda al wspp de Oro Blanco - SN */}
      <Button theme='primary' type='button' />
    </header>
  );
};

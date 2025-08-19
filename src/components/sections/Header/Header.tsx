import { MainHamburger } from './components/MainHamburger';
import { Button } from '@/components/ui/Button/Button';
import { NavBar } from './components/NavBar/NavBar';
import Image from 'next/image';

export const Header = () => {
  return (
    <header className='container-max grid h-[90px] w-full grid-cols-[36px_1fr_max-content] items-center justify-items-center bg-black px-6 py-6 tablet:h-[120px] tablet:p-10 md:bg-transparent lg:h-full lg:grid-cols-[270px_1fr_max-content] lg:px-18 lg:py-6'>
      <MainHamburger />

      {/* <Logo /> */}
      <div className='relative h-[44px] w-[120px] lg:h-16 lg:w-[260px] min-[1300px]:w-[270px]'>
        <Image
          priority
          className='object-cover'
          fill
          sizes='(min-width: 600px) 100vw, 100px'
          src='/assets/ui/logos/black-logo.png'
          alt='Logo Oro Blanco - SN'
        />
      </div>

      <NavBar />

      {/* Botón de Más información que te manda al wspp de Oro Blanco - SN */}
      <Button theme='primary' type='button'>
        Más información
      </Button>
    </header>
  );
};

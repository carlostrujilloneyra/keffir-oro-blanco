import { Button } from '../Button/Button';
import { MainHamburger } from './components/MainHamburger';
import { NavBar } from './components/NavBar/NavBar';

export const Header = () => {
  return (
    <header className='grid h-[100px] w-full grid-cols-[36px_1fr_max-content] items-center justify-items-center bg-black px-6 py-8 md:bg-transparent md:px-10 md:py-6 lg:grid-cols-[120px_1fr_max-content] lg:px-20'>
      <MainHamburger />

      {/* <Logo /> */}
      <p className='order-1 w-[120px] font-bold text-white md:text-black'>Logo</p>

      <NavBar />

      {/* Botón de Más información que te manda al wspp de Oro Blanco - SN */}
      <Button size='md' theme='primary' />
    </header>
  );
};

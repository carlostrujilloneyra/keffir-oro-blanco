import { GiGoat, GiButter, GiCow } from 'react-icons/gi';
import { PiCheese } from 'react-icons/pi';
import { TbVaccineBottle } from 'react-icons/tb';

export type NavSlug = 'lacteos' | 'kefir-frutado' | 'bebidas-fermentadas' | 'tradicionales';

interface NavItem {
  label: string;
  href: string;
  hasSubMenu?: boolean;
  slug: NavSlug;
}

interface SubMenuItem {
  label: string;
  href: string;
  description?: string;
  icon?: React.ReactNode;
}

export const NAV_ITEMS: NavItem[] = [
  {
    label: 'Lácteos',
    href: '/categorias/lacteos', //leche, mantequilla, queso
    slug: 'lacteos',
    hasSubMenu: true,
  },

  {
    label: 'Bebidas Fermentadas',
    href: '/categorias/bebidas-fermentadas', //kefir de agua, kefir de leche, kombucha
    slug: 'bebidas-fermentadas',
    hasSubMenu: true,
  },

  {
    label: 'Kéfir Frutado',
    href: '/categorias/kefir-frutado', // variedades de kefir frutado
    slug: 'kefir-frutado',
    hasSubMenu: true,
  },

  {
    label: 'Tradicionales',
    href: '/categorias/tradicionales', // manteca de cerdo, mermelada
    slug: 'tradicionales',
    hasSubMenu: true,
  },
];

export const SUB_MENUS_ITEMS: Partial<Record<NavSlug, SubMenuItem[]>> = {
  lacteos: [
    {
      label: 'Leche de Cabra',
      href: '/categorias/lacteos#leche',
      description:
        'Nutritiva y suave para la digestión. Ideal para personas con intolerancia a la lactosa. 100% natural y fresca de nuestras chacras.',
      icon: <GiGoat className='h-6 w-6' />,
    },

    {
      label: 'Queso con cuajo de cabra',
      href: '/categorias/lacteos#queso',
      description:
        'Queso artesanal hecho con cuajo natural de cabra. Textura cremosa, sin aditivos ni conservantes. Ideal para ensaladas, pastas o disfrutar solo.',
      icon: <PiCheese className='h-6 w-6' />,
    },

    {
      label: 'Mantequilla artesanal',
      href: '/categorias/lacteos#mantequilla',
      description:
        'Mantequilla 100% natural, elaborada de forma artesanal con nata de leche fresca. Sin aditivos ni conservantes, con un sabor auténtico y una textura cremosa.',
      icon: <GiButter className='h-6 w-6' />,
    },
  ],

  'bebidas-fermentadas': [
    {
      label: 'Kéfir de leche (vaca o cabra)',
      href: '/categorias/kefir-frutado#fresa',
      description:
        'Kéfir de leche de vaca o cabra. Probiótico natural, cremoso y lleno de beneficios para tu salud intestinal. 100% artesanal, sin aditivos',
      icon: <GiCow className='h-6 w-6' />,
    },

    {
      label: 'Kéfir de agua',
      href: '/categorias/kefir-frutado#maracuya',
      description:
        'Refrescante y probiótico natural, fermentado con granos de kéfir para fortalecer tu digestión e inmunidad. Sin conservantes, lleno de beneficios y con un toque burbujeante.',
    },

    {
      label: 'Kombucha',
      href: '',
      description:
        'Bebida ancestral fermentada con té y cultivos vivos. Refrescante, burbujeante y llena de probióticos que nutren tu digestión y elevan tu bienestar de forma natural.',
      icon: <TbVaccineBottle className='h-6 w-6' />,
    },
  ],
};

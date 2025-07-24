import { GiGoat, GiButter, GiCow, GiPig, GiStrawberry, GiChocolateBar, GiFruitBowl } from 'react-icons/gi';
import { PiCheese, PiOrange } from 'react-icons/pi';
import { TbVaccineBottle } from 'react-icons/tb';

export type NavSlug = 'lacteos' | 'kefir-frutado' | 'probioticos' | 'tradicionales';

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
    label: 'Probióticos',
    href: '/categorias/probioticos', //kefir de agua, kefir de leche, kombucha
    slug: 'probioticos',
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
        'Nutritiva y suave para la digestión. Ideal para personas con intolerancia a la lactosa. 100% natural y fresca, de cabras de libre pastoreo de Canta.',
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

  probioticos: [
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

  'kefir-frutado': [
    {
      label: 'Kéfir de leche de vaca/cabra - fresa',
      href: '',
      description:
        'Suave y cremoso, fermentado con fresas frescas recolectadas a mano. Un toque dulce y natural que despierta tus sentidos y nutre tu microbiota con cada sorbo.',
      icon: <GiStrawberry className='h-6 w-6' />,
    },

    {
      label: 'Kéfir de leche de vaca/cabra - arándanos',
      href: '',
      description:
        'Concentrado en antioxidantes: arándanos jugosos que potencian tu salud intestinal de forma natural.',
      icon: <GiFruitBowl className='h-6 w-6' />,
    },

    {
      label: 'Kéfir de leche de vaca/cabra - chocolate',
      href: '',
      description:
        'La fusión perfecta de 100% cacao intenso y probióticos vivos. Cada botella ofrece un placer indulgente que mejora tu estado de ánimo y cuida tu flora intestinal de manera natural.',
      icon: <GiChocolateBar className='h-6 w-6' />,
    },
  ],

  tradicionales: [
    {
      label: 'Manteca de cerdo',
      href: '',
      description:
        'Manteca 100% natural y artesanal, ideal para cocinar, freír y hornear. Aporta un sabor auténtico y es una alternativa saludable a los aceites procesados.',
      icon: <GiPig className='h-6 w-6' />,
    },

    {
      label: 'Mermelada de Quito Quito',
      href: '',
      description:
        'Explosión de sabor andino elaborada con frutos de Quito Quito traídos directamente de Oxapampa. Dulce y suave, perfecta para convertir tu desayuno en un momento especial. 100 % natural y sin conservantes.',
      icon: <PiOrange className='h-6 w-6' />,
    },
  ],
};

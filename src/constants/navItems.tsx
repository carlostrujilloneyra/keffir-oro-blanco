import {
  BlueberryIcon,
  ChocolateIcon,
  CowIcon,
  FruitIcon,
  GoatIcon,
  KefirAguaIcon,
  KombuchaIcon,
  PigIcon,
  StrawberryIcon,
} from '@/components/ui/icons';

export type NavSlug = 'probioticos' | 'tradicionales';

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
    label: 'Probióticos',
    href: '/categorias/probioticos', //kefir de agua, kefir de leche, kombucha
    slug: 'probioticos',
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
  probioticos: [
    {
      label: 'Kéfir de leche (vaca o cabra)',
      href: '/categorias/kefir-natural',
      description:
        'Kéfir de leche de vaca o cabra. Probiótico natural, cremoso y lleno de beneficios para tu salud intestinal. 100% artesanal, sin aditivos',
      icon: <CowIcon className='h-6 w-6' />,
    },

    {
      label: 'Kéfir de Leche de Sabores',
      href: '/categorias/kefir-frutado',
      description:
        'La cremosidad del kéfir con un toque de sabor. Elige entre fresa, arándanos, aguaymanto y chocolate.',
      icon: <ChocolateIcon className='h-6 w-6' />,
    },

    {
      label: 'Kéfir de agua',
      href: '/categorias/kefir-de-agua',
      description:
        'Refrescante y probiótico natural, fermentado con granos de kéfir para fortalecer tu digestión e inmunidad. Sin conservantes, lleno de beneficios y con un toque burbujeante.',
      icon: <KefirAguaIcon className='h-6 w-6' />,
    },

    {
      label: 'Kombucha',
      href: '',
      description:
        'Bebida ancestral fermentada con té y cultivos vivos. Refrescante, burbujeante y llena de probióticos que nutren tu digestión y elevan tu bienestar de forma natural.',
      icon: <KombuchaIcon className='h-6 w-6' />,
    },
  ],

  tradicionales: [
    {
      label: 'Manteca de cerdo',
      href: '',
      description:
        'Manteca 100% natural y artesanal, ideal para cocinar, freír y hornear. Aporta un sabor auténtico y es una alternativa saludable a los aceites procesados.',
      icon: <PigIcon className='h-6 w-6' />,
    },

    {
      label: 'Mermelada de Quito Quito',
      href: '',
      description:
        'Explosión de sabor andino elaborada con frutos de Quito Quito traídos directamente de Oxapampa. Dulce y suave, perfecta para convertir tu desayuno en un momento especial. 100 % natural y sin conservantes.',
      icon: <FruitIcon className='h-6 w-6' />,
    },
  ],
};

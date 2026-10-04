import {
  ButterIcon,
  CheeseIcon,
  CowIcon,
  FruitIcon,
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

/*
  Atajo a un producto concreto dentro de la subcategoría. Se queda en el nivel
  de sabor o tipo, nunca en la talla: esa la resuelve el SizeSelector de la
  página de producto. Bajar hasta las tallas metería el catálogo entero en el
  header.
*/
interface SubMenuChip {
  label: string;
  href: string;
}

interface SubMenuItem {
  label: string;
  href: string;
  description?: string;
  icon?: React.ReactNode;
  chips?: SubMenuChip[];
}

export const NAV_ITEMS: NavItem[] = [
  {
    label: 'Probióticos',
    href: '/categorias/probioticos',
    slug: 'probioticos',
    hasSubMenu: true,
  },

  {
    label: 'Tradicionales',
    href: '/categorias/tradicionales',
    slug: 'tradicionales',
    hasSubMenu: true,
  },
];

export const SUB_MENUS_ITEMS: Partial<Record<NavSlug, SubMenuItem[]>> = {
  probioticos: [
    {
      label: 'Kéfir de leche natural',
      href: '/categorias/probioticos/kefir-natural',
      description: 'De vaca y de cabra, sin fruta ni azúcar añadida. En 1 L, 475 ml y 250 ml.',
      icon: <CowIcon className='h-6 w-6' />,
      chips: [
        { label: 'Vaca', href: '/products/kefir-leche-vaca-1lt' },
        { label: 'Cabra', href: '/products/kefir-leche-cabra-1lt' },
      ],
    },
    {
      label: 'Kéfires frutados',
      href: '/categorias/probioticos/kefir-frutado',
      description: 'La cremosidad del kéfir con pulpa de fruta real, endulzado con stevia.',
      icon: <FruitIcon className='h-6 w-6' />,
      chips: [
        { label: 'Fresa', href: '/products/kefir-pulpa-fresa-475ml' },
        { label: 'Arándanos', href: '/products/kefir-pulpa-arandanos-475ml' },
        { label: 'Aguaymanto', href: '/products/kefir-aguaymanto-475ml' },
        { label: 'Frutos del bosque', href: '/products/kefir-frutos-bosque-475ml' },
        { label: 'Chocolate', href: '/products/kefir-chocolate-475ml' },
      ],
    },
    {
      label: 'Kéfir de agua',
      href: '/categorias/probioticos/kefir-de-agua',
      description: 'Refrescante, burbujeante y sin lácteos. Probióticos vivos para quien no tolera la leche.',
      icon: <KefirAguaIcon className='h-6 w-6' />,
    },
    {
      label: 'Kombucha',
      href: '/categorias/probioticos/kombucha',
      description: 'Té fermentado con cultivos vivos. Ligera, burbujeante y sin conservantes.',
      icon: <KombuchaIcon className='h-6 w-6' />,
    },
    {
      label: 'Fermentados',
      href: '/categorias/probioticos/fermentados',
      description: 'Fermentados de mesa con probióticos naturales, para acompañar y untar.',
      icon: <CheeseIcon className='h-6 w-6' />,
      chips: [
        { label: 'Chucrut morado', href: '/products/chucrut-morado' },
        { label: 'Crema de kéfir', href: '/products/crema-de-kefir-aceituna' },
      ],
    },
  ],

  tradicionales: [
    {
      label: 'Manteca de cerdo',
      href: '/categorias/tradicionales/manteca-de-cerdo',
      description: '100% natural y artesanal, para cocinar, freír y hornear. En cuatro presentaciones.',
      icon: <PigIcon className='h-6 w-6' />,
    },
    {
      label: 'Mermeladas',
      href: '/categorias/tradicionales/mermeladas',
      description: 'Fruta cocida despacio, sin conservantes. Nada más.',
      icon: <StrawberryIcon className='h-6 w-6' />,
      chips: [
        { label: 'De fresa', href: '/products/mermelada-fresa-200g' },
        { label: 'Quito quito', href: '/products/mermelada-quito-quito-200g' },
      ],
    },
    {
      label: 'Despensa',
      href: '/categorias/tradicionales/despensa',
      description: 'Los básicos de la cocina, con procedencia.',
      icon: <ButterIcon className='h-6 w-6' />,
      chips: [
        { label: 'Sal de Maras', href: '/products/sal-de-maras' },
        { label: 'Vinagre de manzana', href: '/products/vinagre-de-manzana' },
      ],
    },
  ],
};

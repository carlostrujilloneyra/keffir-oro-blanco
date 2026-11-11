import { CheeseIcon, CowIcon, FruitIcon, KombuchaIcon, PigIcon, StrawberryIcon } from '@/components/ui/icons';
import {
  allProducts,
  categoryDetails,
  getCategoryPack,
  getDefaultVariant,
  getProductGroups,
  getProductShortName,
  getSizeVariants,
  getSubcategoryProducts,
  ProductCategory,
  subcategoryDetails,
  type Pack,
  type Product,
  type SubcategoryDetail,
  type SubcategorySlug,
} from '@/features/products';
import { getCategoryUrl, getProductUrl, getSubcategoryUrl } from '@/lib/routes';

export type NavSlug = ProductCategory;

interface NavItem {
  label: string;
  href: string;
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

export interface SubMenuEntry {
  label: string;
  href: string;
  description?: string;
  icon?: React.ReactNode;
  chips: SubMenuChip[];
}

export interface SubMenuGroup {
  /* Sin título cuando la categoría no mezcla productos con y sin lácteos. */
  title?: string;
  entries: SubMenuEntry[];
}

export interface SubMenu {
  /* Menú móvil: los mismos grupos que el panel de escritorio, uno tras otro. */
  groups: SubMenuGroup[];
  /*
    Panel de escritorio: columnas de grupos. Las subcategorías mixtas salen de
    "Con lácteos" / "Sin lácteos" y van una sola vez, con todos sus chips, a un
    grupo propio al pie de la segunda columna.
  */
  columns: SubMenuGroup[][];
  pack?: Pack;
  /* Productos distintos de la categoría (no tallas), para "Ver los N productos". */
  total: number;
}

export const NAV_ITEMS: NavItem[] = Object.values(ProductCategory).map((category) => ({
  label: categoryDetails[category].title,
  href: getCategoryUrl(category),
  slug: category,
}));

/* Icono por subcategoría: es lo único del menú que no sale de los datos. */
const subcategoryIcons: Record<SubcategorySlug, React.ReactNode> = {
  'kefir-natural': <CowIcon className='h-6 w-6' />,
  'kefir-frutado': <FruitIcon className='h-6 w-6' />,
  'kombucha-y-kefir-de-agua': <KombuchaIcon className='h-6 w-6' />,
  fermentados: <CheeseIcon className='h-6 w-6' />,
  'para-cocinar': <PigIcon className='h-6 w-6' />,
  mermeladas: <StrawberryIcon className='h-6 w-6' />,
};

type ProductFilter = (product: Product) => boolean;

/* Entrada de una subcategoría con solo los productos que pasan el filtro (null si no queda ninguno). */
const buildEntry = (sub: SubcategoryDetail, keep: ProductFilter): SubMenuEntry | null => {
  const products = getSubcategoryProducts(sub).filter(keep);
  if (products.length === 0) return null;

  /* Un chip por producto (no por talla); los que aún no se venden no llevan atajo. */
  const chips = getProductGroups(products)
    .map(({ product }) => getDefaultVariant(getSizeVariants(product)))
    .filter((variant) => variant.availability !== 'coming-soon' && variant.availability !== 'sold-out')
    .map((variant) => ({ label: getProductShortName(variant), href: getProductUrl(variant.slug) }));

  return {
    label: sub.title,
    href: getSubcategoryUrl(sub.category, sub.slug),
    description: sub.description,
    icon: subcategoryIcons[sub.slug],
    chips,
  };
};

const buildGroup = (subs: SubcategoryDetail[], keep: ProductFilter, title?: string): SubMenuGroup => ({
  title,
  entries: subs.map((sub) => buildEntry(sub, keep)).filter((entry): entry is SubMenuEntry => entry !== null),
});

/* Si la categoría mezcla productos con y sin lácteos, el menú se parte en dos grupos (ayuda a intolerantes). */
const mixesDairy = (products: Product[]) => products.some((p) => p.containsDairy) && products.some((p) => !p.containsDairy);

const buildSubMenu = (category: ProductCategory): SubMenu => {
  const subs = subcategoryDetails.filter((sub) => sub.category === category);
  const products = allProducts.filter((product) => product.category === category);
  const splitByDairy = mixesDairy(products);

  const mixedSubs = subs.filter((sub) => mixesDairy(getSubcategoryProducts(sub)));
  const pureSubs = subs.filter((sub) => !mixedSubs.includes(sub));
  const columns = splitByDairy
    ? [
        [buildGroup(pureSubs, (p) => !!p.containsDairy, 'Con lácteos')],
        [
          buildGroup(pureSubs, (p) => !p.containsDairy, 'Sin lácteos'),
          buildGroup(mixedSubs, () => true, 'Con y sin lácteos'),
        ],
      ]
        .map((column) => column.filter((group) => group.entries.length > 0))
        .filter((column) => column.length > 0)
    : [[buildGroup(subs, () => true)]];

  return {
    groups: columns.flat(),
    columns,
    pack: getCategoryPack(category),
    total: getProductGroups(products).length,
  };
};

export const SUB_MENUS = Object.fromEntries(
  Object.values(ProductCategory).map((category) => [category, buildSubMenu(category)]),
) as Record<NavSlug, SubMenu>;

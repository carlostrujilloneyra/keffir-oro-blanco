import Link from 'next/link';
import { getProductUrl } from '@/lib/getProductUrl';
import { ReactNode } from 'react';

interface ProductLinkProps {
  slug: string;
  children: ReactNode;
  className?: string;
}

/**
 * Componente para enlazar a páginas de productos usando el slug
 *
 * @example
 * <ProductLink slug="sal-rosada-de-maras-cusco">
 *   Ver producto
 * </ProductLink>
 */
export function ProductLink({ slug, children, className }: ProductLinkProps) {
  return (
    <Link href={getProductUrl(slug)} className={className}>
      {children}
    </Link>
  );
}

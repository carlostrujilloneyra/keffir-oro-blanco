# Rutas de Productos Generadas

Este documento lista todas las rutas de productos que se generan automáticamente en build time usando `generateStaticParams`.

## Rutas Disponibles

### Productos Tradicionales

1. **Sal rosada de Maras, Cusco**

   - Ruta: `/products/sal-rosada-de-maras-cusco`
   - Slug: `sal-rosada-de-maras-cusco`
   - ID: `prod_001`

2. **Manteca de Cerdo Artesanal**

   - Ruta: `/products/manteca-de-cerdo-artesanal`
   - Slug: `manteca-de-cerdo-artesanal`
   - ID: `prod_002`

3. **Vinagre de Manzana**
   - Ruta: `/products/vinagre-de-manzana`
   - Slug: `vinagre-de-manzana`
   - ID: `prod_003`

### Productos Probióticos

4. **Kéfir de leche de Vaca 1 LT**

   - Ruta: `/products/kefir-de-leche-de-vaca-1-lt`
   - Slug: `kefir-de-leche-de-vaca-1-lt`
   - ID: `prod_005`

5. **Kéfir de leche de Vaca 475ml**

   - Ruta: `/products/kefir-de-leche-de-vaca-475ml`
   - Slug: `kefir-de-leche-de-vaca-475ml`
   - ID: `prod_006`

6. **Kéfir de Leche de Cabra 1 LT**

   - Ruta: `/products/kefir-de-leche-de-cabra-1-lt`
   - Slug: `kefir-de-leche-de-cabra-1-lt`
   - ID: `prod_007`

7. **Kéfir de leche de vaca con Arándanos 475ml**

   - Ruta: `/products/kefir-de-leche-de-vaca-con-arandanos-475ml`
   - Slug: `kefir-de-leche-de-vaca-con-arandanos-475ml`
   - ID: `prod_008`

8. **Kéfir de leche de vaca con Fresa 475ml**

   - Ruta: `/products/kefir-de-leche-de-vaca-con-fresa-475ml`
   - Slug: `kefir-de-leche-de-vaca-con-fresa-475ml`
   - ID: `prod_009`

9. **Kéfir de leche de vaca con Aguaymanto 475ml**

   - Ruta: `/products/kefir-de-leche-de-vaca-con-aguaymanto-475ml`
   - Slug: `kefir-de-leche-de-vaca-con-aguaymanto-475ml`
   - ID: `prod_010`

10. **Kefir de leche de vaca con Chocolate**

    - Ruta: `/products/kefir-de-leche-de-vaca-con-chocolate`
    - Slug: `kefir-de-leche-de-vaca-con-chocolate`
    - ID: `prod_011`

11. **Kéfir de Agua**

    - Ruta: `/products/kefir-de-agua`
    - Slug: `kefir-de-agua`
    - ID: `prod_012`

12. **Chucrut Morado Fermentado**

    - Ruta: `/products/chucrut-morado-fermentado`
    - Slug: `chucrut-morado-fermentado`
    - ID: `prod_013`

13. **Crema de Kéfir con aceitunas**
    - Ruta: `/products/crema-de-kefir-con-aceitunas`
    - Slug: `crema-de-kefir-con-aceitunas`
    - ID: `prod_014`

## Cómo Funciona

1. **generateStaticParams**: Next.js genera todas estas rutas en build time
2. **Búsqueda por slug**: La página busca el producto usando el slug del parámetro de la URL
3. **404 automático**: Si el slug no existe, se muestra la página 404 de Next.js
4. **SEO optimizado**: Cada página tiene metadata dinámica con título, descripción e imágenes

## Ejemplo de Uso

```typescript
import { getProductUrl } from '@/lib/getProductUrl';

// Generar URL de producto
const url = getProductUrl('sal-rosada-de-maras-cusco');
// Resultado: "/products/sal-rosada-de-maras-cusco"
```

## Agregar Nuevos Productos

Para agregar un nuevo producto:

1. Agrega el producto a `src/features/products/data/products.tsx`
2. Asegúrate de incluir el campo `slug` usando `generateSlug(title)`
3. Next.js generará automáticamente la ruta en el próximo build

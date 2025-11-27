# Generación de Slugs

## ¿Qué es un slug?

Un slug es una versión URL-friendly de un texto, típicamente usado en URLs para identificar recursos de manera legible.

## Función `generateSlug`

La función `generateSlug` convierte cualquier texto en un slug válido siguiendo estas reglas:

1. Convierte todo a minúsculas
2. Elimina acentos y caracteres especiales
3. Reemplaza espacios con guiones
4. Elimina caracteres no alfanuméricos (excepto guiones)

## Ejemplos de uso

```typescript
import { generateSlug } from '@/lib/generateSlug';

// Ejemplo 1: Producto con acentos
generateSlug('Kéfir de leche de Vaca 1 LT');
// Resultado: "kefir-de-leche-de-vaca-1-lt"

// Ejemplo 2: Producto con comas y caracteres especiales
generateSlug('Sal rosada de Maras, Cusco');
// Resultado: "sal-rosada-de-maras-cusco"

// Ejemplo 3: Producto con números
generateSlug('Kéfir de leche de vaca con Arándanos 475ml');
// Resultado: "kefir-de-leche-de-vaca-con-arandanos-475ml"
```

## Uso en productos

Cada producto en `src/features/products/data/products.tsx` tiene un campo `slug` generado automáticamente:

```typescript
{
  id: 'prod_001',
  name: 'sal-de-maras',
  slug: generateSlug('Sal rosada de Maras, Cusco'), // "sal-rosada-de-maras-cusco"
  title: 'Sal rosada de Maras, Cusco',
  // ... otros campos
}
```

## Beneficios

- **SEO-friendly**: URLs limpias y descriptivas
- **Consistencia**: Todos los slugs siguen el mismo formato
- **Automático**: No necesitas escribir manualmente cada slug
- **Sin errores**: Elimina problemas con caracteres especiales en URLs

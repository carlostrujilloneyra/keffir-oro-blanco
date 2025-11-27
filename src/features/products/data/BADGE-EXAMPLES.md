# Ejemplos de Uso de Badges

## 🏷️ Badges Disponibles

### Badges de Popularidad

```typescript
tags: ['new', 'best-seller', 'recommended'];
```

- **new**: "Nuevo" - Producto recién agregado
- **best-seller**: "Más vendido" - Uno de los más populares
- **recommended**: "Recomendado" - Recomendado por expertos
- **main-product**: "Destacado" - Producto destacado
- **discover**: "Descubre" - Descubre este producto

### Badges de Salud y Beneficios

```typescript
tags: ['fresh', 'probiotic', 'healthy', 'natural'];
```

- **fresh**: "Producto Fresco" - Producto fresco y de calidad
- **probiotic**: "Alto en Probióticos" - Rico en probióticos
- **healthy**: "Saludable" - Opción saludable y nutritiva
- **natural**: "100% Natural" - Sin aditivos ni conservantes
- **organic**: "Orgánico" - Certificado orgánico
- **sugar-free**: "Sin Azúcar Añadida" - Sin azúcares añadidos
- **lactose-free**: "Sin Lactosa" - Apto para intolerantes
- **vegan**: "Vegano" - Producto 100% vegano

### Badges de Características

```typescript
tags: ['artisan', 'local', 'limited', 'seasonal'];
```

- **artisan**: "Artesanal" - Elaborado artesanalmente
- **local**: "Producto Local" - Producido localmente
- **limited**: "Edición Limitada" - Disponibilidad limitada
- **seasonal**: "De Temporada" - Producto de temporada

## 📝 Ejemplos de Productos

### Kéfir de Leche de Vaca

```typescript
{
  id: 'prod_005',
  title: 'Kéfir de leche de Vaca 1 LT',
  tags: ['best-seller', 'recommended', 'fresh', 'probiotic', 'healthy'],
  // ...
}
```

**Resultado**: Muestra badges de "Más vendido", "Recomendado", "Producto Fresco", "Alto en Probióticos", "Saludable"

### Kéfir de Agua (Vegano)

```typescript
{
  id: 'prod_012',
  title: 'Kéfir de Agua',
  tags: ['recommended', 'probiotic', 'vegan', 'lactose-free', 'natural'],
  // ...
}
```

**Resultado**: Muestra badges de "Recomendado", "Alto en Probióticos", "Vegano", "Sin Lactosa", "100% Natural"

### Sal de Maras

```typescript
{
  id: 'prod_001',
  title: 'Sal rosada de Maras, Cusco',
  tags: ['new', 'natural', 'artisan', 'local'],
  // ...
}
```

**Resultado**: Muestra badges de "Nuevo", "100% Natural", "Artesanal", "Producto Local"

### Vinagre de Manzana Orgánico

```typescript
{
  id: 'prod_003',
  title: 'Vinagre de Manzana',
  tags: ['new', 'organic', 'natural', 'healthy', 'sugar-free'],
  // ...
}
```

**Resultado**: Muestra badges de "Nuevo", "Orgánico", "100% Natural", "Saludable", "Sin Azúcar Añadida"

### Chucrut Morado

```typescript
{
  id: 'prod_013',
  title: 'Chucrut Morado Fermentado',
  tags: ['recommended', 'discover', 'probiotic', 'natural', 'artisan'],
  // ...
}
```

**Resultado**: Muestra badges de "Recomendado", "Descubre", "Alto en Probióticos", "100% Natural", "Artesanal"

## 🎨 Variantes de Estilo

Los badges usan diferentes variantes de color según su tipo:

- **default**: Badges de popularidad principales (new, best-seller)
- **secondary**: Badges de salud y beneficios (fresh, probiotic, healthy)
- **stone**: Badges de características naturales (natural, organic, artisan, vegan)
- **outline**: Badges de características especiales (discover, sugar-free, lactose-free, local, seasonal)
- **destructive**: Badges de urgencia (limited)

## 💡 Recomendaciones de Uso

### Para Kéfires y Probióticos:

```typescript
tags: ['probiotic', 'fresh', 'healthy', 'natural'];
```

### Para Productos Veganos:

```typescript
tags: ['vegan', 'lactose-free', 'natural', 'healthy'];
```

### Para Productos Artesanales:

```typescript
tags: ['artisan', 'natural', 'local'];
```

### Para Productos Orgánicos:

```typescript
tags: ['organic', 'natural', 'healthy', 'sugar-free'];
```

### Para Ediciones Limitadas:

```typescript
tags: ['limited', 'seasonal', 'discover'];
```

## 🔧 Cómo Agregar Badges a un Producto

1. Abre `src/features/products/data/products.tsx`
2. Encuentra tu producto
3. Agrega o modifica el array `tags`:

```typescript
{
  id: 'prod_XXX',
  title: 'Mi Producto',
  tags: ['probiotic', 'fresh', 'healthy'], // ← Agrega aquí
  // ... resto de propiedades
}
```

4. Los badges se mostrarán automáticamente en:
   - Página de detalle del producto
   - Tarjetas de producto (si se implementa)
   - Listados de productos

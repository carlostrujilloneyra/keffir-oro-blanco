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

- **fresh**: "Producto fresco" - Producto fresco y de calidad
- **probiotic**: "Alto en probióticos" - Rico en probióticos
- **healthy**: "Saludable" - Opción saludable y nutritiva
- **natural**: "100% natural" - Sin aditivos ni conservantes
- **organic**: "Orgánico" - Certificado orgánico
- **sugar-free**: "Sin azúcar añadida" - Sin azúcares añadidos
- **lactose-free**: "Fácil digestión" — no usar en kéfir: tiene lactosa reducida, no es sin lactosa
- **vegan**: "Vegano" - Producto 100% vegano

### Badges de Características

```typescript
tags: ['artisan', 'local', 'limited', 'seasonal'];
```

- **artisan**: "Artesanal" - Elaborado artesanalmente
- **local**: "Producto local" - Producido localmente
- **limited**: "Edición limitada" - Disponibilidad limitada
- **seasonal**: "De temporada" - Producto de temporada

## 📝 Ejemplos de Productos

### Kéfir de leche de vaca (1 L)

```typescript
{ id: 'kefir-vaca-1l', size: '1 L', price: 24.0, tags: ['probiotic', 'best-seller'] }
```

**Resultado**: Muestra badges de "Más vendido" y "Alto en probióticos"

### Kéfir de agua (vegano)

```typescript
{ id: 'kefir-agua-1l', size: '1 L', price: 19.0, tags: ['recommended', 'best-seller', 'vegan', 'probiotic'] }
```

**Resultado**: Muestra badges de "Recomendado", "Más vendido", "Vegano", "Alto en probióticos"

### Sal de Maras

```typescript
{ id: 'sal-de-maras', price: 19, tags: ['new', 'natural', 'artisan'] }
```

**Resultado**: Muestra badges de "Nuevo", "100% natural", "Artesanal"

### Kombucha natural (1 L)

```typescript
{ id: 'kombucha-1l', size: '1 L', price: 21.5, tags: ['new', 'vegan', 'probiotic'] }
```

**Resultado**: Muestra badges de "Nuevo", "Vegano", "Alto en probióticos"

### Chucrut morado

```typescript
{ id: 'chucrut-morado', price: 14, tags: ['recommended', 'discover', 'vegan', 'natural', 'probiotic'] }
```

**Resultado**: Muestra badges de "Recomendado", "Descubre", "Vegano", "100% natural", "Alto en probióticos"

### Próximamente

No es un tag: se activa con `availability: 'coming-soon'` en la variante. El badge "Próximamente" va primero y reemplaza a "Nuevo" si lo tiene.

```typescript
{ id: 'kombucha-pitahaya', size: '355 ml', price: 14.0, tags: ['new', 'limited', 'vegan', 'probiotic'], availability: 'coming-soon' }
```

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
tags: ['vegan', 'natural'];
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
2. Encuentra la familia del producto y su variante (talla) dentro de `variants`
3. Agrega o modifica el array `tags` de esa variante:

```typescript
{ id: 'kefir-vaca-475', size: '475 ml', price: 14.0, tags: ['probiotic', 'fresh'] } // ← Agrega aquí
```

4. Los badges se mostrarán automáticamente en:
   - Página de detalle del producto
   - Tarjetas de producto (si se implementa)
   - Listados de productos

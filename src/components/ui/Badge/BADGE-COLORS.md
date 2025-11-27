# Guía de Colores de Badges

## 🎨 Paleta de Colores Vivos y Naturales

### Badges de Popularidad (Colores Cálidos y Llamativos)

- **`new`** → 🟠 Naranja (`orange-500`) - Energético y llamativo
- **`bestseller`** → 🟡 Ámbar (`amber-500`) - Dorado y premium
- **`recommended`** → 🟢 Verde Esmeralda (`emerald-600`) - Confianza y calidad

### Badges de Salud (Colores Frescos y Naturales)

- **`fresh`** → 🔵 Cyan (`cyan-500`) - Fresco como el agua
- **`probiotic`** → 🔷 Azul (`blue-600`) - Salud y bienestar
- **`healthy`** → 🟢 Verde (`green-600`) - Vida y salud

### Badges de Naturaleza (Verdes Vibrantes)

- **`natural`** → 🟩 Lima (`lime-600`) - Natural y orgánico
- **`organic`** → 🌿 Verde Oscuro (`green-700`) - Orgánico certificado
- **`vegan`** → 💚 Esmeralda Oscuro (`emerald-700`) - Vegano y ético

### Badges Artesanales (Colores Tierra)

- **`artisan`** → 🟤 Ámbar Oscuro (`amber-700`) - Artesanal y tradicional
- **`local`** → 🟨 Amarillo (`yellow-600`) - Local y cercano

### Badges Especiales (Colores Suaves)

- **`sugar-free`** → 🌸 Rosa Suave (`pink-100/800`) - Delicado y saludable
- **`lactose-free`** → 💜 Púrpura Suave (`purple-100/800`) - Especial y cuidadoso
- **`limited`** → 🔴 Rojo (`red-600`) - Urgencia y exclusividad
- **`seasonal`** → 🍊 Naranja Suave (`orange-100/800`) - Temporal y especial

## 📊 Ejemplos Visuales

### Producto Kéfir de Leche

```
[Más vendido] [Recomendado] [Producto Fresco] [Alto en Probióticos] [Saludable]
   🟡 Ámbar     🟢 Esmeralda      🔵 Cyan           🔷 Azul          🟢 Verde
```

### Producto Kéfir de Agua (Vegano)

```
[Recomendado] [Alto en Probióticos] [Vegano] [Sin Lactosa] [100% Natural]
  🟢 Esmeralda       🔷 Azul         💚 Verde    💜 Púrpura     🟩 Lima
```

### Producto Sal de Maras

```
[Nuevo] [100% Natural] [Artesanal] [Producto Local]
 🟠 Naranja   🟩 Lima      🟤 Ámbar     🟨 Amarillo
```

## 🎯 Filosofía de Colores

### Colores Vivos (Con sombra)

- Transmiten energía, frescura y vitalidad
- Perfectos para productos naturales y artesanales
- Destacan en la página sin ser agresivos

### Colores Suaves (Sin sombra)

- Para características especiales o dietéticas
- Más sutiles pero informativos
- Complementan sin competir con los principales

### Hover Effects

- Todos los badges se oscurecen ligeramente al pasar el mouse
- Indica interactividad y mejora la UX
- Mantiene la coherencia visual

## 💡 Recomendaciones de Uso

### Para Productos Probióticos:

```typescript
tags: ['probiotic', 'fresh', 'healthy'];
// 🔷 Azul + 🔵 Cyan + 🟢 Verde = Frescura y salud
```

### Para Productos Artesanales:

```typescript
tags: ['artisan', 'natural', 'local'];
// 🟤 Ámbar + 🟩 Lima + 🟨 Amarillo = Tierra y tradición
```

### Para Productos Veganos:

```typescript
tags: ['vegan', 'natural', 'healthy'];
// 💚 Esmeralda + 🟩 Lima + 🟢 Verde = Naturaleza pura
```

### Para Productos Nuevos:

```typescript
tags: ['new', 'recommended', 'organic'];
// 🟠 Naranja + 🟢 Esmeralda + 🌿 Verde = Novedad y calidad
```

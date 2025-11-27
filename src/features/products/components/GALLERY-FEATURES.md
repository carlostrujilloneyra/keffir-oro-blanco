# ProductImageGallery - Características

## 🎯 Funcionalidades Implementadas

### Mobile

✅ **Carrusel infinito** con loop automático
✅ **Flechas de navegación** (izquierda/derecha) con animaciones
✅ **Autoplay** que se pausa al interactuar
✅ **Indicadores de página** (puntos) en la parte inferior
✅ **Miniaturas clickeables** debajo del carrusel
✅ **Indicador visual** en la miniatura activa (borde destacado)
✅ **Transiciones suaves** entre imágenes

### Desktop

✅ Mismas características que mobile
✅ Grid de miniaturas más amplio (5 columnas en tablet+)
✅ Hover effects en miniaturas

## 🎨 Características de Diseño

### Carrusel Principal

- Aspecto cuadrado (1:1)
- Fondo gris claro
- Bordes redondeados
- Imágenes en modo `object-contain` (no se recortan)

### Flechas de Navegación

- Botones circulares blancos con sombra
- Iconos de Lucide React
- Animaciones de hover y click
- Posicionadas a los lados del carrusel

### Miniaturas

- Grid responsive (4 columnas mobile, 5 en tablet+)
- Borde destacado en la imagen activa
- Opacidad reducida en inactivas
- Hover effect para mejor UX

### Indicadores de Página

- Puntos blancos en la parte inferior
- Punto activo más grande y opaco
- Bullets dinámicos (se adaptan al número de imágenes)

## 📱 Comportamiento

1. **Al cargar**: Muestra la primera imagen
2. **Autoplay**: Cambia automáticamente cada 3 segundos
3. **Al hacer swipe**: Navega a la siguiente/anterior imagen
4. **Al hacer click en flecha**: Navega manualmente
5. **Al hacer click en miniatura**: Salta a esa imagen específica
6. **Al interactuar**: Pausa el autoplay temporalmente

## 🔧 Uso

```tsx
import { ProductImageGallery } from '@/features/products/components/ProductImageGallery';

// Preparar array de imágenes
const images = [product.featuredImage, ...product.galleryImages].filter(Boolean);

// Usar el componente
<ProductImageGallery images={images} productTitle={product.title} />;
```

## ⚙️ Configuración

Puedes ajustar estos valores en el componente:

- **Velocidad de autoplay**: `delay: 3000` (3 segundos)
- **Velocidad de transición**: `speed: 500` (0.5 segundos)
- **Loop**: `loop: true` (carrusel infinito)
- **Pausa en hover**: `pauseOnMouseEnter: true`

## 🎯 Casos Especiales

- **Una sola imagen**: Muestra imagen estática sin carrusel
- **Sin imágenes**: El componente maneja el array vacío
- **Imágenes faltantes**: Filtra valores null/undefined

## 🚀 Mejoras Futuras Sugeridas

- [ ] Zoom al hacer click en la imagen
- [ ] Lightbox/modal para vista completa
- [ ] Lazy loading para imágenes no visibles
- [ ] Gestos de pinch-to-zoom en mobile
- [ ] Compartir imagen en redes sociales

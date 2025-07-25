# Jorle Fashion Store

Una tienda de moda urbana premium construida con React y Vite.

## 🚀 Características

- **Diseño Premium**: Interfaz elegante y moderna
- **Slider Dinámico**: Hero section con productos destacados
- **Carrito Inteligente**: Gestión completa de productos
- **Filtros Avanzados**: Por tienda, talla y color
- **Responsive**: Optimizado para todos los dispositivos
- **Animaciones**: Micro-interacciones con Framer Motion
- **Psicología del Consumidor**: Elementos que impulsan las ventas

## 🛠️ Tecnologías

- **React 18** - Framework principal
- **Vite** - Build tool y dev server
- **Framer Motion** - Animaciones
- **Lucide React** - Iconos
- **CSS Modules** - Estilos modulares

## 📦 Instalación

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build

# Vista previa de producción
npm run preview
```

## 🏗️ Estructura del Proyecto

```
src/
├── components/          # Componentes React
│   ├── Header.jsx      # Navegación principal
│   ├── Hero.jsx        # Slider principal
│   ├── ProductGrid.jsx # Grid de productos
│   ├── ProductCard.jsx # Tarjeta de producto
│   ├── FilterSidebar.jsx # Filtros
│   ├── CartSidebar.jsx # Carrito lateral
│   ├── ProductModal.jsx # Modal de producto
│   ├── CheckoutModal.jsx # Modal de checkout
│   ├── Pagination.jsx  # Paginación
│   └── ProductSkeleton.jsx # Loading state
├── context/            # Context API
│   ├── CartContext.jsx # Estado del carrito
│   └── ProductContext.jsx # Estado de productos
├── App.jsx            # Componente principal
├── main.jsx          # Punto de entrada
└── index.css         # Estilos globales
```

## 🎨 Características de Diseño

### Slider Principal
- 3 slides rotativos con productos destacados
- Auto-play inteligente cada 5 segundos
- Controles manuales y indicadores
- Gradientes dinámicos y animaciones

### Psicología del Consumidor
- Badges de urgencia y escasez
- Descuentos visuales prominentes
- Prueba social con ratings
- Elementos de confianza

### Responsive Design
- Mobile-first approach
- Breakpoints optimizados
- Touch-friendly en móviles

## 🛒 Funcionalidades

- **Catálogo de Productos**: Grid responsive con filtros
- **Carrito de Compras**: Persistente en localStorage
- **Checkout**: Integración con WhatsApp
- **Búsqueda**: Filtrado en tiempo real
- **Favoritos**: Sistema de wishlist
- **Modal de Producto**: Vista detallada

## 📱 Responsive

- **Desktop**: Grid de 4 columnas
- **Tablet**: Grid de 2-3 columnas
- **Mobile**: Grid de 1 columna

## 🎯 Optimizaciones

- **Lazy Loading**: Imágenes y componentes
- **Code Splitting**: Chunks optimizados
- **Performance**: Animaciones 60fps
- **SEO**: Meta tags y estructura semántica

## 🚀 Deployment

```bash
# Construir para producción
npm run build

# Los archivos estáticos estarán en /dist
```

## 📄 Licencia

MIT License - ver LICENSE file para detalles.

## 👥 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

---

Desarrollado con ❤️ para Jorle Fashion Store
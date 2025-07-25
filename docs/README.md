# Documentación - Jorle Fashion Store

## 📚 Índice

1. [Instalación](#instalación)
2. [Estructura del Proyecto](#estructura-del-proyecto)
3. [Componentes](#componentes)
4. [Contextos](#contextos)
5. [Hooks Personalizados](#hooks-personalizados)
6. [Utilidades](#utilidades)
7. [Estilos](#estilos)
8. [Despliegue](#despliegue)

## 🚀 Instalación

```bash
# Clonar el repositorio
git clone [url-del-repo]

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build
```

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes React
├── context/            # Context API
├── hooks/              # Hooks personalizados
├── utils/              # Funciones utilitarias
├── data/               # Datos simulados
├── services/           # Servicios (API, WhatsApp, etc.)
├── styles/             # Estilos globales
├── assets/             # Recursos estáticos
└── tests/              # Tests unitarios
```

## 🧩 Componentes

### Header
- Navegación principal
- Búsqueda de productos
- Carrito de compras
- Menú móvil

### Hero
- Slider de productos destacados
- Call-to-actions
- Estadísticas sociales

### ProductGrid
- Grid responsive de productos
- Paginación
- Estados de carga

### ProductCard
- Tarjeta individual de producto
- Acciones rápidas
- Información detallada

### FilterSidebar
- Filtros por tienda, talla, color
- Responsive (sidebar/modal)

### CartSidebar
- Carrito lateral
- Gestión de cantidades
- Resumen de compra

### ProductModal
- Vista detallada del producto
- Galería de imágenes
- Información completa

### CheckoutModal
- Proceso de checkout
- Formulario de datos
- Integración WhatsApp

## 🔄 Contextos

### ProductContext
- Estado de productos
- Filtros y búsqueda
- Paginación
- Producto seleccionado

### CartContext
- Items del carrito
- Cantidades y totales
- Persistencia en localStorage

## 🎣 Hooks Personalizados

### useLocalStorage
- Manejo de localStorage
- Sincronización automática
- Manejo de errores

### useDebounce
- Debounce de valores
- Optimización de búsquedas

### useWindowSize
- Tamaño de ventana
- Responsive helpers

### useClickOutside
- Detectar clicks externos
- Cerrar modales/dropdowns

## 🛠️ Utilidades

### helpers.js
- Formateo de precios y fechas
- Validaciones (email, teléfono, cédula)
- Funciones de scroll y clipboard

### constants.js
- Configuración de la app
- Breakpoints responsive
- Colores del tema

## 🎨 Estilos

### Arquitectura CSS
- Variables CSS personalizadas
- Metodología BEM
- Mobile-first approach

### Archivos de Estilo
- `variables.css` - Variables globales
- `animations.css` - Animaciones
- `utilities.css` - Clases utilitarias

## 🚀 Despliegue

### Build de Producción
```bash
npm run build
```

### Hosting Recomendado
- Netlify (automático)
- Vercel (automático)
- Hosting compartido (manual)

### Archivos a Subir
Solo el contenido de la carpeta `dist/`:
- `index.html`
- `assets/` (CSS y JS minificados)
- `.htaccess` (para Apache)

## 🧪 Testing

```bash
# Ejecutar tests
npm run test

# Tests con coverage
npm run test:coverage

# Tests en modo watch
npm run test:watch
```

## 📱 Responsive Design

### Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

### Características
- Mobile-first CSS
- Touch-friendly interfaces
- Optimización de imágenes

## 🔧 Configuración

### Variables de Entorno
Copia `.env.example` como `.env` y configura:
- Información de contacto
- URLs de API
- Configuración de analytics

### Personalización
- Colores en `src/utils/constants.js`
- Fuentes en `index.html`
- Configuración en `vite.config.js`

## 📞 Soporte

Para dudas o problemas:
1. Revisa la documentación
2. Verifica la consola del navegador
3. Consulta los logs del servidor
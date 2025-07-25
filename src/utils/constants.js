// Configuración de la aplicación
export const APP_CONFIG = {
  name: 'Jorle Fashion Store',
  tagline: 'Moda Urbana Premium',
  version: '1.0.0',
  contact: {
    phone: '+593 93 993 1934',
    whatsapp: '593939931934',
    email: 'info@jorlefashion.com'
  }
};

// Configuración de productos
export const PRODUCT_CONFIG = {
  itemsPerPage: 12,
  maxImageSize: 800, // KB
  defaultImage: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=400'
};

// Configuración del carrito
export const CART_CONFIG = {
  maxQuantity: 10,
  storageKey: 'jorle-cart',
  autoSaveDelay: 500 // ms
};

// Configuración de animaciones
export const ANIMATION_CONFIG = {
  duration: {
    fast: 0.2,
    normal: 0.3,
    slow: 0.5
  },
  easing: {
    default: [0.4, 0, 0.2, 1],
    bounce: [0.68, -0.55, 0.265, 1.55]
  }
};

// Breakpoints responsivos
export const BREAKPOINTS = {
  mobile: '480px',
  tablet: '768px',
  desktop: '1024px',
  wide: '1400px'
};

// Colores del tema
export const THEME_COLORS = {
  primary: '#1a1a1a',
  secondary: '#2d2d2d',
  accent: '#10b981',
  danger: '#ef4444',
  warning: '#f59e0b',
  success: '#10b981'
};

// Configuración de filtros
export const FILTER_CONFIG = {
  stores: [
    { 
      id: 1, 
      name: 'Gaviota', 
      location: 'Centro',
      address: 'Av. 9 de Octubre 1234, Centro Comercial Gaviota, Local 45',
      phone: '+593 4 234-5678',
      image: 'https://images.pexels.com/photos/1884584/pexels-photo-1884584.jpeg?auto=compress&cs=tinysrgb&w=800',
      mapUrl: 'https://maps.google.com/?q=-2.1894,-79.8890',
      coordinates: { lat: -2.1894, lng: -79.8890 }
    },
    { 
      id: 2, 
      name: 'Rosales', 
      location: 'Norte',
      address: 'Av. Francisco de Orellana 456, Mall del Sol, Local 78',
      phone: '+593 4 345-6789',
      image: 'https://images.pexels.com/photos/1884583/pexels-photo-1884583.jpeg?auto=compress&cs=tinysrgb&w=800',
      mapUrl: 'https://maps.google.com/?q=-2.1456,-79.8567',
      coordinates: { lat: -2.1456, lng: -79.8567 }
    },
    { 
      id: 3, 
      name: 'Sauces', 
      location: 'Sur',
      address: 'Av. Carlos Julio Arosemena 789, Plaza Lagos, Local 23',
      phone: '+593 4 456-7890',
      image: 'https://images.pexels.com/photos/1884582/pexels-photo-1884582.jpeg?auto=compress&cs=tinysrgb&w=800',
      mapUrl: 'https://maps.google.com/?q=-2.2123,-79.9012',
      coordinates: { lat: -2.2123, lng: -79.9012 }
    }
  ],
  sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  colors: [
    { name: 'negro', label: 'Negro', hex: '#000000' },
    { name: 'azul', label: 'Azul', hex: '#0066CC' },
    { name: 'gris', label: 'Gris', hex: '#808080' },
    { name: 'celeste', label: 'Celeste', hex: '#87CEEB' },
    { name: 'beige', label: 'Beige', hex: '#F5F5DC' },
    { name: 'blanco', label: 'Blanco', hex: '#FFFFFF' }
  ]
};
// Datos simulados de productos para desarrollo
export const mockProducts = [
  {
    pro_id: '1',
    pro_nombre: 'Camiseta Urbana Premium Black Edition',
    pro_precioventa: '29.99',
    imagen_path: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=400',
    pro_talla: 'M',
    pro_color: 'negro',
    stock: ['Tienda Gaviota: 5', 'Tienda Rosales: 3'],
    categoria: 'camisetas',
    descripcion: 'Camiseta premium de algodón 100% con diseño urbano exclusivo.',
    rating: 4.8,
    reviews: 127,
    isNew: true,
    isOnSale: false
  },
  {
    pro_id: '2',
    pro_nombre: 'Hoodie Streetwear Oversized',
    pro_precioventa: '45.99',
    imagen_path: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400',
    pro_talla: 'L',
    pro_color: 'gris',
    stock: ['Tienda Sauces: 8', 'Tienda Gaviota: 2'],
    categoria: 'hoodies',
    descripcion: 'Hoodie oversized con capucha ajustable y bolsillo frontal.',
    rating: 4.9,
    reviews: 89,
    isNew: false,
    isOnSale: true,
    originalPrice: '65.99'
  },
  {
    pro_id: '3',
    pro_nombre: 'Jeans Slim Fit Dark Blue',
    pro_precioventa: '59.99',
    imagen_path: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=400',
    pro_talla: 'L',
    pro_color: 'azul',
    stock: ['Tienda Rosales: 6', 'Tienda Sauces: 4'],
    categoria: 'pantalones',
    descripcion: 'Jeans de corte slim con lavado oscuro y detalles premium.',
    rating: 4.7,
    reviews: 156,
    isNew: false,
    isOnSale: false
  },
  {
    pro_id: '4',
    pro_nombre: 'Chaqueta Bomber Vintage',
    pro_precioventa: '79.99',
    imagen_path: 'https://images.pexels.com/photos/1040424/pexels-photo-1040424.jpeg?auto=compress&cs=tinysrgb&w=400',
    pro_talla: 'XL',
    pro_color: 'negro',
    stock: ['Tienda Gaviota: 3', 'Tienda Rosales: 5'],
    categoria: 'chaquetas',
    descripcion: 'Chaqueta bomber con forro satinado y detalles vintage.',
    rating: 4.6,
    reviews: 73,
    isNew: true,
    isOnSale: true,
    originalPrice: '99.99'
  },
  {
    pro_id: '5',
    pro_nombre: 'Sneakers Urban White',
    pro_precioventa: '89.99',
    imagen_path: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=400',
    pro_talla: '42',
    pro_color: 'blanco',
    stock: ['Tienda Sauces: 7', 'Tienda Gaviota: 9'],
    categoria: 'calzado',
    descripcion: 'Sneakers urbanos con suela de goma y diseño minimalista.',
    rating: 4.9,
    reviews: 234,
    isNew: false,
    isOnSale: false
  },
  {
    pro_id: '6',
    pro_nombre: 'Polo Casual Fit',
    pro_precioventa: '24.99',
    imagen_path: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400',
    pro_talla: 'S',
    pro_color: 'blanco',
    stock: ['Tienda Rosales: 12', 'Tienda Sauces: 8'],
    categoria: 'polos',
    descripcion: 'Polo de algodón piqué con corte regular y logo bordado.',
    rating: 4.5,
    reviews: 98,
    isNew: false,
    isOnSale: true,
    originalPrice: '34.99'
  },
  {
    pro_id: '7',
    pro_nombre: 'Pantalón Cargo Tactical',
    pro_precioventa: '49.99',
    imagen_path: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=400',
    pro_talla: 'M',
    pro_color: 'beige',
    stock: ['Tienda Gaviota: 4', 'Tienda Sauces: 6'],
    categoria: 'pantalones',
    descripcion: 'Pantalón cargo con múltiples bolsillos y ajuste cómodo.',
    rating: 4.4,
    reviews: 67,
    isNew: true,
    isOnSale: false
  },
  {
    pro_id: '8',
    pro_nombre: 'Sudadera Oversize Gray',
    pro_precioventa: '39.99',
    imagen_path: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=400',
    pro_talla: 'XL',
    pro_color: 'gris',
    stock: ['Tienda Rosales: 5', 'Tienda Gaviota: 7'],
    categoria: 'sudaderas',
    descripcion: 'Sudadera oversize de felpa francesa con puños elásticos.',
    rating: 4.8,
    reviews: 145,
    isNew: false,
    isOnSale: false
  },
  {
    pro_id: '9',
    pro_nombre: 'Camisa Denim Classic',
    pro_precioventa: '34.99',
    imagen_path: 'https://images.pexels.com/photos/1040424/pexels-photo-1040424.jpeg?auto=compress&cs=tinysrgb&w=400',
    pro_talla: 'L',
    pro_color: 'azul',
    stock: ['Tienda Sauces: 3', 'Tienda Rosales: 8'],
    categoria: 'camisas',
    descripcion: 'Camisa de denim clásica con botones metálicos y corte regular.',
    rating: 4.6,
    reviews: 112,
    isNew: false,
    isOnSale: true,
    originalPrice: '44.99'
  },
  {
    pro_id: '10',
    pro_nombre: 'Shorts Deportivos Pro',
    pro_precioventa: '19.99',
    imagen_path: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=400',
    pro_talla: 'M',
    pro_color: 'negro',
    stock: ['Tienda Gaviota: 10', 'Tienda Sauces: 6'],
    categoria: 'shorts',
    descripcion: 'Shorts deportivos con tecnología dry-fit y bolsillos laterales.',
    rating: 4.7,
    reviews: 89,
    isNew: true,
    isOnSale: false
  },
  {
    pro_id: '11',
    pro_nombre: 'Blazer Casual Smart',
    pro_precioventa: '69.99',
    imagen_path: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=400',
    pro_talla: 'L',
    pro_color: 'negro',
    stock: ['Tienda Rosales: 2', 'Tienda Gaviota: 4'],
    categoria: 'blazers',
    descripcion: 'Blazer casual de corte moderno con forro interior.',
    rating: 4.5,
    reviews: 56,
    isNew: false,
    isOnSale: false
  },
  {
    pro_id: '12',
    pro_nombre: 'Gorra Snapback Urban',
    pro_precioventa: '15.99',
    imagen_path: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400',
    pro_talla: 'Única',
    pro_color: 'negro',
    stock: ['Tienda Sauces: 15', 'Tienda Rosales: 12'],
    categoria: 'accesorios',
    descripcion: 'Gorra snapback con bordado frontal y visera plana.',
    rating: 4.3,
    reviews: 78,
    isNew: false,
    isOnSale: true,
    originalPrice: '22.99'
  },
  {
    pro_id: '13',
    pro_nombre: 'Tank Top Muscle Fit',
    pro_precioventa: '18.99',
    imagen_path: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=400',
    pro_talla: 'M',
    pro_color: 'blanco',
    stock: ['Tienda Gaviota: 8', 'Tienda Sauces: 5'],
    categoria: 'tank-tops',
    descripcion: 'Tank top de corte muscle fit en algodón premium.',
    rating: 4.4,
    reviews: 92,
    isNew: true,
    isOnSale: false
  },
  {
    pro_id: '14',
    pro_nombre: 'Chinos Slim Beige',
    pro_precioventa: '42.99',
    imagen_path: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=400',
    pro_talla: 'L',
    pro_color: 'beige',
    stock: ['Tienda Rosales: 7', 'Tienda Gaviota: 3'],
    categoria: 'pantalones',
    descripcion: 'Pantalones chinos de corte slim con acabado premium.',
    rating: 4.6,
    reviews: 134,
    isNew: false,
    isOnSale: true,
    originalPrice: '54.99'
  },
  {
    pro_id: '15',
    pro_nombre: 'Zapatillas Running Pro',
    pro_precioventa: '95.99',
    imagen_path: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=400',
    pro_talla: '43',
    pro_color: 'negro',
    stock: ['Tienda Sauces: 4', 'Tienda Rosales: 6'],
    categoria: 'calzado',
    descripcion: 'Zapatillas de running con tecnología de amortiguación avanzada.',
    rating: 4.9,
    reviews: 187,
    isNew: true,
    isOnSale: false
  }
];

// Categorías disponibles
export const categories = [
  { id: 'all', name: 'Todos', count: mockProducts.length },
  { id: 'camisetas', name: 'Camisetas', count: mockProducts.filter(p => p.categoria === 'camisetas').length },
  { id: 'hoodies', name: 'Hoodies', count: mockProducts.filter(p => p.categoria === 'hoodies').length },
  { id: 'pantalones', name: 'Pantalones', count: mockProducts.filter(p => p.categoria === 'pantalones').length },
  { id: 'chaquetas', name: 'Chaquetas', count: mockProducts.filter(p => p.categoria === 'chaquetas').length },
  { id: 'calzado', name: 'Calzado', count: mockProducts.filter(p => p.categoria === 'calzado').length },
  { id: 'accesorios', name: 'Accesorios', count: mockProducts.filter(p => p.categoria === 'accesorios').length }
];

// Productos destacados para el slider
export const featuredProducts = mockProducts.filter(product => 
  product.isNew || product.isOnSale || product.rating >= 4.8
).slice(0, 3);

// Productos más vendidos
export const bestSellers = mockProducts
  .sort((a, b) => b.reviews - a.reviews)
  .slice(0, 6);

// Productos en oferta
export const saleProducts = mockProducts.filter(product => product.isOnSale);

// Productos nuevos
export const newProducts = mockProducts.filter(product => product.isNew);
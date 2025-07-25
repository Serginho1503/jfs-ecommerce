// Mock API to simulate PHP backend functionality
export const mockProducts = [
  {
    pro_id: "GAV001",
    pro_nombre: "Camisa Casual Azul",
    pro_precioventa: 45.99,
    imagen_path: "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=400",
    pro_talla: "M",
    pro_color: "Azul",
    categoria: "Camisas",
    stock: ["Tienda Gaviota: 15", "Tienda Rosales: 8"],
    rating: 4.5,
    reviews: 89,
    isNew: true,
    isOnSale: false
  },
  {
    pro_id: "ROS002",
    pro_nombre: "Pantalón Formal Negro",
    pro_precioventa: 89.99,
    imagen_path: "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=400",
    pro_talla: "32",
    pro_color: "Negro",
    categoria: "Pantalones",
    stock: ["Tienda Rosales: 12", "Tienda Sauces: 5"],
    rating: 4.7,
    reviews: 156,
    isNew: false,
    isOnSale: true
  },
  {
    pro_id: "SAU003",
    pro_nombre: "Vestido Floral Rojo",
    pro_precioventa: 65.50,
    imagen_path: "https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=400",
    pro_talla: "S",
    pro_color: "Rojo",
    categoria: "Vestidos",
    stock: ["Tienda Sauces: 20"],
    rating: 4.3,
    reviews: 67,
    isNew: true,
    isOnSale: false
  },
  {
    pro_id: "GAV004",
    pro_nombre: "Zapatos Deportivos Blancos",
    pro_precioventa: 120.00,
    imagen_path: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=400",
    pro_talla: "42",
    pro_color: "Blanco",
    categoria: "Calzado",
    stock: ["Tienda Gaviota: 7", "Tienda Rosales: 3"],
    rating: 4.8,
    reviews: 234,
    isNew: false,
    isOnSale: true
  },
  {
    pro_id: "ROS005",
    pro_nombre: "Chaqueta de Cuero Marrón",
    pro_precioventa: 199.99,
    imagen_path: "https://images.pexels.com/photos/1124465/pexels-photo-1124465.jpeg?auto=compress&cs=tinysrgb&w=400",
    pro_talla: "L",
    pro_color: "Marrón",
    categoria: "Chaquetas",
    stock: ["Tienda Rosales: 4"],
    rating: 4.6,
    reviews: 98,
    isNew: false,
    isOnSale: false
  },
  {
    pro_id: "SAU006",
    pro_nombre: "Falda Plisada Verde",
    pro_precioventa: 39.99,
    imagen_path: "https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=400",
    pro_talla: "M",
    pro_color: "Verde",
    categoria: "Faldas",
    stock: ["Tienda Sauces: 18", "Tienda Gaviota: 6"],
    rating: 4.2,
    reviews: 45,
    isNew: true,
    isOnSale: true
  },
  {
    pro_id: "GAV007",
    pro_nombre: "Polo Rayado Azul/Blanco",
    pro_precioventa: 32.50,
    imagen_path: "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=400",
    pro_talla: "XL",
    pro_color: "Azul",
    categoria: "Polos",
    stock: ["Tienda Gaviota: 25"],
    rating: 4.4,
    reviews: 78,
    isNew: false,
    isOnSale: false
  },
  {
    pro_id: "ROS008",
    pro_nombre: "Jeans Slim Fit Azul",
    pro_precioventa: 75.00,
    imagen_path: "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=400",
    pro_talla: "30",
    pro_color: "Azul",
    categoria: "Jeans",
    stock: ["Tienda Rosales: 14", "Tienda Sauces: 9"],
    rating: 4.5,
    reviews: 167,
    isNew: false,
    isOnSale: true
  }
];

export const mockApiCall = async (filters = {}) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  let filteredProducts = [...mockProducts];
  
  // Apply search filter
  if (filters.search) {
    filteredProducts = filteredProducts.filter(product =>
      product.pro_nombre.toLowerCase().includes(filters.search.toLowerCase())
    );
  }
  
  // Apply size filter
  if (filters.tallas && filters.tallas.length > 0) {
    filteredProducts = filteredProducts.filter(product =>
      filters.tallas.includes(product.pro_talla)
    );
  }
  
  // Apply color filter
  if (filters.colores && filters.colores.length > 0) {
    filteredProducts = filteredProducts.filter(product =>
      filters.colores.includes(product.pro_color)
    );
  }
  
  // Apply store filter
  if (filters.tiendas && filters.tiendas.length > 0) {
    const storeNames = {
      1: 'Gaviota',
      2: 'Rosales',
      3: 'Sauces'
    };
    
    const selectedStoreNames = filters.tiendas.map(id => storeNames[id]).filter(Boolean);
    
    filteredProducts = filteredProducts.filter(product =>
      product.stock.some(stockInfo =>
        selectedStoreNames.some(storeName =>
          stockInfo.includes(`Tienda ${storeName}:`)
        )
      )
    );
  }
  
  // Pagination
  const page = filters.page || 1;
  const limit = filters.limit || 12;
  const offset = (page - 1) * limit;
  
  const totalProducts = filteredProducts.length;
  const totalPages = Math.ceil(totalProducts / limit);
  const paginatedProducts = filteredProducts.slice(offset, offset + limit);
  
  return {
    success: true,
    products: paginatedProducts,
    pagination: {
      total: totalProducts,
      pages: totalPages,
      current_page: page,
      per_page: limit
    }
  };
};
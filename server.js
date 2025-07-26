const express = require('express');
const cors = require('cors');
const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

// Mock data that simulates your database structure
const mockProducts = [
  {
    pro_id: 'PROD001',
    pro_nombre: 'Camisa Polo Azul',
    pro_precioventa: 45.99,
    imagen_path: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg',
    pro_talla: 'M',
    pro_color: 'Azul',
    stock: ['Tienda Gaviota: 15', 'Tienda Rosales: 8'],
    categoria: 'Camisas',
    rating: 4.5,
    reviews: 23,
    isNew: true,
    isOnSale: false
  },
  {
    pro_id: 'PROD002',
    pro_nombre: 'Pantalón Jean Clásico',
    pro_precioventa: 89.99,
    imagen_path: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg',
    pro_talla: 'L',
    pro_color: 'Negro',
    stock: ['Tienda Sauces: 12', 'Tienda Gaviota: 5'],
    categoria: 'Pantalones',
    rating: 4.2,
    reviews: 45,
    isNew: false,
    isOnSale: true
  },
  {
    pro_id: 'PROD003',
    pro_nombre: 'Vestido Floral',
    pro_precioventa: 65.50,
    imagen_path: 'https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg',
    pro_talla: 'S',
    pro_color: 'Rosa',
    stock: ['Tienda Rosales: 20', 'Tienda Sauces: 7'],
    categoria: 'Vestidos',
    rating: 4.8,
    reviews: 67,
    isNew: true,
    isOnSale: false
  },
  {
    pro_id: 'PROD004',
    pro_nombre: 'Chaqueta de Cuero',
    pro_precioventa: 199.99,
    imagen_path: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg',
    pro_talla: 'XL',
    pro_color: 'Marrón',
    stock: ['Tienda Gaviota: 3', 'Tienda Rosales: 6'],
    categoria: 'Chaquetas',
    rating: 4.6,
    reviews: 34,
    isNew: false,
    isOnSale: true
  },
  {
    pro_id: 'PROD005',
    pro_nombre: 'Falda Plisada',
    pro_precioventa: 39.99,
    imagen_path: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg',
    pro_talla: 'M',
    pro_color: 'Gris',
    stock: ['Tienda Sauces: 18'],
    categoria: 'Faldas',
    rating: 4.3,
    reviews: 28,
    isNew: false,
    isOnSale: false
  },
  {
    pro_id: 'PROD006',
    pro_nombre: 'Suéter de Lana',
    pro_precioventa: 75.00,
    imagen_path: 'https://images.pexels.com/photos/1040424/pexels-photo-1040424.jpeg',
    pro_talla: 'L',
    pro_color: 'Beige',
    stock: ['Tienda Gaviota: 10', 'Tienda Rosales: 14', 'Tienda Sauces: 9'],
    categoria: 'Suéteres',
    rating: 4.7,
    reviews: 52,
    isNew: true,
    isOnSale: false
  },
  {
    pro_id: 'PROD007',
    pro_nombre: 'Blusa Estampada',
    pro_precioventa: 32.50,
    imagen_path: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg',
    pro_talla: 'S',
    pro_color: 'Blanco',
    stock: ['Tienda Rosales: 25'],
    categoria: 'Blusas',
    rating: 4.1,
    reviews: 19,
    isNew: false,
    isOnSale: true
  },
  {
    pro_id: 'PROD008',
    pro_nombre: 'Shorts Deportivos',
    pro_precioventa: 28.99,
    imagen_path: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg',
    pro_talla: 'M',
    pro_color: 'Verde',
    stock: ['Tienda Sauces: 30', 'Tienda Gaviota: 12'],
    categoria: 'Shorts',
    rating: 4.4,
    reviews: 41,
    isNew: true,
    isOnSale: false
  }
];

// API endpoint that mimics your PHP structure
app.get('/api/products.php', (req, res) => {
  try {
    const { search, page = 1, limit = 12 } = req.query;
    const tiendas = req.query['tiendas[]'] ? (Array.isArray(req.query['tiendas[]']) ? req.query['tiendas[]'] : [req.query['tiendas[]']]) : [];
    const tallas = req.query['tallas[]'] ? (Array.isArray(req.query['tallas[]']) ? req.query['tallas[]'] : [req.query['tallas[]']]) : [];
    const colores = req.query['colores[]'] ? (Array.isArray(req.query['colores[]']) ? req.query['colores[]'] : [req.query['colores[]']]) : [];

    let filteredProducts = [...mockProducts];

    // Filter by search term
    if (search && search.trim()) {
      filteredProducts = filteredProducts.filter(product =>
        product.pro_nombre.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filter by tallas
    if (tallas.length > 0) {
      filteredProducts = filteredProducts.filter(product =>
        tallas.includes(product.pro_talla)
      );
    }

    // Filter by colores
    if (colores.length > 0) {
      filteredProducts = filteredProducts.filter(product =>
        colores.includes(product.pro_color)
      );
    }

    // Filter by tiendas
    if (tiendas.length > 0) {
      const tiendaNames = {
        '1': 'Tienda Gaviota',
        '2': 'Tienda Rosales',
        '3': 'Tienda Sauces'
      };
      
      filteredProducts = filteredProducts.filter(product => {
        return tiendas.some(tiendaId => {
          const tiendaName = tiendaNames[tiendaId];
          return product.stock.some(stockInfo => stockInfo.includes(tiendaName));
        });
      });
    }

    // Pagination
    const totalProducts = filteredProducts.length;
    const totalPages = Math.ceil(totalProducts / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + parseInt(limit);
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    // Response in the same format as your PHP API
    res.json({
      success: true,
      products: paginatedProducts,
      pagination: {
        total: totalProducts,
        pages: totalPages,
        current_page: parseInt(page),
        per_page: parseInt(limit)
      }
    });

  } catch (error) {
    console.error('Error in API:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

app.listen(port, () => {
  console.log(`API server running on http://localhost:${port}`);
});
import React, { createContext, useContext, useReducer, useEffect } from 'react';

const ProductContext = createContext();

const productReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      };

    case 'SET_PRODUCTS':
      return {
        ...state,
        products: action.payload,
        loading: false,
        error: null
      };

    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false
      };

    case 'SET_FILTERS':
      return {
        ...state,
        filters: { ...state.filters, ...action.payload },
        currentPage: 1
      };

    case 'SET_SEARCH':
      return {
        ...state,
        searchTerm: action.payload,
        currentPage: 1
      };

    case 'SET_PAGE':
      return {
        ...state,
        currentPage: action.payload
      };

    case 'SET_PAGINATION':
      return {
        ...state,
        totalProducts: action.payload.total,
        totalPages: action.payload.pages
      };

    case 'TOGGLE_FILTER_SIDEBAR':
      return {
        ...state,
        filterSidebarOpen: !state.filterSidebarOpen
      };

    case 'CLOSE_FILTER_SIDEBAR':
      return {
        ...state,
        filterSidebarOpen: false
      };

    case 'SET_SELECTED_PRODUCT':
      return {
        ...state,
        selectedProduct: action.payload
      };

    case 'CLEAR_SELECTED_PRODUCT':
      return {
        ...state,
        selectedProduct: null
      };

    default:
      return state;
  }
};

const initialState = {
  products: [],
  loading: false,
  error: null,
  filters: {
    tiendas: [],
    tallas: [],
    colores: []
  },
  searchTerm: '',
  currentPage: 1,
  totalProducts: 0,
  totalPages: 0,
  filterSidebarOpen: false,
  selectedProduct: null
};

// Mock data for demonstration
const mockProducts = [
  {
    pro_id: '1',
    pro_nombre: 'Camiseta Urbana Premium',
    pro_precioventa: '29.99',
    imagen_path: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=400',
    pro_talla: 'M',
    pro_color: 'Negro',
    stock: ['Tienda Gaviota: 5', 'Tienda Rosales: 3']
  },
  {
    pro_id: '2',
    pro_nombre: 'Hoodie Streetwear',
    pro_precioventa: '45.99',
    imagen_path: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400',
    pro_talla: 'L',
    pro_color: 'Gris',
    stock: ['Tienda Sauces: 8', 'Tienda Gaviota: 2']
  },
  {
    pro_id: '3',
    pro_nombre: 'Jeans Slim Fit',
    pro_precioventa: '59.99',
    imagen_path: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=400',
    pro_talla: 'L',
    pro_color: 'Azul',
    stock: ['Tienda Rosales: 6', 'Tienda Sauces: 4']
  },
  {
    pro_id: '4',
    pro_nombre: 'Chaqueta Bomber',
    pro_precioventa: '79.99',
    imagen_path: 'https://images.pexels.com/photos/1040424/pexels-photo-1040424.jpeg?auto=compress&cs=tinysrgb&w=400',
    pro_talla: 'XL',
    pro_color: 'Negro',
    stock: ['Tienda Gaviota: 3', 'Tienda Rosales: 5']
  },
  {
    pro_id: '5',
    pro_nombre: 'Sneakers Urban',
    pro_precioventa: '89.99',
    imagen_path: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=400',
    pro_talla: '42',
    pro_color: 'Blanco',
    stock: ['Tienda Sauces: 7', 'Tienda Gaviota: 9']
  },
  {
    pro_id: '6',
    pro_nombre: 'Polo Casual',
    pro_precioventa: '24.99',
    imagen_path: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400',
    pro_talla: 'S',
    pro_color: 'Blanco',
    stock: ['Tienda Rosales: 12', 'Tienda Sauces: 8']
  },
  {
    pro_id: '7',
    pro_nombre: 'Pantalón Cargo',
    pro_precioventa: '49.99',
    imagen_path: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=400',
    pro_talla: 'M',
    pro_color: 'Beige',
    stock: ['Tienda Gaviota: 4', 'Tienda Sauces: 6']
  },
  {
    pro_id: '8',
    pro_nombre: 'Sudadera Oversize',
    pro_precioventa: '39.99',
    imagen_path: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=400',
    pro_talla: 'XL',
    pro_color: 'Gris',
    stock: ['Tienda Rosales: 5', 'Tienda Gaviota: 7']
  },
  {
    pro_id: '9',
    pro_nombre: 'Camisa Denim',
    pro_precioventa: '34.99',
    imagen_path: 'https://images.pexels.com/photos/1040424/pexels-photo-1040424.jpeg?auto=compress&cs=tinysrgb&w=400',
    pro_talla: 'L',
    pro_color: 'Azul',
    stock: ['Tienda Sauces: 3', 'Tienda Rosales: 8']
  },
  {
    pro_id: '10',
    pro_nombre: 'Shorts Deportivos',
    pro_precioventa: '19.99',
    imagen_path: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=400',
    pro_talla: 'M',
    pro_color: 'Negro',
    stock: ['Tienda Gaviota: 10', 'Tienda Sauces: 6']
  },
  {
    pro_id: '11',
    pro_nombre: 'Blazer Casual',
    pro_precioventa: '69.99',
    imagen_path: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=400',
    pro_talla: 'L',
    pro_color: 'Negro',
    stock: ['Tienda Rosales: 2', 'Tienda Gaviota: 4']
  },
  {
    pro_id: '12',
    pro_nombre: 'Gorra Snapback',
    pro_precioventa: '15.99',
    imagen_path: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400',
    pro_talla: 'Única',
    pro_color: 'Negro',
    stock: ['Tienda Sauces: 15', 'Tienda Rosales: 12']
  }
];

export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, initialState);

  const fetchProducts = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      let filteredProducts = [...mockProducts];

      // Apply search filter
      if (state.searchTerm) {
        filteredProducts = filteredProducts.filter(product =>
          product.pro_nombre.toLowerCase().includes(state.searchTerm.toLowerCase())
        );
      }

      // Apply store filters
      if (state.filters.tiendas.length > 0) {
        filteredProducts = filteredProducts.filter(product => {
          return state.filters.tiendas.some(tienda => {
            const tiendaNames = ['Gaviota', 'Rosales', 'Sauces'];
            const tiendaName = tiendaNames[tienda - 1];
            return product.stock.some(stockInfo => 
              stockInfo.includes(`Tienda ${tiendaName}`)
            );
          });
        });
      }

      // Apply size filters
      if (state.filters.tallas.length > 0) {
        filteredProducts = filteredProducts.filter(product =>
          state.filters.tallas.includes(product.pro_talla)
        );
      }

      // Apply color filters
      if (state.filters.colores.length > 0) {
        filteredProducts = filteredProducts.filter(product =>
          state.filters.colores.includes(product.pro_color)
        );
      }

      // Pagination
      const productsPerPage = 12;
      const totalProducts = filteredProducts.length;
      const totalPages = Math.ceil(totalProducts / productsPerPage);
      const startIndex = (state.currentPage - 1) * productsPerPage;
      const endIndex = startIndex + productsPerPage;
      const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

      dispatch({ type: 'SET_PRODUCTS', payload: paginatedProducts });
      dispatch({ 
        type: 'SET_PAGINATION', 
        payload: { 
          total: totalProducts, 
          pages: totalPages 
        } 
      });

    } catch (error) {
      console.error('Error fetching products:', error);
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  };

  // Fetch products when filters, search, or page changes
  useEffect(() => {
    fetchProducts();
  }, [state.filters, state.searchTerm, state.currentPage]);

  const setFilters = (newFilters) => {
    dispatch({ type: 'SET_FILTERS', payload: newFilters });
  };

  const setSearch = (searchTerm) => {
    dispatch({ type: 'SET_SEARCH', payload: searchTerm });
  };

  const setPage = (page) => {
    dispatch({ type: 'SET_PAGE', payload: page });
  };

  const toggleFilterSidebar = () => {
    dispatch({ type: 'TOGGLE_FILTER_SIDEBAR' });
  };

  const closeFilterSidebar = () => {
    dispatch({ type: 'CLOSE_FILTER_SIDEBAR' });
  };

  const setSelectedProduct = (product) => {
    dispatch({ type: 'SET_SELECTED_PRODUCT', payload: product });
  };

  const clearSelectedProduct = () => {
    dispatch({ type: 'CLEAR_SELECTED_PRODUCT' });
  };

  const value = {
    products: state.products,
    loading: state.loading,
    error: state.error,
    filters: state.filters,
    searchTerm: state.searchTerm,
    currentPage: state.currentPage,
    totalProducts: state.totalProducts,
    totalPages: state.totalPages,
    filterSidebarOpen: state.filterSidebarOpen,
    selectedProduct: state.selectedProduct,
    setFilters,
    setSearch,
    setPage,
    toggleFilterSidebar,
    closeFilterSidebar,
    setSelectedProduct,
    clearSelectedProduct,
    refetchProducts: fetchProducts
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
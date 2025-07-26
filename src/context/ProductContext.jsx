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

export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, initialState);

  const fetchProducts = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });

    try {
      // Construir URL con parámetros
      const params = new URLSearchParams();
      
      if (state.searchTerm) {
        params.append('search', state.searchTerm);
      }
      
      if (state.filters.tiendas.length > 0) {
        state.filters.tiendas.forEach(tienda => {
          params.append('tiendas[]', tienda);
        });
      }
      
      if (state.filters.tallas.length > 0) {
        state.filters.tallas.forEach(talla => {
          params.append('tallas[]', talla);
        });
      }
      
      if (state.filters.colores.length > 0) {
        state.filters.colores.forEach(color => {
          params.append('colores[]', color);
        });
      }
      
      params.append('page', state.currentPage);
      params.append('limit', 12);

      const response = await fetch(`/api/products.php?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Error desconocido');
      }

      dispatch({ type: 'SET_PRODUCTS', payload: data.products });
      dispatch({ 
        type: 'SET_PAGINATION', 
        payload: { 
          total: data.pagination.total, 
          pages: data.pagination.pages 
        } 
      });

    } catch (error) {
      console.error('Error fetching products:', error);
      dispatch({ type: 'SET_ERROR', payload: `Error al cargar productos: ${error.message}` });
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
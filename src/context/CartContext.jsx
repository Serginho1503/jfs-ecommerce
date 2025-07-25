import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      const existingItem = state.items.find(item => 
        item.pro_id === action.payload.pro_id && 
        item.pro_talla === action.payload.pro_talla && 
        item.pro_color === action.payload.pro_color
      );

      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.pro_id === action.payload.pro_id && 
            item.pro_talla === action.payload.pro_talla && 
            item.pro_color === action.payload.pro_color
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          )
        };
      }

      return {
        ...state,
        items: [...state.items, { ...action.payload, id: Date.now() }]
      };

    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };

    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: Math.max(1, action.payload.quantity) }
            : item
        )
      };

    case 'CLEAR_CART':
      return {
        ...state,
        items: []
      };

    case 'TOGGLE_CART':
      return {
        ...state,
        isOpen: !state.isOpen
      };

    case 'CLOSE_CART':
      return {
        ...state,
        isOpen: false
      };

    case 'OPEN_CART':
      return {
        ...state,
        isOpen: true
      };

    default:
      return state;
  }
};

const initialState = {
  items: [],
  isOpen: false
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('jorle-cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        parsedCart.items.forEach(item => {
          dispatch({ type: 'ADD_ITEM', payload: item });
        });
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('jorle-cart', JSON.stringify(state));
  }, [state]);

  const addItem = (product, quantity = 1) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        pro_id: product.pro_id,
        pro_nombre: product.pro_nombre,
        pro_precioventa: product.pro_precioventa,
        imagen_path: product.imagen_path,
        pro_talla: product.pro_talla,
        pro_color: product.pro_color,
        quantity
      }
    });
  };

  const removeItem = (itemId) => {
    dispatch({ type: 'REMOVE_ITEM', payload: itemId });
  };

  const updateQuantity = (itemId, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: itemId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const toggleCart = () => {
    dispatch({ type: 'TOGGLE_CART' });
  };

  const closeCart = () => {
    dispatch({ type: 'CLOSE_CART' });
  };

  const openCart = () => {
    dispatch({ type: 'OPEN_CART' });
  };

  const getCartTotal = () => {
    return state.items.reduce((total, item) => {
      return total + (parseFloat(item.pro_precioventa) * item.quantity);
    }, 0);
  };

  const getCartItemsCount = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  };

  const value = {
    items: state.items,
    isOpen: state.isOpen,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    toggleCart,
    closeCart,
    openCart,
    getCartTotal,
    getCartItemsCount
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
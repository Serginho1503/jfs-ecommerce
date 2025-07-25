import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './CartSidebar.css';

const CartSidebar = () => {
  const { 
    items, 
    isOpen, 
    closeCart, 
    removeItem, 
    updateQuantity, 
    getCartTotal,
    clearCart 
  } = useCart();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-EC', {
      style: 'currency',
      currency: 'USD'
    }).format(parseFloat(price) || 0);
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(itemId);
    } else {
      updateQuantity(itemId, newQuantity);
    }
  };

  const handleCheckout = () => {
    // This will be handled by the CheckoutModal component
    const checkoutEvent = new CustomEvent('openCheckout');
    window.dispatchEvent(checkoutEvent);
  };

  const cartTotal = getCartTotal();
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="cart-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          />

          {/* Cart Sidebar */}
          <motion.div
            className="cart-sidebar"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
          >
            {/* Cart Header */}
            <div className="cart-header">
              <div className="cart-title">
                <ShoppingBag size={20} />
                <h3>Carrito de Compras</h3>
                {itemCount > 0 && (
                  <span className="cart-count-badge">{itemCount}</span>
                )}
              </div>
              <button className="cart-close-btn" onClick={closeCart}>
                <X size={20} />
              </button>
            </div>

            {/* Cart Content */}
            <div className="cart-content">
              {items.length === 0 ? (
                <div className="cart-empty">
                  <div className="empty-cart-icon">
                    <ShoppingBag size={48} />
                  </div>
                  <h4>Tu carrito está vacío</h4>
                  <p>Agrega algunos productos para comenzar</p>
                  <button className="continue-shopping-btn" onClick={closeCart}>
                    Continuar Comprando
                  </button>
                </div>
              ) : (
                <>
                  {/* Cart Items */}
                  <div className="cart-items">
                    <AnimatePresence>
                      {items.map((item) => (
                        <motion.div
                          key={item.id}
                          className="cart-item"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="cart-item-image">
                            <img
                              src={item.imagen_path || 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=400'}
                              alt={item.pro_nombre}
                              onError={(e) => {
                                e.target.src = 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=400';
                              }}
                            />
                          </div>

                          <div className="cart-item-details">
                            <h4 className="cart-item-name">{item.pro_nombre}</h4>
                            <div className="cart-item-attributes">
                              <span>Talla: {item.pro_talla}</span>
                              <span>Color: {item.pro_color}</span>
                            </div>
                            <div className="cart-item-price">
                              {formatPrice(item.pro_precioventa)}
                            </div>
                          </div>

                          <div className="cart-item-actions">
                            <div className="quantity-controls">
                              <motion.button
                                className="quantity-btn"
                                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                whileTap={{ scale: 0.9 }}
                              >
                                <Minus size={14} />
                              </motion.button>
                              <span className="quantity-display">{item.quantity}</span>
                              <motion.button
                                className="quantity-btn"
                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                whileTap={{ scale: 0.9 }}
                              >
                                <Plus size={14} />
                              </motion.button>
                            </div>
                            <motion.button
                              className="remove-item-btn"
                              onClick={() => removeItem(item.id)}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <Trash2 size={16} />
                            </motion.button>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>

                  {/* Cart Footer */}
                  <div className="cart-footer">
                    <div className="cart-summary">
                      <div className="summary-line">
                        <span>Subtotal ({itemCount} {itemCount === 1 ? 'artículo' : 'artículos'})</span>
                        <span className="summary-amount">{formatPrice(cartTotal)}</span>
                      </div>
                      <div className="summary-line total-line">
                        <span>Total</span>
                        <span className="summary-amount total-amount">{formatPrice(cartTotal)}</span>
                      </div>
                    </div>

                    <div className="cart-actions">
                      <motion.button
                        className="clear-cart-btn"
                        onClick={clearCart}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Vaciar Carrito
                      </motion.button>
                      <motion.button
                        className="checkout-btn"
                        onClick={handleCheckout}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Proceder al Pago
                      </motion.button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;
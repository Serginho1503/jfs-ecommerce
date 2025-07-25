import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Plus, Minus, ChevronLeft, ChevronRight } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import './ProductModal.css';

const ProductModal = () => {
  const { selectedProduct, clearSelectedProduct } = useProducts();
  const { addItem, openCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Sample images for gallery (in a real app, these would come from the product data)
  const [productImages, setProductImages] = useState([]);

  useEffect(() => {
    if (selectedProduct) {
      // Reset state when product changes
      setQuantity(1);
      setCurrentImageIndex(0);
      
      // Set up product images (main image + sample variations)
      const mainImage = selectedProduct.imagen_path || 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=800';
      const sampleImages = [
        mainImage,
        'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=800'
      ];
      setProductImages(sampleImages);
    }
  }, [selectedProduct]);

  const handleClose = () => {
    clearSelectedProduct();
  };

  const handleAddToCart = () => {
    if (selectedProduct) {
      addItem(selectedProduct, quantity);
      openCart();
      handleClose();
    }
  };

  const handleQuantityChange = (newQuantity) => {
    setQuantity(Math.max(1, newQuantity));
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === productImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? productImages.length - 1 : prev - 1
    );
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-EC', {
      style: 'currency',
      currency: 'USD'
    }).format(parseFloat(price) || 0);
  };

  if (!selectedProduct) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="product-modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleClose}
      >
        <motion.div
          className="product-modal"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="modal-close-btn" onClick={handleClose}>
            <X size={24} />
          </button>

          <div className="modal-content">
            {/* Image Gallery */}
            <div className="modal-gallery">
              <div className="main-image-container">
                <motion.img
                  key={currentImageIndex}
                  src={productImages[currentImageIndex]}
                  alt={selectedProduct.pro_nombre}
                  className="main-image"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  onError={(e) => {
                    e.target.src = 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=800';
                  }}
                />
                
                {productImages.length > 1 && (
                  <>
                    <button className="gallery-nav gallery-prev" onClick={prevImage}>
                      <ChevronLeft size={20} />
                    </button>
                    <button className="gallery-nav gallery-next" onClick={nextImage}>
                      <ChevronRight size={20} />
                    </button>
                  </>
                )}
              </div>

              {productImages.length > 1 && (
                <div className="thumbnail-gallery">
                  {productImages.map((image, index) => (
                    <motion.button
                      key={index}
                      className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                      onClick={() => setCurrentImageIndex(index)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <img src={image} alt={`${selectedProduct.pro_nombre} ${index + 1}`} />
                    </motion.button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="modal-info">
              <div className="product-header">
                <h2 className="product-title">{selectedProduct.pro_nombre}</h2>
                <div className="product-price">
                  {formatPrice(selectedProduct.pro_precioventa)}
                </div>
              </div>

              <div className="product-attributes">
                <div className="attribute-group">
                  <span className="attribute-label">Talla:</span>
                  <span className="attribute-value size-badge">
                    {selectedProduct.pro_talla}
                  </span>
                </div>
                <div className="attribute-group">
                  <span className="attribute-label">Color:</span>
                  <span className="attribute-value color-badge">
                    {selectedProduct.pro_color}
                  </span>
                </div>
              </div>

              {/* Stock Information */}
              {selectedProduct.stock && selectedProduct.stock.length > 0 && (
                <div className="stock-section">
                  <h4>Disponibilidad en Tiendas:</h4>
                  <div className="stock-list">
                    {selectedProduct.stock.map((stockItem, index) => (
                      <div key={index} className="stock-item">
                        <span className="stock-text">{stockItem}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Product Description */}
              <div className="product-description">
                <h4>Descripción:</h4>
                <p>
                  Prenda de alta calidad confeccionada con los mejores materiales. 
                  Diseño moderno y versátil que se adapta a cualquier ocasión. 
                  Perfecto para complementar tu estilo urbano con elegancia y comodidad.
                </p>
              </div>

              {/* Quantity and Add to Cart */}
              <div className="modal-actions">
                <div className="quantity-section">
                  <span className="quantity-label">Cantidad:</span>
                  <div className="quantity-controls">
                    <motion.button
                      className="quantity-btn"
                      onClick={() => handleQuantityChange(quantity - 1)}
                      whileTap={{ scale: 0.9 }}
                      disabled={quantity <= 1}
                    >
                      <Minus size={16} />
                    </motion.button>
                    <span className="quantity-display">{quantity}</span>
                    <motion.button
                      className="quantity-btn"
                      onClick={() => handleQuantityChange(quantity + 1)}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Plus size={16} />
                    </motion.button>
                  </div>
                </div>

                <motion.button
                  className="add-to-cart-modal-btn"
                  onClick={handleAddToCart}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ShoppingBag size={20} />
                  Añadir al Carrito - {formatPrice(selectedProduct.pro_precioventa * quantity)}
                </motion.button>
              </div>

              {/* Additional Info */}
              <div className="additional-info">
                <div className="info-item">
                  <strong>Envío:</strong> Disponible a nivel nacional
                </div>
                <div className="info-item">
                  <strong>Retiro en tienda:</strong> Sin costo adicional
                </div>
                <div className="info-item">
                  <strong>Garantía:</strong> 30 días por defectos de fabricación
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProductModal;
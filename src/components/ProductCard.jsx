import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Eye, Heart, Star, Zap } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { addItem, openCart } = useCart();
  const { setSelectedProduct } = useProducts();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addItem(product, 1);
    openCart();
  };

  const handleViewProduct = (e) => {
    e.stopPropagation();
    setSelectedProduct(product);
  };

  const handleLike = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-EC', {
      style: 'currency',
      currency: 'USD'
    }).format(parseFloat(price) || 0);
  };

  const getImageSrc = () => {
    if (product.imagen_path && product.imagen_path.trim() !== '') {
      return product.imagen_path;
    }
    return 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=400';
  };

  const isNewProduct = Math.random() > 0.7; // 30% chance of being "new"
  const isOnSale = Math.random() > 0.8; // 20% chance of being on sale
  const rating = (4 + Math.random()).toFixed(1);

  return (
    <motion.div
      className="product-card-premium"
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Product Badges */}
      <div className="product-badges">
        {isNewProduct && (
          <motion.div
            className="badge badge-new"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Zap size={12} />
            Nuevo
          </motion.div>
        )}
        {isOnSale && (
          <motion.div
            className="badge badge-sale"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            -15%
          </motion.div>
        )}
      </div>

      {/* Image Container */}
      <div className="product-image-container">
        <div className="image-wrapper">
          {!imageLoaded && (
            <div className="image-skeleton">
              <div className="skeleton-shimmer"></div>
            </div>
          )}
          <motion.img
            src={getImageSrc()}
            alt={product.pro_nombre}
            className={`product-image ${imageLoaded ? 'loaded' : ''}`}
            onLoad={() => setImageLoaded(true)}
            onError={(e) => {
              e.target.src = 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=400';
              setImageLoaded(true);
            }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.4 }}
          />
          
          {/* Image Overlay */}
          <motion.div
            className="image-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
        </div>
        
        {/* Quick Actions */}
        <motion.div
          className="quick-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
          transition={{ duration: 0.3 }}
        >
          <motion.button
            className="action-btn like-btn"
            onClick={handleLike}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            data-liked={isLiked}
          >
            <Heart size={16} fill={isLiked ? 'currentColor' : 'none'} />
          </motion.button>
          
          <motion.button
            className="action-btn view-btn"
            onClick={handleViewProduct}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Eye size={16} />
          </motion.button>
        </motion.div>

        {/* Quick Add Button */}
        <motion.button
          className="quick-add-btn"
          onClick={handleAddToCart}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ShoppingBag size={16} />
          Añadir al Carrito
        </motion.button>
      </div>

      {/* Product Info */}
      <div className="product-info">
        {/* Rating */}
        <div className="product-rating">
          <div className="stars">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={12}
                fill={i < Math.floor(rating) ? '#fbbf24' : 'none'}
                color="#fbbf24"
              />
            ))}
          </div>
          <span className="rating-text">({rating})</span>
        </div>

        {/* Product Name */}
        <h3 className="product-name">{product.pro_nombre}</h3>
        
        {/* Product Attributes */}
        <div className="product-attributes">
          <div className="attribute-group">
            <span className="attribute-label">Talla:</span>
            <span className="attribute-value size-tag">{product.pro_talla}</span>
          </div>
          <div className="attribute-group">
            <span className="attribute-label">Color:</span>
            <span className="attribute-value color-tag">{product.pro_color}</span>
          </div>
        </div>

        {/* Stock Information */}
        {product.stock && product.stock.length > 0 && (
          <div className="stock-info">
            <div className="stock-header">
              <span className="stock-label">Disponible en:</span>
            </div>
            <div className="stock-list">
              {product.stock.slice(0, 2).map((stockItem, index) => (
                <div key={index} className="stock-item">
                  <div className="stock-indicator"></div>
                  <span className="stock-text">{stockItem}</span>
                </div>
              ))}
              {product.stock.length > 2 && (
                <div className="stock-more">
                  +{product.stock.length - 2} más
                </div>
              )}
            </div>
          </div>
        )}

        {/* Price and Action */}
        <div className="product-footer">
          <div className="price-section">
            {isOnSale && (
              <span className="price-original">
                ${(parseFloat(product.pro_precioventa) * 1.15).toFixed(2)}
              </span>
            )}
            <span className="price-current">
              {formatPrice(product.pro_precioventa)}
            </span>
          </div>
          
          <motion.button
            className="add-to-cart-btn"
            onClick={handleAddToCart}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ShoppingBag size={14} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
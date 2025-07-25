import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProducts } from '../context/ProductContext';
import ProductCard from './ProductCard';
import ProductSkeleton from './ProductSkeleton';
import Pagination from './Pagination';
import './ProductGrid.css';

const ProductGrid = () => {
  const { 
    products, 
    loading, 
    error, 
    refetchProducts,
    totalProducts 
  } = useProducts();

  useEffect(() => {
    refetchProducts();
  }, []);

  if (error) {
    return (
      <div className="product-grid-container" id="products">
        <div className="products-header">
          <h2>Nuestra Colección</h2>
          <p className="products-count">Error al cargar productos</p>
        </div>
        <div className="error-state">
          <div className="error-content">
            <h3>¡Oops! Algo salió mal</h3>
            <p>{error}</p>
            <button 
              className="btn btn-primary"
              onClick={refetchProducts}
            >
              Intentar de nuevo
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="product-grid-container" id="products">
      <motion.div 
        className="products-header"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2>Nuestra Colección</h2>
        <p className="products-count">
          {loading ? 'Cargando...' : `${totalProducts} productos disponibles`}
        </p>
      </motion.div>

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading"
            className="products-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {Array.from({ length: 12 }).map((_, index) => (
              <ProductSkeleton key={index} />
            ))}
          </motion.div>
        ) : products.length > 0 ? (
          <motion.div
            key="products"
            className="products-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {products.map((product, index) => (
              <motion.div
                key={product.pro_id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.4, 
                  delay: index * 0.05,
                  ease: "easeOut"
                }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            className="empty-state"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <div className="empty-content">
              <div className="empty-icon">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M16 11V7a4 4 0 0 0-8 0v4M5 9h14l-1 7a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 9z"/>
                </svg>
              </div>
              <h3>No se encontraron productos</h3>
              <p>Intenta ajustar tus filtros de búsqueda para encontrar lo que buscas.</p>
              <button 
                className="btn btn-primary"
                onClick={refetchProducts}
              >
                Mostrar todos los productos
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!loading && products.length > 0 && <Pagination />}
    </div>
  );
};

export default ProductGrid;
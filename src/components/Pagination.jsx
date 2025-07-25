import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import './Pagination.css';

const Pagination = () => {
  const { currentPage, totalPages, setPage } = useProducts();

  if (totalPages <= 1) return null;

  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); 
         i <= Math.min(totalPages - 1, currentPage + delta); 
         i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const visiblePages = getVisiblePages();

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      setPage(page);
      // Scroll to top of products section
      const productsSection = document.getElementById('products');
      if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <motion.div 
      className="pagination"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="pagination-info">
        <span>
          Página {currentPage} de {totalPages}
        </span>
      </div>

      <div className="pagination-controls">
        {/* Previous Button */}
        <motion.button
          className={`pagination-btn pagination-nav ${currentPage === 1 ? 'disabled' : ''}`}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          whileHover={currentPage !== 1 ? { scale: 1.05 } : {}}
          whileTap={currentPage !== 1 ? { scale: 0.95 } : {}}
        >
          <ChevronLeft size={16} />
          <span className="nav-text">Anterior</span>
        </motion.button>

        {/* Page Numbers */}
        <div className="pagination-numbers">
          {visiblePages.map((page, index) => (
            <React.Fragment key={index}>
              {page === '...' ? (
                <span className="pagination-ellipsis">...</span>
              ) : (
                <motion.button
                  className={`pagination-btn pagination-number ${
                    page === currentPage ? 'active' : ''
                  }`}
                  onClick={() => handlePageChange(page)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                >
                  {page}
                </motion.button>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Next Button */}
        <motion.button
          className={`pagination-btn pagination-nav ${currentPage === totalPages ? 'disabled' : ''}`}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          whileHover={currentPage !== totalPages ? { scale: 1.05 } : {}}
          whileTap={currentPage !== totalPages ? { scale: 0.95 } : {}}
        >
          <span className="nav-text">Siguiente</span>
          <ChevronRight size={16} />
        </motion.button>
      </div>

      {/* Mobile Pagination */}
      <div className="pagination-mobile">
        <motion.button
          className={`pagination-btn-mobile ${currentPage === 1 ? 'disabled' : ''}`}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronLeft size={20} />
        </motion.button>

        <div className="pagination-mobile-info">
          <span>{currentPage}</span>
          <span className="separator">/</span>
          <span>{totalPages}</span>
        </div>

        <motion.button
          className={`pagination-btn-mobile ${currentPage === totalPages ? 'disabled' : ''}`}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronRight size={20} />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Pagination;
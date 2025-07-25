import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Filter, ChevronDown, ChevronUp } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import './FilterSidebar.css';

const FilterSidebar = () => {
  const { 
    filters, 
    setFilters, 
    filterSidebarOpen, 
    closeFilterSidebar 
  } = useProducts();

  const [expandedSections, setExpandedSections] = useState({
    tiendas: true,
    tallas: true,
    colores: true
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleStoreChange = (storeId) => {
    const newTiendas = filters.tiendas.includes(storeId)
      ? filters.tiendas.filter(id => id !== storeId)
      : [...filters.tiendas, storeId];
    
    setFilters({ tiendas: newTiendas });
  };

  const handleSizeChange = (size) => {
    const newTallas = filters.tallas.includes(size)
      ? filters.tallas.filter(s => s !== size)
      : [...filters.tallas, size];
    
    setFilters({ tallas: newTallas });
  };

  const handleColorChange = (color) => {
    const newColores = filters.colores.includes(color)
      ? filters.colores.filter(c => c !== color)
      : [...filters.colores, color];
    
    setFilters({ colores: newColores });
  };

  const clearAllFilters = () => {
    setFilters({
      tiendas: [],
      tallas: [],
      colores: []
    });
  };

  const stores = [
    { id: 1, name: 'Gaviota', location: 'Centro' },
    { id: 2, name: 'Rosales', location: 'Norte' },
    { id: 3, name: 'Sauces', location: 'Sur' }
  ];

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  const colors = [
    { name: 'negro', label: 'Negro', hex: '#000000' },
    { name: 'azul', label: 'Azul', hex: '#0066CC' },
    { name: 'gris', label: 'Gris', hex: '#808080' },
    { name: 'celeste', label: 'Celeste', hex: '#87CEEB' },
    { name: 'beige', label: 'Beige', hex: '#F5F5DC' },
    { name: 'blanco', label: 'Blanco', hex: '#FFFFFF' }
  ];

  const hasActiveFilters = filters.tiendas.length > 0 || filters.tallas.length > 0 || filters.colores.length > 0;

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.aside 
        className="filter-sidebar desktop-sidebar"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="filter-header">
          <div className="filter-title">
            <Filter size={20} />
            <h3>Filtros</h3>
          </div>
          {hasActiveFilters && (
            <button 
              className="clear-filters-btn"
              onClick={clearAllFilters}
            >
              Limpiar
            </button>
          )}
        </div>

        <div className="filter-content">
          {/* Store Filter */}
          <div className="filter-section">
            <button 
              className="filter-section-header"
              onClick={() => toggleSection('tiendas')}
            >
              <span>Disponible en Tienda</span>
              {expandedSections.tiendas ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            
            <AnimatePresence>
              {expandedSections.tiendas && (
                <motion.div
                  className="filter-options"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {stores.map(store => (
                    <label key={store.id} className="filter-option">
                      <input
                        type="checkbox"
                        checked={filters.tiendas.includes(store.id)}
                        onChange={() => handleStoreChange(store.id)}
                      />
                      <span className="checkmark"></span>
                      <div className="option-content">
                        <span className="option-name">{store.name}</span>
                        <span className="option-detail">{store.location}</span>
                      </div>
                    </label>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Size Filter */}
          <div className="filter-section">
            <button 
              className="filter-section-header"
              onClick={() => toggleSection('tallas')}
            >
              <span>Tallas</span>
              {expandedSections.tallas ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            
            <AnimatePresence>
              {expandedSections.tallas && (
                <motion.div
                  className="filter-options size-options"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {sizes.map(size => (
                    <motion.label 
                      key={size} 
                      className="size-option"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <input
                        type="checkbox"
                        checked={filters.tallas.includes(size)}
                        onChange={() => handleSizeChange(size)}
                      />
                      <span className="size-label">{size}</span>
                    </motion.label>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Color Filter */}
          <div className="filter-section">
            <button 
              className="filter-section-header"
              onClick={() => toggleSection('colores')}
            >
              <span>Colores</span>
              {expandedSections.colores ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            
            <AnimatePresence>
              {expandedSections.colores && (
                <motion.div
                  className="filter-options color-options"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {colors.map(color => (
                    <motion.label 
                      key={color.name} 
                      className="color-option"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <input
                        type="checkbox"
                        checked={filters.colores.includes(color.name)}
                        onChange={() => handleColorChange(color.name)}
                      />
                      <div className="color-content">
                        <span 
                          className="color-swatch"
                          style={{ 
                            backgroundColor: color.hex,
                            border: color.name === 'blanco' ? '1px solid var(--color-gray-300)' : 'none'
                          }}
                        ></span>
                        <span className="color-name">{color.label}</span>
                      </div>
                      <span className="color-checkmark"></span>
                    </motion.label>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {filterSidebarOpen && (
          <>
            <motion.div
              className="filter-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeFilterSidebar}
            />
            <motion.aside
              className="filter-sidebar mobile-sidebar"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
            >
              <div className="filter-header">
                <div className="filter-title">
                  <Filter size={20} />
                  <h3>Filtros</h3>
                </div>
                <div className="filter-actions">
                  {hasActiveFilters && (
                    <button 
                      className="clear-filters-btn"
                      onClick={clearAllFilters}
                    >
                      Limpiar
                    </button>
                  )}
                  <button 
                    className="close-sidebar-btn"
                    onClick={closeFilterSidebar}
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              <div className="filter-content">
                {/* Same filter sections as desktop */}
                <div className="filter-section">
                  <button 
                    className="filter-section-header"
                    onClick={() => toggleSection('tiendas')}
                  >
                    <span>Disponible en Tienda</span>
                    {expandedSections.tiendas ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                  
                  <AnimatePresence>
                    {expandedSections.tiendas && (
                      <motion.div
                        className="filter-options"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {stores.map(store => (
                          <label key={store.id} className="filter-option">
                            <input
                              type="checkbox"
                              checked={filters.tiendas.includes(store.id)}
                              onChange={() => handleStoreChange(store.id)}
                            />
                            <span className="checkmark"></span>
                            <div className="option-content">
                              <span className="option-name">{store.name}</span>
                              <span className="option-detail">{store.location}</span>
                            </div>
                          </label>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="filter-section">
                  <button 
                    className="filter-section-header"
                    onClick={() => toggleSection('tallas')}
                  >
                    <span>Tallas</span>
                    {expandedSections.tallas ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                  
                  <AnimatePresence>
                    {expandedSections.tallas && (
                      <motion.div
                        className="filter-options size-options"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {sizes.map(size => (
                          <label key={size} className="size-option">
                            <input
                              type="checkbox"
                              checked={filters.tallas.includes(size)}
                              onChange={() => handleSizeChange(size)}
                            />
                            <span className="size-label">{size}</span>
                          </label>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="filter-section">
                  <button 
                    className="filter-section-header"
                    onClick={() => toggleSection('colores')}
                  >
                    <span>Colores</span>
                    {expandedSections.colores ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                  
                  <AnimatePresence>
                    {expandedSections.colores && (
                      <motion.div
                        className="filter-options color-options"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {colors.map(color => (
                          <label key={color.name} className="color-option">
                            <input
                              type="checkbox"
                              checked={filters.colores.includes(color.name)}
                              onChange={() => handleColorChange(color.name)}
                            />
                            <div className="color-content">
                              <span 
                                className="color-swatch"
                                style={{ 
                                  backgroundColor: color.hex,
                                  border: color.name === 'blanco' ? '1px solid var(--color-gray-300)' : 'none'
                                }}
                              ></span>
                              <span className="color-name">{color.label}</span>
                            </div>
                            <span className="color-checkmark"></span>
                          </label>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default FilterSidebar;
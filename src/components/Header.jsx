import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, Phone, Menu, X, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';
import './Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const { toggleCart, getCartItemsCount, getCartTotal } = useCart();
  const { setSearch, searchTerm, toggleFilterSidebar } = useProducts();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const searchValue = formData.get('search');
    setSearch(searchValue);
  };

  const cartItemsCount = getCartItemsCount();
  const cartTotal = getCartTotal();

  return (
    <motion.header 
      className={`header-premium ${isScrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="header-container">
        {/* Logo Section */}
        <motion.div 
          className="logo-section"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <div className="logo-icon">
            <span className="logo-letter">J</span>
          </div>
          <div className="logo-text">
            <span className="brand-name">JORLE</span>
            <span className="brand-tagline">Fashion Store</span>
          </div>
        </motion.div>

        {/* Navigation */}
        <nav className="main-navigation">
          <ul className="nav-links">
            <li>
              <motion.a
                href="#"
                className="nav-link active"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                Inicio
              </motion.a>
            </li>
            <li>
              <motion.a
                href="#products"
                className="nav-link"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                Colección
              </motion.a>
            </li>
            <li>
              <motion.a
                href="#"
                className="nav-link"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                Lookbook
              </motion.a>
            </li>
            <li>
              <motion.a
                href="#"
                className="nav-link"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                Tiendas
              </motion.a>
            </li>
          </ul>
        </nav>

        {/* Search Bar */}
        <div className="search-section">
          <form onSubmit={handleSearchSubmit} className="search-form">
            <div className={`search-wrapper ${isSearchFocused ? 'focused' : ''}`}>
              <Search className="search-icon" size={18} />
              <input
                type="text"
                name="search"
                placeholder="Buscar productos..."
                defaultValue={searchTerm}
                className="search-input"
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
              <motion.button
                type="submit"
                className="search-button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Buscar
              </motion.button>
            </div>
          </form>
        </div>

        {/* Actions */}
        <div className="header-actions">
          {/* Contact */}
          <div className="contact-info">
            <Phone size={16} />
            <span>+593 93 993 1934</span>
          </div>

          {/* Account */}
          <motion.button
            className="account-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <User size={18} />
          </motion.button>

          {/* Cart */}
          <motion.button
            className="cart-button"
            onClick={toggleCart}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="cart-icon-wrapper">
              <ShoppingBag size={20} />
              <AnimatePresence>
                {cartItemsCount > 0 && (
                  <motion.span
                    className="cart-badge"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {cartItemsCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
            <div className="cart-details">
              <span className="cart-total">${cartTotal.toFixed(2)}</span>
              <span className="cart-label">Mi Carrito</span>
            </div>
          </motion.button>

          {/* Mobile Menu Toggle */}
          <button
            className="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mobile-menu-content">
              {/* Mobile Search */}
              <form onSubmit={handleSearchSubmit} className="mobile-search">
                <div className="search-wrapper">
                  <Search className="search-icon" size={18} />
                  <input
                    type="text"
                    name="search"
                    placeholder="Buscar productos..."
                    defaultValue={searchTerm}
                    className="search-input"
                  />
                  <button type="submit" className="search-button">
                    Buscar
                  </button>
                </div>
              </form>

              {/* Mobile Navigation */}
              <nav className="mobile-nav">
                <ul className="mobile-nav-links">
                  <li>
                    <a href="#" className="mobile-nav-link">Inicio</a>
                  </li>
                  <li>
                    <a href="#products" className="mobile-nav-link">Colección</a>
                  </li>
                  <li>
                    <a href="#" className="mobile-nav-link">Lookbook</a>
                  </li>
                  <li>
                    <a href="#" className="mobile-nav-link">Tiendas</a>
                  </li>
                </ul>
              </nav>

              {/* Mobile Actions */}
              <div className="mobile-actions">
                <button
                  className="mobile-filter-button"
                  onClick={toggleFilterSidebar}
                >
                  <Menu size={20} />
                  Filtros
                </button>
                
                <div className="mobile-contact">
                  <Phone size={16} />
                  <span>+593 93 993 1934</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Secondary Navigation */}
      <div className="secondary-nav">
        <div className="secondary-nav-container">
          <div className="category-links">
            <a href="#" className="category-link">Nuevos Ingresos</a>
            <a href="#" className="category-link">Ofertas</a>
            <a href="#" className="category-link">Hombre</a>
            <a href="#" className="category-link">Mujer</a>
            <a href="#" className="category-link">Accesorios</a>
          </div>
          
          <button
            className="mobile-filter-btn"
            onClick={toggleFilterSidebar}
          >
            <Menu size={18} />
            Filtros
          </button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
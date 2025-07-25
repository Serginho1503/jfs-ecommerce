import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Star, Truck, Shield, Award, ChevronLeft, ChevronRight, Zap, Heart, Eye } from 'lucide-react';
import './Hero.css';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Slides con productos destacados y ofertas
  const slides = [
    {
      id: 1,
      title: "Colección Premium 2025",
      subtitle: "Redefine tu estilo con elegancia urbana",
      description: "Descubre piezas únicas que combinan autenticidad streetwear con sofisticación premium",
      image: "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=800",
      price: "$89.99",
      originalPrice: "$129.99",
      discount: "30% OFF",
      badge: "NUEVO",
      cta: "Comprar Ahora",
      urgency: "Solo quedan 5 unidades",
      gradient: "from-black via-gray-900 to-black"
    },
    {
      id: 2,
      title: "Streetwear Exclusivo",
      subtitle: "Edición limitada disponible",
      description: "Piezas únicas diseñadas para destacar. Calidad premium que marca la diferencia",
      image: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=800",
      price: "$124.99",
      originalPrice: "$179.99",
      discount: "OFERTA",
      badge: "LIMITADO",
      cta: "Reservar Ya",
      urgency: "Últimas 3 piezas",
      gradient: "from-gray-900 via-black to-gray-900"
    },
    {
      id: 3,
      title: "Tendencia Urbana",
      subtitle: "Lo más vendido esta temporada",
      description: "El favorito de nuestros clientes. Comodidad y estilo en una sola prenda",
      image: "https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=800",
      price: "$69.99",
      originalPrice: "$99.99",
      discount: "BESTSELLER",
      badge: "TOP VENTAS",
      cta: "Agregar al Carrito",
      urgency: "Más de 100 vendidos",
      gradient: "from-black via-gray-800 to-black"
    }
  ];

  const scrollToProducts = () => {
    const productsSection = document.getElementById('products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Auto-play del slider
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  return (
    <section className="hero-slider-premium">
      {/* Background con gradiente dinámico */}
      <div className="hero-background">
        <motion.div 
          className={`gradient-background bg-gradient-to-br ${slides[currentSlide].gradient}`}
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
        <div className="floating-elements">
          <div className="floating-orb orb-1"></div>
          <div className="floating-orb orb-2"></div>
          <div className="floating-orb orb-3"></div>
        </div>
      </div>

      {/* Slider Container */}
      <div className="slider-container">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            className="slide-content"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            {/* Content Section */}
            <div className="slide-info">
              {/* Badge de urgencia */}
              <motion.div
                className="urgency-badge"
                initial={{ scale: 0, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.3, type: "spring" }}
              >
                <Zap size={16} />
                <span>{slides[currentSlide].urgency}</span>
              </motion.div>

              {/* Título principal */}
              <motion.h1
                className="slide-title"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                {slides[currentSlide].title}
              </motion.h1>

              {/* Subtítulo */}
              <motion.h2
                className="slide-subtitle"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                {slides[currentSlide].subtitle}
              </motion.h2>

              {/* Descripción */}
              <motion.p
                className="slide-description"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                {slides[currentSlide].description}
              </motion.p>

              {/* Precios con psicología de descuento */}
              <motion.div
                className="price-section"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <div className="price-container">
                  <span className="current-price">{slides[currentSlide].price}</span>
                  <span className="original-price">{slides[currentSlide].originalPrice}</span>
                  <div className="discount-badge">
                    {slides[currentSlide].discount}
                  </div>
                </div>
                <div className="savings-text">
                  Ahorras ${(parseFloat(slides[currentSlide].originalPrice.replace('$', '')) - 
                            parseFloat(slides[currentSlide].price.replace('$', ''))).toFixed(2)}
                </div>
              </motion.div>

              {/* Botones de acción */}
              <motion.div
                className="slide-actions"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
              >
                <motion.button
                  className="cta-primary-slider"
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>{slides[currentSlide].cta}</span>
                  <ArrowRight size={20} />
                </motion.button>

                <motion.button
                  className="cta-secondary-slider"
                  onClick={scrollToProducts}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Ver Catálogo
                </motion.button>
              </motion.div>

              {/* Indicadores de confianza */}
              <motion.div
                className="trust-indicators-slider"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
              >
                <div className="trust-item">
                  <Truck size={18} />
                  <span>Envío Gratis</span>
                </div>
                <div className="trust-item">
                  <Shield size={18} />
                  <span>Compra Segura</span>
                </div>
                <div className="trust-item">
                  <Award size={18} />
                  <span>Calidad Premium</span>
                </div>
              </motion.div>
            </div>

            {/* Product Showcase */}
            <div className="slide-visual">
              <motion.div
                className="product-showcase-slider"
                initial={{ opacity: 0, scale: 0.8, rotateY: 20 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ delay: 0.5, duration: 1 }}
              >
                {/* Badge del producto */}
                <div className="product-badge-slider">
                  {slides[currentSlide].badge}
                </div>

                {/* Imagen principal */}
                <div className="product-image-container-slider">
                  <img 
                    src={slides[currentSlide].image} 
                    alt={slides[currentSlide].title}
                    className="product-image-slider"
                  />
                  <div className="image-overlay-slider"></div>
                  
                  {/* Acciones rápidas */}
                  <div className="quick-actions-slider">
                    <motion.button
                      className="quick-action-btn"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Heart size={16} />
                    </motion.button>
                    <motion.button
                      className="quick-action-btn"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Eye size={16} />
                    </motion.button>
                  </div>
                </div>

                {/* Rating y reviews */}
                <div className="product-rating-slider">
                  <div className="stars-slider">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill="#fbbf24" color="#fbbf24" />
                    ))}
                  </div>
                  <span className="rating-text-slider">4.9 (127 reseñas)</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Controles del slider */}
        <div className="slider-controls">
          <motion.button
            className="slider-nav prev"
            onClick={prevSlide}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft size={24} />
          </motion.button>

          <motion.button
            className="slider-nav next"
            onClick={nextSlide}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight size={24} />
          </motion.button>
        </div>

        {/* Indicadores de slide */}
        <div className="slide-indicators">
          {slides.map((_, index) => (
            <motion.button
              key={index}
              className={`indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
            />
          ))}
        </div>

        {/* Barra de progreso */}
        <div className="progress-bar">
          <motion.div
            className="progress-fill"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 5, ease: "linear" }}
            key={currentSlide}
          />
        </div>
      </div>

      {/* Stats Section con social proof */}
      <motion.div
        className="hero-stats-slider"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <div className="stat-item-slider">
          <span className="stat-number">15K+</span>
          <span className="stat-label">Clientes Felices</span>
        </div>
        <div className="stat-item-slider">
          <span className="stat-number">500+</span>
          <span className="stat-label">Productos Premium</span>
        </div>
        <div className="stat-item-slider">
          <span className="stat-number">3</span>
          <span className="stat-label">Tiendas Físicas</span>
        </div>
        <div className="stat-item-slider">
          <span className="stat-number">4.9★</span>
          <span className="stat-label">Calificación</span>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
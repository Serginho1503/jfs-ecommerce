import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Phone, Navigation } from 'lucide-react';
import './StoreModal.css';

const StoreModal = ({ store, isOpen, onClose }) => {
  if (!store) return null;

  const handleMapClick = () => {
    window.open(store.mapUrl, '_blank');
  };

  const handlePhoneClick = () => {
    window.open(`tel:${store.phone}`, '_self');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="store-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="store-modal"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="store-modal-close" onClick={onClose}>
              <X size={24} />
            </button>

            <div className="store-modal-content">
              {/* Store Image */}
              <div className="store-image-container">
                <img
                  src={store.image}
                  alt={`Tienda ${store.name}`}
                  className="store-image"
                  onError={(e) => {
                    e.target.src = 'https://images.pexels.com/photos/1884584/pexels-photo-1884584.jpeg?auto=compress&cs=tinysrgb&w=800';
                  }}
                />
                <div className="store-badge">
                  <span>Tienda {store.name}</span>
                </div>
              </div>

              {/* Store Info */}
              <div className="store-info">
                <h2 className="store-title">Jorle Fashion Store - {store.name}</h2>
                <p className="store-location">{store.location}</p>

                <div className="store-details">
                  {/* Address */}
                  <div className="store-detail-item">
                    <div className="detail-icon">
                      <MapPin size={20} />
                    </div>
                    <div className="detail-content">
                      <h4>Dirección</h4>
                      <p>{store.address}</p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="store-detail-item">
                    <div className="detail-icon">
                      <Phone size={20} />
                    </div>
                    <div className="detail-content">
                      <h4>Teléfono</h4>
                      <p>
                        <button 
                          className="phone-link"
                          onClick={handlePhoneClick}
                        >
                          {store.phone}
                        </button>
                      </p>
                    </div>
                  </div>

                  {/* Map */}
                  <div className="store-detail-item">
                    <div className="detail-icon">
                      <Navigation size={20} />
                    </div>
                    <div className="detail-content">
                      <h4>Cómo llegar</h4>
                      <p>Toca el botón para abrir en Google Maps</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="store-actions">
                  <motion.button
                    className="map-button"
                    onClick={handleMapClick}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Navigation size={20} />
                    Ver en Google Maps
                  </motion.button>

                  <motion.button
                    className="call-button"
                    onClick={handlePhoneClick}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Phone size={20} />
                    Llamar Tienda
                  </motion.button>
                </div>

                {/* Store Hours */}
                <div className="store-hours">
                  <h4>Horarios de Atención</h4>
                  <div className="hours-grid">
                    <div className="hours-item">
                      <span>Lunes - Viernes:</span>
                      <span>9:00 AM - 8:00 PM</span>
                    </div>
                    <div className="hours-item">
                      <span>Sábados:</span>
                      <span>9:00 AM - 9:00 PM</span>
                    </div>
                    <div className="hours-item">
                      <span>Domingos:</span>
                      <span>10:00 AM - 6:00 PM</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StoreModal;
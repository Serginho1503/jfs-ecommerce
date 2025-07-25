import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Truck, User, Phone, CreditCard, CheckCircle, ExternalLink } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { FILTER_CONFIG } from '../utils/constants';
import StoreModal from './StoreModal';
import './CheckoutModal.css';

const CheckoutModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [deliveryType, setDeliveryType] = useState('');
  const [selectedStore, setSelectedStore] = useState(null);
  const [storeModalOpen, setStoreModalOpen] = useState(false);
  const [viewingStore, setViewingStore] = useState(null);
  const [formData, setFormData] = useState({
    nombres: '',
    cedula: '',
    telefono: '',
    ciudad: '',
    provincia: '',
    direccion: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  const { items, getCartTotal, clearCart } = useCart();

  useEffect(() => {
    const handleOpenCheckout = () => {
      setIsOpen(true);
      setCurrentStep(1);
      setDeliveryType('');
      setOrderSuccess(false);
    };

    window.addEventListener('openCheckout', handleOpenCheckout);
    return () => window.removeEventListener('openCheckout', handleOpenCheckout);
  }, []);

  const handleClose = () => {
    if (!isSubmitting) {
      setIsOpen(false);
      setCurrentStep(1);
      setDeliveryType('');
      setFormData({
        nombres: '',
        cedula: '',
        telefono: '',
        ciudad: '',
        provincia: '',
        direccion: ''
      });
      setOrderSuccess(false);
    }
  };

  const handleDeliverySelect = (type) => {
    setDeliveryType(type);
    if (type === 'pickup') {
      setCurrentStep(1.5); // Ir a selección de tienda
    } else {
      setCurrentStep(2); // Ir directamente a datos
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    let requiredFields = ['nombres', 'cedula', 'telefono'];
    
    if (deliveryType === 'pickup') {
      if (!selectedStore) return false;
    } else {
      requiredFields = [...requiredFields, 'ciudad', 'provincia', 'direccion'];
    }

    return requiredFields.every(field => formData[field].trim() !== '');
  };

  const generateOrderNumber = () => {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `PED-WEB-JFS-${timestamp}${random}`;
  };

  const formatWhatsAppMessage = (orderNum) => {
    let deliveryText = 'Envío a Provincia';
    if (deliveryType === 'pickup' && selectedStore) {
      const store = FILTER_CONFIG.stores.find(s => s.id === selectedStore);
      deliveryText = `Retiro en Tienda ${store.name} (${store.location})`;
    }
    const total = getCartTotal();
    
    let message = `🛍️ *NUEVO PEDIDO - JORLE FASHION STORE*\n\n`;
    message += `📋 *Número de Pedido:* ${orderNum}\n`;
    message += `🚚 *Tipo de Entrega:* ${deliveryText}\n\n`;
    
    message += `👤 *DATOS DEL CLIENTE:*\n`;
    message += `• Nombres: ${formData.nombres}\n`;
    message += `• Cédula: ${formData.cedula}\n`;
    message += `• Teléfono: ${formData.telefono}\n`;
    
    if (deliveryType === 'pickup' && selectedStore) {
      const store = FILTER_CONFIG.stores.find(s => s.id === selectedStore);
      message += `\n🏪 *TIENDA SELECCIONADA:*\n`;
      message += `• Tienda: ${store.name}\n`;
      message += `• Ubicación: ${store.location}\n`;
      message += `• Dirección: ${store.address}\n`;
      message += `• Teléfono: ${store.phone}\n`;
    } else if (deliveryType === 'shipping') {
      message += `• Ciudad: ${formData.ciudad}\n`;
      message += `• Provincia: ${formData.provincia}\n`;
      message += `• Dirección: ${formData.direccion}\n`;
    }
    
    message += `\n🛒 *PRODUCTOS:*\n`;
    items.forEach((item, index) => {
      message += `${index + 1}. ${item.pro_nombre}\n`;
      message += `   • Talla: ${item.pro_talla}\n`;
      message += `   • Color: ${item.pro_color}\n`;
      message += `   • Cantidad: ${item.quantity}\n`;
      message += `   • Precio: $${parseFloat(item.pro_precioventa).toFixed(2)}\n\n`;
    });
    
    message += `💰 *TOTAL: $${total.toFixed(2)}*\n\n`;
    message += `📅 Fecha: ${new Date().toLocaleDateString('es-EC')}\n`;
    message += `⏰ Hora: ${new Date().toLocaleTimeString('es-EC')}`;
    
    return encodeURIComponent(message);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      alert('Por favor, completa todos los campos requeridos.');
      return;
    }

    setIsSubmitting(true);

    try {
      const orderNum = generateOrderNumber();
      
      // Prepare order data
      const orderData = {
        numero_pedido: orderNum,
        tipo_entrega: deliveryType,
        tienda_seleccionada: deliveryType === 'pickup' ? selectedStore : null,
        nombres: formData.nombres,
        cedula: formData.cedula,
        telefono: formData.telefono,
        ciudad: deliveryType === 'shipping' ? formData.ciudad : '',
        provincia: deliveryType === 'shipping' ? formData.provincia : '',
        direccion: deliveryType === 'shipping' ? formData.direccion : '',
        productos: JSON.stringify(items),
        total: getCartTotal(),
        fecha_pedido: new Date().toISOString()
      };

      // Save to database
      const response = await fetch('/api/save_order.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      });

      if (response.ok) {
        // Send WhatsApp message
        const whatsappMessage = formatWhatsAppMessage(orderNum);
        const whatsappUrl = `https://wa.me/593939931934?text=${whatsappMessage}`;
        
        // Open WhatsApp in new tab
        window.open(whatsappUrl, '_blank');
        
        // Show success
        setOrderNumber(orderNum);
        setOrderSuccess(true);
        setCurrentStep(3);
        
        // Clear cart
        clearCart();
      } else {
        throw new Error('Error al procesar el pedido');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Hubo un error al procesar tu pedido. Por favor, intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-EC', {
      style: 'currency',
      currency: 'USD'
    }).format(parseFloat(price) || 0);
  };

  const handleStoreSelect = (storeId) => {
    setSelectedStore(storeId);
  };

  const handleViewStore = (store) => {
    setViewingStore(store);
    setStoreModalOpen(true);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="checkout-modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleClose}
      >
        <motion.div
          className="checkout-modal"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="checkout-header">
            <h2>Finalizar Pedido</h2>
            <button className="checkout-close-btn" onClick={handleClose}>
              <X size={24} />
            </button>
          </div>

          <div className="checkout-progress">
            <div className={`progress-step ${currentStep >= 1 ? 'active' : ''}`}>
              <span className="step-number">1</span>
              <span className="step-label">Entrega</span>
            </div>
            <div className={`progress-step ${currentStep >= 2 ? 'active' : ''}`}>
              <span className="step-number">2</span>
              <span className="step-label">Datos</span>
            </div>
            <div className={`progress-step ${currentStep >= 3 ? 'active' : ''}`}>
              <span className="step-number">3</span>
              <span className="step-label">Confirmación</span>
            </div>
          </div>

          <div className="checkout-content">
            {currentStep === 1 && (
              <motion.div
                className="delivery-selection"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h3>Selecciona el tipo de entrega</h3>
                <div className="delivery-options">
                  <motion.button
                    className="delivery-option"
                    onClick={() => handleDeliverySelect('pickup')}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="option-icon">
                      <MapPin size={32} />
                    </div>
                    <div className="option-content">
                      <h4>Retiro en Tienda</h4>
                      <p>Retira tu pedido en cualquiera de nuestras tiendas</p>
                      <span className="option-price">GRATIS</span>
                    </div>
                  </motion.button>

                  <motion.button
                    className="delivery-option"
                    onClick={() => handleDeliverySelect('shipping')}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="option-icon">
                      <Truck size={32} />
                    </div>
                    <div className="option-content">
                      <h4>Envío a Provincia</h4>
                      <p>Recibe tu pedido en la comodidad de tu hogar</p>
                      <span className="option-price">Costo según destino</span>
                    </div>
                  </motion.button>
                </div>
              </motion.div>
            )}

            {currentStep === 1.5 && deliveryType === 'pickup' && (
              <motion.div
                className="store-selection"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h3>Selecciona la tienda para retiro</h3>
                <div className="store-options">
                  {FILTER_CONFIG.stores.map((store) => (
                    <motion.div
                      key={store.id}
                      className={`store-option ${selectedStore === store.id ? 'selected' : ''}`}
                      onClick={() => handleStoreSelect(store.id)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="store-option-content">
                        <h4>{store.name}</h4>
                        <p>{store.location}</p>
                        <span className="store-address">{store.address}</span>
                      </div>
                      <button
                        className="view-store-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewStore(store);
                        }}
                      >
                        <ExternalLink size={16} />
                        Ver Tienda
                      </button>
                    </motion.div>
                  ))}
                </div>
                <div className="store-selection-actions">
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => setCurrentStep(1)}
                  >
                    Volver
                  </button>
                  <button
                    type="button"
                    className="btn-primary"
                    onClick={() => setCurrentStep(2)}
                    disabled={!selectedStore}
                  >
                    Continuar
                  </button>
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                className="customer-form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h3>
                  {deliveryType === 'pickup' 
                    ? `Datos para retiro en tienda ${selectedStore ? FILTER_CONFIG.stores.find(s => s.id === selectedStore)?.name : ''}` 
                    : 'Datos para envío'}
                </h3>
                
                {deliveryType === 'pickup' && selectedStore && (
                  <div className="selected-store-info">
                    {(() => {
                      const store = FILTER_CONFIG.stores.find(s => s.id === selectedStore);
                      return (
                        <div className="selected-store-card">
                          <div className="selected-store-details">
                            <h4>Tienda Seleccionada: {store.name}</h4>
                            <p>{store.address}</p>
                            <span>{store.phone}</span>
                          </div>
                          <button
                            type="button"
                            className="change-store-btn"
                            onClick={() => setCurrentStep(1.5)}
                          >
                            Cambiar Tienda
                          </button>
                        </div>
                      );
                    })()}
                  </div>
                )}
                
                {deliveryType === 'shipping' && (
                  <div className="form-notice">
                    <p>Los siguientes datos son obligatorios para proceder con el envío:</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="checkout-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="nombres">
                        <User size={16} />
                        {deliveryType === 'pickup' ? 'Nombres' : 'Nombres Completos'}
                      </label>
                      <input
                        type="text"
                        id="nombres"
                        name="nombres"
                        value={formData.nombres}
                        onChange={handleInputChange}
                        required
                        placeholder="Ingresa tu nombre completo"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="cedula">
                        <CreditCard size={16} />
                        Número de Cédula
                      </label>
                      <input
                        type="text"
                        id="cedula"
                        name="cedula"
                        value={formData.cedula}
                        onChange={handleInputChange}
                        required
                        placeholder="1234567890"
                        maxLength="10"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="telefono">
                        <Phone size={16} />
                        Número de Teléfono
                      </label>
                      <input
                        type="tel"
                        id="telefono"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleInputChange}
                        required
                        placeholder="0987654321"
                      />
                    </div>
                  </div>

                  {deliveryType === 'shipping' && (
                    <>
                      <div className="form-row">
                        <div className="form-group">
                          <label htmlFor="ciudad">Ciudad</label>
                          <input
                            type="text"
                            id="ciudad"
                            name="ciudad"
                            value={formData.ciudad}
                            onChange={handleInputChange}
                            required
                            placeholder="Ej: Quito"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="provincia">Provincia</label>
                          <input
                            type="text"
                            id="provincia"
                            name="provincia"
                            value={formData.provincia}
                            onChange={handleInputChange}
                            required
                            placeholder="Ej: Pichincha"
                          />
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-group">
                          <label htmlFor="direccion">Dirección Completa</label>
                          <textarea
                            id="direccion"
                            name="direccion"
                            value={formData.direccion}
                            onChange={handleInputChange}
                            required
                            placeholder="Ingresa tu dirección completa con referencias"
                            rows="3"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  <div className="form-actions">
                    <button
                      type="button"
                      className="btn-secondary"
                      onClick={() => setCurrentStep(1)}
                    >
                      Volver
                    </button>
                    <button
                      type="submit"
                      className="btn-primary"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Procesando...' : 'Confirmar Pedido'}
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {currentStep === 3 && orderSuccess && (
              <motion.div
                className="order-success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="success-icon">
                  <CheckCircle size={64} />
                </div>
                <h3>¡Pedido Confirmado!</h3>
                <p>Tu pedido ha sido procesado exitosamente</p>
                
                <div className="order-details">
                  <div className="order-number">
                    <strong>Número de Pedido:</strong>
                    <span>{orderNumber}</span>
                  </div>
                  <div className="order-total">
                    <strong>Total:</strong>
                    <span>{formatPrice(getCartTotal())}</span>
                  </div>
                </div>

                <div className="success-message">
                  <p>
                    Hemos enviado los detalles de tu pedido por WhatsApp. 
                    Nos pondremos en contacto contigo para coordinar la {deliveryType === 'pickup' ? 'recogida' : 'entrega'}.
                  </p>
                </div>

                <button className="btn-primary" onClick={handleClose}>
                  Continuar Comprando
                </button>
              </motion.div>
            )}
          </div>

          {/* Order Summary */}
          {currentStep < 3 && (
            <div className="order-summary">
              <h4>Resumen del Pedido</h4>
              <div className="summary-items">
                {items.map((item) => (
                  <div key={item.id} className="summary-item">
                    <div className="item-info">
                      <span className="item-name">{item.pro_nombre}</span>
                      <span className="item-details">
                        {item.pro_talla} • {item.pro_color} • Qty: {item.quantity}
                      </span>
                    </div>
                    <span className="item-price">
                      {formatPrice(item.pro_precioventa * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="summary-total">
                <span>Total:</span>
                <span>{formatPrice(getCartTotal())}</span>
              </div>
            </div>
          )}

          {/* Store Modal */}
          <StoreModal
            store={viewingStore}
            isOpen={storeModalOpen}
            onClose={() => {
              setStoreModalOpen(false);
              setViewingStore(null);
            }}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CheckoutModal;
// Servicio de WhatsApp
import { APP_CONFIG } from '../utils/constants';

export const formatWhatsAppMessage = (orderData) => {
  const { orderNumber, customerData, items, total, deliveryType } = orderData;
  
  let message = `🛍️ *NUEVO PEDIDO - ${APP_CONFIG.name.toUpperCase()}*\n\n`;
  message += `📋 *Número de Pedido:* ${orderNumber}\n`;
  message += `🚚 *Tipo de Entrega:* ${deliveryType === 'pickup' ? 'Retiro en Tienda' : 'Envío a Provincia'}\n\n`;
  
  message += `👤 *DATOS DEL CLIENTE:*\n`;
  message += `• Nombres: ${customerData.nombres}\n`;
  message += `• Cédula: ${customerData.cedula}\n`;
  message += `• Teléfono: ${customerData.telefono}\n`;
  
  if (deliveryType === 'shipping') {
    message += `• Ciudad: ${customerData.ciudad}\n`;
    message += `• Provincia: ${customerData.provincia}\n`;
    message += `• Dirección: ${customerData.direccion}\n`;
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
  
  return message;
};

export const sendWhatsAppMessage = (message) => {
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${APP_CONFIG.contact.whatsapp}?text=${encodedMessage}`;
  
  // Abrir WhatsApp en nueva pestaña
  window.open(whatsappUrl, '_blank');
  
  return whatsappUrl;
};

export const createOrderWhatsApp = (orderData) => {
  const message = formatWhatsAppMessage(orderData);
  return sendWhatsAppMessage(message);
};
export const sendWhatsAppMessage = (phoneNumber, message) => {
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  window.open(whatsappUrl, '_blank');
};

export const formatOrderMessage = (orderData) => {
  const { orderNumber, customerName, products, total, deliveryType, store } = orderData;
  
  let message = `🛍️ *NUEVO PEDIDO - JORLE FASHION STORE*\n\n`;
  message += `📋 *Número de Pedido:* ${orderNumber}\n`;
  message += `👤 *Cliente:* ${customerName}\n`;
  message += `🚚 *Tipo de Entrega:* ${deliveryType === 'pickup' ? 'Retiro en Tienda' : 'Envío a Domicilio'}\n`;
  
  if (store) {
    message += `🏪 *Tienda:* ${store.name} (${store.location})\n`;
  }
  
  message += `\n🛒 *PRODUCTOS:*\n`;
  products.forEach((item, index) => {
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
// Utilidades para formateo de precios
export const formatPrice = (price, currency = 'USD', locale = 'es-EC') => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency
  }).format(parseFloat(price) || 0);
};

// Utilidades para formateo de fechas
export const formatDate = (date, locale = 'es-EC') => {
  return new Date(date).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Utilidades para formateo de tiempo
export const formatTime = (date, locale = 'es-EC') => {
  return new Date(date).toLocaleTimeString(locale, {
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Generar número de pedido único
export const generateOrderNumber = () => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `PED-WEB-JFS-${timestamp}${random}`;
};

// Validar email
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validar teléfono ecuatoriano
export const isValidPhone = (phone) => {
  const phoneRegex = /^(\+593|593|0)?[0-9]{9,10}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

// Validar cédula ecuatoriana
export const isValidCedula = (cedula) => {
  if (cedula.length !== 10) return false;
  
  const digits = cedula.split('').map(Number);
  const province = parseInt(cedula.substring(0, 2));
  
  if (province < 1 || province > 24) return false;
  
  const coefficients = [2, 1, 2, 1, 2, 1, 2, 1, 2];
  let sum = 0;
  
  for (let i = 0; i < 9; i++) {
    let result = digits[i] * coefficients[i];
    if (result > 9) result -= 9;
    sum += result;
  }
  
  const checkDigit = sum % 10 === 0 ? 0 : 10 - (sum % 10);
  return checkDigit === digits[9];
};

// Debounce function
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Throttle function
export const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Scroll suave a elemento
export const scrollToElement = (elementId, offset = 0) => {
  const element = document.getElementById(elementId);
  if (element) {
    const elementPosition = element.offsetTop - offset;
    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth'
    });
  }
};

// Copiar texto al clipboard
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    // Fallback para navegadores que no soportan clipboard API
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    return true;
  }
};

// Generar slug de URL
export const generateSlug = (text) => {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
};

// Truncar texto
export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

// Calcular descuento porcentual
export const calculateDiscount = (originalPrice, salePrice) => {
  const discount = ((originalPrice - salePrice) / originalPrice) * 100;
  return Math.round(discount);
};

// Formatear número con separadores de miles
export const formatNumber = (number) => {
  return new Intl.NumberFormat('es-EC').format(number);
};

// Obtener iniciales de nombre
export const getInitials = (name) => {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .substring(0, 2);
};

// Verificar si es dispositivo móvil
export const isMobile = () => {
  return window.innerWidth <= 768;
};

// Verificar si es dispositivo táctil
export const isTouchDevice = () => {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

// Obtener parámetros de URL
export const getUrlParams = () => {
  const params = new URLSearchParams(window.location.search);
  const result = {};
  for (const [key, value] of params) {
    result[key] = value;
  }
  return result;
};

// Actualizar parámetros de URL
export const updateUrlParams = (params) => {
  const url = new URL(window.location);
  Object.keys(params).forEach(key => {
    if (params[key]) {
      url.searchParams.set(key, params[key]);
    } else {
      url.searchParams.delete(key);
    }
  });
  window.history.replaceState({}, '', url);
};
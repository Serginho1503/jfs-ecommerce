// Servicio de almacenamiento local
export class StorageService {
  static get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error reading from localStorage (${key}):`, error);
      return defaultValue;
    }
  }

  static set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error writing to localStorage (${key}):`, error);
      return false;
    }
  }

  static remove(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing from localStorage (${key}):`, error);
      return false;
    }
  }

  static clear() {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing localStorage:', error);
      return false;
    }
  }

  static exists(key) {
    return localStorage.getItem(key) !== null;
  }

  static getSize() {
    let total = 0;
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        total += localStorage[key].length + key.length;
      }
    }
    return total;
  }
}

// Funciones específicas para la aplicación
export const saveCart = (cartData) => {
  return StorageService.set('jorle-cart', cartData);
};

export const loadCart = () => {
  return StorageService.get('jorle-cart', { items: [] });
};

export const clearCart = () => {
  return StorageService.remove('jorle-cart');
};

export const saveFilters = (filters) => {
  return StorageService.set('jorle-filters', filters);
};

export const loadFilters = () => {
  return StorageService.get('jorle-filters', {
    tiendas: [],
    tallas: [],
    colores: []
  });
};

export const saveSearchHistory = (searchTerm) => {
  const history = StorageService.get('jorle-search-history', []);
  const updatedHistory = [searchTerm, ...history.filter(term => term !== searchTerm)].slice(0, 10);
  return StorageService.set('jorle-search-history', updatedHistory);
};

export const getSearchHistory = () => {
  return StorageService.get('jorle-search-history', []);
};
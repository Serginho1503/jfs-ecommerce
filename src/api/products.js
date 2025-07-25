// API para productos reales
export const fetchProducts = async (filters = {}) => {
  const API_BASE_URL = window.location.origin;
  const response = await fetch(`${API_BASE_URL}/api/products.php`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(filters)
  });
  
  if (!response.ok) {
    throw new Error('Error fetching products');
  }
  
  return response.json();
};

export const fetchProductById = async (id) => {
  const API_BASE_URL = window.location.origin;
  const response = await fetch(`${API_BASE_URL}/api/products.php?id=${id}`);
  
  if (!response.ok) {
    throw new Error('Product not found');
  }
  
  return response.json();
};

export const searchProducts = async (query) => {
  const API_BASE_URL = window.location.origin;
  const response = await fetch(`${API_BASE_URL}/api/products.php`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ search: query })
  });
  
  if (!response.ok) {
    throw new Error('Search failed');
  }
  
  return response.json();
};
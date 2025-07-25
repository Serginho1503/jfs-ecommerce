// API para productos (simulada)
export const fetchProducts = async (filters = {}) => {
  // Simular delay de API
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // En producción, esto sería una llamada real a la API
  const response = await fetch('/api/products', {
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
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const response = await fetch(`/api/products/${id}`);
  
  if (!response.ok) {
    throw new Error('Product not found');
  }
  
  return response.json();
};

export const searchProducts = async (query) => {
  await new Promise(resolve => setTimeout(resolve, 400));
  
  const response = await fetch(`/api/products/search?q=${encodeURIComponent(query)}`);
  
  if (!response.ok) {
    throw new Error('Search failed');
  }
  
  return response.json();
};
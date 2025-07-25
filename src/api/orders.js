// API para pedidos
export const createOrder = async (orderData) => {
  try {
    const response = await fetch('/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData)
    });

    if (!response.ok) {
      throw new Error('Error creating order');
    }

    return response.json();
  } catch (error) {
    console.error('Order creation failed:', error);
    throw error;
  }
};

export const getOrderById = async (orderId) => {
  try {
    const response = await fetch(`/api/orders/${orderId}`);
    
    if (!response.ok) {
      throw new Error('Order not found');
    }

    return response.json();
  } catch (error) {
    console.error('Failed to fetch order:', error);
    throw error;
  }
};

export const updateOrderStatus = async (orderId, status) => {
  try {
    const response = await fetch(`/api/orders/${orderId}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status })
    });

    if (!response.ok) {
      throw new Error('Failed to update order status');
    }

    return response.json();
  } catch (error) {
    console.error('Order status update failed:', error);
    throw error;
  }
};
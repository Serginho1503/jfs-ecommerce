// Tests para ProductCard (ejemplo)
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CartProvider } from '../../context/CartContext';
import { ProductProvider } from '../../context/ProductContext';
import ProductCard from '../../components/ProductCard';

const mockProduct = {
  pro_id: '1',
  pro_nombre: 'Test Product',
  pro_precioventa: '29.99',
  imagen_path: 'test-image.jpg',
  pro_talla: 'M',
  pro_color: 'negro',
  stock: ['Tienda Gaviota: 5']
};

const renderWithProviders = (component) => {
  return render(
    <ProductProvider>
      <CartProvider>
        {component}
      </CartProvider>
    </ProductProvider>
  );
};

describe('ProductCard', () => {
  it('renders product information correctly', () => {
    renderWithProviders(<ProductCard product={mockProduct} />);
    
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('M')).toBeInTheDocument();
    expect(screen.getByText('negro')).toBeInTheDocument();
  });

  it('adds product to cart when button is clicked', () => {
    const mockAddItem = vi.fn();
    const mockOpenCart = vi.fn();
    
    // Mock del contexto del carrito
    vi.mock('../../context/CartContext', () => ({
      useCart: () => ({
        addItem: mockAddItem,
        openCart: mockOpenCart
      })
    }));

    renderWithProviders(<ProductCard product={mockProduct} />);
    
    const addButton = screen.getByRole('button', { name: /añadir al carrito/i });
    fireEvent.click(addButton);
    
    expect(mockAddItem).toHaveBeenCalledWith(mockProduct, 1);
    expect(mockOpenCart).toHaveBeenCalled();
  });

  it('displays product image with fallback', () => {
    renderWithProviders(<ProductCard product={mockProduct} />);
    
    const image = screen.getByAltText('Test Product');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'test-image.jpg');
  });
});
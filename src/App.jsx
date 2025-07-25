import React from 'react';
import { CartProvider } from './context/CartContext';
import { ProductProvider } from './context/ProductContext';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import FilterSidebar from './components/FilterSidebar';
import CartSidebar from './components/CartSidebar';
import ProductModal from './components/ProductModal';
import CheckoutModal from './components/CheckoutModal';
import './App.css';

function App() {
  return (
    <ProductProvider>
      <CartProvider>
        <div className="app">
          <Header />
          <Hero />
          <main className="main-content">
            <div className="content-wrapper">
              <FilterSidebar />
              <ProductGrid />
            </div>
          </main>
          <CartSidebar />
          <ProductModal />
          <CheckoutModal />
        </div>
      </CartProvider>
    </ProductProvider>
  );
}

export default App;
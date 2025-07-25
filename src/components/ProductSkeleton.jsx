import React from 'react';
import './ProductSkeleton.css';

const ProductSkeleton = () => {
  return (
    <div className="product-skeleton">
      <div className="skeleton-image"></div>
      <div className="skeleton-content">
        <div className="skeleton-title"></div>
        <div className="skeleton-meta">
          <div className="skeleton-attribute"></div>
          <div className="skeleton-attribute"></div>
        </div>
        <div className="skeleton-stock">
          <div className="skeleton-stock-item"></div>
          <div className="skeleton-stock-item"></div>
          <div className="skeleton-stock-item"></div>
        </div>
        <div className="skeleton-footer">
          <div className="skeleton-price"></div>
          <div className="skeleton-button"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;
'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect, useMemo } from 'react';
import { getProductDetails } from '../../data/products';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const product = getProductDetails(params.id);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAutoSliding, setIsAutoSliding] = useState(true);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // Get media array (support both old images and new media format)
  const mediaItems = useMemo(() => {
    return product?.media || product?.images?.map(url => ({ type: 'image', url })) || [];
  }, [product]);

  // Auto-slide media
  useEffect(() => {
    if (!isAutoSliding || isVideoPlaying || !mediaItems.length) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        (prevIndex + 1) % mediaItems.length
      );
    }, 3000); // Change media every 3 seconds

    return () => clearInterval(interval);
  }, [isAutoSliding, isVideoPlaying, mediaItems.length]);

  if (!product) {
    return (
      <div className="product-detail-page">
        <div style={{ padding: '40px 20px', textAlign: 'center' }}>
          <h2>Product not found</h2>
          <button onClick={() => router.push('/')} style={{ marginTop: '20px', padding: '12px 24px', background: 'var(--primary-color)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="product-detail-page">
      {/* Navigation Bar */}
      <div className="product-nav" style={{ position: 'sticky', top: 0, zIndex: 1000 }}>
        <button className="nav-button" onClick={() => router.back()}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </button>
        <button
          className="nav-button"
          onClick={() => setIsFavorite(!isFavorite)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill={isFavorite ? "white" : "none"} stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>
      </div>

      {/* Product Image Area */}
      <div
        className="product-image-area"
        onMouseEnter={() => setIsAutoSliding(false)}
        onMouseLeave={() => setIsAutoSliding(true)}
      >
        <div className="product-image-container">
          {mediaItems[currentImageIndex]?.type === 'video' ? (
            <video
              src={mediaItems[currentImageIndex].url}
              controls
              className="product-main-image"
              style={{ width: '100%', height: 'auto', maxHeight: '400px' }}
              onPlay={() => setIsVideoPlaying(true)}
              onPause={() => setIsVideoPlaying(false)}
              onEnded={() => setIsVideoPlaying(false)}
            />
          ) : (
            <img
              src={mediaItems[currentImageIndex]?.url}
              alt={product.title}
              className="product-main-image"
            />
          )}
        </div>
        <div className="image-pagination">
          {mediaItems.map((_, index) => (
            <div
              key={index}
              className={`pagination-dot ${index === currentImageIndex ? 'active' : ''}`}
              onClick={() => setCurrentImageIndex(index)}
            />
          ))}
        </div>
      </div>

      {/* Product Details Card */}
      <div className="product-details-card">
        <h1 className="product-detail-title">{product.title}</h1>
        
        <div className="product-pricing">
          <div className="price-group">
            <span className="current-price">{product.currentPrice}</span>
            {product.originalPrice && (
              <span className="original-price">{product.originalPrice}</span>
            )}
          </div>
          {product.freeShipping && (
            <span className="shipping-badge">FREE SHIP</span>
          )}
        </div>

        <div className="product-features">
          {product.features.map((feature, index) => (
            <div key={index} className="feature-item">
              <span className="feature-icon">{feature.icon}</span>
              <span className="feature-label">{feature.label}</span>
            </div>
          ))}
        </div>

        <p className="product-description">{product.description}</p>

        <button className="add-to-cart-btn">
          Add to Cart
        </button>
      </div>
    </div>
  );
}


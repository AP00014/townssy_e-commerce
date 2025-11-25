'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect, useMemo } from 'react';

export default function ProductDetailClient({ product }) {
  const router = useRouter();
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
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
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
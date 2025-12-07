'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect, useMemo } from 'react';
import { featuredProducts, topProducts, accessories, newArrivals, hotProducts, topRated, bestSelling, luxuryProducts, ecoProducts, travelEssentials, securityProducts, topDeals, gridProducts } from '../../data/products.js';
import ProductCard from '../../components/ProductCard.js';
import { ChevronLeft, Heart, Share2, Star, Truck, Calendar, RotateCcw, ShieldCheck, MessageCircle } from 'lucide-react';

// Function to find similar products based on category and tags
function getSimilarProducts(currentProduct) {
  const allProducts = [
    ...featuredProducts,
    ...topProducts,
    ...accessories,
    ...newArrivals,
    ...hotProducts,
    ...topRated,
    ...bestSelling,
    ...luxuryProducts,
    ...ecoProducts,
    ...travelEssentials,
    ...securityProducts,
    ...topDeals,
    ...gridProducts
  ];

  // Filter products that match category or have common tags, excluding current product
  const similarProducts = allProducts.filter(p => {
    if (p.id === currentProduct.id) return false;

    const categoryMatch = p.category === currentProduct.category;
    const tagMatch = p.tags && currentProduct.tags &&
      p.tags.some(tag => currentProduct.tags.includes(tag));

    return categoryMatch || tagMatch;
  });

  // Return up to 4 similar products
  return similarProducts.slice(0, 4);
}

export default function ProductDetailClient({ product }) {
   const router = useRouter();
   const [currentImageIndex, setCurrentImageIndex] = useState(0);
   const [isFavorite, setIsFavorite] = useState(false);
   const [isAutoSliding, setIsAutoSliding] = useState(true);
   const [isVideoPlaying, setIsVideoPlaying] = useState(false);
   const [selectedSize, setSelectedSize] = useState(null);

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
          <ChevronLeft size={24} color="white" />
        </button>
        <div className="nav-actions">
          <button className="nav-button" onClick={() => {}}>
            <Share2 size={20} color="white" />
          </button>
          <button
            className="nav-button"
            onClick={() => setIsFavorite(!isFavorite)}
          >
            <Heart size={20} color="white" fill={isFavorite ? "white" : "none"} />
          </button>
        </div>
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

        {/* Product Labels */}
        {product.labels && product.labels.length > 0 && (
          <div className="product-labels">
            {product.labels.map((label, index) => (
              <span key={index} className={`product-label label-${label.type}`}>
                {label.text}
              </span>
            ))}
          </div>
        )}

        {/* Vendor Info (Mocked for now) */}
        <div className="product-vendor-info" style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '12px', 
          margin: '12px 0', 
          padding: '12px', 
          background: '#f9fafb', 
          borderRadius: '8px',
          border: '1px solid #eee'
        }}>
          <img 
            src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=50&h=50&fit=crop" 
            alt="Vendor Logo" 
            style={{ width: '40px', height: '40px', borderRadius: '4px', objectFit: 'cover' }}
          />
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Link href="/vendor/v1" style={{ fontWeight: '600', color: '#333', textDecoration: 'none' }}>
                Shenzhen Tech-Star Electronics
              </Link>
              <span style={{ fontSize: '10px', background: '#fff7e6', color: '#d48806', padding: '2px 6px', borderRadius: '4px', border: '1px solid #ffd591' }}>
                Gold Supplier
              </span>
            </div>
            <div style={{ fontSize: '12px', color: '#666', marginTop: '2px' }}>
              8 Years • 98% Response Rate
            </div>
          </div>
          <Link href="/vendor/v1" style={{ color: '#06392F', fontSize: '13px', fontWeight: '600' }}>
            Visit Store
          </Link>
        </div>

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

        {/* Specifications */}
        {product.specifications && Object.keys(product.specifications).length > 0 && (
          <div className="product-specifications">
            <h3 className="specifications-title">Specifications</h3>
            <dl className="specifications-list">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="specification-item">
                  <dt className="spec-key">{key.charAt(0).toUpperCase() + key.slice(1)}</dt>
                  <dd className="spec-value">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}

        {/* Delivery & Returns */}
        {product.delivery && (
          <div className="product-delivery">
            <h3 className="delivery-title">Delivery & Returns</h3>

            {/* Free Shipping */}
            {product.delivery.freeShipping && (
              <div className="delivery-free-shipping">
                <div className="free-shipping-icon"><Truck size={20} /></div>
                <div className="free-shipping-content">
                  <h4 className="free-shipping-title">Free Shipping</h4>
                  <p className="free-shipping-text">Enjoy free delivery on this item</p>
                </div>
              </div>
            )}

            {/* Estimated Delivery */}
            <div className="delivery-estimated">
              <div className="estimated-icon"><Calendar size={20} /></div>
              <div className="estimated-content">
                <h4 className="estimated-title">Estimated Delivery</h4>
                <p className="estimated-text">{product.delivery.estimatedDelivery}</p>
              </div>
            </div>

            {/* Shipping Options */}
            {product.delivery.shippingOptions && product.delivery.shippingOptions.length > 0 && (
              <div className="delivery-options">
                <h4 className="options-title">Shipping Options</h4>
                <div className="options-list">
                  {product.delivery.shippingOptions.map((option, index) => (
                    <div key={index} className="option-item">
                      <span className="option-name">{option}</span>
                      <span className="option-details">
                        {option === 'Standard' ? '5-7 business days' :
                         option === 'Express' ? '2-3 business days' : 'Varies'}
                      </span>
                      <span className="option-cost">
                        {product.delivery.freeShipping && option === 'Standard' ? 'Free' :
                         option === 'Standard' ? '$9.99' :
                         option === 'Express' ? '$19.99' : 'Contact for pricing'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Return Policy */}
            {product.delivery.returnPolicy && (
              <div className="delivery-returns">
                <div className="returns-icon"><RotateCcw size={20} /></div>
                <div className="returns-content">
                  <h4 className="returns-title">Returns</h4>
                  <p className="returns-text">{product.delivery.returnPolicy}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Customer Reviews */}
        {product.reviews && product.reviews.length > 0 && (
          <div className="customer-reviews">
            <h3 className="reviews-title">Customer Reviews</h3>

            {/* Overall Rating Summary */}
            <div className="reviews-summary">
              <div className="overall-rating">
                <div className="rating-stars">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      fill={i < Math.floor(product.averageRating || 0) ? "var(--primary-color)" : "none"}
                      color={i < Math.floor(product.averageRating || 0) ? "var(--primary-color)" : "var(--border-color)"}
                    />
                  ))}
                </div>
                <span className="rating-number">{(product.averageRating || 0).toFixed(1)}</span>
              </div>
              <div className="review-count">
                ({product.reviewCount || 0} review{(product.reviewCount || 0) !== 1 ? 's' : ''})
              </div>
            </div>

            {/* Individual Reviews */}
            <div className="reviews-list">
              {product.reviews.map((review, index) => (
                <div key={index} className="review-item">
                  <div className="review-header">
                    <div className="review-author">{review.author}</div>
                    {review.verified && (
                      <div className="verified-badge">
                        <ShieldCheck size={14} color="var(--primary-color)" />
                        Verified Purchase
                      </div>
                    )}
                  </div>
                  <div className="review-rating">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        fill={i < review.rating ? "var(--primary-color)" : "none"}
                        color={i < review.rating ? "var(--primary-color)" : "var(--border-color)"}
                      />
                    ))}
                  </div>
                  <div className="review-date">{review.date}</div>
                  <div className="review-comment">{review.comment}</div>
                </div>
              ))}
            </div>

            {/* Write Review Button */}
            <button className="write-review-btn">
              Write a Review
            </button>
          </div>
        )}

        {/* Size Selector */}
        {product.sizes && product.sizes.length > 0 && (
          <div className="size-selector">
            <h3 className="size-title">Size</h3>
            <div className="size-buttons">
              {product.sizes.map((sizeObj, index) => (
                <button
                  key={index}
                  className={`size-btn ${selectedSize === sizeObj.size ? 'selected' : ''} ${!sizeObj.available ? 'disabled' : ''}`}
                  onClick={() => sizeObj.available && setSelectedSize(sizeObj.size)}
                  disabled={!sizeObj.available}
                >
                  {sizeObj.size}
                </button>
              ))}
            </div>
          </div>
        )}

        <button
          className="add-to-cart-btn"
          disabled={!selectedSize || (product.sizes && product.sizes.find(s => s.size === selectedSize)?.available === false)}
        >
          Add to Cart
        </button>

        <a 
          href={`https://wa.me/1234567890?text=Hi, I'm interested in ${product.title}`}
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-btn"
        >
          <MessageCircle size={20} />
          Contact Supplier
        </a>

        {/* You Might Also Like Section */}
        {(() => {
          const similarProducts = getSimilarProducts(product);
          if (similarProducts.length === 0) return null;

          return (
            <div className="similar-products-section">
              <h3 className="similar-products-title">You Might Also Like</h3>
              <div className="similar-products-container">
                {similarProducts.map((similarProduct) => (
                  <div key={similarProduct.id} className="similar-product-item">
                    <ProductCard
                      id={similarProduct.id}
                      image={similarProduct.image}
                      title={similarProduct.title}
                      currentPrice={similarProduct.currentPrice}
                      originalPrice={similarProduct.originalPrice}
                      variant="default"
                    />
                  </div>
                ))}
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
}
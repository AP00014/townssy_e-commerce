'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect, useMemo } from 'react';
import { supabase } from '../../../lib/supabase';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/currency';
import ProductCard from '../../components/ProductCard.js';
import { SITE_LOGO_SVG } from '../../utils/siteLogo';
import { ChevronLeft, Heart, Share2, Star, Truck, Calendar, RotateCcw, ShieldCheck, MessageCircle, ShoppingCart, Loader2 } from 'lucide-react';

// Function to fetch similar products from database
async function getSimilarProducts(currentProduct) {
  try {
    if (!currentProduct.category?.id) return [];

    const { data, error } = await supabase
      .from('products')
      .select(`
        id,
        name,
        price,
        compare_price,
        images,
        is_featured,
        category:categories(id, name, slug)
      `)
      .eq('category_id', currentProduct.category.id)
      .eq('is_active', true)
      .eq('verification_status', 'approved')
      .neq('id', currentProduct.id)
      .limit(4);

    if (error) throw error;

    return (data || []).map(p => ({
      id: p.id,
      title: p.name,
      currentPrice: parseFloat(p.price),
      originalPrice: p.compare_price ? parseFloat(p.compare_price) : null,
      image: p.images && Array.isArray(p.images) && p.images.length > 0 ? p.images[0] : '/placeholder-product.jpg',
      isFavorite: false,
      badge: p.is_featured ? 'Featured' : null
    }));
  } catch (error) {
    console.error('Error fetching similar products:', error);
    return [];
  }
}

export default function ProductDetailClient({ product }) {
   const router = useRouter();
   const { isAuthenticated, user } = useAuth();
   const { addToCart, cartItems } = useCart();
   const [currentImageIndex, setCurrentImageIndex] = useState(0);
   const [isFavorite, setIsFavorite] = useState(false);
   const [isAutoSliding, setIsAutoSliding] = useState(true);
   const [isVideoPlaying, setIsVideoPlaying] = useState(false);
   const [selectedSize, setSelectedSize] = useState(null);
   const [similarProducts, setSimilarProducts] = useState([]);
   const [loadingSimilar, setLoadingSimilar] = useState(true);
   const [addingToCart, setAddingToCart] = useState(false);
   const [cartSuccess, setCartSuccess] = useState(false);

   // Normalize product data (handle both old and new formats)
   const normalizedProduct = useMemo(() => {
     return {
       id: product.id,
       title: product.name || product.title,
       name: product.name || product.title,
       description: product.description || '',
       price: product.price || product.currentPrice,
       comparePrice: product.comparePrice || product.originalPrice,
       images: product.images || [],
       location: product.location,
       region: product.region,
       delivery: product.delivery,
       deliveryOptions: product.deliveryOptions || product.delivery_options || [],
       supplierWhatsapp: product.supplierWhatsapp || product.supplier_whatsapp,
       supplierType: product.supplierType || product.supplier_type,
       specifications: product.specifications || {},
       stockQuantity: product.stockQuantity || product.stock_quantity || 0,
       sku: product.sku,
       category: product.category,
       vendor: product.vendor,
       adminCreator: product.adminCreator,
       isAdminCreated: product.isAdminCreated,
       vendorId: product.vendorId,
       vendorName: product.vendorName,
       adminName: product.adminName,
       isFeatured: product.isFeatured || product.is_featured,
       viewCount: product.viewCount || product.view_count || 0,
       salesCount: product.salesCount || product.sales_count || 0
     };
   }, [product]);

   // Fetch similar products
   useEffect(() => {
     const loadSimilar = async () => {
       setLoadingSimilar(true);
       const similar = await getSimilarProducts(normalizedProduct);
       setSimilarProducts(similar);
       setLoadingSimilar(false);
     };
     loadSimilar();
   }, [normalizedProduct.id]);

  // Get media array (support both old images and new media format)
  const mediaItems = useMemo(() => {
    return normalizedProduct?.media || normalizedProduct?.images?.map(url => ({ type: 'image', url })) || [];
  }, [normalizedProduct]);

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
              src={mediaItems[currentImageIndex]?.url || '/placeholder-product.jpg'}
              alt={normalizedProduct.title}
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
        <h1 className="product-detail-title">{normalizedProduct.title}</h1>

        {/* Product Labels */}
        {normalizedProduct.isFeatured && (
          <div className="product-labels">
            <span className="product-label label-featured">
              Featured
            </span>
          </div>
        )}

        {/* Vendor/Store Info */}
        {normalizedProduct.isAdminCreated && normalizedProduct.adminCreator?.id ? (
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
              src={normalizedProduct.adminCreator.avatar_url || SITE_LOGO_SVG} 
              alt="Townssy Stores Logo" 
              style={{ width: '40px', height: '40px', borderRadius: '4px', objectFit: 'cover' }}
              onError={(e) => {
                e.target.src = SITE_LOGO_SVG;
              }}
            />
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Link 
                  href={`/admin-products/${normalizedProduct.adminCreator.id}`}
                  style={{ fontWeight: '600', color: '#333', textDecoration: 'none' }}
                >
                  Townssy Stores
                </Link>
                <span style={{ 
                  fontSize: '10px', 
                  background: 'linear-gradient(135deg, var(--primary-color, #22c55e) 0%, var(--primary-color-dark, #16a34a) 100%)', 
                  color: 'white', 
                  padding: '2px 6px', 
                  borderRadius: '4px',
                  fontWeight: '500'
                }}>
                  {normalizedProduct.supplierType === 'manufacturer' ? 'Manufacturer' : 'Supplier'}
                </span>
              </div>
              <div style={{ fontSize: '12px', color: '#666', marginTop: '2px' }}>
                {normalizedProduct.adminName || normalizedProduct.adminCreator?.full_name || 'Admin'} • Verified Store
              </div>
            </div>
            <Link 
              href={`/admin-products/${normalizedProduct.adminCreator.id}`}
              style={{ color: '#06392F', fontSize: '13px', fontWeight: '600' }}
            >
              Visit Store
            </Link>
          </div>
        ) : normalizedProduct.isAdminCreated && !normalizedProduct.adminCreator?.id ? (
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
              src={SITE_LOGO_SVG} 
              alt="Townssy Stores Logo" 
              style={{ width: '40px', height: '40px', borderRadius: '4px', objectFit: 'cover' }}
            />
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontWeight: '600', color: '#333' }}>
                  Townssy Stores
                </span>
                <span style={{ 
                  fontSize: '10px', 
                  background: 'linear-gradient(135deg, var(--primary-color, #22c55e) 0%, var(--primary-color-dark, #16a34a) 100%)', 
                  color: 'white', 
                  padding: '2px 6px', 
                  borderRadius: '4px',
                  fontWeight: '500'
                }}>
                  {normalizedProduct.supplierType === 'manufacturer' ? 'Manufacturer' : 'Supplier'}
                </span>
              </div>
              <div style={{ fontSize: '12px', color: '#666', marginTop: '2px' }}>
                Admin • Verified Store
              </div>
            </div>
          </div>
        ) : normalizedProduct.vendor ? (
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
              src={normalizedProduct.vendor.logo_url || normalizedProduct.vendor.profiles?.avatar_url || '/default-avatar.png'} 
              alt="Vendor Logo" 
              style={{ width: '40px', height: '40px', borderRadius: '4px', objectFit: 'cover' }}
              onError={(e) => {
                e.target.src = '/default-avatar.png';
              }}
            />
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Link 
                  href={`/vendor/${normalizedProduct.vendor.id}`}
                  style={{ fontWeight: '600', color: '#333', textDecoration: 'none' }}
                >
                  {normalizedProduct.vendorName || normalizedProduct.vendor.business_name || 'Vendor Store'}
                </Link>
                {normalizedProduct.vendor.verification_status === 'verified' && (
                  <span style={{ 
                    fontSize: '10px', 
                    background: '#fff7e6', 
                    color: '#d48806', 
                    padding: '2px 6px', 
                    borderRadius: '4px', 
                    border: '1px solid #ffd591' 
                  }}>
                    {normalizedProduct.vendor.verification_status === 'verified' ? 'Verified' : 'Pending'}
                  </span>
                )}
              </div>
              <div style={{ fontSize: '12px', color: '#666', marginTop: '2px' }}>
                {normalizedProduct.supplierType === 'manufacturer' ? 'Manufacturer' : 'Supplier'} • {normalizedProduct.vendor.verification_status === 'verified' ? 'Verified' : 'Pending Verification'}
              </div>
            </div>
            <Link 
              href={`/vendor/${normalizedProduct.vendor.id}`}
              style={{ color: '#06392F', fontSize: '13px', fontWeight: '600' }}
            >
              Visit Store
            </Link>
          </div>
        ) : null}

        <div className="product-pricing">
          <div className="price-group">
            <span className="current-price">{formatPrice(normalizedProduct.price)}</span>
            {normalizedProduct.comparePrice && (
              <span className="original-price">{formatPrice(normalizedProduct.comparePrice)}</span>
            )}
          </div>
          {normalizedProduct.delivery && (
            <span className="shipping-badge">DELIVERY AVAILABLE</span>
          )}
        </div>

        {/* Stock Info */}
        {normalizedProduct.stockQuantity > 0 && (
          <div className="product-stock" style={{ marginTop: '12px', fontSize: '14px', color: '#10b981' }}>
            In Stock ({normalizedProduct.stockQuantity} available)
          </div>
        )}
        {normalizedProduct.stockQuantity === 0 && (
          <div className="product-stock" style={{ marginTop: '12px', fontSize: '14px', color: '#ef4444' }}>
            Out of Stock
          </div>
        )}

        <p className="product-description">{normalizedProduct.description}</p>

        {/* Specifications */}
        {normalizedProduct.specifications && Object.keys(normalizedProduct.specifications).length > 0 && (
          <div className="product-specifications">
            <h3 className="specifications-title">Specifications</h3>
            <dl className="specifications-list">
              {Object.entries(normalizedProduct.specifications).map(([key, value]) => (
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
                         option === 'Standard' ? formatPrice(9.99) :
                         option === 'Express' ? formatPrice(19.99) : 'Contact for pricing'}
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
          disabled={normalizedProduct.stockQuantity === 0 || addingToCart}
          onClick={async () => {
            if (!isAuthenticated) {
              router.push(`/auth/login?redirect=/products/${product.id}`);
              return;
            }

            if (normalizedProduct.stockQuantity === 0) {
              alert('This product is out of stock.');
              return;
            }

            try {
              setAddingToCart(true);
              
              // Fetch current stock from database to ensure accuracy
              const { data: productData, error: stockError } = await supabase
                .from('products')
                .select('stock_quantity')
                .eq('id', normalizedProduct.id)
                .single();

              const currentStock = productData?.stock_quantity || normalizedProduct.stockQuantity || 0;

              if (currentStock === 0) {
                alert('This product is out of stock.');
                setAddingToCart(false);
                return;
              }

              // Check if item already in cart and would exceed stock
              const existingCartItem = cartItems.find(item => item.id === normalizedProduct.id);
              const currentCartQuantity = existingCartItem?.quantity || 0;
              
              if (currentCartQuantity >= currentStock) {
                alert(`You already have the maximum available quantity (${currentStock}) in your cart.`);
                setAddingToCart(false);
                return;
              }
              
              // Prepare product data for cart
              const cartProduct = {
                id: normalizedProduct.id,
                title: normalizedProduct.title,
                name: normalizedProduct.name,
                image: mediaItems[0]?.url || '/placeholder-product.jpg',
                currentPrice: parseFloat(normalizedProduct.price),
                originalPrice: normalizedProduct.comparePrice ? parseFloat(normalizedProduct.comparePrice) : null,
                quantity: 1,
                stockQuantity: currentStock,
                stock_quantity: currentStock,
                sku: normalizedProduct.sku,
                supplierType: normalizedProduct.supplierType,
                vendorId: normalizedProduct.vendorId,
                vendorName: normalizedProduct.vendorName,
                adminName: normalizedProduct.adminName,
                isAdminCreated: normalizedProduct.isAdminCreated
              };

              addToCart(cartProduct, 1);
              
              setCartSuccess(true);
              setTimeout(() => setCartSuccess(false), 3000);
            } catch (error) {
              console.error('Error adding to cart:', error);
              alert('Failed to add product to cart. Please try again.');
            } finally {
              setAddingToCart(false);
            }
          }}
        >
          {addingToCart ? (
            <>
              <Loader2 size={18} className="spinning" />
              Adding...
            </>
          ) : cartSuccess ? (
            <>
              <ShoppingCart size={18} />
              Added to Cart!
            </>
          ) : normalizedProduct.stockQuantity > 0 ? (
            <>
              <ShoppingCart size={18} />
              Add to Cart
            </>
          ) : (
            'Out of Stock'
          )}
        </button>

        <a 
          href={normalizedProduct.supplierWhatsapp || `https://wa.me/?text=Hi, I'm interested in ${normalizedProduct.title}`}
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-btn"
        >
          <MessageCircle size={20} />
          Contact Supplier
        </a>

        {/* You Might Also Like Section */}
        {loadingSimilar ? (
          <div className="similar-products-section" style={{ padding: '20px', textAlign: 'center' }}>
            <div className="category-loading-spinner"></div>
            <p style={{ marginTop: '10px', color: '#64748b', fontSize: '14px' }}>Loading similar products...</p>
          </div>
        ) : similarProducts.length > 0 && (
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
        )}
      </div>
    </div>
  );
}
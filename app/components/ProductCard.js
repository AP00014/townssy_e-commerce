'use client';

import { useRouter } from 'next/navigation';
import { useFavourites } from '../context/FavouritesContext';
import { Check, Search, ArrowDown, ArrowUp, Award } from 'lucide-react';

export default function ProductCard({
  id,
  image,
  title,
  currentPrice,
  originalPrice,
  isFavorite = false,
  // New Alibaba-style props
  badge,
  moq,
  sellerInfo,
  priceIndicator,
  deliveryInfo,
  reorderRate,
  soldCount,
  discount,
  showVisualSearch = true,
  variant = 'default' // 'default', 'top-deal', 'top-ranking', 'grid'
}) {
  const { toggleFavourite, isFavourite } = useFavourites();
  const router = useRouter();

  const favourite = isFavourite(id);

  const formatPrice = (price) => {
    if (price == null) return '';
    if (typeof price === 'string') {
      return price;
    }
    return `$${price.toFixed(2)}`;
  };

  return (
    <div className={`product-card-link product-card-${variant}`}>
      <div className="product-card">
        <div className="product-image-wrapper">
          <img
            src={image}
            alt={title}
            className="product-image"
          />
          
          {/* Badges */}
          {badge && (
            <div className={`product-badge product-badge-${badge.type || 'default'}`}>
              {badge.text}
            </div>
          )}
          
          {/* Visual Search Icon */}
          {showVisualSearch && (
            <div className="product-visual-search">
              <Search size={14} />
            </div>
          )}
          
          {/* Favorite Button */}
          <div
            className={`product-favorite ${favourite ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleFavourite({
                id,
                title,
                image,
                currentPrice: typeof currentPrice === 'string' ? parseFloat(currentPrice.replace('$', '')) : currentPrice,
                originalPrice: originalPrice ? (typeof originalPrice === 'string' ? parseFloat(originalPrice.replace('$', '')) : originalPrice) : null
              });
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill={favourite ? "#FF0000" : "none"} stroke={favourite ? "#FF0000" : "#666666"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </div>
        </div>
        
        <div className="product-info">
          {/* Badge above title */}
          {badge && badge.position === 'above-title' && (
            <div className={`product-badge-inline product-badge-${badge.type || 'default'}`}>
              {badge.text}
            </div>
          )}
          
          <div className="product-title-link" onClick={() => router.push(`/products/${id || 1}`)}>
            <div className="product-title">{title}</div>
          </div>
          
          {/* Price - only show if not top-ranking variant or if price exists */}
          {(variant !== 'top-ranking' || currentPrice) && (
            <div className="product-price">
              {currentPrice && (
                <span className="product-price-current">{formatPrice(currentPrice)}</span>
              )}
              {originalPrice && (
                <span className="product-price-original">{formatPrice(originalPrice)}</span>
              )}
              {discount && (
                <span className="product-discount">{discount}</span>
              )}
            </div>
          )}
          
          {/* MOQ */}
          {moq && (
            <div className="product-moq">MOQ: {moq}</div>
          )}
          
          {/* Ranking Badge - below title for top-ranking */}
          {badge && badge.position === 'below-title' && (
            <div className={`product-ranking-badge product-ranking-badge-${badge.type || 'default'}`}>
              {badge.icon === 'crown' && <Award size={12} />}
              {badge.icon === 'arrow-up' && <ArrowUp size={12} />}
              <span>{badge.text}</span>
            </div>
          )}
          
          {/* Price Indicator */}
          {priceIndicator && (
            <div className="product-price-indicator">
              {priceIndicator.type === 'lower' && <ArrowDown size={12} />}
              <span>{priceIndicator.text}</span>
            </div>
          )}
          
          {/* Delivery Info */}
          {deliveryInfo && (
            <div className="product-delivery">
              <Check size={12} />
              <span>{deliveryInfo}</span>
            </div>
          )}
          
          {/* Reorder Rate */}
          {reorderRate && (
            <div className="product-reorder">
              <Check size={12} />
              <span>Reorder rate {reorderRate}%</span>
            </div>
          )}
          
          {/* Sold Count */}
          {soldCount && (
            <div className="product-sold">{soldCount} sold</div>
          )}
          
          {/* Seller Info */}
          {sellerInfo && (
            <div className="product-seller">{sellerInfo}</div>
          )}
        </div>
      </div>
    </div>
  );
}


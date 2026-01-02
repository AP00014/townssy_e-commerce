'use client';

import { memo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useFavourites } from '../context/FavouritesContext';
import { formatPrice } from '../utils/currency';
import { Check, ArrowDown, ArrowUp, Award } from 'lucide-react';

function ProductCard({
  id,
  image,
  title,
  currentPrice,
  originalPrice,
  isFavorite = false,
  badge,
  variant = 'default', // 'default', 'top-deal', 'top-ranking', 'grid'
  priority = false, // For above-the-fold images (LCP optimization)
  loading = 'lazy' // 'lazy' or 'eager'
}) {
  const { toggleFavourite, isFavourite } = useFavourites();
  const router = useRouter();
  const [imageError, setImageError] = useState(false);
  const [imageSrc, setImageSrc] = useState(image || '/placeholder-product.jpg');

  const favourite = isFavourite(id);

  // Check if image is a valid URL and from allowed domains
  const isValidImageUrl = (url) => {
    if (!url || url === '/placeholder-product.jpg') return true; // Placeholder is always valid
    try {
      const urlObj = new URL(url);
      // Allow Supabase storage URLs and other common image hosts
      return urlObj.hostname.includes('supabase.co') || 
             urlObj.hostname.includes('supabase.in') ||
             urlObj.protocol === 'data:';
    } catch {
      // If it's not a valid URL, it might be a relative path
      return url.startsWith('/');
    }
  };

  // Handle image error - fallback to placeholder
  const handleImageError = () => {
    if (!imageError) {
      setImageError(true);
      setImageSrc('/placeholder-product.jpg');
    }
  };

  // Determine if we should use Next.js Image or regular img tag
  const shouldUseNextImage = isValidImageUrl(imageSrc) && !imageError;

  return (
    <Link href={`/products/${id}`} className={`product-card-link product-card-${variant}`}>
      <div className="product-card">
        <div className="product-image-wrapper">
          {shouldUseNextImage ? (
            <Image
              src={imageSrc}
              alt={title || 'Product image'}
              width={300}
              height={300}
              className="product-image"
              loading={priority ? 'eager' : loading}
              priority={priority}
              quality={85}
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              onError={handleImageError}
              unoptimized={imageSrc && !imageSrc.includes('supabase.co') && !imageSrc.includes('supabase.in')}
            />
          ) : (
            <img
              src={imageSrc}
              alt={title || 'Product image'}
              className="product-image"
              loading="lazy"
              onError={handleImageError}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          )}
          
          {/* Badges */}
          {badge && (
            <div className={`product-badge product-badge-${badge.type || 'default'}`}>
              {badge.text}
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
          
          <div className="product-title-link">
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
            </div>
          )}

          {/* Ranking Badge - below title for top-ranking */}
          {badge && badge.position === 'below-title' && (
            <div className={`product-ranking-badge product-ranking-badge-${badge.type || 'default'}`}>
              {badge.icon === 'crown' && <Award size={12} />}
              {badge.icon === 'arrow-up' && <ArrowUp size={12} />}
              <span>{badge.text}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

export default memo(ProductCard);


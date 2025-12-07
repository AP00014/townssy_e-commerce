'use client';

import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    title: 'Big Sale',
    subtitle: 'Up to 50% Discount',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=300&fit=crop',
    gradient: 'linear-gradient(135deg, var(--primary-color) 0%, var(--primary-color-dark) 100%)',
  },
  {
    id: 2,
    title: 'New Arrivals',
    subtitle: 'Shop the Latest Trends',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=300&fit=crop',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  {
    id: 3,
    title: 'Free Shipping',
    subtitle: 'On Orders Over $50',
    image: 'https://images.unsplash.com/photo-1607082349566-187342175e2f?w=300&h=300&fit=crop',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  },
  {
    id: 4,
    title: 'Flash Deals',
    subtitle: 'Limited Time Offers',
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=300&h=300&fit=crop',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  },
  {
    id: 5,
    title: 'Best Sellers',
    subtitle: 'Top Rated Products',
    image: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?w=300&h=300&fit=crop',
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  },
];

export default function PromoBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const intervalRef = useRef(null);
  const bannerRef = useRef(null);
  const touchStartRef = useRef(null);
  const touchStartYRef = useRef(null);

  // Auto-slide functionality
  useEffect(() => {
    if (isAutoPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 4000); // Change slide every 4 seconds
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoPlaying]);

  // Pause auto-play on hover (desktop)
  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
  };

  const handleMouseLeave = () => {
    setIsAutoPlaying(true);
  };

  // Navigation functions
  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000); // Resume after 5 seconds
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000); // Resume after 5 seconds
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000); // Resume after 5 seconds
  };

  // Touch handlers for mobile swipe
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    const startX = e.targetTouches[0].clientX;
    setTouchStart(startX);
    touchStartRef.current = startX;
    touchStartYRef.current = e.targetTouches[0].clientY;
    setIsAutoPlaying(false);
  };

  const onTouchMove = (e) => {
    const currentX = e.targetTouches[0].clientX;
    const currentY = e.targetTouches[0].clientY;
    setTouchEnd(currentX);
    
    // Prevent vertical scrolling if horizontal swipe is detected
    if (touchStartRef.current !== null && touchStartYRef.current !== null) {
      const deltaX = Math.abs(currentX - touchStartRef.current);
      const deltaY = Math.abs(currentY - touchStartYRef.current);
      
      if (deltaX > deltaY && deltaX > 10) {
        e.preventDefault();
      }
    }
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) {
      setIsAutoPlaying(true);
      return;
    }
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    } else {
      setIsAutoPlaying(true);
    }
  };

  return (
    <div 
      className="promo-banner-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={bannerRef}
    >
      <div 
        className="promo-banner-wrapper"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {slides.map((slide, index) => {
          let className = 'promo-banner';
          if (index === currentSlide) {
            className += ' active';
          } else if (index < currentSlide) {
            className += ' prev';
          }
          
          return (
            <div
              key={slide.id}
              className={className}
              style={{ background: slide.gradient }}
            >
              <div className="promo-content">
                <div className="promo-title">{slide.title}</div>
                <div className="promo-subtitle">{slide.subtitle}</div>
              </div>
              <div className="promo-image-wrapper">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="promo-image"
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Buttons (Desktop) */}
      <button 
        className="promo-nav-btn promo-nav-prev"
        onClick={goToPrevious}
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>
      <button 
        className="promo-nav-btn promo-nav-next"
        onClick={goToNext}
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots Indicator */}
      <div className="promo-dots">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`promo-dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}


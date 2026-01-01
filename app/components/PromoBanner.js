'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase } from '../../lib/supabase';

// Default slides fallback
const defaultSlides = [
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
    subtitle: 'On Orders Over ₵200',
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

export default function PromoBanner({ slides: propSlides }) {
  const [slides, setSlides] = useState(propSlides || defaultSlides);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const intervalRef = useRef(null);
  const bannerRef = useRef(null);
  const touchStartRef = useRef(null);
  const touchEndRef = useRef(null);
  const touchStartYRef = useRef(null);

  // Fetch slides from database if not provided as props
  useEffect(() => {
    // If propSlides is explicitly null, hide the component (set empty array)
    if (propSlides === null) {
      setSlides([]);
      return;
    }
    
    // If propSlides is provided (array), use it
    if (propSlides && Array.isArray(propSlides)) {
      setSlides(propSlides);
      return;
    }

    const fetchPromoBanner = async () => {
      try {
        const { data, error } = await supabase
          .from('home_sections')
          .select('layout_config, is_active')
          .eq('name', 'promo_banner')
          .eq('is_active', true)
          .maybeSingle(); // Use maybeSingle() instead of single() to handle 0 rows

        if (error) throw error;

        if (data?.is_active && data?.layout_config?.type === 'promo_banner' && data.layout_config.slides && data.layout_config.slides.length > 0) {
          setSlides(data.layout_config.slides);
        }
        // If no data or inactive, keep default slides
      } catch (error) {
        console.error('Error fetching promo banner:', error);
        // Keep default slides on error
      }
    };

    fetchPromoBanner();

    // Set up real-time subscription for promo banner updates
    const channel = supabase
      .channel('promo-banner-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'home_sections',
          filter: 'name=eq.promo_banner'
        },
        (payload) => {
          console.log('Promo banner changed:', payload);
          
          // If section is active and has slides, update
          if (payload.new?.is_active && payload.new?.layout_config?.type === 'promo_banner' && payload.new.layout_config.slides?.length > 0) {
            setSlides(payload.new.layout_config.slides);
          } else {
            // If section is inactive or missing slides, use defaults (component will still render with defaults)
            // Note: If parent passes null as propSlides, component will hide itself
            setSlides(defaultSlides);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [propSlides]);

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
  const goToNext = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000); // Resume after 5 seconds
  }, []);

  const goToPrevious = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000); // Resume after 5 seconds
  }, []);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000); // Resume after 5 seconds
  };

  // Touch handlers for mobile swipe
  const minSwipeDistance = 50;

  // Add touch event listeners directly to DOM with passive: false
  useEffect(() => {
    const element = bannerRef.current;
    if (!element) return;

    const onTouchStart = (e) => {
      touchEndRef.current = null;
      const startX = e.touches[0].clientX;
      touchStartRef.current = startX;
      touchStartYRef.current = e.touches[0].clientY;
      setIsAutoPlaying(false);
    };

    const onTouchMove = (e) => {
      const currentX = e.touches[0].clientX;
      const currentY = e.touches[0].clientY;
      touchEndRef.current = currentX;
      
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
      if (!touchStartRef.current || touchEndRef.current === null) {
        setIsAutoPlaying(true);
        return;
      }
      
      const distance = touchStartRef.current - touchEndRef.current;
      const isLeftSwipe = distance > minSwipeDistance;
      const isRightSwipe = distance < -minSwipeDistance;

      if (isLeftSwipe) {
        goToNext();
      } else if (isRightSwipe) {
        goToPrevious();
      } else {
        setIsAutoPlaying(true);
      }
      
      // Reset touch references
      touchStartRef.current = null;
      touchEndRef.current = null;
      touchStartYRef.current = null;
    };

    // Add event listeners with passive: false for touchmove to allow preventDefault
    element.addEventListener('touchstart', onTouchStart, { passive: true });
    element.addEventListener('touchmove', onTouchMove, { passive: false });
    element.addEventListener('touchend', onTouchEnd, { passive: true });

    return () => {
      element.removeEventListener('touchstart', onTouchStart);
      element.removeEventListener('touchmove', onTouchMove);
      element.removeEventListener('touchend', onTouchEnd);
    };
  }, [goToNext, goToPrevious]);

  // Don't render if no slides available
  // If propSlides is explicitly null (from parent), don't render
  if (propSlides === null || !slides || slides.length === 0) {
    return null;
  }

  return (
    <div 
      className="promo-banner-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={bannerRef}
    >
      <div 
        className="promo-banner-wrapper"
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


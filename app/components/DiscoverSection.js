"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ProductCard from "./ProductCard";
import {
  gridProducts,
  featuredProducts,
  newArrivals,
  bestSelling,
  luxuryProducts,
  ecoProducts,
} from "../data/products";
import { getRandomDiscoverContent } from "../data/discoverContent";

export default function DiscoverSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [discoverData, setDiscoverData] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Select random discover content on mount
  useEffect(() => {
    const selectedContent = getRandomDiscoverContent();
    setDiscoverData(selectedContent);
  }, []);

  // Detect mobile screen
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 480);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Auto-slide effect
  useEffect(() => {
    if (!discoverData) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % discoverData.slides.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [discoverData]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Get products from a relevant category based on the discover content
  const getRelevantProducts = () => {
    if (!discoverData) return gridProducts.slice(0, 4);

    // Map category slugs to product arrays
    const categoryProductMap = {
      "womens-clothes": featuredProducts,
      electronics: gridProducts,
      "pet-supplies": ecoProducts,
      "home-garden": luxuryProducts,
      "sports-fitness": newArrivals,
      "beauty-health": bestSelling,
    };

    const products =
      categoryProductMap[discoverData.categorySlug] || gridProducts;
    return products.slice(0, 3); // Get first 3 products from the category
  };

  if (!discoverData) {
    return null; // or a loading skeleton
  }

  const displayProducts = getRelevantProducts();

  return (
    <div className="discover-section">
      {/* Tabs */}
      <div className="discover-tabs">
        <button className="discover-tab active">
          <span className="tab-icon">🧡</span>
          Picks for you
        </button>
        <button className="discover-tab inactive">
          <span className="tab-icon">💡</span>
          Inspirations
        </button>
      </div>

      {/* Grid Layout */}
      <div className="discover-grid">
        {/* Left Column: Promo Card Slider */}
        <div className="promo-card">
          <div className="promo-header">
            <h3 className="promo-title">{discoverData.title}</h3>
          </div>

          <div className="promo-slider">
            {discoverData.slides.map((slide, index) => (
              <div
                key={index}
                className={`promo-slide ${
                  index === currentSlide ? "active" : ""
                }`}
              >
                <img
                  src={slide.image}
                  alt={slide.alt}
                  className="promo-main-image"
                />
              </div>
            ))}
          </div>

          <div className="promo-footer">
            <Link
              href={`/category/${discoverData.categorySlug}`}
              className="view-more-btn"
            >
              View more
            </Link>
          </div>

          <div className="promo-dots">
            {discoverData.slides.map((_, index) => (
              <button
                key={index}
                className={`promo-dot ${
                  index === currentSlide ? "active" : ""
                }`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Right Column: Products */}
        {!isMobile && (
          <div className="discover-products">
            {displayProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                image={product.image}
                title={product.title}
                currentPrice={product.currentPrice}
                originalPrice={product.originalPrice}
                badge={product.badge}
                variant="grid"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

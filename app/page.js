'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import SectionHeader from './components/SectionHeader';
import ProductCard from './components/ProductCard';
import PromoBanner from './components/PromoBanner';
import BottomNav from './components/BottomNav';
import CategoriesModal from './components/CategoriesModal';
import { ChevronDown } from 'lucide-react';
import { categories, featuredProducts, newArrivals, hotProducts, topRated, bestSelling, luxuryProducts, ecoProducts, travelEssentials, securityProducts, topDeals, topRanking, tailoredSelections, gridProducts } from './data/products';

export default function Home() {
  const [activeTab, setActiveTab] = useState('All');
  const [isCategoriesModalOpen, setIsCategoriesModalOpen] = useState(false);
  const [isTabsVisible, setIsTabsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const scrollTimeoutRef = useRef(null);
  const tabsRef = useRef(null);

  // Use categories for tabs, with "All" as the first tab
  const tabs = ['All', ...categories.slice(0, 2).map(cat => cat.name)];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Clear existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Hide tabs when scrolling down
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsTabsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // Show tabs when scrolling up
        setIsTabsVisible(true);
      }

      // Show tabs when user stops scrolling
      scrollTimeoutRef.current = setTimeout(() => {
        setIsTabsVisible(true);
      }, 150);

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [lastScrollY]);

  return (
    <div className="page-content">
      <div className="container">
        <Header />
        <SearchBar cartCount={3} />
        
        {/* Navigation Tabs with Dropdown */}
        <div 
          ref={tabsRef}
          className={`category-tabs ${isTabsVisible ? 'visible' : 'hidden'}`}
        >
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`category-tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
          <button
            className="category-tab-dropdown"
            onClick={() => setIsCategoriesModalOpen(true)}
          >
            <ChevronDown size={18} />
          </button>
        </div>
        
        <CategoriesModal
          isOpen={isCategoriesModalOpen}
          onClose={() => setIsCategoriesModalOpen(false)}
          categories={categories}
        />

        <PromoBanner />

        {/* Top Deals Section */}
        <div className="products-container top-deals-section">
          <SectionHeader title="Top Deals" />
          <p className="section-subtitle">Score the lowest prices on Townssy E-commerce</p>
          <div className="products-scroll">
            {topDeals.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                image={product.image}
                title={product.title}
                currentPrice={product.currentPrice}
                originalPrice={product.originalPrice}
                isFavorite={product.isFavorite}
                badge={product.badge}
                moq={product.moq}
                sellerInfo={product.sellerInfo}
                priceIndicator={product.priceIndicator}
                deliveryInfo={product.deliveryInfo}
                discount={product.discount}
                variant="top-deal"
              />
            ))}
          </div>
        </div>

        {/* Top Ranking Section */}
        <Link 
          href="/top-ranking"
          className="products-container top-ranking-section"
          style={{ textDecoration: 'none', display: 'block' }}
        >
          <SectionHeader title="Top Ranking" />
          <p className="section-subtitle">Navigate trends with data-driven rankings</p>
          <div className="products-scroll">
            {topRanking.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                image={product.image}
                title={product.title}
                currentPrice={product.currentPrice}
                originalPrice={product.originalPrice}
                isFavorite={product.isFavorite}
                badge={product.badge}
                moq={product.moq}
                sellerInfo={product.sellerInfo}
                soldCount={product.soldCount}
                variant="top-ranking"
              />
            ))}
          </div>
        </Link>

        {/* Tailored Selections Section */}
        <div className="tailored-selections-section">
          <div className="tailored-selections-list">
            <h3 className="section-title" style={{ marginBottom: '16px', padding: '0 4px' }}>Tailored Selections</h3>
            {tailoredSelections.map((selection) => (
              <div key={selection.id} className="tailored-selection-item">
                <img
                  src={selection.image}
                  alt={selection.label}
                  className="tailored-selection-image"
                />
                <span className="tailored-selection-label">{selection.label}</span>
              </div>
            ))}
          </div>
          <div className="products-grid">
            {gridProducts.slice(0, 4).map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                image={product.image}
                title={product.title}
                currentPrice={product.currentPrice}
                originalPrice={product.originalPrice}
                isFavorite={product.isFavorite}
                badge={product.badge}
                moq={product.moq}
                sellerInfo={product.sellerInfo}
                priceIndicator={product.priceIndicator}
                deliveryInfo={product.deliveryInfo}
                discount={product.discount}
                variant="grid"
              />
            ))}
          </div>
        </div>

        {/* Additional Grid Products Section */}
        <div className="products-container">
          <div className="products-grid">
            {gridProducts.slice(4).map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                image={product.image}
                title={product.title}
                currentPrice={product.currentPrice}
                originalPrice={product.originalPrice}
                isFavorite={product.isFavorite}
                badge={product.badge}
                moq={product.moq}
                sellerInfo={product.sellerInfo}
                priceIndicator={product.priceIndicator}
                deliveryInfo={product.deliveryInfo}
                reorderRate={product.reorderRate}
                soldCount={product.soldCount}
                discount={product.discount}
                variant="grid"
              />
            ))}
          </div>
        </div>

        <div className="products-container">
          <SectionHeader title="Featured" />
          <div className="products-scroll">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                image={product.image}
                title={product.title}
                currentPrice={product.currentPrice}
                originalPrice={product.originalPrice}
                isFavorite={product.isFavorite}
              />
            ))}
          </div>
        </div>

        <div className="products-container">
          <SectionHeader title="New Arrivals" />
          <div className="products-scroll">
            {newArrivals.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                image={product.image}
                title={product.title}
                currentPrice={product.currentPrice}
                originalPrice={product.originalPrice}
                isFavorite={product.isFavorite}
              />
            ))}
          </div>
        </div>

        <div className="products-container">
          <SectionHeader title="Hot" />
          <div className="products-scroll">
            {hotProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                image={product.image}
                title={product.title}
                currentPrice={product.currentPrice}
                originalPrice={product.originalPrice}
                isFavorite={product.isFavorite}
              />
            ))}
          </div>
        </div>

        <div className="products-container">
          <SectionHeader title="Top Rated" />
          <div className="products-scroll">
            {topRated.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                image={product.image}
                title={product.title}
                currentPrice={product.currentPrice}
                originalPrice={product.originalPrice}
                isFavorite={product.isFavorite}
              />
            ))}
          </div>
        </div>

        <div className="products-container">
          <SectionHeader title="Best Selling" />
          <div className="products-scroll">
            {bestSelling.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                image={product.image}
                title={product.title}
                currentPrice={product.currentPrice}
                originalPrice={product.originalPrice}
                isFavorite={product.isFavorite}
              />
            ))}
          </div>
        </div>

        <div className="products-container">
          <SectionHeader title="Luxury" />
          <div className="products-scroll">
            {luxuryProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                image={product.image}
                title={product.title}
                currentPrice={product.currentPrice}
                originalPrice={product.originalPrice}
                isFavorite={product.isFavorite}
              />
            ))}
          </div>
        </div>

        <div className="products-container">
          <SectionHeader title="Eco" />
          <div className="products-scroll">
            {ecoProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                image={product.image}
                title={product.title}
                currentPrice={product.currentPrice}
                originalPrice={product.originalPrice}
                isFavorite={product.isFavorite}
              />
            ))}
          </div>
        </div>

        <div className="products-container">
          <SectionHeader title="Travel Essentials" />
          <div className="products-scroll">
            {travelEssentials.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                image={product.image}
                title={product.title}
                currentPrice={product.currentPrice}
                originalPrice={product.originalPrice}
                isFavorite={product.isFavorite}
              />
            ))}
          </div>
        </div>

        <div className="products-container">
          <SectionHeader title="Security" />
          <div className="products-scroll">
            {securityProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                image={product.image}
                title={product.title}
                currentPrice={product.currentPrice}
                originalPrice={product.originalPrice}
                isFavorite={product.isFavorite}
              />
            ))}
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}

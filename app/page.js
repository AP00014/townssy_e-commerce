"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import SectionHeader from "./components/SectionHeader";
import ProductCard from "./components/ProductCard";
import PromoBanner from "./components/PromoBanner";
import BottomNav from "./components/BottomNav";
import CategoriesModal from "./components/CategoriesModal";
import QuickFilter from "./components/QuickFilter";
import DiscoverSection from "./components/DiscoverSection";
import { ChevronDown, Filter } from "lucide-react";
import {
  categories,
  featuredProducts,
  newArrivals,
  hotProducts,
  topRated,
  bestSelling,
  luxuryProducts,
  ecoProducts,
  travelEssentials,
  securityProducts,
  topDeals,
  topRanking,
  tailoredSelections,
  gridProducts,
} from "./data/products";
import {
  getPersonalizedSelections,
  initializePreferences,
  trackInteraction,
} from "./utils/personalization";
import {
  primaryCategories,
  secondaryCategories,
  getSplitProducts,
  getMixedProducts,
} from "./data/categoryStructure";

export default function Home() {
  const [activeTab, setActiveTab] = useState("All");
  const [isCategoriesModalOpen, setIsCategoriesModalOpen] = useState(false);
  const [isQuickFilterOpen, setIsQuickFilterOpen] = useState(false);
  const [isTabsVisible, setIsTabsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [dynamicSelections, setDynamicSelections] = useState(tailoredSelections);
  const [syncedProducts, setSyncedProducts] = useState({ suppliers: [], manufacturers: [], all: [] });
  const scrollTimeoutRef = useRef(null);
  const tabsRef = useRef(null);

  // Use primary categories for tabs (Suppliers, Manufacturers)
  const tabs = ["All", ...primaryCategories.map((cat) => cat.name)];

  // Detect mobile screen
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Initialize user preferences on mount
  useEffect(() => {
    initializePreferences();
  }, []);

  // Get personalized tailored selections on mount
  useEffect(() => {
    // Get personalized selections (uses user preferences if available, otherwise random)
    const personalized = getPersonalizedSelections(tailoredSelections, 4);
    setDynamicSelections(personalized);
  }, []);

  // Sync products from suppliers and manufacturers (changes on refresh)
  useEffect(() => {
    // Combine all product arrays
    const allProducts = [
      ...featuredProducts,
      ...newArrivals,
      ...hotProducts,
      ...topRated,
      ...bestSelling,
      ...luxuryProducts,
      ...ecoProducts,
      ...travelEssentials,
      ...securityProducts,
      ...gridProducts,
    ];

    // Get products split by provider type (randomized each time)
    const split = getSplitProducts(allProducts);
    setSyncedProducts(split);
  }, []); // Empty dependency = runs on mount (each refresh)

  // Handle click on tailored selection (track for personalization)
  const handleSelectionClick = (selection) => {
    trackInteraction("click_selection", {
      slug: selection.slug,
      category: selection.category,
      label: selection.label,
    });
  };

  // Get products based on active tab
  const getDisplayProducts = () => {
    if (activeTab === "All") {
      return syncedProducts.all.slice(0, 4);
    } else if (activeTab === "Suppliers") {
      return syncedProducts.suppliers.slice(0, 4);
    } else if (activeTab === "Manufacturers") {
      return syncedProducts.manufacturers.slice(0, 4);
    }
    return gridProducts.slice(0, 4);
  };

  const displayProducts = getDisplayProducts();

  useEffect(() => {
    setLastScrollY(window.scrollY);

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > lastScrollY;

      setLastScrollY(currentScrollY);

      if (isScrollingDown) {
        // Hide tabs during scroll down
        setIsTabsVisible(false);

        // Clear existing timeout
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }

        // Show tabs after scrolling stops for 300ms
        scrollTimeoutRef.current = setTimeout(() => {
          setIsTabsVisible(true);
        }, 300);
      } else {
        // Scrolling up, show tabs immediately
        setIsTabsVisible(true);

        // Clear timeout if any
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="page-content">
      <div className="container">
        <Header />
        <SearchBar cartCount={3} />

        {/* Navigation Tabs with Dropdown */}
        <div
          ref={tabsRef}
          className={`category-tabs-container ${
            isTabsVisible ? "visible" : "hidden"
          }`}
        >
          <div className="category-tabs">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`category-tab ${activeTab === tab ? "active" : ""}`}
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
          <button
            className="category-tab-filter"
            onClick={() => setIsQuickFilterOpen(true)}
            title="Quick filters"
          >
            <Filter size={18} />
          </button>
        </div>

        <CategoriesModal
          isOpen={isCategoriesModalOpen}
          onClose={() => setIsCategoriesModalOpen(false)}
          categories={categories}
        />

        <QuickFilter
          isOpen={isQuickFilterOpen}
          onClose={() => setIsQuickFilterOpen(false)}
          onApplyFilters={(filters) => {
            console.log("Applied filters:", filters);
            // Here you would implement the actual filtering logic
          }}
        />

        <PromoBanner />

        {/* Top Deals Section */}
        <div className="products-container top-deals-section">
          <SectionHeader title="Top Deals" />
          <div className="section-subtitle">
            Score the lowest prices on Townssy E-commerce
          </div>
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
                variant="top-deal"
              />
            ))}
          </div>
        </div>

        {/* Top Ranking Section */}
        <div className="products-container top-ranking-section">
          <SectionHeader title="Top Ranking" href="/top-ranking" />
          <div className="section-subtitle">
            Navigate trends with data-driven rankings
          </div>
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
                variant="top-ranking"
              />
            ))}
          </div>
        </div>

        {isMobile ? (
          /* Combined Section on Mobile */
          <div className="combined-mobile-section">
            <h3
              className="section-title"
              style={{ marginBottom: "16px", padding: "0 4px" }}
            >
              Discover & Selections
            </h3>
            <div className="mobile-discover-grid">
              {/* Discover Section on Left */}
              {/* <DiscoverSection /> */}
              {/* Tailored Selections on Right */}
              <div className="mobile-tailored-section">
                <div className="tailored-selections-list">
                  {dynamicSelections.map((selection) => (
                    <Link
                      key={selection.id}
                      href={`/category/${selection.slug}`}
                      className="tailored-selection-item"
                      onClick={() => handleSelectionClick(selection)}
                    >
                      <img
                        src={selection.image}
                        alt={selection.label}
                        className="tailored-selection-image"
                      />
                      <span className="tailored-selection-label">
                        {selection.label}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Tailored Selections Section */}
            <div className="tailored-selections-section">
              <div className="tailored-selections-list">
                <h3
                  className="section-title"
                  style={{ marginBottom: "16px", padding: "0 4px" }}
                >
                  Tailored Selections
                </h3>
                {dynamicSelections.map((selection) => (
                  <Link
                    key={selection.id}
                    href={`/category/${selection.slug}`}
                    className="tailored-selection-item"
                    onClick={() => handleSelectionClick(selection)}
                  >
                    <img
                      src={selection.image}
                      alt={selection.label}
                      className="tailored-selection-image"
                    />
                    <span className="tailored-selection-label">
                      {selection.label}
                    </span>
                  </Link>
                ))}
              </div>
              <div className="products-grid">
                {displayProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    image={product.image}
                    title={product.title}
                    currentPrice={product.currentPrice}
                    originalPrice={product.originalPrice}
                    isFavorite={product.isFavorite}
                    badge={product.badge}
                    variant="grid"
                  />
                ))}
              </div>
            </div>

            {/* Discover Section */}
            {/* <DiscoverSection /> */}
          </>
        )}

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

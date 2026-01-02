"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import SectionHeader from "./components/SectionHeader";
import ProductCard from "./components/ProductCard";
import PromoBanner from "./components/PromoBanner";
import BottomNav from "./components/BottomNav";

// Lazy load heavy components
const CategoriesModal = dynamic(() => import("./components/CategoriesModal"), {
  loading: () => null,
  ssr: false,
});
const QuickFilter = dynamic(() => import("./components/QuickFilter"), {
  loading: () => null,
  ssr: false,
});
const DiscoverSection = dynamic(() => import("./components/DiscoverSection"), {
  loading: () => null,
  ssr: false,
});
import { ChevronDown, Filter } from "lucide-react";
import {
  categories,
  tailoredSelections,
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
import { fetchActiveSectionsWithProducts } from "./utils/fetchSectionProducts";
import { SITE_LOGO_SVG } from "./utils/siteLogo";
import { supabase } from "../lib/supabase";

export default function Home() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("All");
  const [isCategoriesModalOpen, setIsCategoriesModalOpen] = useState(false);
  const [isQuickFilterOpen, setIsQuickFilterOpen] = useState(false);
  const [isTabsVisible, setIsTabsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [dynamicSelections, setDynamicSelections] = useState(tailoredSelections);
  const [homeSections, setHomeSections] = useState([]);
  const [loadingSections, setLoadingSections] = useState(true);
  const [promoBannerSlides, setPromoBannerSlides] = useState(null);
  const [promoBannerSortOrder, setPromoBannerSortOrder] = useState(null);
  const [tailoredSelectionsData, setTailoredSelectionsData] = useState(null);
  const [tailoredSelectionsSortOrder, setTailoredSelectionsSortOrder] = useState(null);
  const [isTailoredSelectionsActive, setIsTailoredSelectionsActive] = useState(false);
  const [allSectionsOrdered, setAllSectionsOrdered] = useState([]);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState(null);
  const [productCategoriesMap, setProductCategoriesMap] = useState(new Map()); // Map of productId -> array of categoryIds
  const scrollTimeoutRef = useRef(null);
  const tabsRef = useRef(null);

  // Category slugs from the seed file
  const mainCategories = [
    { slug: 'electronics', name: 'Electronics' },
    { slug: 'fashion', name: 'Fashion' },
    { slug: 'home-living', name: 'Home & Living' },
    { slug: 'beauty-health', name: 'Beauty & Health' },
    { slug: 'sports-outdoors', name: 'Sports & Outdoors' },
    { slug: 'books-media', name: 'Books & Media' },
    { slug: 'toys-games', name: 'Toys & Games' },
    { slug: 'food-beverages', name: 'Food & Beverages' },
    { slug: 'automotive', name: 'Automotive' },
    { slug: 'office-supplies', name: 'Office Supplies' }
  ];

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

  // Fetch tailored selections and promo banner from database
  useEffect(() => {
    const fetchSpecialSections = async () => {
      try {
        // First check if sections exist (without is_active filter) - get sort_order too
        const [promoExistsResult, tailoredExistsResult] = await Promise.all([
          supabase
            .from('home_sections')
            .select('is_active, sort_order')
            .eq('name', 'promo_banner')
            .maybeSingle(),
          supabase
            .from('home_sections')
            .select('is_active, sort_order')
            .eq('name', 'tailored_selections')
            .maybeSingle()
        ]);

        // Then fetch active sections with full data
        const [promoResult, tailoredResult] = await Promise.all([
          supabase
            .from('home_sections')
            .select('layout_config, is_active, sort_order')
            .eq('name', 'promo_banner')
            .eq('is_active', true)
            .maybeSingle(), // Use maybeSingle() to handle 0 rows gracefully
          supabase
            .from('home_sections')
            .select('layout_config, is_active, sort_order')
            .eq('name', 'tailored_selections')
            .eq('is_active', true)
            .maybeSingle() // Use maybeSingle() to handle 0 rows gracefully
        ]);

        // Handle promo banner
        if (!promoResult.error && promoResult.data?.is_active && promoResult.data?.layout_config?.type === 'promo_banner' && promoResult.data.layout_config.slides?.length > 0) {
          setPromoBannerSlides(promoResult.data.layout_config.slides);
          setPromoBannerSortOrder(promoExistsResult.data?.sort_order ?? promoResult.data?.sort_order ?? null);
        } else {
          // If not found or inactive, set to null to use default slides in PromoBanner component
          setPromoBannerSlides(null);
          setPromoBannerSortOrder(promoExistsResult.data?.sort_order ?? null);
        }

        // Handle tailored selections
        if (!tailoredResult.error && tailoredResult.data?.is_active && tailoredResult.data?.layout_config?.type === 'tailored_selections') {
          setIsTailoredSelectionsActive(true);
          setTailoredSelectionsSortOrder(tailoredExistsResult.data?.sort_order ?? tailoredResult.data?.sort_order ?? null);
          if (tailoredResult.data.layout_config.items?.length > 0) {
            const items = tailoredResult.data.layout_config.items;
            // Validate items structure
            const validItems = items.filter(item => 
              item && 
              (item.id || item.slug) && 
              item.label && 
              item.image && 
              item.slug
            );
            
            if (validItems.length > 0) {
              setTailoredSelectionsData(validItems);
              // Get personalized selections from database items
              const personalized = getPersonalizedSelections(validItems, 4);
              if (personalized && personalized.length > 0) {
                setDynamicSelections(personalized);
              } else {
                // If personalization returns empty, use items directly (take first 4)
                setDynamicSelections(validItems.slice(0, 4));
              }
            } else {
              // Items are invalid - use fallback
              setTailoredSelectionsData(null);
              const personalized = getPersonalizedSelections(tailoredSelections, 4);
              setDynamicSelections(personalized);
            }
          } else {
            // Section is active but has no items - use fallback
            setTailoredSelectionsData(null);
            const personalized = getPersonalizedSelections(tailoredSelections, 4);
            setDynamicSelections(personalized);
          }
        } else {
          // Database section is inactive or missing
          setIsTailoredSelectionsActive(false);
          setTailoredSelectionsData(null);
          
          // Check if section exists in database (even if inactive)
          const sectionExists = !tailoredExistsResult.error && tailoredExistsResult.data !== null;
          setTailoredSelectionsSortOrder(tailoredExistsResult.data?.sort_order ?? null);
          
          if (sectionExists) {
            // Section exists but is inactive - hide it completely
            setDynamicSelections([]);
          } else {
            // Section doesn't exist at all - use fallback
            const personalized = getPersonalizedSelections(tailoredSelections, 4);
            setDynamicSelections(personalized);
          }
        }
      } catch (error) {
        console.error('Error fetching special sections:', error);
        // On error, use fallback data (section might not exist yet)
        setPromoBannerSlides(null);
        setTailoredSelectionsData(null);
        setIsTailoredSelectionsActive(false);
        const personalized = getPersonalizedSelections(tailoredSelections, 4);
        setDynamicSelections(personalized);
      }
    };

    fetchSpecialSections();

    // Set up real-time subscriptions for special sections
    const channel = supabase
      .channel('special-sections-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'home_sections',
          filter: 'name=in.(promo_banner,tailored_selections)'
        },
        (payload) => {
          console.log('Special section changed:', payload);
          
          // Handle promo banner
          if (payload.new?.name === 'promo_banner') {
            setPromoBannerSortOrder(payload.new?.sort_order ?? null);
            if (payload.new?.is_active && payload.new?.layout_config?.type === 'promo_banner' && payload.new.layout_config.slides?.length > 0) {
              setPromoBannerSlides(payload.new.layout_config.slides);
            } else {
              // Section is inactive or missing slides, clear it (will hide the banner)
              setPromoBannerSlides(null);
            }
          }
          
          // Handle tailored selections
          if (payload.new?.name === 'tailored_selections') {
            console.log('Tailored selections real-time update:', payload.new);
            setTailoredSelectionsSortOrder(payload.new?.sort_order ?? null);
              if (payload.new?.is_active && payload.new?.layout_config?.type === 'tailored_selections') {
              setIsTailoredSelectionsActive(true);
              if (payload.new.layout_config.items?.length > 0) {
                const items = payload.new.layout_config.items;
                
                // Validate items structure
                const validItems = items.filter(item => 
                  item && 
                  (item.id || item.slug) && 
                  item.label && 
                  item.image && 
                  item.slug
                );
                
                if (validItems.length > 0) {
                  setTailoredSelectionsData(validItems);
                  const personalized = getPersonalizedSelections(validItems, 4);
                  if (personalized && personalized.length > 0) {
                    setDynamicSelections(personalized);
                  } else {
                    // If personalization returns empty, use items directly (take first 4)
                    setDynamicSelections(validItems.slice(0, 4));
                  }
                } else {
                  // Items are invalid - use fallback
                  setTailoredSelectionsData(null);
                  const personalized = getPersonalizedSelections(tailoredSelections, 4);
                  setDynamicSelections(personalized);
                }
              } else {
                // Active but no items - use fallback
                setTailoredSelectionsData(null);
                const personalized = getPersonalizedSelections(tailoredSelections, 4);
                setDynamicSelections(personalized);
              }
            } else {
              // Section is inactive - clear selections to hide the section
              setIsTailoredSelectionsActive(false);
              setTailoredSelectionsData(null);
              setDynamicSelections([]); // Clear to hide the section
            }
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Combine and sort all sections (special + regular) by sort_order
  useEffect(() => {
    const sections = [];
    
    // Add Promo Banner if active
    if (promoBannerSlides && promoBannerSlides.length > 0 && promoBannerSortOrder !== null) {
      sections.push({
        type: 'promo_banner',
        sort_order: promoBannerSortOrder,
        slides: promoBannerSlides
      });
    }
    
    // Add Tailored Selections if active
    if (dynamicSelections && dynamicSelections.length > 0 && tailoredSelectionsSortOrder !== null) {
      sections.push({
        type: 'tailored_selections',
        sort_order: tailoredSelectionsSortOrder,
        selections: dynamicSelections
      });
    }
    
    // Add regular sections
    homeSections.forEach(section => {
      if (section.name !== 'promo_banner' && section.name !== 'tailored_selections') {
        sections.push({
          type: 'regular',
          sort_order: section.sort_order ?? 999,
          ...section
        });
      }
    });
    
    // Sort by sort_order
    sections.sort((a, b) => (a.sort_order ?? 999) - (b.sort_order ?? 999));
    
    setAllSectionsOrdered(sections);
  }, [promoBannerSlides, promoBannerSortOrder, dynamicSelections, tailoredSelectionsSortOrder, homeSections]);

  // Fetch product categories mapping for filtering (LAZY - only when filter is active, with caching)
  useEffect(() => {
    // Only fetch categories if a filter is selected or about to be selected
    if (!selectedCategoryFilter) return;

    const CACHE_KEY = 'product_categories_cache';
    const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

    const loadProductCategories = async () => {
      try {
        // Check cache first
        if (typeof window !== 'undefined') {
          const cached = sessionStorage.getItem(CACHE_KEY);
          if (cached) {
            try {
              const { data, timestamp } = JSON.parse(cached);
              const age = Date.now() - timestamp;
              
              // Use cache if it's less than 10 minutes old
              if (age < CACHE_DURATION && data) {
                console.log('Using cached product categories');
                const map = new Map(data);
                setProductCategoriesMap(map);
                
                // Fetch fresh data in background
                // (continue to fetch below)
              } else {
                // Cache expired, clear it
                sessionStorage.removeItem(CACHE_KEY);
              }
            } catch (e) {
              console.warn('Error reading categories cache:', e);
            }
          }
        }

        // Optimized: Only fetch categories for products that are currently displayed
        const productIds = homeSections
          .flatMap(section => section.products || [])
          .map(product => product.id)
          .filter(Boolean);

        if (productIds.length === 0) return;

        const { data, error } = await supabase
          .from('product_categories')
          .select('product_id, category_id')
          .in('product_id', productIds);

        if (error) {
          console.error('Error fetching product categories:', error);
          return;
        }

        // Create a map of productId -> array of categoryIds
        const map = new Map();
        if (data) {
          data.forEach(item => {
            if (!map.has(item.product_id)) {
              map.set(item.product_id, []);
            }
            map.get(item.product_id).push(item.category_id);
          });
        }
        setProductCategoriesMap(map);
        
        // Store in cache (convert Map to array for JSON storage)
        if (typeof window !== 'undefined') {
          try {
            const cacheData = Array.from(map.entries());
            sessionStorage.setItem(CACHE_KEY, JSON.stringify({
              data: cacheData,
              timestamp: Date.now()
            }));
          } catch (e) {
            console.warn('Error storing categories cache:', e);
          }
        }
      } catch (error) {
        console.error('Error loading product categories:', error);
      }
    };

    loadProductCategories();
  }, [selectedCategoryFilter, homeSections]);

  // Initialize from cache on mount for instant display
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const CACHE_KEY = 'home_sections_cache';
      const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
      
      const cached = sessionStorage.getItem(CACHE_KEY);
      if (cached) {
        try {
          const { data, timestamp } = JSON.parse(cached);
          const age = Date.now() - timestamp;
          
              // Use cache if it's less than 5 minutes old
              if (age < CACHE_DURATION && data && data.length > 0) {
                setHomeSections(data);
                setLoadingSections(false);
              }
        } catch (e) {
          // Ignore cache errors on init
        }
      }
    }
  }, []);

  // Fetch home sections and their products from database (with caching)
  useEffect(() => {
    const CACHE_KEY = 'home_sections_cache';
    const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

    const loadSections = async (useCache = true) => {
      try {
        // Check cache first
        if (useCache && typeof window !== 'undefined') {
          const cached = sessionStorage.getItem(CACHE_KEY);
          if (cached) {
            try {
              const { data, timestamp } = JSON.parse(cached);
              const age = Date.now() - timestamp;
              
              // Use cache if it's less than 5 minutes old
              if (age < CACHE_DURATION && data && data.length > 0) {
                setHomeSections(data);
                setLoadingSections(false);
                
                // Fetch fresh data in background
                loadSections(false);
                return;
              }
            } catch (e) {
              console.warn('Error reading cache:', e);
            }
          }
        }

        // Fetch fresh data
        setLoadingSections(true);
        const sections = await fetchActiveSectionsWithProducts();
        setHomeSections(sections);
        
        // Store in cache
        if (typeof window !== 'undefined' && sections && sections.length > 0) {
          try {
            sessionStorage.setItem(CACHE_KEY, JSON.stringify({
              data: sections,
              timestamp: Date.now()
            }));
          } catch (e) {
            console.warn('Error storing cache:', e);
          }
        }
      } catch (error) {
        console.error('Error loading home sections:', error);
        
        // Try to use cache as fallback even if expired
        if (typeof window !== 'undefined') {
          const cached = sessionStorage.getItem(CACHE_KEY);
          if (cached) {
            try {
              const { data } = JSON.parse(cached);
              if (data && data.length > 0) {
                console.log('Using expired cache as fallback');
                setHomeSections(data);
              }
            } catch (e) {
              // Ignore cache errors
            }
          }
        }
      } finally {
        setLoadingSections(false);
      }
    };

    loadSections();

    // Set up polling to refresh sections periodically (fallback if WebSocket fails)
    // Increased interval to reduce load - only poll if no real-time connection
    let pollInterval = null;

    // Try to set up real-time subscription to listen for changes (optional)
    let channel = null;
    if (supabase) {
      try {
        channel = supabase
          .channel('home-sections-changes')
          .on(
            'postgres_changes',
            {
              event: '*',
              schema: 'public',
              table: 'home_sections'
            },
            (payload) => {
              // Clear cache and reload sections when they change
              if (typeof window !== 'undefined') {
                sessionStorage.removeItem('home_sections_cache');
              }
              loadSections(false);
            }
          )
          .on(
            'postgres_changes',
            {
              event: '*',
              schema: 'public',
              table: 'product_section_placements'
            },
            (payload) => {
              // Clear cache and reload sections when product placements change
              if (typeof window !== 'undefined') {
                sessionStorage.removeItem('home_sections_cache');
              }
              loadSections(false);
            }
          )
          .subscribe((status) => {
            if (status === 'SUBSCRIBED') {
              // Clear polling if WebSocket works
              if (pollInterval) {
                clearInterval(pollInterval);
                pollInterval = null;
              }
            } else if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT') {
              // Only start polling if not already started
              if (!pollInterval) {
                pollInterval = setInterval(() => {
                  loadSections(false);
                }, 120000); // Refresh every 2 minutes (reduced frequency)
              }
            }
          });
      } catch (error) {
        console.warn('Failed to set up real-time subscription, using polling:', error);
      }
    }

    return () => {
      if (pollInterval) {
        clearInterval(pollInterval);
      }
      if (channel && supabase) {
        try {
          supabase.removeChannel(channel);
        } catch (error) {
          console.warn('Error removing channel:', error);
        }
      }
    };
  }, []);

  // Handle click on tailored selection (track for personalization)
  const handleSelectionClick = (selection) => {
    trackInteraction("click_selection", {
      slug: selection.slug,
      category: selection.category,
      label: selection.label,
    });
  };

  // Handle tab click - navigate to supplier/manufacturer page
  const handleTabClick = (tab) => {
    if (tab === "Suppliers") {
      router.push('/supplier/supplier');
    } else if (tab === "Manufacturers") {
      router.push('/supplier/manufacturer');
    } else {
      setActiveTab(tab);
    }
  };

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
                onClick={() => handleTabClick(tab)}
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
          onCategorySelect={(category) => {
            setSelectedCategoryFilter(category);
            setIsCategoriesModalOpen(false);
          }}
        />

        <QuickFilter
          isOpen={isQuickFilterOpen}
          onClose={() => setIsQuickFilterOpen(false)}
          selectedCategoryFilter={selectedCategoryFilter}
          onApplyFilters={(filters) => {
            console.log("Applied filters:", filters);
            // Here you would implement the actual filtering logic
          }}
        />

        {/* Category Filter Indicator */}
        {selectedCategoryFilter && (
          <div className="category-filter-banner" style={{
            padding: '12px 20px',
            background: 'linear-gradient(135deg, var(--primary-color, #22c55e) 0%, var(--primary-color-dark, #16a34a) 100%)',
            color: 'white',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '16px',
            borderRadius: '8px',
            margin: '0 4px 16px 4px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontWeight: '600' }}>Filtered by:</span>
              <span>{selectedCategoryFilter.name}</span>
            </div>
            <button
              onClick={() => setSelectedCategoryFilter(null)}
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                border: 'none',
                color: 'white',
                padding: '4px 12px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500'
              }}
            >
              Clear Filter
            </button>
          </div>
        )}

        {/* All Sections Rendered in Order (Special + Regular) */}
        {allSectionsOrdered.map((section, index) => {
          // Render Promo Banner
          if (section.type === 'promo_banner') {
            return <PromoBanner key="promo-banner" slides={section.slides} />;
          }
          
          // Render Tailored Selections
          if (section.type === 'tailored_selections') {
            return (
              <div key="tailored-selections" className="tailored-selections-section">
                <div className="tailored-selections-list">
                  <h3
                    className="section-title"
                    style={{ marginBottom: "16px", padding: "0 4px" }}
                  >
                    Tailored Selections
                  </h3>
                  {section.selections.map((selection, selIndex) => (
                    <Link
                      key={selection.id || selection.slug || selIndex}
                      href={`/category/${selection.slug}`}
                      className="tailored-selection-item"
                      onClick={() => handleSelectionClick(selection)}
                    >
                      <Image
                        src={selection.image}
                        alt={selection.label}
                        width={200}
                        height={200}
                        className="tailored-selection-image"
                        loading="lazy"
                        quality={85}
                        sizes="(max-width: 768px) 25vw, 20vw"
                      />
                      <span className="tailored-selection-label">
                        {selection.label}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            );
          }
          
          // Render Regular Sections
          if (section.type === 'regular') {
            // Filter products by selected category if filter is active
            let filteredProducts = section.products || [];
            
            if (selectedCategoryFilter && filteredProducts.length > 0) {
              // Filter products that belong to the selected category
              filteredProducts = filteredProducts.filter(product => {
                // Check product categories from junction table
                const productCategoryIds = productCategoriesMap.get(product.id) || [];
                if (productCategoryIds.includes(selectedCategoryFilter.id)) {
                  return true;
                }
                
                // Also check primary category (backward compatibility)
                if (product.category) {
                  return product.category.id === selectedCategoryFilter.id || 
                         product.category.slug === selectedCategoryFilter.slug;
                }
                
                // If no category match, exclude from filtered results
                return false;
              });
            }

            // Skip sections with no products (after filtering)
            if (!filteredProducts || filteredProducts.length === 0) return null;

            return (
              <div key={section.id} className="products-container">
                <SectionHeader 
                  title={section.display_name || section.name} 
                  href={section.section_type === 'category' ? `/category/${section.name}` : undefined}
                  viewAllHref={`/sections/${section.id}`}
                />
                {section.description && (
                  <div className="section-subtitle">
                    {section.description}
                  </div>
                )}
                {loadingSections ? (
                  <div className="products-scroll" style={{ padding: '20px', textAlign: 'center' }}>
                    <div
                      className="category-loading-spinner"
                      style={{ width: '40px', height: '40px', margin: '0 auto', display: 'block' }}
                      dangerouslySetInnerHTML={{ __html: SITE_LOGO_SVG }}
                    />
                    <p style={{ marginTop: '10px', color: '#64748b', fontSize: '14px' }}>Loading products...</p>
                  </div>
                ) : (
                  <div className="products-scroll">
                    {filteredProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        id={product.id}
                        image={product.image}
                        title={product.title}
                        currentPrice={product.currentPrice}
                        originalPrice={product.originalPrice}
                        isFavorite={product.isFavorite}
                        badge={product.badge}
                      />
                    ))}
                  </div>
                )}
              </div>
            );
          }
          
          return null;
        })}

      </div>
      <BottomNav />
    </div>
  );
}

'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import ProductCard from '../../components/ProductCard';
import BottomNav from '../../components/BottomNav';
import { ChevronLeft, SlidersHorizontal, Grid3x3, LayoutGrid } from 'lucide-react';

export default function CategoryClient({ category, products }) {
  const router = useRouter();
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState('all');
  const [gridView, setGridView] = useState('grid'); // 'grid' or 'list'
  
  // Sort and filter products
  const filteredProducts = useMemo(() => {
    let filtered = [...products];
    
    // Filter by price range
    if (priceRange !== 'all') {
      filtered = filtered.filter(p => {
        const price = typeof p.currentPrice === 'string' 
          ? parseFloat(p.currentPrice.replace(/[^0-9.]/g, ''))
          : p.currentPrice;
        
        switch(priceRange) {
          case 'under-50': return price < 50;
          case '50-100': return price >= 50 && price <= 100;
          case '100-200': return price >= 100 && price <= 200;
          case 'over-200': return price > 200;
          default: return true;
        }
      });
    }
    
    // Sort products
    switch(sortBy) {
      case 'price-low':
        filtered.sort((a, b) => {
          const priceA = typeof a.currentPrice === 'string' ? parseFloat(a.currentPrice.replace(/[^0-9.]/g, '')) : a.currentPrice;
          const priceB = typeof b.currentPrice === 'string' ? parseFloat(b.currentPrice.replace(/[^0-9.]/g, '')) : b.currentPrice;
          return priceA - priceB;
        });
        break;
      case 'price-high':
        filtered.sort((a, b) => {
          const priceA = typeof a.currentPrice === 'string' ? parseFloat(a.currentPrice.replace(/[^0-9.]/g, '')) : a.currentPrice;
          const priceB = typeof b.currentPrice === 'string' ? parseFloat(b.currentPrice.replace(/[^0-9.]/g, '')) : b.currentPrice;
          return priceB - priceA;
        });
        break;
      case 'newest':
        // Newest items have higher IDs
        filtered.sort((a, b) => b.id - a.id);
        break;
      default:
        // Featured - keep original order
        break;
    }
    
    return filtered;
  }, [products, sortBy, priceRange]);
  
  return (
    <div className="category-page">
      {/* Hero Section */}
      <div className="category-hero" style={{ backgroundImage: `url(${category.image})` }}>
        <div className="category-hero-overlay">
          <button className="category-back-btn" onClick={() => router.back()}>
            <ChevronLeft size={24} />
          </button>
          <div className="category-hero-content">
            <h1 className="category-title">{category.label}</h1>
            <p className="category-subtitle">{filteredProducts.length} products available</p>
          </div>
        </div>
      </div>
      
      {/* Filters Section */}
      <div className="category-filters">
        <div className="filter-group">
          <label className="filter-label">
            <SlidersHorizontal size={16} />
            Sort By
          </label>
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="filter-select"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="newest">Newest</option>
          </select>
        </div>
        
        <div className="filter-group">
          <label className="filter-label">Price Range</label>
          <select 
            value={priceRange} 
            onChange={(e) => setPriceRange(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Prices</option>
            <option value="under-50">Under ₵200</option>
            <option value="50-100">₵200 - ₵500</option>
            <option value="100-200">₵500 - ₵1000</option>
            <option value="over-200">Over ₵1000</option>
          </select>
        </div>
        
        <div className="filter-group view-toggle">
          <button 
            className={`view-btn ${gridView === 'grid' ? 'active' : ''}`}
            onClick={() => setGridView('grid')}
            title="Grid View"
          >
            <Grid3x3 size={20} />
          </button>
          <button 
            className={`view-btn ${gridView === 'list' ? 'active' : ''}`}
            onClick={() => setGridView('list')}
            title="List View"
          >
            <LayoutGrid size={20} />
          </button>
        </div>
      </div>
      
      {/* Products Grid */}
      <div className="category-content">
        {filteredProducts.length > 0 ? (
          <div className={`category-products ${gridView === 'list' ? 'list-view' : 'grid-view'}`}>
            {filteredProducts.map((product) => (
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
        ) : (
          <div className="category-empty">
            <p>No products found in this category.</p>
          </div>
        )}
      </div>
      
      <BottomNav />
    </div>
  );
}

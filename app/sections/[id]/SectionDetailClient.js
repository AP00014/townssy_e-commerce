'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Header from '../../components/Header';
import ProductCard from '../../components/ProductCard';
import BottomNav from '../../components/BottomNav';
import { ArrowLeft, Search } from 'lucide-react';

export default function SectionDetailClient({ section, products }) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);

  // Filter products based on search query
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setFilteredProducts(products);
      return;
    }

    const filtered = products.filter(product =>
      product.title?.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  return (
    <div className="section-detail-page">
      <Header />
      
      <div className="section-detail-container">
        {/* Header Section */}
        <div className="section-detail-header">
          <button
            className="back-button"
            onClick={() => router.back()}
            aria-label="Go back"
          >
            <ArrowLeft size={20} />
            Back
          </button>
          
          <div className="section-detail-title-section">
            <h1 className="section-detail-title">
              {section.display_name || section.name}
            </h1>
            {section.description && (
              <p className="section-detail-description">
                {section.description}
              </p>
            )}
            <div className="section-detail-count">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="section-detail-search">
          <div className="search-input-wrapper">
            <Search size={20} className="search-icon" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="section-detail-products">
            <div className="products-grid">
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
          </div>
        ) : (
          <div className="section-detail-empty">
            <div className="empty-state">
              <Image
                src="/placeholder-product.jpg"
                alt="No products"
                width={200}
                height={200}
                className="empty-image"
              />
              <h2>No products found</h2>
              <p>
                {searchQuery
                  ? `No products match "${searchQuery}"`
                  : 'This section has no products yet.'}
              </p>
              {searchQuery && (
                <button
                  className="clear-search-button"
                  onClick={() => handleSearch('')}
                >
                  Clear search
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}


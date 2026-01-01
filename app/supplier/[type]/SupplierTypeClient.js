'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar';
import ProductCard from '../../components/ProductCard';
import BottomNav from '../../components/BottomNav';
import SectionHeader from '../../components/SectionHeader';
import { fetchProductsBySupplierType } from '../../utils/fetchProductsBySupplierType';
import { Package, Loader2 } from 'lucide-react';
import '../../styles/products.css';
import '../../styles/category.css';

export default function SupplierTypeClient({ type, title, description, initialProducts, totalProducts }) {
  const router = useRouter();
  const [products, setProducts] = useState(initialProducts);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(initialProducts.length < totalProducts);
  const [offset, setOffset] = useState(initialProducts.length);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter products by search query
  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const loadMoreProducts = async () => {
    if (loadingMore || !hasMore) return;

    try {
      setLoadingMore(true);
      const { products: newProducts, total } = await fetchProductsBySupplierType(type, 50, offset);
      
      if (newProducts.length > 0) {
        setProducts(prev => [...prev, ...newProducts]);
        setOffset(prev => prev + newProducts.length);
        setHasMore(products.length + newProducts.length < total);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error loading more products:', error);
    } finally {
      setLoadingMore(false);
    }
  };

  return (
    <div className="page-content">
      <div className="container">
        <Header />
        <SearchBar cartCount={0} />
        
        {/* Search Input */}
        <div className="supplier-search-container">
          <input
            type="text"
            placeholder={`Search ${title.toLowerCase()}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="supplier-search-input"
          />
        </div>

        {/* Page Header */}
        <div className="category-header">
          <div className="category-header-content">
            <h1 className="category-title">{title}</h1>
            <p className="category-description">{description}</p>
            <div className="category-stats">
              <span className="stat-item">
                <Package size={16} />
                {totalProducts} {totalProducts === 1 ? 'product' : 'products'}
              </span>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="loading-container">
            <Loader2 className="spinner" size={48} />
            <p>Loading products...</p>
          </div>
        ) : filteredProducts.length > 0 ? (
          <>
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
                  location={product.location}
                  region={product.region}
                />
              ))}
            </div>

            {/* Load More Button */}
            {hasMore && (
              <div className="load-more-container">
                <button
                  className="load-more-btn"
                  onClick={loadMoreProducts}
                  disabled={loadingMore}
                >
                  {loadingMore ? (
                    <>
                      <Loader2 className="spinner-small" size={20} />
                      Loading...
                    </>
                  ) : (
                    'Load More Products'
                  )}
                </button>
              </div>
            )}

            {/* No More Products Message */}
            {!hasMore && products.length > 0 && (
              <div className="no-more-products">
                <p>You've reached the end of the list</p>
              </div>
            )}
          </>
        ) : (
          <div className="empty-state">
            <Package size={64} />
            <h2>No Products Found</h2>
            <p>
              {searchQuery
                ? `No products match your search "${searchQuery}"`
                : `No products available from ${title.toLowerCase()} yet.`}
            </p>
            {searchQuery && (
              <button
                className="btn-primary"
                onClick={() => setSearchQuery('')}
                style={{ marginTop: '1rem' }}
              >
                Clear Search
              </button>
            )}
          </div>
        )}
      </div>
      <BottomNav />
    </div>
  );
}


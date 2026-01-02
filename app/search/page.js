'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import ProductCard from '../components/ProductCard';
import BottomNav from '../components/BottomNav';
import { searchProducts } from '../utils/searchProducts';
import { Search, Loader2 } from 'lucide-react';
import '../styles/products.css';
import '../styles/search-results.css';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get('q') || '';
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query.trim()) {
      setLoading(false);
      setProducts([]);
      return;
    }

    const performSearch = async () => {
      try {
        setLoading(true);
        setError(null);
        const results = await searchProducts(query, 50);
        setProducts(results);
      } catch (err) {
        console.error('Error searching products:', err);
        setError('Failed to search products. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    performSearch();
  }, [query]);

  return (
    <div className="page-content">
      <Header />
      <SearchBar />
      
      <div className="search-results-page">
        <div className="search-results-header">
          <h1>
            {query ? (
              <>
                Search Results for "<span className="search-query">{query}</span>"
              </>
            ) : (
              'Search Products'
            )}
          </h1>
          {!loading && query && (
            <p className="results-count">
              {products.length} {products.length === 1 ? 'result' : 'results'} found
            </p>
          )}
        </div>

        {loading ? (
          <div className="loading-container">
            <Loader2 className="spinner-icon" size={48} />
            <p>Searching products...</p>
          </div>
        ) : error ? (
          <div className="error-container">
            <p>{error}</p>
          </div>
        ) : !query ? (
          <div className="empty-state">
            <Search size={48} />
            <h2>Start Searching</h2>
            <p>Enter a search term in the search bar above to find products.</p>
          </div>
        ) : products.length === 0 ? (
          <div className="empty-state">
            <Search size={48} />
            <h2>No Results Found</h2>
            <p>We couldn't find any products matching "{query}".</p>
            <p>Try searching with different keywords.</p>
          </div>
        ) : (
          <div className="products-grid">
            {products.map((product) => (
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

      <BottomNav />
    </div>
  );
}


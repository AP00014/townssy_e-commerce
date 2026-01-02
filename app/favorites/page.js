'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useFavourites } from '../context/FavouritesContext';
import { useAuth } from '../context/AuthContext';
import ProductCard from '../components/ProductCard';
import BottomNav from '../components/BottomNav';
import { Heart, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function FavouritesPage() {
  const { favouriteItems, clearFavourites } = useFavourites();
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const router = useRouter();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/auth/login?redirect=/favorites');
    }
  }, [isAuthenticated, authLoading, router]);

  // Show loading spinner while checking authentication
  if (authLoading) {
    return (
      <div className="page-content" style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '100vh',
        gap: '20px'
      }}>
        <div className="category-loading-spinner"></div>
        <p style={{ color: '#64748b', fontSize: '14px' }}>Loading favorites...</p>
      </div>
    );
  }

  // Don't render if not authenticated (will redirect)
  if (!isAuthenticated) {
    return null;
  }

  if (favouriteItems.length === 0) {
    return (
      <div className="page-content">
        <div className="container" style={{ paddingTop: '20px' }}>
          <div className="empty-favourites">
            <Heart size={64} className="empty-favourites-icon" />
            <h2>No favourites yet</h2>
            <p>Start adding products to your favourites!</p>
            <Link href="/" className="continue-shopping-btn">
              <ArrowLeft size={16} />
              Continue Shopping
            </Link>
          </div>
        </div>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="page-content">
      <div className="container" style={{ paddingTop: '20px' }}>
        <div className="favourites-header">
          <Link href="/" className="back-link">
            <ArrowLeft size={16} />
            Continue Shopping
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <h1 className="favourites-title">My Favourites</h1>
            {favouriteItems.length > 0 && (
              <span className="favourites-badge">{favouriteItems.length}</span>
            )}
          </div>
          <span className="favourites-count">{favouriteItems.length} item{favouriteItems.length !== 1 ? 's' : ''}</span>
        </div>

        <div className="favourites-actions">
          <button className="clear-favourites-btn" onClick={clearFavourites}>
            Clear All Favourites
          </button>
        </div>

        <div className="favourites-grid">
          {favouriteItems.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              image={product.image}
              title={product.title}
              currentPrice={product.currentPrice}
              originalPrice={product.originalPrice}
              isFavorite={true}
            />
          ))}
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
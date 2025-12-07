'use client';

import { useFavourites } from '../context/FavouritesContext';
import ProductCard from '../components/ProductCard';
import BottomNav from '../components/BottomNav';
import { Heart, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function FavouritesPage() {
  const { favouriteItems, clearFavourites } = useFavourites();

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
          <h1 className="favourites-title">My Favourites</h1>
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
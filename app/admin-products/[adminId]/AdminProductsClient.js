'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ProductCard from '../../components/ProductCard';
import Header from '../../components/Header';
import BottomNav from '../../components/BottomNav';
import { ArrowLeft, Package, Loader2 } from 'lucide-react';
import { SITE_LOGO_SVG_LARGE } from '../../utils/siteLogo';
import '../../styles/products.css';

export default function AdminProductsClient({ admin, initialProducts }) {
  const router = useRouter();
  const [products, setProducts] = useState(initialProducts || []);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.filter(product =>
    product.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb' }}>
      <Header />
      
      <div style={{ padding: '16px', maxWidth: '1200px', margin: '0 auto' }}>
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '20px',
            background: 'none',
            border: 'none',
            color: '#06392F',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500'
          }}
        >
          <ArrowLeft size={18} />
          Back
        </button>

        {/* Store Header */}
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          display: 'flex',
          alignItems: 'center',
          gap: '16px'
        }}>
          <img
            src={admin.avatar_url || SITE_LOGO_SVG_LARGE}
            alt="Townssy Stores"
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '8px',
              objectFit: 'cover',
              border: '2px solid #e5e7eb'
            }}
            onError={(e) => {
              e.target.src = SITE_LOGO_SVG_LARGE;
            }}
          />
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: '24px', fontWeight: '700', margin: '0 0 4px 0', color: '#111827' }}>
              Townssy Stores
            </h1>
            <p style={{ fontSize: '14px', color: '#6b7280', margin: '0 0 8px 0' }}>
              {admin.full_name || 'Admin Store'}
            </p>
            <div style={{ display: 'flex', gap: '16px', fontSize: '14px', color: '#6b7280' }}>
              <span>{products.length} Products</span>
              <span>•</span>
              <span>Verified Store</span>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div style={{
          background: 'white',
          borderRadius: '8px',
          padding: '12px 16px',
          marginBottom: '20px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              fontSize: '14px',
              background: 'transparent'
            }}
          />
        </div>

        {/* Products Grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <Loader2 size={32} className="spinner" style={{ animation: 'spin 1s linear infinite', margin: '0 auto' }} />
            <p style={{ marginTop: '12px', color: '#6b7280' }}>Loading products...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '40px',
            textAlign: 'center',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <Package size={48} style={{ color: '#d1d5db', margin: '0 auto 16px' }} />
            <h3 style={{ fontSize: '18px', fontWeight: '600', margin: '0 0 8px 0', color: '#111827' }}>
              No products found
            </h3>
            <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
              {searchQuery ? 'Try a different search term' : 'This store has no products yet'}
            </p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
            gap: '16px',
            marginBottom: '80px'
          }}>
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                image={product.image}
                title={product.title || product.name}
                currentPrice={product.currentPrice || product.price}
                originalPrice={product.originalPrice || product.compare_price}
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


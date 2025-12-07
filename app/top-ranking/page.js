'use client';

'use client';

import { useState } from 'react';
import { ArrowLeft, Search, ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import ProductCard from '../components/ProductCard';
import BottomNav from '../components/BottomNav';
import { topRanking } from '../data/products';

const tabs = ['All', 'Hot selling', 'Most popular', 'Best reviewed'];

export default function TopRankingPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All categories');

  return (
    <div className="page-content">
      <div className="container">
        {/* Header */}
        <div className="top-ranking-header">
          <button 
            className="back-button"
            onClick={() => router.back()}
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="top-ranking-title">Top Ranking in US</h1>
          <button className="search-button">
            <Search size={24} />
          </button>
        </div>

        {/* Category Selector */}
        <button 
          className="category-selector"
          onClick={() => {/* Open category modal */}}
        >
          Select category
          <ChevronDown size={18} />
        </button>

        {/* Navigation Tabs */}
        <div className="top-ranking-tabs">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`top-ranking-tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="top-ranking-grid">
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
      <BottomNav />
    </div>
  );
}


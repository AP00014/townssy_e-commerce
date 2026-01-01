'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { X, Loader2 } from 'lucide-react';
import { fetchCategoriesWithProducts } from '../utils/fetchCategoriesWithProducts';

export default function CategoriesModal({ isOpen, onClose, onCategorySelect }) {
  const modalRef = useRef(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch categories when modal opens
  useEffect(() => {
    if (isOpen && categories.length === 0) {
      fetchCategories();
    }
  }, [isOpen]);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const categoriesData = await fetchCategoriesWithProducts();
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Only run on client side to avoid hydration mismatch
    if (typeof window === 'undefined') return;

    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      // Store original overflow value
      const originalOverflow = document.body.style.overflow;
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        // Restore original overflow value
        document.body.style.overflow = originalOverflow || '';
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      <div className="categories-modal-overlay" onClick={onClose}></div>
      <div className="categories-modal" ref={modalRef} onClick={(e) => e.stopPropagation()}>
        <div className="categories-modal-header">
          <h2 className="categories-modal-title">All categories</h2>
          <button className="categories-modal-close" onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        <div className="categories-modal-content">
          {loading ? (
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              padding: '40px',
              flexDirection: 'column',
              gap: '12px'
            }}>
              <Loader2 size={24} className="spinner" style={{ animation: 'spin 1s linear infinite' }} />
              <p style={{ color: '#64748b', fontSize: '14px' }}>Loading categories...</p>
            </div>
          ) : categories.length === 0 ? (
            <div style={{ 
              padding: '40px', 
              textAlign: 'center', 
              color: '#64748b' 
            }}>
              <p>No categories with products found.</p>
            </div>
          ) : (
            categories.map((category) => (
              <div
                key={category.id}
                className="categories-modal-item"
                onClick={() => {
                  if (onCategorySelect) {
                    onCategorySelect(category);
                  } else {
                    // Fallback: navigate to category page if no filter handler
                    window.location.href = `/category/${category.slug}`;
                  }
                  onClose();
                }}
              >
                {category.name}
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}


'use client';

import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

export default function CategoriesModal({ isOpen, onClose, categories }) {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
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
          {categories.map((category) => (
            <div
              key={category.id}
              className="categories-modal-item"
              onClick={onClose}
            >
              {category.name}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}


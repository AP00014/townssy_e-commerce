'use client';

import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/currency';
import { Minus, Plus, X, AlertCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart();
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentStock, setCurrentStock] = useState(item.stockQuantity || item.stock_quantity || 0);
  const [stockWarning, setStockWarning] = useState('');

  // Fetch current stock from database
  useEffect(() => {
    const fetchStock = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('stock_quantity')
          .eq('id', item.id)
          .single();

        if (!error && data) {
          setCurrentStock(data.stock_quantity || 0);
        }
      } catch (error) {
        console.error('Error fetching stock:', error);
      }
    };

    if (item.id) {
      fetchStock();
    }
  }, [item.id]);

  const handleQuantityChange = async (newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(item.id);
      return;
    }

    // Check stock limit
    if (currentStock > 0 && newQuantity > currentStock) {
      setStockWarning(`Only ${currentStock} available in stock`);
      setTimeout(() => setStockWarning(''), 3000);
      // Set to max available stock
      newQuantity = currentStock;
    } else {
      setStockWarning('');
    }

    setIsUpdating(true);
    updateQuantity(item.id, newQuantity);
    setTimeout(() => setIsUpdating(false), 200);
  };

  const handleRemove = () => {
    removeFromCart(item.id);
  };

  const maxQuantity = currentStock > 0 ? currentStock : Infinity;
  const isMaxQuantity = item.quantity >= maxQuantity;
  const isOutOfStock = currentStock === 0;

  return (
    <div className="cart-item">
      <div className="cart-item-image">
        <img src={item.image} alt={item.title} />
      </div>

      <div className="cart-item-details">
        <h3 className="cart-item-title">{item.title}</h3>
        <p className="cart-item-price">{formatPrice(item.currentPrice)}</p>

        {/* Stock Warning */}
        {stockWarning && (
          <div className="cart-item-stock-warning">
            <AlertCircle size={14} />
            <span>{stockWarning}</span>
          </div>
        )}

        {/* Stock Info */}
        {currentStock > 0 && (
          <div className="cart-item-stock-info">
            {isMaxQuantity ? (
              <span className="stock-limit-reached">Max quantity reached ({currentStock} available)</span>
            ) : (
              <span className="stock-available">{currentStock} available in stock</span>
            )}
          </div>
        )}

        {isOutOfStock && (
          <div className="cart-item-stock-warning">
            <AlertCircle size={14} />
            <span>Out of stock</span>
          </div>
        )}

        <div className="cart-item-controls">
          <div className="quantity-controls">
            <button
              className="quantity-btn"
              onClick={() => handleQuantityChange(item.quantity - 1)}
              disabled={isUpdating || item.quantity <= 1}
              aria-label="Decrease quantity"
            >
              <Minus size={16} />
            </button>
            <span className="quantity-display">{item.quantity}</span>
            <button
              className="quantity-btn"
              onClick={() => handleQuantityChange(item.quantity + 1)}
              disabled={isUpdating || isMaxQuantity || isOutOfStock}
              aria-label="Increase quantity"
              title={isMaxQuantity ? `Only ${currentStock} available` : ''}
            >
              <Plus size={16} />
            </button>
          </div>

          <button className="remove-btn" onClick={handleRemove} aria-label="Remove item">
            <X size={16} />
          </button>
        </div>

        <div className="cart-item-total">
          {formatPrice(item.currentPrice * item.quantity)}
        </div>
      </div>
    </div>
  );
}
'use client';

import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Minus, Plus, X } from 'lucide-react';

export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart();
  const [isUpdating, setIsUpdating] = useState(false);

  const handleQuantityChange = async (newQuantity) => {
    setIsUpdating(true);
    updateQuantity(item.id, newQuantity);
    setTimeout(() => setIsUpdating(false), 200);
  };

  const handleRemove = () => {
    removeFromCart(item.id);
  };

  return (
    <div className="cart-item">
      <div className="cart-item-image">
        <img src={item.image} alt={item.title} />
      </div>

      <div className="cart-item-details">
        <h3 className="cart-item-title">{item.title}</h3>
        <p className="cart-item-price">${item.currentPrice.toFixed(2)}</p>

        <div className="cart-item-controls">
          <div className="quantity-controls">
            <button
              className="quantity-btn"
              onClick={() => handleQuantityChange(item.quantity - 1)}
              disabled={isUpdating}
            >
              <Minus size={16} />
            </button>
            <span className="quantity-display">{item.quantity}</span>
            <button
              className="quantity-btn"
              onClick={() => handleQuantityChange(item.quantity + 1)}
              disabled={isUpdating}
            >
              <Plus size={16} />
            </button>
          </div>

          <button className="remove-btn" onClick={handleRemove}>
            <X size={16} />
          </button>
        </div>

        <div className="cart-item-total">
          ${(item.currentPrice * item.quantity).toFixed(2)}
        </div>
      </div>
    </div>
  );
}
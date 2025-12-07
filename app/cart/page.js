'use client';

import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';
import BottomNav from '../components/BottomNav';
import { ShoppingBag, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function CartPage() {
  const { cartItems, getCartTotal, clearCart } = useCart();

  const subtotal = getCartTotal();
  const shipping = subtotal > 50 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleCheckout = () => {
    alert(`Checkout functionality would be implemented here!\n\nTotal: $${total.toFixed(2)}\nItems: ${cartItems.length}`);
    // In a real app, this would redirect to a payment processor
  };

  if (cartItems.length === 0) {
    return (
      <div className="page-content">
        <div className="container" style={{ paddingTop: '20px' }}>
          <div className="empty-cart">
            <ShoppingBag size={64} className="empty-cart-icon" />
            <h2>Your cart is empty</h2>
            <p>Add some products to get started!</p>
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
        <div className="cart-header">
          <Link href="/" className="back-link">
            <ArrowLeft size={16} />
            Continue Shopping
          </Link>
          <h1 className="cart-title">Shopping Cart</h1>
          <span className="cart-count">{cartItems.length} item{cartItems.length !== 1 ? 's' : ''}</span>
        </div>

        <div className="cart-content">
          <div className="cart-items">
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          <div className="cart-summary">
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div className="summary-row">
              <span>Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="summary-row total-row">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <button className="checkout-btn" onClick={handleCheckout}>
              Proceed to Checkout
            </button>

            <button className="clear-cart-btn" onClick={clearCart}>
              Clear Cart
            </button>
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}


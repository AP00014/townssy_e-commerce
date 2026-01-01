'use client';

import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { formatPrice } from '../utils/currency';
import { createOrder } from '../utils/createOrder';
import CartItem from '../components/CartItem';
import BottomNav from '../components/BottomNav';
import { ShoppingBag, ArrowLeft, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { SITE_LOGO_SVG } from '../utils/siteLogo';

export default function CartPage() {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { user, isAuthenticated, loading: authLoading, profile } = useAuth();
  const router = useRouter();
  const [checkingOut, setCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState('');
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/auth/login?redirect=/cart');
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
        <p style={{ color: '#64748b', fontSize: '14px' }}>Loading cart...</p>
      </div>
    );
  }

  // Don't render if not authenticated (will redirect)
  if (!isAuthenticated) {
    return null;
  }

  const subtotal = getCartTotal();
  const shipping = subtotal > 200 ? 0 : 9.99; // Free shipping over ₵200
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  // Validate cart before checkout
  const validateCart = () => {
    if (cartItems.length === 0) {
      return { valid: false, error: 'Your cart is empty' };
    }

    // Check for out of stock items
    const outOfStockItems = cartItems.filter(item => {
      const stock = item.stockQuantity || item.stock_quantity || 0;
      return stock === 0;
    });

    if (outOfStockItems.length > 0) {
      return {
        valid: false,
        error: `Some items are out of stock: ${outOfStockItems.map(i => i.title).join(', ')}`
      };
    }

    // Check for items with insufficient stock
    const insufficientStock = cartItems.filter(item => {
      const stock = item.stockQuantity || item.stock_quantity || 0;
      return stock > 0 && item.quantity > stock;
    });

    if (insufficientStock.length > 0) {
      return {
        valid: false,
        error: `Some items have insufficient stock. Please adjust quantities.`
      };
    }

    return { valid: true, error: null };
  };

  const handleCheckout = async () => {
    if (!isAuthenticated || !user || !profile) {
      router.push('/auth/login?redirect=/cart');
      return;
    }

    // Validate cart
    const validation = validateCart();
    if (!validation.valid) {
      setCheckoutError(validation.error);
      setTimeout(() => setCheckoutError(''), 5000);
      return;
    }

    try {
      setCheckingOut(true);
      setCheckoutError('');
      setCheckoutSuccess(false);

      // Create order
      const result = await createOrder(
        profile.id,
        cartItems,
        subtotal,
        shipping,
        tax,
        total
      );

      if (!result.success) {
        setCheckoutError(result.errors.join(', '));
        setTimeout(() => setCheckoutError(''), 5000);
        return;
      }

      // Order created successfully
      setCheckoutSuccess(true);
      
      // Clear cart
      clearCart();

      // Redirect to orders page after 2 seconds
      setTimeout(() => {
        router.push(`/orders/${result.order.id}`);
      }, 2000);

    } catch (error) {
      console.error('Checkout error:', error);
      setCheckoutError('Failed to process checkout. Please try again.');
      setTimeout(() => setCheckoutError(''), 5000);
    } finally {
      setCheckingOut(false);
    }
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
            <h3 className="summary-title">Order Summary</h3>
            
            <div className="summary-row">
              <span>Subtotal ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
            </div>
            <div className="summary-row">
              <span>Tax (8%)</span>
              <span>{formatPrice(tax)}</span>
            </div>
            <div className="summary-row total-row">
              <span>Total</span>
              <span className="total-amount">{formatPrice(total)}</span>
            </div>

            {/* Checkout Messages */}
            {checkoutError && (
              <div className="checkout-message error">
                <AlertCircle size={16} />
                <span>{checkoutError}</span>
              </div>
            )}

            {checkoutSuccess && (
              <div className="checkout-message success">
                <CheckCircle size={16} />
                <span>Order placed successfully! Redirecting...</span>
              </div>
            )}

            <button 
              className="checkout-btn" 
              onClick={handleCheckout}
              disabled={checkingOut || cartItems.length === 0 || checkoutSuccess}
            >
              {checkingOut ? (
                <>
                  <Loader2 size={18} className="spinning" />
                  Processing...
                </>
              ) : checkoutSuccess ? (
                <>
                  <CheckCircle size={18} />
                  Order Placed!
                </>
              ) : (
                'Proceed to Checkout'
              )}
            </button>

            <button 
              className="clear-cart-btn" 
              onClick={clearCart}
              disabled={checkingOut || checkoutSuccess}
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}


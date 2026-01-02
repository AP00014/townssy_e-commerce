'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import BottomNav from '../components/BottomNav';
import Header from '../components/Header';
import { Package, ArrowLeft, Clock, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { fetchUserOrders } from '../utils/fetchUserOrders';
import { SITE_LOGO_SVG } from '../utils/siteLogo';
import '../styles/orders.css';

export default function OrdersPage() {
  const router = useRouter();
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/auth/login?redirect=/orders');
    }
  }, [isAuthenticated, authLoading, router]);

  // Fetch orders when user is authenticated
  useEffect(() => {
    if (isAuthenticated && user && !authLoading) {
      loadOrders();
    }
  }, [isAuthenticated, user, authLoading]);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const userOrders = await fetchUserOrders(user.id);
      setOrders(userOrders);
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setLoading(false);
    }
  };

  // Separate orders by status
  const pendingOrders = orders.filter(order => 
    ['pending', 'processing', 'shipped', 'verified'].includes(order.status.toLowerCase())
  );

  const completedOrders = orders.filter(order => 
    order.status.toLowerCase() === 'delivered'
  );

  const cancelledOrders = orders.filter(order => 
    ['cancelled', 'disputed'].includes(order.status.toLowerCase())
  );

  const getStatusIcon = (status) => {
    const statusLower = status.toLowerCase();
    if (statusLower === 'delivered') return <CheckCircle size={16} />;
    if (['pending', 'processing', 'shipped', 'verified'].includes(statusLower)) return <Clock size={16} />;
    return <Package size={16} />;
  };

  const getStatusBadgeClass = (status) => {
    const statusLower = status.toLowerCase();
    if (statusLower === 'delivered') return 'delivered';
    if (statusLower === 'pending') return 'pending';
    if (statusLower === 'processing') return 'processing';
    if (statusLower === 'shipped') return 'shipped';
    if (statusLower === 'cancelled') return 'cancelled';
    if (statusLower === 'disputed') return 'disputed';
    if (statusLower === 'verified') return 'verified';
    return 'pending';
  };

  const OrderCard = ({ order }) => (
    <div 
      className="order-card"
      onClick={() => router.push(`/orders/${order.id}`)}
    >
      <div className="order-card-header">
        <span className="order-number">Order #{order.orderNumber || order.id.slice(0, 8)}</span>
        <div className={`order-status-badge ${getStatusBadgeClass(order.status)}`}>
          {getStatusIcon(order.status)}
          <span>{order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span>
        </div>
      </div>
      <div className="order-card-body">
        <div className="order-info">
          <p className="order-date">{order.date}</p>
          <p className="order-items">
            {order.itemCount} {order.itemCount === 1 ? 'item' : 'items'}
          </p>
          {order.vendor && (
            <p className="order-vendor">From: {order.vendor.business_name || 'Vendor'}</p>
          )}
        </div>
        <div className="order-amount">
          <p className="order-total">₵{order.total.toFixed(2)}</p>
          <button 
            className="view-details-btn"
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/orders/${order.id}`);
            }}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );

  // Show loading state
  if (authLoading || loading) {
    return (
      <div className="orders-page">
        <Header />
        <div className="orders-container">
          <div className="loading-container">
            <img 
              src={SITE_LOGO_SVG} 
              alt="Loading" 
              className="loading-logo"
            />
            <p className="loading-text">Loading orders...</p>
          </div>
        </div>
        <BottomNav />
      </div>
    );
  }

  // Don't render if not authenticated (will redirect)
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="orders-page">
      <Header />
      <div className="orders-container">
        <div className="orders-header">
          <Link href="/" className="back-link">
            <ArrowLeft size={18} />
            <span>Back to Shopping</span>
          </Link>
          <div className="orders-title-wrapper">
            <h1 className="orders-title">My Orders</h1>
            {orders.length > 0 && (
              <span className="orders-badge">{orders.length}</span>
            )}
          </div>
          <div style={{ width: '120px' }}></div> {/* Spacer for alignment */}
        </div>

        {/* Pending Orders */}
        {pendingOrders.length > 0 && (
          <div className="orders-section">
            <h2 className="section-title">
              <Clock size={20} color="#d97706" />
              <span>Active Orders ({pendingOrders.length})</span>
            </h2>
            {pendingOrders.map(order => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}

        {/* Completed Orders */}
        {completedOrders.length > 0 && (
          <div className="orders-section">
            <h2 className="section-title">
              <CheckCircle size={20} color="#059669" />
              <span>Completed Orders ({completedOrders.length})</span>
            </h2>
            {completedOrders.map(order => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}

        {/* Cancelled/Disputed Orders */}
        {cancelledOrders.length > 0 && (
          <div className="orders-section">
            <h2 className="section-title">
              <Package size={20} color="#dc2626" />
              <span>Cancelled Orders ({cancelledOrders.length})</span>
            </h2>
            {cancelledOrders.map(order => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {orders.length === 0 && !loading && (
          <div className="empty-state">
            <Package size={64} className="empty-state-icon" />
            <p className="empty-state-text">You haven't placed any orders yet</p>
            <Link 
              href="/" 
              className="view-details-btn"
              style={{ 
                display: 'inline-block', 
                marginTop: '20px',
                textDecoration: 'none'
              }}
            >
              Start Shopping
            </Link>
          </div>
        )}
      </div>
      <BottomNav />
    </div>
  );
}
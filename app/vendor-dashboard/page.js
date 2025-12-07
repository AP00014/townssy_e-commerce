'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../../lib/supabase';
import Link from 'next/link';
import {
  Package,
  DollarSign,
  ShoppingCart,
  TrendingUp,
  Eye,
  Heart,
  AlertCircle,
  Plus
} from 'lucide-react';

export default function VendorDashboardPage() {
  const { user } = useAuth();
  const [vendor, setVendor] = useState(null);
  const [stats, setStats] = useState({
    totalProducts: 0,
    activeProducts: 0,
    pendingProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    totalViews: 0,
    totalFavorites: 0,
  });
  const [recentProducts, setRecentProducts] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      // Fetch vendor
      const { data: vendorData } = await supabase
        .from('vendors')
        .select('*')
        .eq('user_id', user.id)
        .single();

      setVendor(vendorData);

      // Fetch products stats
      const { data: products, error: productsError } = await supabase
        .from('products')
        .select('*')
        .eq('vendor_id', vendorData.id);

      if (!productsError && products) {
        const activeProducts = products.filter(p => p.is_active).length;
        const pendingProducts = products.filter(p => p.verification_status === 'pending').length;
        const totalViews = products.reduce((sum, p) => sum + (p.view_count || 0), 0);
        const totalFavorites = products.reduce((sum, p) => sum + (p.favorite_count || 0), 0);

        // Get recent products (last 5)
        const recent = products
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .slice(0, 5);

        setRecentProducts(recent);

        setStats(prev => ({
          ...prev,
          totalProducts: products.length,
          activeProducts,
          pendingProducts,
          totalViews,
          totalFavorites,
        }));
      }

      // Fetch orders stats
      const { data: orders, error: ordersError } = await supabase
        .from('orders')
        .select('*')
        .eq('vendor_id', vendorData.id);

      if (!ordersError && orders) {
        const totalRevenue = orders.reduce((sum, o) => sum + (parseFloat(o.total_amount) || 0), 0);
        
        // Get recent orders (last 5)
        const recent = orders
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .slice(0, 5);

        setRecentOrders(recent);

        setStats(prev => ({
          ...prev,
          totalOrders: orders.length,
          totalRevenue,
        }));
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner-large"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1>Dashboard</h1>
          <p>Welcome back, {vendor?.business_name}!</p>
        </div>
        <Link href="/vendor-dashboard/products/create" className="btn-primary">
          <Plus size={20} />
          Add New Product
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-icon primary">
              <Package />
            </div>
          </div>
          <div className="stat-value">{stats.totalProducts}</div>
          <div className="stat-label">Total Products</div>
          <div className="stat-change">
            {stats.activeProducts} active · {stats.pendingProducts} pending
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-icon success">
              <DollarSign />
            </div>
          </div>
          <div className="stat-value">${stats.totalRevenue.toFixed(2)}</div>
          <div className="stat-label">Total Revenue</div>
          <div className="stat-change positive">
            +12.5% from last month
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-icon warning">
              <ShoppingCart />
            </div>
          </div>
          <div className="stat-value">{stats.totalOrders}</div>
          <div className="stat-label">Total Orders</div>
          <div className="stat-change positive">
            +8.2% from last month
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-icon danger">
              <TrendingUp />
            </div>
          </div>
          <div className="stat-value">{stats.totalViews}</div>
          <div className="stat-label">Product Views</div>
          <div className="stat-change">
            {stats.totalFavorites} favorites
          </div>
        </div>
      </div>

      {/* Recent Activity Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginTop: '32px' }}>
        {/* Recent Products */}
        <div style={{ background: 'white', borderRadius: '12px', padding: '24px', border: '1px solid #e5e7eb' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '600', margin: 0 }}>Recent Products</h2>
            <Link href="/vendor-dashboard/products" style={{ color: 'var(--primary-color)', fontSize: '14px' }}>
              View All
            </Link>
          </div>
          
          {recentProducts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: '#6b7280' }}>
              <Package size={48} style={{ margin: '0 auto 16px', opacity: 0.3 }} />
              <p>No products yet</p>
              <Link href="/vendor-dashboard/products/create" style={{ color: 'var(--primary-color)', fontSize: '14px' }}>
                Create your first product
              </Link>
            </div>
          ) : (
            <div>
              {recentProducts.map(product => (
                <div key={product.id} style={{ display: 'flex', gap: '12px', padding: '12px 0', borderBottom: '1px solid #f3f4f6' }}>
                  <div style={{ width: '60px', height: '60px', borderRadius: '8px', overflow: 'hidden', background: '#f9fafb' }}>
                    {product.images?.[0] ? (
                      <img src={product.images[0]} alt={product.name} style={{width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af' }}>
                        <Package size={24} />
                      </div>
                    )}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '14px', fontWeight: '500', marginBottom: '4px' }}>{product.name}</div>
                    <div style={{ fontSize: '12px', color: '#6b7280' }}>
                      ${product.price} · Stock: {product.stock_quantity || 0}
                    </div>
                    <div style={{ fontSize: '12px', marginTop: '4px' }}>
                      <span style={{
                        display: 'inline-block',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        fontSize: '11px',
                        background: product.verification_status === 'approved' ? '#d1fae5' : '#fef3c7',
                        color: product.verification_status === 'approved' ? '#065f46' : '#92400e'
                      }}>
                        {product.verification_status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Orders */}
        <div style={{ background: 'white', borderRadius: '12px', padding: '24px', border: '1px solid #e5e7eb' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '600', margin: 0 }}>Recent Orders</h2>
            <Link href="/vendor-dashboard/orders" style={{ color: 'var(--primary-color)', fontSize: '14px' }}>
              View All
            </Link>
          </div>

          {recentOrders.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: '#6b7280' }}>
              <ShoppingCart size={48} style={{ margin: '0 auto 16px', opacity: 0.3 }} />
              <p>No orders yet</p>
            </div>
          ) : (
            <div>
              {recentOrders.map(order => (
                <div key={order.id} style={{ padding: '12px 0', borderBottom: '1px solid #f3f4f6' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <div style={{ fontSize: '14px', fontWeight: '500' }}>Order #{order.order_number}</div>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--primary-color)' }}>
                      ${parseFloat(order.total_amount).toFixed(2)}
                    </div>
                  </div>
                  <div style={{ fontSize: '12px', color: '#6b7280' }}>
                    {new Date(order.created_at).toLocaleDateString()}
                  </div>
                  <div style={{ fontSize: '12px', marginTop: '4px' }}>
                    <span style={{
                      display: 'inline-block',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      fontSize: '11px',
                      background: order.status === 'delivered' ? '#d1fae5' : order.status === 'cancelled' ? '#fee2e2' : '#dbeafe',
                      color: order.status === 'delivered' ? '#065f46' : order.status === 'cancelled' ? '#991b1b' : '#1e40af'
                    }}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      {stats.pendingProducts > 0 && (
        <div style={{
          marginTop: '24px',
          background: '#fffbeb',
          border: '1px solid #fcd34d',
          borderRadius: '12px',
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <AlertCircle size={24} color="#d97706" />
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: '600', color: '#92400e', marginBottom: '4px' }}>
              Products Pending Approval
            </div>
            <div style={{ fontSize: '14px', color: '#78350f' }}>
              You have {stats.pendingProducts} product{stats.pendingProducts !== 1 ? 's' : ''} waiting for admin verification.
            </div>
          </div>
          <Link href="/vendor-dashboard/products" style={{
            padding: '8px 16px',
            background: '#d97706',
            color: 'white',
            borderRadius: '8px',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: '500'
          }}>
            View Products
          </Link>
        </div>
      )}
    </div>
  );
}

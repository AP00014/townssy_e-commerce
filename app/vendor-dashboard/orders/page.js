'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../../lib/supabase';
import Link from 'next/link';
import {
  ShoppingCart,
  Search,
  Eye,
  Truck,
  Package,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';

export default function OrdersListPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  useEffect(() => {
    filterOrders();
  }, [searchTerm, filterStatus, orders]);

  const fetchOrders = async () => {
    try {
      const { data: vendorData } = await supabase
        .from('vendors')
        .select('id')
        .eq('user_id', user.id)
        .single();

      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          buyer:buyer_id(full_name, email),
          delivery_agent:delivery_agent_id(full_name, phone)
        `)
        .eq('vendor_id', vendorData.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterOrders = () => {
    let filtered = [...orders];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(o =>
        o.order_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        o.buyer?.full_name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (filterStatus !== 'all') {
      filtered = filtered.filter(o => o.status === filterStatus);
    }

    setFilteredOrders(filtered);
  };

  const getStatusConfig = (status) => {
    const configs = {
      'pending': { bg: '#fef3c7', color: '#92400e', text: 'Pending', icon: Clock },
      'confirmed': { bg: '#dbeafe', color: '#1e40af', text: 'Confirmed', icon: CheckCircle },
      'preparing': { bg: '#ede9fe', color: '#6d28d9', text: 'Preparing', icon: Package },
      'ready_for_pickup': { bg: '#fef08a', color: '#854d0e', text: 'Ready', icon: Package },
      'picked_up': { bg: '#bfdbfe', color: '#1e3a8a', text: 'Picked Up', icon: Truck },
      'out_for_delivery': { bg: '#fed7aa', color: '#9a3412', text: 'Out for Delivery', icon: Truck },
      'delivered': { bg: '#d1fae5', color: '#065f46', text: 'Delivered', icon: CheckCircle },
      'cancelled': { bg: '#fee2e2', color: '#991b1b', text: 'Cancelled', icon: XCircle },
    };
    
    return configs[status] || configs['pending'];
  };

  const getStatusBadge = (status) => {
    const config = getStatusConfig(status);
    const Icon = config.icon;
    
    return (
      <span style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '4px 12px',
        borderRadius: '12px',
        fontSize: '12px',
        fontWeight: '600',
        background: config.bg,
        color: config.color
      }}>
        <Icon size={14} />
        {config.text}
      </span>
    );
  };

  const getOrderStats = () => {
    return {
      total: orders.length,
      pending: orders.filter(o => o.status === 'pending').length,
      confirmed: orders.filter(o => o.status === 'confirmed').length,
      inProgress: orders.filter(o => ['preparing', 'ready_for_pickup', 'picked_up', 'out_for_delivery'].includes(o.status)).length,
      delivered: orders.filter(o => o.status === 'delivered').length,
    };
  };

  const stats = getOrderStats();

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner-large"></div>
        <p>Loading orders...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1>Orders</h1>
          <p>Manage your customer orders</p>
        </div>
      </div>

      {/* Filters */}
      <div style={{
        background: 'white',
        padding: '20px',
        borderRadius: '12px',
        marginBottom: '24px',
        border: '1px solid #e5e7eb'
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '16px', alignItems: 'center' }}>
          {/* Search */}
          <div style={{ position: 'relative' }}>
            <Search size={20} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
            <input
              type="text"
              placeholder="Search by order number or customer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px 10px 40px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '14px'
              }}
            />
          </div>

          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            style={{
              padding: '10px 36px 10px 12px',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '14px',
              cursor: 'pointer',
              appearance: 'none',
              background: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e") no-repeat`,
              backgroundPosition: 'right 8px center',
              backgroundSize: '20px'
            }}
          >
            <option value="all">All Orders</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="preparing">Preparing</option>
            <option value="out_for_delivery">Out for Delivery</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <div style={{ background: 'white', padding: '16px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#1f2937' }}>{stats.total}</div>
          <div style={{ fontSize: '14px', color: '#6b7280' }}>Total Orders</div>
        </div>
        <div style={{ background: 'white', padding: '16px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#f59e0b' }}>{stats.pending}</div>
          <div style={{ fontSize: '14px', color: '#6b7280' }}>Pending</div>
        </div>
        <div style={{ background: 'white', padding: '16px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#3b82f6' }}>{stats.inProgress}</div>
          <div style={{ fontSize: '14px', color: '#6b7280' }}>In Progress</div>
        </div>
        <div style={{ background: 'white', padding: '16px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#10b981' }}>{stats.delivered}</div>
          <div style={{ fontSize: '14px', color: '#6b7280' }}>Delivered</div>
        </div>
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div style={{
          background: 'white',
          padding: '60px 20px',
          borderRadius: '12px',
          border: '1px solid #e5e7eb',
          textAlign: 'center'
        }}>
          <ShoppingCart size={64} style={{ margin: '0 auto 16px', color: '#d1d5db' }} />
          <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>
            {searchTerm || filterStatus !== 'all' ? 'No orders found' : 'No orders yet'}
          </h3>
          <p style={{ color: '#6b7280' }}>
            {searchTerm || filterStatus !== 'all' 
              ? 'Try adjusting your filters'
              : 'Orders will appear here once customers make purchases'}
          </p>
        </div>
      ) : (
        <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Order</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Customer</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Date</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Amount</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Status</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Agent</th>
                <th style={{ padding: '12px 16px', textAlign: 'right', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map(order => (
                <tr key={order.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                  <td style={{ padding: '16px' }}>
                    <div style={{ fontWeight: '600', marginBottom: '4px' }}>#{order.order_number}</div>
                    <div style={{ fontSize: '12px', color: '#6b7280' }}>
                      Order ID: {order.id.slice(0, 8)}
                    </div>
                  </td>
                  <td style={{ padding: '16px' }}>
                    <div style={{ fontWeight: '500' }}>{order.buyer?.full_name || 'N/A'}</div>
                    <div style={{ fontSize: '12px', color: '#6b7280' }}>{order.buyer?.email}</div>
                  </td>
                  <td style={{ padding: '16px' }}>
                    <div>{new Date(order.created_at).toLocaleDateString()}</div>
                    <div style={{ fontSize: '12px', color: '#6b7280' }}>
                      {new Date(order.created_at).toLocaleTimeString()}
                    </div>
                  </td>
                  <td style={{ padding: '16px' }}>
                    <div style={{ fontWeight: '600', color: 'var(--primary-color)' }}>
                      ${parseFloat(order.total_amount).toFixed(2)}
                    </div>
                  </td>
                  <td style={{ padding: '16px' }}>
                    {getStatusBadge(order.status)}
                  </td>
                  <td style={{ padding: '16px' }}>
                    {order.delivery_agent ? (
                      <div>
                        <div style={{ fontSize: '12px', fontWeight: '500' }}>{order.delivery_agent.full_name}</div>
                        <div style={{ fontSize: '11px', color: '#6b7280' }}>{order.delivery_agent.phone}</div>
                      </div>
                    ) : (
                      <span style={{ fontSize: '12px', color: '#9ca3af' }}>Not assigned</span>
                    )}
                  </td>
                  <td style={{ padding: '16px' }}>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                      <button
                        onClick={() => router.push(`/vendor-dashboard/orders/${order.id}`)}
                        style={{
                          padding: '8px',
                          background: '#dbeafe',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          color: '#1e40af'
                        }}
                        title="View Details"
                      >
                        <Eye size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

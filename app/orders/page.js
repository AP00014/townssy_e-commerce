'use client';

import BottomNav from '../components/BottomNav';
import { Package, ArrowLeft, Clock, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function OrdersPage() {
  // Mock orders data
  const pendingOrders = [
    {
      id: 'ORD001',
      date: '2024-11-25',
      items: 3,
      total: 89.97,
      status: 'Processing'
    },
    {
      id: 'ORD002',
      date: '2024-11-24',
      items: 1,
      total: 45.99,
      status: 'Shipped'
    }
  ];

  const completedOrders = [
    {
      id: 'ORD003',
      date: '2024-11-20',
      items: 2,
      total: 67.98,
      status: 'Delivered'
    },
    {
      id: 'ORD004',
      date: '2024-11-15',
      items: 4,
      total: 123.96,
      status: 'Delivered'
    }
  ];

  const OrderCard = ({ order, isPending }) => (
    <div className="order-card" style={{
      background: 'var(--background)',
      border: '1px solid var(--border-color)',
      borderRadius: '12px',
      padding: '16px',
      marginBottom: '12px',
      boxShadow: 'var(--shadow-color)',
      transition: 'transform 0.2s'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
        <span style={{ fontWeight: '600', color: 'var(--text-dark)' }}>Order #{order.id}</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          {isPending ? <Clock size={16} color="#FFA500" /> : <CheckCircle size={16} color="#10B981" />}
          <span style={{ fontSize: '12px', color: isPending ? '#FFA500' : '#10B981' }}>{order.status}</span>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <p style={{ margin: '0', fontSize: '14px', color: 'var(--text-gray)' }}>{order.date}</p>
          <p style={{ margin: '0', fontSize: '14px', color: 'var(--text-gray)' }}>{order.items} item{order.items !== 1 ? 's' : ''}</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p style={{ margin: '0', fontWeight: '600', color: 'var(--text-dark)' }}>${order.total}</p>
          <button style={{
            background: 'var(--primary-color)',
            color: 'white',
            border: 'none',
            padding: '6px 12px',
            borderRadius: '6px',
            fontSize: '12px',
            cursor: 'pointer',
            marginTop: '4px'
          }}>
            View Details
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="page-content">
      <div className="container" style={{ paddingTop: '20px' }}>
        <div className="orders-header" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '24px'
        }}>
          <Link href="/" className="back-link" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: 'var(--text-dark)',
            textDecoration: 'none'
          }}>
            <ArrowLeft size={16} />
            Back to Shopping
          </Link>
          <h1 className="orders-title" style={{
            margin: '0',
            color: 'var(--text-dark)',
            fontSize: '24px',
            fontWeight: '600'
          }}>
            My Orders
          </h1>
          <div></div> {/* Spacer */}
        </div>

        {/* Pending Orders */}
        <div className="orders-section">
          <h2 style={{
            marginBottom: '16px',
            color: 'var(--text-dark)',
            fontSize: '18px',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <Clock size={20} color="#FFA500" />
            Pending Orders ({pendingOrders.length})
          </h2>
          {pendingOrders.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '40px 20px',
              color: 'var(--text-gray)'
            }}>
              <Package size={48} style={{ marginBottom: '16px', opacity: 0.5 }} />
              <p>No pending orders</p>
            </div>
          ) : (
            pendingOrders.map(order => (
              <OrderCard key={order.id} order={order} isPending={true} />
            ))
          )}
        </div>

        {/* Completed Orders */}
        <div className="orders-section" style={{ marginTop: '32px' }}>
          <h2 style={{
            marginBottom: '16px',
            color: 'var(--text-dark)',
            fontSize: '18px',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <CheckCircle size={20} color="#10B981" />
            Completed Orders ({completedOrders.length})
          </h2>
          {completedOrders.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '40px 20px',
              color: 'var(--text-gray)'
            }}>
              <Package size={48} style={{ marginBottom: '16px', opacity: 0.5 }} />
              <p>No completed orders yet</p>
            </div>
          ) : (
            completedOrders.map(order => (
              <OrderCard key={order.id} order={order} isPending={false} />
            ))
          )}
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
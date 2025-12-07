'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../context/AuthContext';
import { supabase } from '../../../../lib/supabase';
import {
  ArrowLeft,
  Package,
  User,
  MapPin,
  Phone,
  Mail,
  Calendar,
  DollarSign,
  Truck,
  Star,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';

export default function OrderDetailsPage({ params }) {
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [showAgentModal, setShowAgentModal] = useState(false);
  const [agents, setAgents] = useState([]);
  const [loadingAgents, setLoadingAgents] = useState(false);

  useEffect(() => {
    const unwrapParams = async () => {
      const resolvedParams = await params;
      setOrderId(resolvedParams.id);
    };
    unwrapParams();
  }, [params]);

  useEffect(() => {
    if (orderId && user) {
      fetchOrderDetails();
    }
  }, [orderId, user]);

  const fetchOrderDetails = async () => {
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
          buyer:buyer_id(full_name, email, phone),
          delivery_agent:delivery_agent_id(*)
        `)
        .eq('id', orderId)
        .eq('vendor_id', vendorData.id)
        .single();

      if (error) throw error;
      setOrder(data);
    } catch (error) {
      console.error('Error fetching order:', error);
      alert('Error loading order details');
      router.push('/vendor-dashboard/orders');
    } finally {
      setLoading(false);
    }
  };

  const fetchAvailableAgents = async () => {
    setLoadingAgents(true);
    try {
      const { data, error } = await supabase
        .from('agents')
        .select('*')
        .eq('agent_type', 'delivery')
        .eq('verification_status', 'verified')
        .eq('is_active', true)
        .order('rating', { ascending: false });

      if (error) throw error;
      setAgents(data || []);
    } catch (error) {
      console.error('Error fetching agents:', error);
      alert('Error loading delivery agents');
    } finally {
      setLoadingAgents(false);
    }
  };

  const assignAgent = async (agentId) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({
          delivery_agent_id: agentId,
          status: 'confirmed',
          updated_at: new Date().toISOString()
        })
        .eq('id', orderId);

      if (error) throw error;

      // Create agent task
      await supabase
        .from('agent_tasks')
        .insert({
          agent_id: agentId,
          order_id: orderId,
          vendor_id: order.vendor_id,
          task_type: 'delivery',
          status: 'assigned',
          priority: 'normal',
          assigned_at: new Date().toISOString()
        });

      alert('Delivery agent assigned successfully!');
      setShowAgentModal(false);
      fetchOrderDetails(); // Refresh
    } catch (error) {
      console.error('Error assigning agent:', error);
      alert('Error assigning delivery agent');
    }
  };

  const updateOrderStatus = async (newStatus) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({
          status: newStatus,
          updated_at: new Date().toISOString()
        })
        .eq('id', orderId);

      if (error) throw error;
      
      alert(`Order status updated to: ${newStatus}`);
      fetchOrderDetails(); // Refresh
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Error updating order status');
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'pending': '#f59e0b',
      'confirmed': '#3b82f6',
      'preparing': '#8b5cf6',
      'ready_for_pickup': '#f59e0b',
      'picked_up': '#3b82f6',
      'out_for_delivery': '#f97316',
      'delivered': '#10b981',
      'cancelled': '#ef4444'
    };
    return colors[status] || '#6b7280';
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner-large"></div>
        <p>Loading order details...</p>
      </div>
    );
  }

  if (!order) return null;

  return (
    <div>
      {/* Header */}
      <div className="page-header">
        <div>
          <button
            onClick={() => router.back()}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'none',
              border: 'none',
              color: '#6b7280',
              cursor: 'pointer',
              marginBottom: '8px',
              fontSize: '14px'
            }}
          >
            <ArrowLeft size={16} />
            Back to Orders
          </button>
          <h1>Order #{order.order_number}</h1>
          <p>Order ID: {order.id}</p>
        </div>
        
        {!order.delivery_agent_id && (
          <button
            onClick={() => {
              fetchAvailableAgents();
              setShowAgentModal(true);
            }}
            className="btn-primary"
          >
            <Truck size={20} />
            Assign Delivery Agent
          </button>
        )}
      </div>

      {/* Order Status */}
      <div style={{
        background: 'white',
        padding: '24px',
        borderRadius: '12px',
        marginBottom: '24px',
        border: '1px solid #e5e7eb'
      }}>
        <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>Order Status</h3>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
          <div style={{
            padding: '12px 20px',
            background: `${getStatusColor(order.status)}20`,
            color: getStatusColor(order.status),
            borderRadius: '8px',
            fontWeight: '600',
            fontSize: '16px'
          }}>
            {order.status.replace(/_/g, ' ').toUpperCase()}
          </div>
          <div style={{ fontSize: '14px', color: '#6b7280' }}>
            Last updated: {new Date(order.updated_at).toLocaleString()}
          </div>
        </div>

        {/* Status Actions */}
        {order.status !== 'delivered' && order.status !== 'cancelled' && (
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
              Update Status:
            </label>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {order.status === 'pending' && (
                <button
                  onClick={() => updateOrderStatus('confirmed')}
                  style={{
                    padding: '8px 16px',
                    background: '#3b82f6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '14px',
                    cursor: 'pointer'
                  }}
                >
                  Confirm Order
                </button>
              )}
              {order.status === 'confirmed' && (
                <button
                  onClick={() => updateOrderStatus('preparing')}
                  style={{
                    padding: '8px 16px',
                    background: '#8b5cf6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '14px',
                    cursor: 'pointer'
                  }}
                >
                  Start Preparing
                </button>
              )}
              {order.status === 'preparing' && (
                <button
                  onClick={() => updateOrderStatus('ready_for_pickup')}
                  style={{
                    padding: '8px 16px',
                    background: '#f59e0b',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '14px',
                    cursor: 'pointer'
                  }}
                >
                  Mark Ready for Pickup
                </button>
              )}
              {order.status !== 'cancelled' && (
                <button
                  onClick={() => {
                    if (confirm('Are you sure you want to cancel this order?')) {
                      updateOrderStatus('cancelled');
                    }
                  }}
                  style={{
                    padding: '8px 16px',
                    background: '#ef4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '14px',
                    cursor: 'pointer'
                  }}
                >
                  Cancel Order
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Main Content Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        {/* Left Column */}
        <div>
          {/* Customer Info */}
          <div style={{
            background: 'white',
            padding: '24px',
            borderRadius: '12px',
            marginBottom: '24px',
            border: '1px solid #e5e7eb'
          }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <User size={20} />
              Customer Information
            </h3>
            <div style={{ display: 'grid', gap: '12px' }}>
              <div>
                <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Name</div>
                <div style={{ fontWeight: '500' }}>{order.buyer?.full_name || 'N/A'}</div>
              </div>
              <div>
                <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Email</div>
                <div style={{ fontWeight: '500' }}>{order.buyer?.email || 'N/A'}</div>
              </div>
              {order.buyer?.phone && (
                <div>
                  <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Phone</div>
                  <div style={{ fontWeight: '500' }}>{order.buyer.phone}</div>
                </div>
              )}
            </div>
          </div>

          {/* Order Items (if available) */}
          <div style={{
            background: 'white',
            padding: '24px',
            borderRadius: '12px',
            border: '1px solid #e5e7eb'
          }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Package size={20} />
              Order Details
            </h3>
            <div style={{ display: 'grid', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '12px', borderBottom: '1px solid #f3f4f6' }}>
                <span style={{ color: '#6b7280' }}>Subtotal</span>
                <span style={{ fontWeight: '600' }}>${parseFloat(order.total_amount).toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '12px', borderTop: '2px solid #e5e7eb' }}>
                <span style={{ fontWeight: '600', fontSize: '16px' }}>Total</span>
                <span style={{ fontWeight: '700', fontSize: '18px', color: 'var(--primary-color)' }}>
                  ${parseFloat(order.total_amount).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div>
          {/* Delivery Agent Info */}
          {order.delivery_agent ? (
            <div style={{
              background: 'white',
              padding: '24px',
              borderRadius: '12px',
              marginBottom: '24px',
              border: '1px solid #e5e7eb'
            }}>
              <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Truck size={20} />
                Delivery Agent
              </h3>
              <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: 'var(--primary-color)',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '32px',
                  fontWeight: '700',
                  margin: '0 auto 12px'
                }}>
                  {order.delivery_agent.full_name?.charAt(0) || 'A'}
                </div>
                <div style={{ fontWeight: '600', marginBottom: '4px' }}>{order.delivery_agent.full_name}</div>
                <div style={{ fontSize: '12px', color: '#6b7280' }}>{order.delivery_agent.agent_code}</div>
              </div>
              <div style={{ display: 'grid', gap: '12px' }}>
                {order.delivery_agent.phone && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
                    <Phone size={16} color="#6b7280" />
                    <span>{order.delivery_agent.phone}</span>
                  </div>
                )}
                {order.delivery_agent.rating && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
                    <Star size={16} color="#f59e0b" fill="#f59e0b" />
                    <span>{order.delivery_agent.rating.toFixed(1)} / 5.0</span>
                  </div>
                )}
                <div style={{
                  marginTop: '8px',
                  padding: '8px',
                  background: order.delivery_agent.status === 'active' ? '#d1fae5' : '#f3f4f6',
                  color: order.delivery_agent.status === 'active' ? '#065f46' : '#6b7280',
                  borderRadius: '6px',
                  textAlign: 'center',
                  fontSize: '12px',
                  fontWeight: '600'
                }}>
                  {order.delivery_agent.status === 'active' ? '🟢 Active' : '⚫ Offline'}
                </div>
              </div>
            </div>
          ) : (
            <div style={{
              background: '#fffbeb',
              padding: '24px',
              borderRadius: '12px',
              marginBottom: '24px',
              border: '1px solid #fcd34d'
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <AlertCircle size={24} color="#d97706" />
                <div>
                  <div style={{ fontWeight: '600', color: '#92400e', marginBottom: '8px' }}>
                    No Delivery Agent Assigned
                  </div>
                  <p style={{ fontSize: '14px', color: '#78350f', marginBottom: '12px' }}>
                    Assign a delivery agent to proceed with this order.
                  </p>
                  <button
                    onClick={() => {
                      fetchAvailableAgents();
                      setShowAgentModal(true);
                    }}
                    style={{
                      padding: '8px 16px',
                      background: '#d97706',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    Assign Agent Now
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Order Timeline */}
          <div style={{
            background: 'white',
            padding: '24px',
            borderRadius: '12px',
            border: '1px solid #e5e7eb'
          }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Clock size={20} />
              Order Timeline
            </h3>
            <div style={{ display: 'grid', gap: '12px' }}>
              <div>
                <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Order Placed</div>
                <div style={{ fontSize: '14px', fontWeight: '500' }}>
                  {new Date(order.created_at).toLocaleString()}
                </div>
              </div>
              {order.updated_at !== order.created_at && (
                <div>
                  <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Last Updated</div>
                  <div style={{ fontSize: '14px', fontWeight: '500' }}>
                    {new Date(order.updated_at).toLocaleString()}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Agent Assignment Modal */}
      {showAgentModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999
        }} onClick={() => setShowAgentModal(false)}>
          <div style={{
            background: 'white',
            borderRadius: '12px',
            width: '90%',
            maxWidth: '600px',
            maxHeight: '80vh',
            overflow: 'auto',
            padding: '24px'
          }} onClick={(e) => e.stopPropagation()}>
            <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '16px' }}>
              Select Delivery Agent
            </h2>
            
            {loadingAgents ? (
              <div style={{ textAlign: 'center', padding: '40px' }}>
                <div className="spinner-large"></div>
                <p>Loading agents...</p>
              </div>
            ) : agents.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
                <p>No verified delivery agents available</p>
              </div>
            ) : (
              <div style={{ display: 'grid', gap: '12px' }}>
                {agents.map(agent => (
                  <div key={agent.id} style={{
                    padding: '16px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.background = '#f9fafb'}
                  onMouseOut={(e) => e.currentTarget.style.background = 'white'}>
                    <div style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      background: 'var(--primary-color)',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '24px',
                      fontWeight: '700'
                    }}>
                      {agent.full_name?.charAt(0) || 'A'}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: '600', marginBottom: '4px' }}>{agent.full_name}</div>
                      <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>
                        {agent.agent_code} • {agent.phone}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Star size={14} color="#f59e0b" fill="#f59e0b" />
                        <span style={{ fontSize: '12px' }}>{agent.rating?.toFixed(1) || '0.0'} / 5.0</span>
                        <span style={{ fontSize: '12px', color: '#6b7280' }}>
                          ({agent.tasks_completed || 0} deliveries)
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => assignAgent(agent.id)}
                      style={{
                        padding: '8px 16px',
                        background: 'var(--primary-color)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: 'pointer'
                      }}
                    >
                      Assign
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setShowAgentModal(false)}
                style={{
                  padding: '10px 20px',
                  background: '#f3f4f6',
                  color: '#374151',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Static params generation for static export
export async function generateStaticParams() {
  return []
}

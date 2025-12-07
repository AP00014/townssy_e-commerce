'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../context/AuthContext';
import { supabase } from '../../../../lib/supabase';
import { ArrowLeft, Truck } from 'lucide-react';

export default function AdminOrderDetailsPage({ params }) {
  const router = useRouter();
  const { isAdmin, isSuperAdmin, isModerator } = useAuth();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [orderId, setOrderId] = useState(null);
  const [showAgentModal, setShowAgentModal] = useState(false);
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    const unwrapParams = async () => {
      const resolvedParams = await params;
      setOrderId(resolvedParams.id);
    };
    unwrapParams();
  }, [params]);

  useEffect(() => {
    if (!isAdmin && !isSuperAdmin && !isModerator) {
      router.push('/admin');
      return;
    }
    if (orderId) {
      fetchOrderDetails();
    }
  }, [orderId, isAdmin, isSuperAdmin]);

  const fetchOrderDetails = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          vendor:vendor_id(business_name),
          buyer:buyer_id(full_name, email),
          delivery_agent:delivery_agent_id(*)
        `)
        .eq('id', orderId)
        .single();

      if (error) throw error;
      setOrder(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAvailableAgents = async () => {
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
      setShowAgentModal(true);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const assignAgent = async (agentId) => {
    try {
      await supabase
        .from('orders')
        .update({
          delivery_agent_id: agentId,
          status: 'confirmed'
        })
        .eq('id', orderId);

      await supabase
        .from('agent_tasks')
        .insert({
          agent_id: agentId,
          order_id: orderId,
          vendor_id: order.vendor_id,
          task_type: 'delivery',
          status: 'assigned',
          assigned_at: new Date().toISOString()
        });

      alert('Agent assigned successfully!');
      setShowAgentModal(false);
      fetchOrderDetails();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const updateOrderStatus = async (newStatus) => {
    try {
      await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId);

      alert('Status updated');
      fetchOrderDetails();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner-large"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (!order) return null;

  return (
    <div>
      {/* Header */}
      <div className="page-header">
        <div>
          <button onClick={() => router.back()} className="btn-back">
            <ArrowLeft size={16} />
            Back
          </button>
          <h1>Order #{order.order_number}</h1>
          <p>Admin Order Management</p>
        </div>
        
        {!order.delivery_agent_id && (
          <button onClick={fetchAvailableAgents} className="btn-primary">
            <Truck size={20} />
            Assign Delivery Agent
          </button>
        )}
      </div>

      {/* Status Management */}
      <div style={{ background: 'white', padding: '24px', borderRadius: '12px', marginBottom: '24px', border: '1px solid #e5e7eb' }}>
        <h3 style={{ marginBottom: '16px' }}>Order Status: <strong>{order.status}</strong></h3>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {['pending', 'confirmed', 'preparing', 'out_for_delivery', 'delivered', 'cancelled'].map(status => (
            <button
              key={status}
              onClick={() => updateOrderStatus(status)}
              style={{ padding: '8px 16px', background: '#e5e7eb', border: 'none', borderRadius: '6px', fontSize: '14px', cursor: 'pointer' }}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Order Info */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        <div style={{ background: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
          <h3>Vendor</h3>
          <p><strong>{order.vendor?.business_name}</strong></p>
        </div>
        <div style={{ background: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
          <h3>Customer</h3>
          <p><strong>{order.buyer?.full_name}</strong></p>
          <p>{order.buyer?.email}</p>
        </div>
      </div>

      {/* Agent Modal */}
      {showAgentModal && (
        <div className="modal-overlay" onClick={() => setShowAgentModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Select Delivery Agent</h2>
            <div style={{ maxHeight: '400px', overflow: 'auto' }}>
              {agents.map(agent => (
                <div key={agent.id} style={{ padding: '12px', border: '1px solid #e5e7eb', marginBottom: '8px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div><strong>{agent.full_name}</strong></div>
                    <div style={{ fontSize: '12px', color: '#6b7280' }}>{agent.agent_code}</div>
                  </div>
                  <button onClick={() => assignAgent(agent.id)} className="btn-primary">
                    Assign
                  </button>
                </div>
              ))}
            </div>
            <button onClick={() => setShowAgentModal(false)} style={{ marginTop: '16px' }}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

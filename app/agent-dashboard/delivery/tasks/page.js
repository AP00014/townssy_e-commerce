'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../context/AuthContext';
import { supabase } from '../../../../lib/supabase';
import {
  Package,
  Clock,
  CheckCircle,
  XCircle,
  MapPin,
  DollarSign,
  AlertCircle,
  Truck
} from 'lucide-react';

export default function DeliveryTasksPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [agent, setAgent] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  const [activeTab, setActiveTab] = useState('assigned'); // assigned, in_progress, completed

  useEffect(() => {
    if (user) {
      fetchAgentAndTasks();
    }
  }, [user]);

  useEffect(() => {
    filterTasks();
  }, [filterStatus, activeTab, tasks]);

  const fetchAgentAndTasks = async () => {
    try {
      // Fetch agent
      const { data: agentData } = await supabase
        .from('agents')
        .select('*')
        .eq('user_id', user.id)
        .eq('agent_type', 'delivery')
        .single();

      setAgent(agentData);

      // Fetch tasks
      const { data: tasksData, error } = await supabase
        .from('agent_tasks')
        .select(`
          *,
          order:order_id(*),
          vendor:vendor_id(business_name, business_phone)
        `)
        .eq('agent_id', agentData.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTasks(tasksData || []);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterTasks = () => {
    let filtered = [...tasks];

    // Tab filter
    if (activeTab === 'assigned') {
      filtered = filtered.filter(t => t.status === 'assigned');
    } else if (activeTab === 'in_progress') {
      filtered = filtered.filter(t => t.status === 'in_progress');
    } else if (activeTab === 'completed') {
      filtered = filtered.filter(t => t.status === 'completed');
    }

    setFilteredTasks(filtered);
  };

  const acceptTask = async (taskId) => {
    try {
      const { error } = await supabase
        .from('agent_tasks')
        .update({
          status: 'in_progress',
          started_at: new Date().toISOString()
        })
        .eq('id', taskId);

      if (error) throw error;
      
      alert('Task accepted! You can now start the delivery.');
      fetchAgentAndTasks(); // Refresh
    } catch (error) {
      console.error('Error accepting task:', error);
      alert('Error accepting task');
    }
  };

  const rejectTask = async (taskId) => {
    if (!confirm('Are you sure you want to reject this task?')) return;

    try {
      const { error } = await supabase
        .from('agent_tasks')
        .update({
          status: 'cancelled'
        })
        .eq('id', taskId);

      if (error) throw error;
      
      alert('Task rejected');
      fetchAgentAndTasks(); // Refresh
    } catch (error) {
      console.error('Error rejecting task:', error);
      alert('Error rejecting task');
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      'assigned': { bg: '#fef3c7', color: '#92400e', text: 'New Task', icon: AlertCircle },
      'in_progress': { bg: '#dbeafe', color: '#1e40af', text: 'In Progress', icon: Truck },
      'completed': { bg: '#d1fae5', color: '#065f46', text: 'Completed', icon: CheckCircle },
      'failed': { bg: '#fee2e2', color: '#991b1b', text: 'Failed', icon: XCircle },
      'cancelled': { bg: '#f3f4f6', color: '#6b7280', text: 'Cancelled', icon: XCircle },
    };
    
    const badge = badges[status] || badges['assigned'];
    const Icon = badge.icon;
    
    return (
      <span style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '4px 12px',
        borderRadius: '12px',
        fontSize: '12px',
        fontWeight: '600',
        background: badge.bg,
        color: badge.color
      }}>
        <Icon size={14} />
        {badge.text}
      </span>
    );
  };

  const getTaskStats = () => {
    return {
      assigned: tasks.filter(t => t.status === 'assigned').length,
      inProgress: tasks.filter(t => t.status === 'in_progress').length,
      completed: tasks.filter(t => t.status === 'completed').length,
      total: tasks.length
    };
  };

  const stats = getTaskStats();

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner-large"></div>
        <p>Loading tasks...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1>My Delivery Tasks</h1>
          <p>Manage your delivery assignments</p>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <div style={{ background: 'white', padding: '16px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#f59e0b' }}>{stats.assigned}</div>
          <div style={{ fontSize: '14px', color: '#6b7280' }}>New Tasks</div>
        </div>
        <div style={{ background: 'white', padding: '16px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#3b82f6' }}>{stats.inProgress}</div>
          <div style={{ fontSize: '14px', color: '#6b7280' }}>In Progress</div>
        </div>
        <div style={{ background: 'white', padding: '16px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#10b981' }}>{stats.completed}</div>
          <div style={{ fontSize: '14px', color: '#6b7280' }}>Completed</div>
        </div>
        <div style={{ background: 'white', padding: '16px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#1f2937' }}>{stats.total}</div>
          <div style={{ fontSize: '14px', color: '#6b7280' }}>Total Tasks</div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{
        background: 'white',
        borderRadius: '12px 12px 0 0',
        border: '1px solid #e5e7eb',
        borderBottom: 'none',
        display: 'flex',
        gap: '0'
      }}>
        <button
          onClick={() => setActiveTab('assigned')}
          style={{
            flex: 1,
            padding: '16px',
            background: activeTab === 'assigned' ? 'white' : '#f9fafb',
            border: 'none',
            borderBottom: activeTab === 'assigned' ? '3px solid var(--primary-color)' : '3px solid transparent',
            fontWeight: activeTab === 'assigned' ? '600' : '400',
            color: activeTab === 'assigned' ? 'var(--primary-color)' : '#6b7280',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          New Tasks ({stats.assigned})
        </button>
        <button
          onClick={() => setActiveTab('in_progress')}
          style={{
            flex: 1,
            padding: '16px',
            background: activeTab === 'in_progress' ? 'white' : '#f9fafb',
            border: 'none',
            borderBottom: activeTab === 'in_progress' ? '3px solid var(--primary-color)' : '3px solid transparent',
            fontWeight: activeTab === 'in_progress' ? '600' : '400',
            color: activeTab === 'in_progress' ? 'var(--primary-color)' : '#6b7280',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          Active ({stats.inProgress})
        </button>
        <button
          onClick={() => setActiveTab('completed')}
          style={{
            flex: 1,
            padding: '16px',
            background: activeTab === 'completed' ? 'white' : '#f9fafb',
            border: 'none',
            borderBottom: activeTab === 'completed' ? '3px solid var(--primary-color)' : '3px solid transparent',
            fontWeight: activeTab === 'completed' ? '600' : '400',
            color: activeTab === 'completed' ? 'var(--primary-color)' : '#6b7280',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          Completed ({stats.completed})
        </button>
      </div>

      {/* Tasks List */}
      <div style={{
        background: 'white',
        borderRadius: '0 0 12px 12px',
        border: '1px solid #e5e7eb',
        minHeight: '400px'
      }}>
        {filteredTasks.length === 0 ? (
          <div style={{
            padding: '60px 20px',
            textAlign: 'center',
            color: '#6b7280'
          }}>
            <Package size={64} style={{ margin: '0 auto 16px', opacity: 0.3 }} />
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>
              No {activeTab.replace('_', ' ')} tasks
            </h3>
            <p style={{ fontSize: '14px' }}>
              {activeTab === 'assigned' && 'New delivery tasks will appear here'}
              {activeTab === 'in_progress' && 'Your active deliveries will appear here'}
              {activeTab === 'completed' && 'Completed tasks will appear here'}
            </p>
          </div>
        ) : (
          <div style={{ padding: '16px' }}>
            <div style={{ display: 'grid', gap: '16px' }}>
              {filteredTasks.map(task => (
                <div key={task.id} style={{
                  padding: '20px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  background: '#fafafa'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <div>
                      <div style={{ fontWeight: '600', fontSize: '16px', marginBottom: '4px' }}>
                        {task.task_type.charAt(0).toUpperCase() + task.task_type.slice(1)} Task
                      </div>
                      <div style={{ fontSize: '12px', color: '#6b7280' }}>
                        Task ID: {task.id.slice(0, 8)}
                      </div>
                    </div>
                    <div>
                      {getStatusBadge(task.status)}
                    </div>
                  </div>

                  {/* Order Info */}
                  {task.order && (
                    <div style={{
                      background: 'white',
                      padding: '12px',
                      borderRadius: '6px',
                      marginBottom: '12px'
                    }}>
                      <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Order</div>
                      <div style={{ fontWeight: '500' }}>#{task.order.order_number}</div>
                      <div style={{ fontSize: '14px', color: 'var(--primary-color)', fontWeight: '600', marginTop: '4px' }}>
                        ${parseFloat(task.order.total_amount).toFixed(2)}
                      </div>
                    </div>
                  )}

                  {/* Vendor Info */}
                  {task.vendor && (
                    <div style={{
                      background: 'white',
                      padding: '12px',
                      borderRadius: '6px',
                      marginBottom: '12px'
                    }}>
                      <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Vendor</div>
                      <div style={{ fontWeight: '500' }}>{task.vendor.business_name}</div>
                      {task.vendor.business_phone && (
                        <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>
                          📞 {task.vendor.business_phone}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Location */}
                  {task.location_end && (
                    <div style={{
                      background: 'white',
                      padding: '12px',
                      borderRadius: '6px',
                      marginBottom: '12px',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '8px'
                    }}>
                      <MapPin size={16} color="#6b7280" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <div>
                        <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Delivery Location</div>
                        <div style={{ fontSize: '14px' }}>{task.location_end.address || 'Location provided'}</div>
                      </div>
                    </div>
                  )}

                  {/* Timeline */}
                  <div style={{
                    display: 'flex',
                    gap: '16px',
                    fontSize: '12px',
                    color: '#6b7280',
                    marginBottom: '16px'
                  }}>
                    <div>
                      <Clock size={14} style={{ display: 'inline', marginRight: '4px' }} />
                      Assigned: {new Date(task.assigned_at).toLocaleString()}
                    </div>
                    {task.started_at && (
                      <div>
                        Started: {new Date(task.started_at).toLocaleString()}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {task.status === 'assigned' && (
                      <>
                        <button
                          onClick={() => acceptTask(task.id)}
                          style={{
                            flex: 1,
                            padding: '10px',
                            background: 'var(--primary-color)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            fontSize: '14px',
                            fontWeight: '600',
                            cursor: 'pointer'
                          }}
                        >
                          <CheckCircle size={16} style={{ display: 'inline', marginRight: '6px' }} />
                          Accept Task
                        </button>
                        <button
                          onClick={() => rejectTask(task.id)}
                          style={{
                            flex: 1,
                            padding: '10px',
                            background: '#fee2e2',
                            color: '#991b1b',
                            border: 'none',
                            borderRadius: '6px',
                            fontSize: '14px',
                            fontWeight: '600',
                            cursor: 'pointer'
                          }}
                        >
                          <XCircle size={16} style={{ display: 'inline', marginRight: '6px' }} />
                          Reject
                        </button>
                      </>
                    )}
                    {task.status === 'in_progress' && (
                      <button
                        onClick={() => router.push(`/agent-dashboard/delivery/tasks/${task.id}`)}
                        style={{
                          flex: 1,
                          padding: '10px',
                          background: '#3b82f6',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          fontSize: '14px',
                          fontWeight: '600',
                          cursor: 'pointer'
                        }}
                      >
                        View Details & Complete
                      </button>
                    )}
                    {task.status === 'completed' && (
                      <button
                        onClick={() => router.push(`/agent-dashboard/delivery/tasks/${task.id}`)}
                        style={{
                          flex: 1,
                          padding: '10px',
                          background: '#f3f4f6',
                          color: '#374151',
                          border: '1px solid #d1d5db',
                          borderRadius: '6px',
                          fontSize: '14px',
                          fontWeight: '600',
                          cursor: 'pointer'
                        }}
                      >
                        View Details
                        </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

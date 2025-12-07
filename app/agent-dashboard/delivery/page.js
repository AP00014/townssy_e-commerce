'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../../lib/supabase';
import Link from 'next/link';
import {
  Package,
  DollarSign,
  TrendingUp,
  Star,
  CheckCircle,
  Clock,
  Truck,
  AlertCircle
} from 'lucide-react';

export default function DeliveryAgentDashboardPage() {
  const { user } = useAuth();
  const [agent, setAgent] = useState(null);
  const [stats, setStats] = useState({
    activeTasks: 0,
    completedToday: 0,
    totalCompleted: 0,
    totalEarnings: 0,
    pendingTasks: 0,
    rating: 0,
    reviewCount: 0,
  });
  const [recentTasks, setRecentTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      // Fetch agent
      const { data: agentData } = await supabase
        .from('agents')
        .select('*')
        .eq('user_id', user.id)
        .eq('agent_type', 'delivery')
        .single();

      setAgent(agentData);

      // Fetch tasks stats
      const { data: tasks, error: tasksError } = await supabase
        .from('agent_tasks')
        .select('*')
        .eq('agent_id', agentData.id);

      if (!tasksError && tasks) {
        const activeTasks = tasks.filter(t => t.status === 'in_progress').length;
        const pendingTasks = tasks.filter(t => t.status === 'assigned').length;
        
        // Tasks completed today
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const completedToday = tasks.filter(t => 
          t.status === 'completed' && new Date(t.completed_at) >= today
        ).length;

        // Get recent tasks (last 5)
        const recent = tasks
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .slice(0, 5);

        setRecentTasks(recent);

        setStats(prev => ({
          ...prev,
          activeTasks,
          completedToday,
          totalCompleted: agentData.tasks_completed || 0,
          pendingTasks,
          rating: agentData.rating || 0,
          reviewCount: agentData.review_count || 0,
        }));
      }

      // Fetch earnings (from payouts)
      const { data: payouts } = await supabase
        .from('agent_payouts')
        .select('*')
        .eq('agent_id', agentData.id);

      if (payouts) {
        const totalEarnings = payouts.reduce((sum, p) => sum + (parseFloat(p.amount) || 0), 0);
        setStats(prev => ({
          ...prev,
          totalEarnings,
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

  const getTaskStatusBadge = (status) => {
    const badges = {
      'assigned': { bg: '#dbeafe', color: '#1e40af', text: 'Assigned' },
      'in_progress': { bg: '#fef3c7', color: '#92400e', text: 'In Progress' },
      'completed': { bg: '#d1fae5', color: '#065f46', text: 'Completed' },
      'failed': { bg: '#fee2e2', color: '#991b1b', text: 'Failed' },
      'cancelled': { bg: '#f3f4f6', color: '#6b7280', text: 'Cancelled' },
    };
    
    const badge = badges[status] || badges['assigned'];
    
    return (
      <span style={{
        display: 'inline-block',
        padding: '2px 8px',
        borderRadius: '4px',
        fontSize: '11px',
        background: badge.bg,
        color: badge.color
      }}>
        {badge.text}
      </span>
    );
  };

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1>Delivery Dashboard</h1>
          <p>Welcome back, {agent?.full_name}!</p>
        </div>
        <Link href="/agent-dashboard/delivery/tasks" className="btn-primary">
          <Truck size={20} />
          View All Tasks
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-icon primary">
              <Clock />
            </div>
          </div>
          <div className="stat-value">{stats.activeTasks}</div>
          <div className="stat-label">Active Deliveries</div>
          <div className="stat-change">
            {stats.pendingTasks} pending acceptance
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-icon success">
              <CheckCircle />
            </div>
          </div>
          <div className="stat-value">{stats.completedToday}</div>
          <div className="stat-label">Completed Today</div>
          <div className="stat-change">
            {stats.totalCompleted} total completed
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-icon warning">
              <DollarSign />
            </div>
          </div>
          <div className="stat-value">${stats.totalEarnings.toFixed(2)}</div>
          <div className="stat-label">Total Earnings</div>
          <div className="stat-change positive">
            View payout history
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-icon danger">
              <Star />
            </div>
          </div>
          <div className="stat-value">{stats.rating.toFixed(1)}</div>
          <div className="stat-label">Average Rating</div>
          <div className="stat-change">
            {stats.reviewCount} reviews
          </div>
        </div>
      </div>

      {/* Recent Tasks */}
      <div style={{ marginTop: '32px' }}>
        <div style={{ background: 'white', borderRadius: '12px', padding: '24px', border: '1px solid #e5e7eb' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '600', margin: 0 }}>Recent Tasks</h2>
            <Link href="/agent-dashboard/delivery/tasks" style={{ color: 'var(--primary-color)', fontSize: '14px' }}>
              View All
            </Link>
          </div>

          {recentTasks.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: '#6b7280' }}>
              <Package size={48} style={{ margin: '0 auto 16px', opacity: 0.3 }} />
              <p>No tasks yet</p>
              <p style={{ fontSize: '14px', marginTop: '8px' }}>New delivery tasks will appear here</p>
            </div>
          ) : (
            <div>
              {recentTasks.map(task => (
                <div key={task.id} style={{ padding: '16px 0', borderBottom: '1px solid #f3f4f6' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: '500', marginBottom: '4px' }}>
                        Task #{task.id.slice(0, 8)}
                      </div>
                      <div style={{ fontSize: '12px', color: '#6b7280' }}>
                        {task.task_type} · {task.priority} priority
                      </div>
                    </div>
                    <div>
                      {getTaskStatusBadge(task.status)}
                    </div>
                  </div>
                  
                  {task.location_end && (
                    <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Package size={14} />
                      Delivery to: {task.location_end.address || 'Location set'}
                    </div>
                  )}
                  
                  <div style={{ marginTop: '8px', fontSize: '12px', color: '#6b7280' }}>
                    Assigned: {new Date(task.assigned_at).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      {stats.pendingTasks > 0 && (
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
              New Tasks Awaiting
            </div>
            <div style={{ fontSize: '14px', color: '#78350f' }}>
              You have {stats.pendingTasks} new delivery task{stats.pendingTasks !== 1 ? 's' : ''} waiting for acceptance.
            </div>
          </div>
          <Link href="/agent-dashboard/delivery/tasks" style={{
            padding: '8px 16px',
            background: '#d97706',
            color: 'white',
            borderRadius: '8px',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: '500'
          }}>
            View Tasks
          </Link>
        </div>
      )}
    </div>
  );
}

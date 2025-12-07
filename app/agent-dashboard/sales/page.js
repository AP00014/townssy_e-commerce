'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../../lib/supabase';
import Link from 'next/link';
import {
  Users,
  DollarSign,
  TrendingUp,
  Target,
  Link as LinkIcon,
  Share2,
  CheckCircle,
  Clock
} from 'lucide-react';

export default function SalesAgentDashboardPage() {
  const { user } = useAuth();
  const [agent, setAgent] = useState(null);
  const [stats, setStats] = useState({
    totalLeads: 0,
    convertedLeads: 0,
    activeLeads: 0,
    totalReferrals: 0,
    totalEarnings: 0,
    thisMonthEarnings: 0,
    conversionRate: 0,
  });
  const [recentLeads, setRecentLeads] = useState([]);
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
        .eq('agent_type', 'sales')
        .single();

      setAgent(agentData);

      // Mock data for now (since we don't have leads/referrals tables yet)
      setStats({
        totalLeads: 45,
        convertedLeads: 18,
        activeLeads: 12,
        totalReferrals: 32,
        totalEarnings: 1250.00,
        thisMonthEarnings: 450.00,
        conversionRate: 40,
      });

      // Mock recent leads
      setRecentLeads([
        {
          id: '1',
          name: 'John Doe',
          email: 'john@example.com',
          status: 'contacted',
          created_at: new Date().toISOString(),
        },
        {
          id: '2',
          name: 'Jane Smith',
          email: 'jane@example.com',
          status: 'converted',
          created_at: new Date().toISOString(),
        },
      ]);

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

  const getLeadStatusBadge = (status) => {
    const badges = {
      'new': { bg: '#dbeafe', color: '#1e40af', text: 'New' },
      'contacted': { bg: '#fef3c7', color: '#92400e', text: 'Contacted' },
      'converted': { bg: '#d1fae5', color: '#065f46', text: 'Converted' },
      'lost': { bg: '#fee2e2', color: '#991b1b', text: 'Lost' },
    };
    
    const badge = badges[status] || badges['new'];
    
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

  const referralLink = `https://townssy.com/ref/${agent?.agent_code}`;

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1>Sales Dashboard</h1>
          <p>Welcome back, {agent?.full_name}!</p>
        </div>
        <Link href="/agent-dashboard/sales/leads" className="btn-primary">
          <Users size={20} />
          View All Leads
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-icon primary">
              <Users />
            </div>
          </div>
          <div className="stat-value">{stats.totalLeads}</div>
          <div className="stat-label">Total Leads</div>
          <div className="stat-change">
            {stats.activeLeads} active
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-icon success">
              <CheckCircle />
            </div>
          </div>
          <div className="stat-value">{stats.convertedLeads}</div>
          <div className="stat-label">Converted Leads</div>
          <div className="stat-change positive">
            {stats.conversionRate}% conversion rate
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
            ${stats.thisMonthEarnings.toFixed(2)} this month
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-icon danger">
              <LinkIcon />
            </div>
          </div>
          <div className="stat-value">{stats.totalReferrals}</div>
          <div className="stat-label">Total Referrals</div>
          <div className="stat-change">
            Share your link below
          </div>
        </div>
      </div>

      {/* Referral Link Section */}
      <div style={{
        marginTop: '32px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '12px',
        padding: '24px',
        color: 'white'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <Share2 size={24} />
          <h3 style={{ fontSize: '18px', fontWeight: '600', margin: 0 }}>Your Referral Link</h3>
        </div>
        <div style={{ 
          background: 'rgba(255, 255, 255, 0.2)', 
          padding: '12px 16px', 
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px'
        }}>
          <code style={{ flex: 1, fontSize: '14px', wordBreak: 'break-all' }}>
            {referralLink}
          </code>
          <button
            onClick={() => {
              navigator.clipboard.writeText(referralLink);
              alert('Referral link copied!');
            }}
            style={{
              padding: '8px 16px',
              background: 'white',
              color: '#667eea',
              border: 'none',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Copy
          </button>
        </div>
        <p style={{ fontSize: '12px', marginTop: '12px', opacity: 0.9 }}>
          Share this link to earn {agent?.commission_rate || 5}% commission on all sales from your referrals!
        </p>
      </div>

      {/* Recent Leads */}
      <div style={{ marginTop: '32px' }}>
        <div style={{ background: 'white', borderRadius: '12px', padding: '24px', border: '1px solid #e5e7eb' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '600', margin: 0 }}>Recent Leads</h2>
            <Link href="/agent-dashboard/sales/leads" style={{ color: 'var(--primary-color)', fontSize: '14px' }}>
              View All
            </Link>
          </div>

          {recentLeads.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: '#6b7280' }}>
              <Users size={48} style={{ margin: '0 auto 16px', opacity: 0.3 }} />
              <p>No leads yet</p>
              <p style={{ fontSize: '14px', marginTop: '8px' }}>Start generating leads by sharing your referral link!</p>
            </div>
          ) : (
            <div>
              {recentLeads.map(lead => (
                <div key={lead.id} style={{ padding: '16px 0', borderBottom: '1px solid #f3f4f6' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: '500', marginBottom: '4px' }}>
                        {lead.name}
                      </div>
                      <div style={{ fontSize: '12px', color: '#6b7280' }}>
                        {lead.email}
                      </div>
                    </div>
                    <div>
                      {getLeadStatusBadge(lead.status)}
                    </div>
                  </div>
                  
                  <div style={{ marginTop: '8px', fontSize: '12px', color: '#6b7280' }}>
                    Added: {new Date(lead.created_at).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Performance Tip */}
      <div style={{
        marginTop: '24px',
        background: '#f0fdf4',
        border: '1px solid #86efac',
        borderRadius: '12px',
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px'
      }}>
        <Target size={24} color="#16a34a" style={{ flexShrink: 0 }} />
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: '600', color: '#16a34a', marginBottom: '4px' }}>
            Performance Tip
          </div>
          <div style={{ fontSize: '14px', color: '#166534' }}>
            Your conversion rate is {stats.conversionRate}%! Keep following up with your {stats.activeLeads} active leads to boost your earnings.
          </div>
        </div>
      </div>
    </div>
  );
}

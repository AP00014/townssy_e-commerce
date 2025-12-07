'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../../lib/supabase';
import {
  LayoutDashboard,
  Truck,
  DollarSign,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
  MapPin,
  Clock
} from 'lucide-react';
import '../../styles/agent-dashboard.css';

export default function DeliveryAgentDashboardLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, profile, loading: authLoading } = useAuth();
  const [agent, setAgent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Fetch agent info
  useEffect(() => {
    const fetchAgent = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from('agents')
          .select('*')
          .eq('user_id', user.id)
          .eq('agent_type', 'delivery')
          .single();

        if (error) {
          console.error('Error fetching agent:', error);
          // Not a delivery agent, redirect to application
          router.push('/agent-application');
          return;
        }

        // Check if agent is verified
        if (data.verification_status !== 'verified') {
          // Redirect to pending verification page
          router.push('/agent-pending');
          return;
        }

        setAgent(data);
      } catch (error) {
        console.error('Error:', error);
        router.push('/agent-application');
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading && user) {
      fetchAgent();
    } else if (!authLoading && !user) {
      router.push('/');
    }
  }, [user, authLoading, router]);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      router.push('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const navItems = [
    { href: '/agent-dashboard/delivery', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/agent-dashboard/delivery/tasks', icon: Truck, label: 'My Tasks' },
    { href: '/agent-dashboard/delivery/earnings', icon: DollarSign, label: 'Earnings' },
    { href: '/agent-dashboard/delivery/analytics', icon: BarChart3, label: 'Analytics' },
    { href: '/agent-dashboard/delivery/schedule', icon: Clock, label: 'Schedule' },
    { href: '/agent-dashboard/delivery/settings', icon: Settings, label: 'Settings' },
  ];

  if (authLoading || loading) {
    return (
      <div className="loading-container">
        <div className="spinner-large"></div>
        <p>Loading delivery agent dashboard...</p>
      </div>
    );
  }

  if (!agent) {
    return null; // Will redirect
  }

  const getInitials = (name) => {
    return name
      ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
      : 'DA';
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return '#10b981';
      case 'on_delivery': return '#f59e0b';
      case 'idle': return '#6b7280';
      case 'offline': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getStatusLabel = (status) => {
    switch(status) {
      case 'active': return 'Active';
      case 'on_delivery': return 'On Delivery';
      case 'idle': return 'Idle';
      case 'offline': return 'Offline';
      default: return 'Unknown';
    }
  };

  return (
    <div className="agent-dashboard-layout">
      {/* Sidebar Overlay for Mobile */}
      {sidebarOpen && (
        <div 
          className="sidebar-overlay" 
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`agent-sidebar ${sidebarOpen ? 'open' : ''}`}>
        {/* Sidebar Header */}
        <div className="sidebar-header">
          <div className="agent-avatar">
            {agent.photo_url ? (
              <img src={agent.photo_url} alt={agent.full_name} />
            ) : (
              <div className="agent-avatar-placeholder">
                {getInitials(agent.full_name)}
              </div>
            )}
          </div>
          <div className="agent-info">
            <h3>{agent.full_name}</h3>
            <div className="agent-code">ID: {agent.agent_code}</div>
            <div className="agent-status" style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '6px',
              marginTop: '8px'
            }}>
              <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: getStatusColor(agent.status)
              }}></div>
              <span style={{ fontSize: '12px', color: '#6b7280' }}>
                {getStatusLabel(agent.status)}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || 
              (item.href !== '/agent-dashboard/delivery' && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-item ${isActive ? 'active' : ''}`}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon size={20} />
                <span>{item.label}</span>
                <ChevronRight size={16} className="nav-arrow" />
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="sidebar-footer">
          <button onClick={handleLogout} className="logout-button">
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="agent-main-content">
        {/* Top Bar */}
        <header className="agent-topbar">
          <button 
            className="sidebar-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className="topbar-actions">
            <div className="location-badge">
              <MapPin size={16} />
              <span>Online</span>
            </div>
            
            <div className="user-profile">
              <div className="user-avatar">
                {getInitials(agent.full_name)}
              </div>
              <div className="user-details">
                <div className="user-name">{agent.full_name}</div>
                <div className="user-role">Delivery Agent</div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="agent-content">
          {children}
        </main>
      </div>
    </div>
  );
}

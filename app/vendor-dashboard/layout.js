'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../../lib/supabase';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  BarChart3,
  MessageSquare,
  Star,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight
} from 'lucide-react';
import '../styles/vendor-dashboard.css';

export default function VendorDashboardLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, profile, loading: authLoading } = useAuth();
  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Fetch vendor info
  useEffect(() => {
    const fetchVendor = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from('vendors')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (error) {
          console.error('Error fetching vendor:', error);
          // Not a vendor, redirect to vendor application
          router.push('/vendor-application');
          return;
        }

        // Check if vendor is verified
        if (data.verification_status !== 'verified') {
          alert('Your vendor account is pending verification. Please wait for admin approval.');
          router.push('/');
          return;
        }

        setVendor(data);
      } catch (error) {
        console.error('Error:', error);
        router.push('/vendor-application');
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading && user) {
      fetchVendor();
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
    { href: '/vendor-dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/vendor-dashboard/products', icon: Package, label: 'Products' },
    { href: '/vendor-dashboard/orders', icon: ShoppingCart, label: 'Orders' },
    { href: '/vendor-dashboard/analytics', icon: BarChart3, label: 'Analytics' },
    { href: '/vendor-dashboard/customers', icon: MessageSquare, label: 'Customers' },
    { href: '/vendor-dashboard/reviews', icon: Star, label: 'Reviews' },
    { href: '/vendor-dashboard/settings', icon: Settings, label: 'Settings' },
  ];

  if (authLoading || loading) {
    return (
      <div className="loading-container">
        <div className="spinner-large"></div>
        <p>Loading vendor dashboard...</p>
      </div>
    );
  }

  if (!vendor) {
    return null; // Will redirect
  }

  const getInitials = (name) => {
    return name
      ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
      : 'V';
  };

  return (
    <div className="vendor-dashboard-layout">
      {/* Sidebar Overlay for Mobile */}
      {sidebarOpen && (
        <div 
          className="sidebar-overlay" 
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`vendor-sidebar ${sidebarOpen ? 'open' : ''}`}>
        {/* Sidebar Header */}
        <div className="sidebar-header">
          <div className="vendor-logo">
            {vendor.logo_url ? (
              <img src={vendor.logo_url} alt={vendor.business_name} />
            ) : (
              <div className="vendor-logo-placeholder">
                {getInitials(vendor.business_name)}
              </div>
            )}
          </div>
          <div className="vendor-info">
            <h3>{vendor.business_name}</h3>
            <span className={`vendor-badge ${vendor.verification_status}`}>
              {vendor.verification_status === 'verified' ? '✓ Verified' : 'Pending'}
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || 
              (item.href !== '/vendor-dashboard' && pathname.startsWith(item.href));

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
      <div className="vendor-main-content">
        {/* Top Bar */}
        <header className="vendor-topbar">
          <button 
            className="sidebar-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className="topbar-actions">
            <div className="user-profile">
              <div className="user-avatar">
                {getInitials(vendor.business_name)}
              </div>
              <div className="user-details">
                <div className="user-name">{vendor.business_name}</div>
                <div className="user-role">Vendor</div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="vendor-content">
          {children}
        </main>
      </div>
    </div>
  );
}

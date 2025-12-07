'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import { supabase } from '../../../lib/supabase';
import {
  BarChart3,
  TrendingUp,
  Users,
  ShoppingBag,
  AlertTriangle,
  Download,
  Calendar,
  Filter,
  RefreshCw,
  Eye,
  Package,
  DollarSign,
  MapPin,
  Star
} from 'lucide-react';
import '../../styles/admin-reports.css';

export default function ReportsPage() {
  const router = useRouter();
  const { user, profile, isAdmin, isSuperAdmin, isModerator } = useAuth();
  const [loading, setLoading] = useState(true);
  const [reportData, setReportData] = useState({
    userStats: {},
    productStats: {},
    orderStats: {},
    vendorStats: {},
    disputeStats: {}
  });
  const [timeRange, setTimeRange] = useState('30');
  const [activeTab, setActiveTab] = useState('overview');

  // Check permissions
  useEffect(() => {
    if (!isAdmin && !isSuperAdmin && !isModerator) {
      router.push('/admin');
    }
  }, [isAdmin, isSuperAdmin, isModerator, router]);

  // Load report data
  useEffect(() => {
    if (isAdmin || isSuperAdmin || isModerator) {
      fetchReportData();
    }
  }, [isAdmin, isSuperAdmin, isModerator, timeRange]);

  const fetchReportData = async () => {
    try {
      setLoading(true);

      const days = parseInt(timeRange);
      const dateFilter = new Date();
      dateFilter.setDate(dateFilter.getDate() - days);

      // User statistics
      const { data: users } = await supabase
        .from('profiles')
        .select('role, created_at, is_active')
        .gte('created_at', dateFilter.toISOString());

      // Product statistics
      const { data: products } = await supabase
        .from('products')
        .select('verification_status, created_at, is_active, sales_count, view_count')
        .gte('created_at', dateFilter.toISOString());

      // Order statistics
      const { data: orders } = await supabase
        .from('orders')
        .select('status, total_amount, created_at, verification_status')
        .gte('created_at', dateFilter.toISOString());

      // Vendor statistics
      const { data: vendors } = await supabase
        .from('vendors')
        .select('verification_status, created_at, is_active, total_sales')
        .gte('created_at', dateFilter.toISOString());

      // Dispute statistics
      const { data: disputes } = await supabase
        .from('disputes')
        .select('status, created_at')
        .gte('created_at', dateFilter.toISOString());

      // Calculate statistics
      const userStats = {
        total: users?.length || 0,
        active: users?.filter(u => u.is_active).length || 0,
        byRole: {
          customer: users?.filter(u => u.role === 'user').length || 0,
          vendor: users?.filter(u => u.role === 'vendor').length || 0,
          agent: users?.filter(u => u.role === 'agent').length || 0,
          admin: users?.filter(u => u.role === 'admin' || u.role === 'super_admin').length || 0
        }
      };

      const productStats = {
        total: products?.length || 0,
        active: products?.filter(p => p.is_active).length || 0,
        verified: products?.filter(p => p.verification_status === 'approved').length || 0,
        pending: products?.filter(p => p.verification_status === 'pending').length || 0,
        totalSales: products?.reduce((sum, p) => sum + (p.sales_count || 0), 0) || 0,
        totalViews: products?.reduce((sum, p) => sum + (p.view_count || 0), 0) || 0
      };

      const orderStats = {
        total: orders?.length || 0,
        completed: orders?.filter(o => o.status === 'delivered').length || 0,
        pending: orders?.filter(o => o.status === 'pending').length || 0,
        disputed: orders?.filter(o => o.status === 'disputed').length || 0,
        totalRevenue: orders?.reduce((sum, o) => sum + (o.total_amount || 0), 0) || 0,
        verified: orders?.filter(o => o.verification_status === 'verified').length || 0
      };

      const vendorStats = {
        total: vendors?.length || 0,
        active: vendors?.filter(v => v.is_active).length || 0,
        verified: vendors?.filter(v => v.verification_status === 'verified').length || 0,
        pending: vendors?.filter(v => v.verification_status === 'pending').length || 0,
        totalSales: vendors?.reduce((sum, v) => sum + (v.total_sales || 0), 0) || 0
      };

      const disputeStats = {
        total: disputes?.length || 0,
        open: disputes?.filter(d => d.status === 'open').length || 0,
        resolved: disputes?.filter(d => d.status === 'resolved').length || 0,
        escalated: disputes?.filter(d => d.status === 'escalated').length || 0
      };

      setReportData({
        userStats,
        productStats,
        orderStats,
        vendorStats,
        disputeStats
      });

    } catch (error) {
      console.error('Error fetching report data:', error);
    } finally {
      setLoading(false);
    }
  };

  const exportReport = (type) => {
    const data = reportData[type];
    if (!data) return;

    const csv = [
      Object.keys(data).join(','),
      Object.values(data).map(v => typeof v === 'object' ? JSON.stringify(v) : v).join(',')
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${type}-report-${timeRange}days.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const renderOverviewTab = () => (
    <div className="reports-overview">
      {/* Key Metrics */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-icon users">
            <Users size={24} />
          </div>
          <div className="metric-content">
            <h3>{reportData.userStats.total}</h3>
            <p>Total Users</p>
            <span className="metric-change positive">
              {reportData.userStats.active} active
            </span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon products">
            <Package size={24} />
          </div>
          <div className="metric-content">
            <h3>{reportData.productStats.total}</h3>
            <p>Total Products</p>
            <span className="metric-change positive">
              {reportData.productStats.active} active
            </span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon orders">
            <ShoppingBag size={24} />
          </div>
          <div className="metric-content">
            <h3>{reportData.orderStats.total}</h3>
            <p>Total Orders</p>
            <span className="metric-change positive">
              GH₵{reportData.orderStats.totalRevenue?.toLocaleString()}
            </span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon vendors">
            <MapPin size={24} />
          </div>
          <div className="metric-content">
            <h3>{reportData.vendorStats.total}</h3>
            <p>Total Vendors</p>
            <span className="metric-change positive">
              {reportData.vendorStats.active} active
            </span>
          </div>
        </div>
      </div>

      {/* Charts Placeholder */}
      <div className="charts-grid">
        <div className="chart-card">
          <div className="chart-header">
            <h4>User Registration Trends</h4>
            <BarChart3 size={20} />
          </div>
          <div className="chart-placeholder">
            <TrendingUp size={48} />
            <p>Chart visualization would be displayed here</p>
            <small>Integration with charting library needed</small>
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-header">
            <h4>Revenue Overview</h4>
            <TrendingUp size={20} />
          </div>
          <div className="chart-placeholder">
            <DollarSign size={48} />
            <p>Revenue chart would be displayed here</p>
            <small>Integration with charting library needed</small>
          </div>
        </div>
      </div>
    </div>
  );

  const renderUsersTab = () => (
    <div className="reports-detail">
      <div className="stats-breakdown">
        <div className="breakdown-card">
          <h4>User Distribution by Role</h4>
          <div className="breakdown-list">
            <div className="breakdown-item">
              <span>Customers</span>
              <span className="count">{reportData.userStats.byRole?.customer || 0}</span>
            </div>
            <div className="breakdown-item">
              <span>Vendors</span>
              <span className="count">{reportData.userStats.byRole?.vendor || 0}</span>
            </div>
            <div className="breakdown-item">
              <span>Agents</span>
              <span className="count">{reportData.userStats.byRole?.agent || 0}</span>
            </div>
            <div className="breakdown-item">
              <span>Admins</span>
              <span className="count">{reportData.userStats.byRole?.admin || 0}</span>
            </div>
          </div>
        </div>

        <div className="breakdown-card">
          <h4>User Status</h4>
          <div className="breakdown-list">
            <div className="breakdown-item">
              <span>Active Users</span>
              <span className="count success">{reportData.userStats.active}</span>
            </div>
            <div className="breakdown-item">
              <span>Inactive Users</span>
              <span className="count danger">{reportData.userStats.total - reportData.userStats.active}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderProductsTab = () => (
    <div className="reports-detail">
      <div className="stats-breakdown">
        <div className="breakdown-card">
          <h4>Product Status</h4>
          <div className="breakdown-list">
            <div className="breakdown-item">
              <span>Active Products</span>
              <span className="count success">{reportData.productStats.active}</span>
            </div>
            <div className="breakdown-item">
              <span>Verified Products</span>
              <span className="count success">{reportData.productStats.verified}</span>
            </div>
            <div className="breakdown-item">
              <span>Pending Review</span>
              <span className="count warning">{reportData.productStats.pending}</span>
            </div>
          </div>
        </div>

        <div className="breakdown-card">
          <h4>Product Performance</h4>
          <div className="breakdown-list">
            <div className="breakdown-item">
              <span>Total Sales</span>
              <span className="count">{reportData.productStats.totalSales}</span>
            </div>
            <div className="breakdown-item">
              <span>Total Views</span>
              <span className="count">{reportData.productStats.totalViews}</span>
            </div>
            <div className="breakdown-item">
              <span>Average Conversion</span>
              <span className="count">
                {reportData.productStats.totalViews > 0
                  ? ((reportData.productStats.totalSales / reportData.productStats.totalViews) * 100).toFixed(1)
                  : 0}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderOrdersTab = () => (
    <div className="reports-detail">
      <div className="stats-breakdown">
        <div className="breakdown-card">
          <h4>Order Status</h4>
          <div className="breakdown-list">
            <div className="breakdown-item">
              <span>Completed Orders</span>
              <span className="count success">{reportData.orderStats.completed}</span>
            </div>
            <div className="breakdown-item">
              <span>Pending Orders</span>
              <span className="count warning">{reportData.orderStats.pending}</span>
            </div>
            <div className="breakdown-item">
              <span>Disputed Orders</span>
              <span className="count danger">{reportData.orderStats.disputed}</span>
            </div>
          </div>
        </div>

        <div className="breakdown-card">
          <h4>Order Verification</h4>
          <div className="breakdown-list">
            <div className="breakdown-item">
              <span>Verified Orders</span>
              <span className="count success">{reportData.orderStats.verified}</span>
            </div>
            <div className="breakdown-item">
              <span>Unverified Orders</span>
              <span className="count warning">{reportData.orderStats.total - reportData.orderStats.verified}</span>
            </div>
          </div>
        </div>

        <div className="breakdown-card">
          <h4>Revenue Breakdown</h4>
          <div className="breakdown-list">
            <div className="breakdown-item">
              <span>Total Revenue</span>
              <span className="count">GH₵{reportData.orderStats.totalRevenue?.toLocaleString()}</span>
            </div>
            <div className="breakdown-item">
              <span>Average Order Value</span>
              <span className="count">
                GH₵{reportData.orderStats.total > 0
                  ? (reportData.orderStats.totalRevenue / reportData.orderStats.total).toFixed(2)
                  : '0.00'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner-large"></div>
        <p>Loading reports...</p>
      </div>
    );
  }

  return (
    <div className="reports-container">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1>Reports & Analytics</h1>
          <p>Comprehensive platform performance insights</p>
        </div>
        <div className="header-actions">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="time-select"
          >
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 3 months</option>
            <option value="365">Last year</option>
          </select>
          <button
            className="btn-secondary"
            onClick={fetchReportData}
            disabled={loading}
          >
            <RefreshCw size={18} />
            Refresh
          </button>
        </div>
      </div>

      {/* Report Tabs */}
      <div className="report-tabs">
        <button
          className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          <BarChart3 size={18} />
          Overview
        </button>
        <button
          className={`tab-button ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          <Users size={18} />
          Users
        </button>
        <button
          className={`tab-button ${activeTab === 'products' ? 'active' : ''}`}
          onClick={() => setActiveTab('products')}
        >
          <Package size={18} />
          Products
        </button>
        <button
          className={`tab-button ${activeTab === 'orders' ? 'active' : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          <ShoppingBag size={18} />
          Orders
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === 'overview' && renderOverviewTab()}
        {activeTab === 'users' && renderUsersTab()}
        {activeTab === 'products' && renderProductsTab()}
        {activeTab === 'orders' && renderOrdersTab()}
      </div>

      {/* Export Actions */}
      <div className="export-section">
        <h4>Export Reports</h4>
        <div className="export-buttons">
          <button
            className="btn-export"
            onClick={() => exportReport('userStats')}
          >
            <Download size={16} />
            Export User Report
          </button>
          <button
            className="btn-export"
            onClick={() => exportReport('productStats')}
          >
            <Download size={16} />
            Export Product Report
          </button>
          <button
            className="btn-export"
            onClick={() => exportReport('orderStats')}
          >
            <Download size={16} />
            Export Order Report
          </button>
          <button
            className="btn-export"
            onClick={() => exportReport('vendorStats')}
          >
            <Download size={16} />
            Export Vendor Report
          </button>
        </div>
      </div>
    </div>
  );
}
'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useRouter } from 'next/navigation';
import { supabase } from '../../../../lib/supabase';
import {
  DollarSign,
  Search,
  Download,
  Send,
  Clock,
  CheckCircle,
  XCircle,
  Calendar,
  TrendingUp,
  CreditCard
} from 'lucide-react';
import '../../../styles/admin-vendors.css';

export default function VendorPayoutsPage() {
  const router = useRouter();
  const { user, profile, isAdmin, isSuperAdmin } = useAuth();
  const [payouts, setPayouts] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [stats, setStats] = useState({
    totalPending: 0,
    totalPaid: 0,
    totalPayouts: 0,
    pendingCount: 0
  });

  // Check permissions
  useEffect(() => {
    if (!isAdmin && !isSuperAdmin) {
      router.push('/admin');
    }
  }, [isAdmin, isSuperAdmin, router]);

  // Fetch data
  useEffect(() => {
    fetchVendors();
    fetchPayouts();
  }, [statusFilter]);

  const fetchVendors = async () => {
    try {
      const { data, error } = await supabase
        .from('vendors')
        .select('id, business_name, email, commission_rate')
        .eq('is_active', true);

      if (error) throw error;
      setVendors(data || []);
    } catch (error) {
      console.error('Error fetching vendors:', error);
    }
  };

  const fetchPayouts = async () => {
    try {
      setLoading(true);
      
      // For demo purposes, generating sample payout data
      // In production, you'd fetch from a payouts table
      const samplePayouts = vendors.map((vendor, index) => ({
        id: `payout-${vendor.id}`,
        vendor_id: vendor.id,
        vendor_name: vendor.business_name,
        vendor_email: vendor.email,
        amount: Math.floor(Math.random() * 5000) + 500,
        commission_amount: Math.floor(Math.random() * 500) + 50,
        period_start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        period_end: new Date(),
        status: index % 3 === 0 ? 'pending' : index % 3 === 1 ? 'paid' : 'processing',
        created_at: new Date(Date.now() - Math.random() * 15 * 24 * 60 * 60 * 1000),
        paid_at: index % 3 === 1 ? new Date() : null
      }));

      let filtered = samplePayouts;
      if (statusFilter !== 'all') {
        filtered = samplePayouts.filter(p => p.status === statusFilter);
      }

      setPayouts(filtered);

      // Calculate stats
      const totalPending = samplePayouts
        .filter(p => p.status === 'pending')
        .reduce((sum, p) => sum + p.amount, 0);
      const totalPaid = samplePayouts
        .filter(p => p.status === 'paid')
        .reduce((sum, p) => sum + p.amount, 0);
      const pendingCount = samplePayouts.filter(p => p.status === 'pending').length;

      setStats({
        totalPending,
        totalPaid,
        totalPayouts: samplePayouts.length,
        pendingCount
      });
    } catch (error) {
      console.error('Error fetching payouts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleProcessPayout = async (payoutId) => {
    if (!confirm('Process this payout? This will initiate the payment transfer.')) return;

    try {
      // In production, this would update the payout status in database
      alert('Payout processing initiated. Payment will be transferred within 24 hours.');
      fetchPayouts();
    } catch (error) {
      console.error('Error processing payout:', error);
      alert('Failed to process payout: ' + error.message);
    }
  };

  const handleMarkAsPaid = async (payoutId) => {
    if (!confirm('Mark this payout as paid?')) return;

    try {
      // In production, this would update the payout status
      alert('Payout marked as paid.');
      fetchPayouts();
    } catch (error) {
      console.error('Error marking payout:', error);
      alert('Failed to mark payout: ' + error.message);
    }
  };

  const filteredPayouts = payouts.filter(payout =>
    payout.vendor_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    payout.vendor_email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (date) => {
    if (!date) return '-';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner-large"></div>
        <p>Loading payouts...</p>
      </div>
    );
  }

  return (
    <div className="vendors-container">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1>Vendor Payouts</h1>
          <p>Manage commission payouts to vendors</p>
        </div>
        <div className="header-actions">
          <button className="btn-secondary">
            <Download size={18} />
            Export Report
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid-4">
        <div className="stat-card">
          <div className="stat-content">
            <p className="stat-label">Total Payouts</p>
            <h3 className="stat-value">{stats.totalPayouts}</h3>
          </div>
          <div className="stat-icon">
            <CreditCard size={24} />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-content">
            <p className="stat-label">Pending Amount</p>
            <h3 className="stat-value">{formatCurrency(stats.totalPending)}</h3>
            <span className="stat-change">{stats.pendingCount} payouts</span>
          </div>
          <div className="stat-icon warning">
            <Clock size={24} />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-content">
            <p className="stat-label">Paid This Month</p>
            <h3 className="stat-value">{formatCurrency(stats.totalPaid)}</h3>
          </div>
          <div className="stat-icon success">
            <CheckCircle size={24} />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-content">
            <p className="stat-label">Total Revenue</p>
            <h3 className="stat-value">{formatCurrency(stats.totalPending + stats.totalPaid)}</h3>
          </div>
          <div className="stat-icon">
            <TrendingUp size={24} />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="filters-bar">
        <div className="search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search by vendor name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="paid">Paid</option>
          </select>
        </div>
      </div>

      {/* Payouts Table */}
      <div className="data-card">
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Vendor</th>
                <th>Period</th>
                <th>Sales Amount</th>
                <th>Commission</th>
                <th>Payout Amount</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayouts.length === 0 ? (
                <tr>
                  <td colSpan="8" className="empty-state">
                    <DollarSign size={48} />
                    <p>No payouts found</p>
                  </td>
                </tr>
              ) : (
                filteredPayouts.map((payout) => (
                  <tr key={payout.id}>
                    <td>
                      <div className="vendor-info-compact">
                        <div className="vendor-name">{payout.vendor_name}</div>
                        <div className="vendor-email">{payout.vendor_email}</div>
                      </div>
                    </td>
                    <td>
                      <div className="period-info">
                        <small>{formatDate(payout.period_start)}</small>
                        <span> - </span>
                        <small>{formatDate(payout.period_end)}</small>
                      </div>
                    </td>
                    <td className="text-bold">{formatCurrency(payout.amount + payout.commission_amount)}</td>
                    <td className="text-muted">-{formatCurrency(payout.commission_amount)}</td>
                    <td className="payout-amount">{formatCurrency(payout.amount)}</td>
                    <td>
                      <span className={`badge ${payout.status === 'paid' ? 'success' : payout.status === 'processing' ? 'warning' : 'pending'}`}>
                        {payout.status}
                      </span>
                    </td>
                    <td>
                      {payout.paid_at ? (
                        <span className="date-paid">{formatDate(payout.paid_at)}</span>
                      ) : (
                        <span className="text-muted">-</span>
                      )}
                    </td>
                    <td>
                      <div className="action-buttons">
                        {payout.status === 'pending' && (
                          <button
                            className="btn-icon success"
                            title="Process Payout"
                            onClick={() => handleProcessPayout(payout.id)}
                          >
                            <Send size={16} />
                          </button>
                        )}
                        {payout.status === 'processing' && (
                          <button
                            className="btn-icon success"
                            title="Mark as Paid"
                            onClick={() => handleMarkAsPaid(payout.id)}
                          >
                            <CheckCircle size={16} />
                          </button>
                        )}
                        <button
                          className="btn-icon"
                          title="View Details"
                        >
                          <Download size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Info Card */}
      <div className="info-card">
        <h4>Payout Information</h4>
        <div className="info-grid">
          <div className="info-item">
            <strong>Payout Schedule:</strong>
            <p>Vendors are paid monthly on the 1st of each month for the previous month's sales.</p>
          </div>
          <div className="info-item">
            <strong>Processing Time:</strong>
            <p>Payouts typically process within 24-48 hours after initiation.</p>
          </div>
          <div className="info-item">
            <strong>Commission Rates:</strong>
            <p>Commission rates are set per vendor and deducted from gross sales before payout.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

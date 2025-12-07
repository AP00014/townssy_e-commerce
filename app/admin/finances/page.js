'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import { supabase } from '../../../lib/supabase';
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  CreditCard,
  Banknote,
  PiggyBank,
  Calendar,
  Download,
  Filter,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Clock,
  XCircle
} from 'lucide-react';
import '../../styles/admin-finances.css';

export default function FinancesPage() {
  const router = useRouter();
  const { user, profile, isSuperAdmin } = useAuth();
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [payouts, setPayouts] = useState([]);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalCommissions: 0,
    pendingPayouts: 0,
    completedPayouts: 0
  });
  const [filterPeriod, setFilterPeriod] = useState('30');
  const [transactionType, setTransactionType] = useState('all');

  // Check permissions
  useEffect(() => {
    if (!isSuperAdmin) {
      router.push('/admin');
    }
  }, [isSuperAdmin, router]);

  // Load financial data
  useEffect(() => {
    if (isSuperAdmin) {
      fetchFinancialData();
    }
  }, [isSuperAdmin, filterPeriod, transactionType]);

  const fetchFinancialData = async () => {
    try {
      setLoading(true);

      // Fetch transactions
      let transactionsQuery = supabase
        .from('transactions')
        .select('*')
        .order('created_at', { ascending: false });

      // Apply date filter
      if (filterPeriod !== 'all') {
        const days = parseInt(filterPeriod);
        const date = new Date();
        date.setDate(date.getDate() - days);
        transactionsQuery = transactionsQuery.gte('created_at', date.toISOString());
      }

      // Apply type filter
      if (transactionType !== 'all') {
        transactionsQuery = transactionsQuery.eq('transaction_type', transactionType);
      }

      const { data: transactionsData, error: transactionsError } = await transactionsQuery;
      if (transactionsError) throw transactionsError;

      // Fetch payouts
      const { data: payoutsData, error: payoutsError } = await supabase
        .from('vendor_payouts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      if (payoutsError) throw payoutsError;

      setTransactions(transactionsData || []);
      setPayouts(payoutsData || []);

      // Calculate stats
      const totalRevenue = transactionsData?.reduce((sum, t) => sum + (t.amount || 0), 0) || 0;
      const totalCommissions = transactionsData?.reduce((sum, t) => sum + (t.commission_amount || 0), 0) || 0;
      const pendingPayouts = payoutsData?.filter(p => p.status === 'pending').reduce((sum, p) => sum + (p.amount || 0), 0) || 0;
      const completedPayouts = payoutsData?.filter(p => p.status === 'completed').reduce((sum, p) => sum + (p.amount || 0), 0) || 0;

      setStats({
        totalRevenue,
        totalCommissions,
        pendingPayouts,
        completedPayouts
      });

    } catch (error) {
      console.error('Error fetching financial data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleProcessPayout = async (payoutId, action) => {
    try {
      const status = action === 'approve' ? 'completed' : 'failed';
      const { error } = await supabase
        .from('vendor_payouts')
        .update({
          status,
          processed_by: user.id,
          processed_at: new Date().toISOString()
        })
        .eq('id', payoutId);

      if (error) throw error;

      fetchFinancialData();
      alert(`Payout ${action}d successfully!`);
    } catch (error) {
      console.error('Error processing payout:', error);
      alert('Failed to process payout: ' + error.message);
    }
  };

  const exportData = (type) => {
    // Simple CSV export
    let data = [];
    let filename = '';

    if (type === 'transactions') {
      data = transactions.map(t => ({
        'Date': new Date(t.created_at).toLocaleDateString(),
        'Type': t.transaction_type,
        'Amount': t.amount,
        'Commission': t.commission_amount || 0,
        'Status': t.status
      }));
      filename = 'transactions.csv';
    } else if (type === 'payouts') {
      data = payouts.map(p => ({
        'Date': new Date(p.created_at).toLocaleDateString(),
        'Vendor': p.vendor_id,
        'Amount': p.amount,
        'Status': p.status,
        'Payment Method': p.payment_method || 'N/A'
      }));
      filename = 'payouts.csv';
    }

    const csv = [Object.keys(data[0]).join(','), ...data.map(row => Object.values(row).join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getTransactionIcon = (type) => {
    switch (type) {
      case 'order': return <CreditCard size={16} />;
      case 'commission': return <PiggyBank size={16} />;
      case 'payout': return <Banknote size={16} />;
      case 'refund': return <TrendingDown size={16} />;
      default: return <DollarSign size={16} />;
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      completed: { class: 'success', icon: CheckCircle },
      pending: { class: 'warning', icon: Clock },
      failed: { class: 'danger', icon: XCircle },
      processing: { class: 'info', icon: RefreshCw }
    };
    const config = statusConfig[status] || { class: 'secondary', icon: AlertCircle };
    const Icon = config.icon;

    return (
      <span className={`status-badge ${config.class}`}>
        <Icon size={12} />
        {status}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner-large"></div>
        <p>Loading financial data...</p>
      </div>
    );
  }

  return (
    <div className="finances-container">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1>Financial Management</h1>
          <p>Monitor revenue, commissions, and payout processing</p>
        </div>
        <div className="header-actions">
          <button
            className="btn-secondary"
            onClick={fetchFinancialData}
            disabled={loading}
          >
            <RefreshCw size={18} />
            Refresh
          </button>
        </div>
      </div>

      {/* Financial Stats */}
      <div className="stats-grid-4">
        <div className="stat-card gradient-green">
          <div className="stat-content">
            <p className="stat-label">Total Revenue</p>
            <h3 className="stat-value">GH₵{stats.totalRevenue.toLocaleString()}</h3>
            <span className="stat-change positive">+12.5% from last month</span>
          </div>
          <div className="stat-icon">
            <TrendingUp size={32} />
          </div>
        </div>

        <div className="stat-card gradient-blue">
          <div className="stat-content">
            <p className="stat-label">Platform Commissions</p>
            <h3 className="stat-value">GH₵{stats.totalCommissions.toLocaleString()}</h3>
            <span className="stat-change">8.5% of total revenue</span>
          </div>
          <div className="stat-icon">
            <PiggyBank size={32} />
          </div>
        </div>

        <div className="stat-card gradient-orange">
          <div className="stat-content">
            <p className="stat-label">Pending Payouts</p>
            <h3 className="stat-value">GH₵{stats.pendingPayouts.toLocaleString()}</h3>
            <span className="stat-change">Requires approval</span>
          </div>
          <div className="stat-icon warning">
            <Clock size={32} />
          </div>
        </div>

        <div className="stat-card gradient-purple">
          <div className="stat-content">
            <p className="stat-label">Completed Payouts</p>
            <h3 className="stat-value">GH₵{stats.completedPayouts.toLocaleString()}</h3>
            <span className="stat-change positive">This month</span>
          </div>
          <div className="stat-icon success">
            <CheckCircle size={32} />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="filters-bar">
        <div className="filter-group">
          <select
            value={filterPeriod}
            onChange={(e) => setFilterPeriod(e.target.value)}
            className="filter-select"
          >
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 3 months</option>
            <option value="365">Last year</option>
            <option value="all">All time</option>
          </select>

          <select
            value={transactionType}
            onChange={(e) => setTransactionType(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Types</option>
            <option value="order">Orders</option>
            <option value="commission">Commissions</option>
            <option value="payout">Payouts</option>
            <option value="refund">Refunds</option>
          </select>
        </div>

        <div className="export-actions">
          <button
            className="btn-export"
            onClick={() => exportData('transactions')}
          >
            <Download size={16} />
            Export Transactions
          </button>
          <button
            className="btn-export"
            onClick={() => exportData('payouts')}
          >
            <Download size={16} />
            Export Payouts
          </button>
        </div>
      </div>

      <div className="finances-grid">
        {/* Recent Transactions */}
        <div className="data-card">
          <div className="card-header">
            <h3>Recent Transactions</h3>
          </div>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Commission</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="empty-state">
                      <DollarSign size={48} />
                      <p>No transactions found</p>
                    </td>
                  </tr>
                ) : (
                  transactions.slice(0, 10).map((transaction) => (
                    <tr key={transaction.id}>
                      <td>
                        <div className="transaction-type">
                          {getTransactionIcon(transaction.transaction_type)}
                          <span className="capitalize">{transaction.transaction_type}</span>
                        </div>
                      </td>
                      <td className="amount-cell">
                        GH₵{transaction.amount?.toFixed(2)}
                      </td>
                      <td className="amount-cell">
                        {transaction.commission_amount ? `GH₵${transaction.commission_amount.toFixed(2)}` : '-'}
                      </td>
                      <td>
                        {new Date(transaction.created_at).toLocaleDateString()}
                      </td>
                      <td>
                        {getStatusBadge(transaction.status)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pending Payouts */}
        <div className="data-card">
          <div className="card-header">
            <h3>Pending Payouts</h3>
          </div>
          <div className="payouts-list">
            {payouts.filter(p => p.status === 'pending').length === 0 ? (
              <div className="empty-state">
                <CheckCircle size={48} />
                <p>No pending payouts</p>
              </div>
            ) : (
              payouts
                .filter(p => p.status === 'pending')
                .slice(0, 5)
                .map((payout) => (
                  <div key={payout.id} className="payout-item">
                    <div className="payout-info">
                      <div className="payout-vendor">Vendor #{payout.vendor_id}</div>
                      <div className="payout-amount">GH₵{payout.amount?.toFixed(2)}</div>
                      <div className="payout-date">
                        Requested: {new Date(payout.created_at).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="payout-actions">
                      <button
                        className="btn-approve"
                        onClick={() => handleProcessPayout(payout.id, 'approve')}
                      >
                        <CheckCircle size={16} />
                        Approve
                      </button>
                      <button
                        className="btn-reject"
                        onClick={() => handleProcessPayout(payout.id, 'reject')}
                      >
                        <XCircle size={16} />
                        Reject
                      </button>
                    </div>
                  </div>
                ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
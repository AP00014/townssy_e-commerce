'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useRouter } from 'next/navigation';
import { supabase } from '../../../../lib/supabase';
import {
  FileText,
  Search,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Mail,
  Phone,
  Calendar,
  Building
} from 'lucide-react';
import '../../../styles/admin-vendors.css';

export default function VendorApplicationsPage() {
  const router = useRouter();
  const { user, profile, isAdmin, isSuperAdmin } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('pending');
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0
  });

  // Check permissions
  useEffect(() => {
    if (!isAdmin && !isSuperAdmin) {
      router.push('/admin');
    }
  }, [isAdmin, isSuperAdmin, router]);

  // Fetch applications
  useEffect(() => {
    fetchApplications();
  }, [statusFilter]);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('vendors')
        .select('*')
        .order('created_at', { ascending: false });

      // Apply filter
      if (statusFilter !== 'all') {
        query = query.eq('verification_status', statusFilter);
      }

      const { data, error } = await query;

      if (error) throw error;

      setApplications(data || []);

      // Calculate stats
      const allApps = data || [];
      setStats({
        total: allApps.length,
        pending: allApps.filter(a => a.verification_status === 'pending').length,
        approved: allApps.filter(a => a.verification_status === 'verified').length,
        rejected: allApps.filter(a => a.verification_status === 'rejected').length
      });
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApproveApplication = async (vendorId) => {
    if (!confirm('Approve this vendor application?')) return;

    try {
      const { error } = await supabase
        .from('vendors')
        .update({
          verification_status: 'verified',
          verification_notes: 'Application approved by admin',
          is_active: true
        })
        .eq('id', vendorId);

      if (error) throw error;

      fetchApplications();
      alert('Application approved successfully!');
    } catch (error) {
      console.error('Error approving application:', error);
      alert('Failed to approve application: ' + error.message);
    }
  };

  const handleRejectApplication = async (vendorId) => {
    const reason = prompt('Enter rejection reason:');
    if (!reason) return;

    try {
      const { error } = await supabase
        .from('vendors')
        .update({
          verification_status: 'rejected',
          verification_notes: `Rejected: ${reason}`
        })
        .eq('id', vendorId);

      if (error) throw error;

      fetchApplications();
      alert('Application rejected.');
    } catch (error) {
      console.error('Error rejecting application:', error);
      alert('Failed to reject application: ' + error.message);
    }
  };

  const filteredApplications = applications.filter(app =>
    app.business_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner-large"></div>
        <p>Loading applications...</p>
      </div>
    );
  }

  return (
    <div className="vendors-container">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1>Vendor Applications</h1>
          <p>Review and manage vendor registration applications</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid-4">
        <div className="stat-card">
          <div className="stat-content">
            <p className="stat-label">Total Applications</p>
            <h3 className="stat-value">{stats.total}</h3>
          </div>
          <div className="stat-icon">
            <FileText size={24} />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-content">
            <p className="stat-label">Pending Review</p>
            <h3 className="stat-value">{stats.pending}</h3>
          </div>
          <div className="stat-icon warning">
            <Clock size={24} />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-content">
            <p className="stat-label">Approved</p>
            <h3 className="stat-value">{stats.approved}</h3>
          </div>
          <div className="stat-icon success">
            <CheckCircle size={24} />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-content">
            <p className="stat-label">Rejected</p>
            <h3 className="stat-value">{stats.rejected}</h3>
          </div>
          <div className="stat-icon danger">
            <XCircle size={24} />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="filters-bar">
        <div className="search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search applications..."
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
            <option value="verified">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Applications List */}
      <div className="applications-grid">
        {filteredApplications.length === 0 ? (
          <div className="empty-state-card">
            <FileText size={64} />
            <h3>No applications found</h3>
            <p>There are no vendor applications matching your filters.</p>
          </div>
        ) : (
          filteredApplications.map((application) => (
            <div key={application.id} className="application-card">
              <div className="application-header">
                <div className="application-title">
                  <Building size={20} />
                  <h3>{application.business_name}</h3>
                </div>
                <span className={`badge ${application.verification_status}`}>
                  {application.verification_status}
                </span>
              </div>

              <div className="application-details">
                <div className="detail-row">
                  <span className="detail-label">Business Type:</span>
                  <span className="detail-value">{application.business_type || '-'}</span>
                </div>

                {application.email && (
                  <div className="detail-row">
                    <Mail size={16} />
                    <span className="detail-value">{application.email}</span>
                  </div>
                )}

                {application.phone_number && (
                  <div className="detail-row">
                    <Phone size={16} />
                    <span className="detail-value">{application.phone_number}</span>
                  </div>
                )}

                <div className="detail-row">
                  <Calendar size={16} />
                  <span className="detail-value">Applied: {formatDate(application.created_at)}</span>
                </div>

                {application.business_description && (
                  <div className="detail-description">
                    <p>{application.business_description}</p>
                  </div>
                )}

                {application.verification_notes && (
                  <div className="verification-notes">
                    <strong>Notes:</strong> {application.verification_notes}
                  </div>
                )}
              </div>

              <div className="application-actions">
                <button
                  className="btn-secondary-sm"
                  onClick={() => router.push(`/admin/vendors/${application.id}/edit`)}
                >
                  <Eye size={16} />
                  View Details
                </button>

                {application.verification_status === 'pending' && (
                  <>
                    <button
                      className="btn-success-sm"
                      onClick={() => handleApproveApplication(application.id)}
                    >
                      <CheckCircle size={16} />
                      Approve
                    </button>
                    <button
                      className="btn-danger-sm"
                      onClick={() => handleRejectApplication(application.id)}
                    >
                      <XCircle size={16} />
                      Reject
                    </button>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

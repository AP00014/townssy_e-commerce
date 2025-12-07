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
  Building,
  User
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
        .from('vendor_applications')
        .select('*')
        .order('created_at', { ascending: false });

      // Apply filter
      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
      }

      const { data, error } = await query;

      if (error) throw error;

      setApplications(data || []);

      // Calculate stats
      const allApps = data || [];
      setStats({
        total: allApps.length,
        pending: allApps.filter(a => a.status === 'pending').length,
        approved: allApps.filter(a => a.status === 'approved').length,
        rejected: allApps.filter(a => a.status === 'rejected').length
      });
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApproveApplication = async (application) => {
    if (!confirm(`Approve application for ${application.business_name}? This will create a vendor account and update the user's role.`)) return;

    try {
      setLoading(true);

      // 1. Create entry in vendors table
      const vendorData = {
        user_id: application.user_id,
        business_name: application.business_name,
        business_type: application.business_type,
        email: application.email,
        phone_number: application.phone,
        business_address: application.business_address,
        description: application.description,
        registration_number: application.registration_number,
        tax_id: application.tax_id,
        website_url: application.website,
        social_media: application.social_media,
        verification_documents: application.documents,
        verification_status: 'verified',
        is_active: true,
        company_profile: application.description, // Default profile text
        verification_notes: 'Automatically created from approved application',
        verified_by: user.id,
        verified_at: new Date().toISOString()
      };

      const { data: vendor, error: vendorError } = await supabase
        .from('vendors')
        .insert([vendorData])
        .select()
        .single();

      if (vendorError) throw vendorError;

      // 2. Update user role to 'vendor'
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ role: 'vendor' })
        .eq('id', application.user_id);

      if (profileError) {
        console.error("Error updating profile role:", profileError);
        alert("Vendor created, but failed to update user role. Please update manually.");
      }

      // 3. Update application status to approved
      const { error: appError } = await supabase
        .from('vendor_applications')
        .update({ 
          status: 'approved',
          reviewed_by: user.id,
          reviewed_at: new Date().toISOString()
        })
        .eq('id', application.id);

      if (appError) throw appError;

      fetchApplications();
      alert('Application approved and vendor account created successfully!');
    } catch (error) {
      console.error('Error approving application:', error);
      alert('Failed to approve application: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRejectApplication = async (applicationId) => {
    const reason = prompt('Enter rejection reason:');
    if (!reason) return;

    try {
      setLoading(true);
      const { error } = await supabase
        .from('vendor_applications')
        .update({
          status: 'rejected',
          rejection_reason: reason,
          reviewed_by: user.id,
          reviewed_at: new Date().toISOString()
        })
        .eq('id', applicationId);

      if (error) throw error;

      fetchApplications();
      alert('Application rejected.');
    } catch (error) {
      console.error('Error rejecting application:', error);
      alert('Failed to reject application: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredApplications = applications.filter(app =>
    app.business_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
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

  if (loading && applications.length === 0) {
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
            <option value="approved">Approved</option>
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
                <span className={`badge ${application.status === 'approved' ? 'verified' : application.status}`}>
                  {application.status}
                </span>
              </div>

              <div className="application-details">
                <div className="detail-row">
                  <span className="detail-label">Business Type:</span>
                  <span className="detail-value">{application.business_type || '-'}</span>
                </div>

                <div className="detail-row">
                  <span className="detail-label">Contact:</span>
                  <span className="detail-value">{application.contact_name}</span>
                </div>

                {application.email && (
                  <div className="detail-row">
                    <Mail size={16} />
                    <span className="detail-value">{application.email}</span>
                  </div>
                )}

                {application.phone && (
                  <div className="detail-row">
                    <Phone size={16} />
                    <span className="detail-value">{application.phone}</span>
                  </div>
                )}

                <div className="detail-row">
                  <Calendar size={16} />
                  <span className="detail-value">Applied: {formatDate(application.created_at)}</span>
                </div>

                {application.description && (
                  <div className="detail-description">
                    <p>{application.description}</p>
                  </div>
                )}

                {application.documents && Object.keys(application.documents).length > 0 && (
                   <div className="documents-preview">
                     <strong>Documents:</strong>
                     <div className="document-links">
                       {Object.entries(application.documents).map(([key, file]) => (
                         file && (
                           <a key={key} href={file.url} target="_blank" rel="noopener noreferrer" className="document-link">
                             <FileText size={14} />
                             {key.replace(/([A-Z])/g, ' $1').trim()}
                           </a>
                         )
                       ))}
                     </div>
                   </div>
                )}
              </div>

              <div className="application-actions">
                {application.status === 'pending' && (
                  <>
                    <button
                      className="btn-success-sm"
                      onClick={() => handleApproveApplication(application)}
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
                 {application.status !== 'pending' && (
                    <div className="status-message">
                        {application.status === 'approved' ? (
                            <span className="text-success">Processed by Admin</span>
                        ) : (
                            <span className="text-danger">Rejected: {application.rejection_reason}</span>
                        )}
                    </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

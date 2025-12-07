'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import { supabase } from '../../../lib/supabase';
import {
  Store,
  Search,
  Plus,
  Edit,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Ban,
  Mail,
  Phone,
  MapPin,
  DollarSign
} from 'lucide-react';
import '../../styles/admin-vendors.css';

export default function VendorsListPage() {
  const router = useRouter();
  const { user, profile, isAdmin, isSuperAdmin, isModerator } = useAuth();
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    verified: 0,
    rejected: 0,
    active: 0
  });

  // Check permissions
  useEffect(() => {
    if (!isAdmin && !isSuperAdmin && !isModerator) {
      router.push('/admin');
    }
  }, [isAdmin, isSuperAdmin, isModerator, router]);

  // Fetch vendors
  useEffect(() => {
    fetchVendors();
  }, [statusFilter, typeFilter]);

  const fetchVendors = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('vendors')
        .select('*')
        .order('created_at', { ascending: false });

      // Apply filters
      if (statusFilter !== 'all') {
        query = query.eq('verification_status', statusFilter);
      }

      if (typeFilter !== 'all') {
        query = query.eq('business_type', typeFilter);
      }

      const { data, error } = await query;

      if (error) throw error;

      setVendors(data || []);

      // Calculate stats
      const allVendors = data || [];
      const total = allVendors.length;
      const pending = allVendors.filter(v => v.verification_status === 'pending').length;
      const verified = allVendors.filter(v => v.verification_status === 'verified').length;
      const rejected = allVendors.filter(v => v.verification_status === 'rejected').length;
      const active = allVendors.filter(v => v.is_active).length;

      setStats({ total, pending, verified, rejected, active });
    } catch (error) {
      console.error('Error fetching vendors:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyVendor = async (vendorId, status) => {
    try {
      const { error } = await supabase
        .from('vendors')
        .update({
          verification_status: status,
          verification_notes: `${status === 'verified' ? 'Verified' : 'Rejected'} by admin`
        })
        .eq('id', vendorId);

      if (error) throw error;

      fetchVendors();
      alert(`Vendor ${status} successfully!`);
    } catch (error) {
      console.error('Error verifying vendor:', error);
      alert('Failed to verify vendor: ' + error.message);
    }
  };

  const handleToggleActive = async (vendorId, currentStatus) => {
    try {
      const { error } = await supabase
        .from('vendors')
        .update({ is_active: !currentStatus })
        .eq('id', vendorId);

      if (error) throw error;

      fetchVendors();
    } catch (error) {
      console.error('Error updating vendor status:', error);
      alert('Failed to update vendor status: ' + error.message);
    }
  };

  const filteredVendors = vendors.filter(vendor =>
    vendor.business_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    vendor.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner-large"></div>
        <p>Loading vendors...</p>
      </div>
    );
  }

  return (
    <div className="vendors-container">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1>Vendor Management</h1>
          <p>Manage all vendors and their verification status</p>
        </div>
        <div className="header-actions">
          <button
            className="btn-primary"
            onClick={() => router.push('/admin/vendors/create')}
          >
            <Plus size={18} />
            Add Vendor
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid-5">
        <div className="stat-card">
          <div className="stat-content">
            <p className="stat-label">Total Vendors</p>
            <h3 className="stat-value">{stats.total}</h3>
          </div>
          <div className="stat-icon">
            <Store size={24} />
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
            <p className="stat-label">Verified</p>
            <h3 className="stat-value">{stats.verified}</h3>
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

        <div className="stat-card">
          <div className="stat-content">
            <p className="stat-label">Active</p>
            <h3 className="stat-value">{stats.active}</h3>
            <span className="stat-change">{stats.total - stats.active} inactive</span>
          </div>
          <div className="stat-icon success">
            <CheckCircle size={24} />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="filters-bar">
        <div className="search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search vendors by name or email..."
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
            <option value="verified">Verified</option>
            <option value="rejected">Rejected</option>
          </select>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Types</option>
            <option value="Manufacturer">Manufacturer</option>
            <option value="Wholesaler">Wholesaler</option>
            <option value="Retailer">Retailer</option>
            <option value="Distributor">Distributor</option>
          </select>
        </div>
      </div>

      {/* Vendors Table */}
      <div className="data-card">
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Business</th>
                <th>Type</th>
                <th>Contact</th>
                <th>Commission</th>
                <th>Status</th>
                <th>Verification</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredVendors.length === 0 ? (
                <tr>
                  <td colSpan="7" className="empty-state">
                    <Store size={48} />
                    <p>No vendors found</p>
                  </td>
                </tr>
              ) : (
                filteredVendors.map((vendor) => (
                  <tr key={vendor.id}>
                    <td>
                      <div className="vendor-info">
                        <div className="vendor-avatar">
                          <Store size={20} />
                        </div>
                        <div>
                          <div className="vendor-name">{vendor.business_name}</div>
                          <div className="vendor-meta">
                            {vendor.business_address && (
                              <span className="meta-item">
                                <MapPin size={12} />
                                {vendor.business_address.split(',')[0]}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="type-badge">{vendor.business_type}</span>
                    </td>
                    <td>
                      <div className="contact-info">
                        {vendor.email && (
                          <div className="contact-item">
                            <Mail size={14} />
                            <span>{vendor.email}</span>
                          </div>
                        )}
                        {vendor.phone_number && (
                          <div className="contact-item">
                            <Phone size={14} />
                            <span>{vendor.phone_number}</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="text-bold">
                      {vendor.commission_rate ? `${vendor.commission_rate}%` : '-'}
                    </td>
                    <td>
                      <span className={`badge ${vendor.is_active ? 'success' : 'inactive'}`}>
                        {vendor.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${vendor.verification_status}`}>
                        {vendor.verification_status}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="btn-icon"
                          title="View"
                          onClick={() => router.push(`/admin/vendors/${vendor.id}`)}
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          className="btn-icon"
                          title="Edit"
                          onClick={() => router.push(`/admin/vendors/${vendor.id}/edit`)}
                        >
                          <Edit size={16} />
                        </button>
                        {vendor.verification_status === 'pending' && (
                          <>
                            <button
                              className="btn-icon success"
                              title="Verify"
                              onClick={() => handleVerifyVendor(vendor.id, 'verified')}
                            >
                              <CheckCircle size={16} />
                            </button>
                            <button
                              className="btn-icon danger"
                              title="Reject"
                              onClick={() => handleVerifyVendor(vendor.id, 'rejected')}
                            >
                              <XCircle size={16} />
                            </button>
                          </>
                        )}
                        <button
                          className={`btn-icon ${vendor.is_active ? 'danger' : 'success'}`}
                          title={vendor.is_active ? 'Deactivate' : 'Activate'}
                          onClick={() => handleToggleActive(vendor.id, vendor.is_active)}
                        >
                          <Ban size={16} />
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
    </div>
  );
}

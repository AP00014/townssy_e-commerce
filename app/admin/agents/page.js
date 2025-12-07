'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import { supabase } from '../../../lib/supabase';
import {
  Users,
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
  Briefcase,
  FileText
} from 'lucide-react';
import '../../styles/admin-agents.css';

export default function AgentsListPage() {
  const router = useRouter();
  const { user, profile, isAdmin, isSuperAdmin, isModerator } = useAuth();
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    inactive: 0,
    verified: 0,
    pending: 0
  });

  // Check permissions
  useEffect(() => {
    if (!isAdmin && !isSuperAdmin && !isModerator) {
      router.push('/admin');
    }
  }, [isAdmin, isSuperAdmin, isModerator, router]);

  // Fetch agents
  useEffect(() => {
    fetchAgents();
  }, [statusFilter, typeFilter]);

  const fetchAgents = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('agents')
        .select('*')
        .order('created_at', { ascending: false });

      // Apply filters
      if (statusFilter === 'active') {
        query = query.eq('is_active', true);
      } else if (statusFilter === 'inactive') {
        query = query.eq('is_active', false);
      }

      if (typeFilter !== 'all') {
        query = query.eq('agent_type', typeFilter);
      }

      const { data, error } = await query;

      if (error) throw error;

      setAgents(data || []);

      // Calculate stats
      const allAgents = data || [];
      const total = allAgents.length;
      const active = allAgents.filter(a => a.is_active).length;
      const inactive = total - active;
      const verified = allAgents.filter(a => a.verification_status === 'verified').length;
      const pending = allAgents.filter(a => a.verification_status === 'pending').length;

      setStats({ total, active, inactive, verified, pending });
    } catch (error) {
      console.error('Error fetching agents:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleActive = async (agentId, currentStatus) => {
    try {
      const { error } = await supabase
        .from('agents')
        .update({ is_active: !currentStatus })
        .eq('id', agentId);

      if (error) throw error;

      fetchAgents();
    } catch (error) {
      console.error('Error updating agent status:', error);
      alert('Failed to update agent status: ' + error.message);
    }
  };

  const handleVerifyAgent = async (agentId, status) => {
    try {
      const { error } = await supabase
        .from('agents')
        .update({
          verification_status: status,
          verification_notes: `${status === 'verified' ? 'Verified' : 'Rejected'} by admin`
        })
        .eq('id', agentId);

      if (error) throw error;

      fetchAgents();
      alert(`Agent ${status} successfully!`);
    } catch (error) {
      console.error('Error verifying agent:', error);
      alert('Failed to verify agent: ' + error.message);
    }
  };

  const filteredAgents = agents.filter(agent =>
    agent.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    agent.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    agent.phone?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner-large"></div>
        <p>Loading agents...</p>
      </div>
    );
  }

  return (
    <div className="agents-container">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1>Agent Management</h1>
          <p>Manage delivery and sales agents</p>
        </div>
        <div className="header-actions">
          <button
            className="btn-primary"
            onClick={() => router.push('/admin/agents/create')}
          >
            <Plus size={18} />
            Add Agent
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid-5">
        <div className="stat-card">
          <div className="stat-content">
            <p className="stat-label">Total Agents</p>
            <h3 className="stat-value">{stats.total}</h3>
          </div>
          <div className="stat-icon">
            <Users size={24} />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-content">
            <p className="stat-label">Active</p>
            <h3 className="stat-value">{stats.active}</h3>
          </div>
          <div className="stat-icon success">
            <CheckCircle size={24} />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-content">
            <p className="stat-label">Inactive</p>
            <h3 className="stat-value">{stats.inactive}</h3>
          </div>
          <div className="stat-icon danger">
            <Ban size={24} />
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
            <p className="stat-label">Pending</p>
            <h3 className="stat-value">{stats.pending}</h3>
          </div>
          <div className="stat-icon warning">
            <Clock size={24} />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="filters-bar">
        <div className="search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search agents by name, email, or phone..."
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
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Types</option>
            <option value="delivery">Delivery Agent</option>
            <option value="sales">Sales Agent</option>
            <option value="support">Support Agent</option>
          </select>
        </div>
      </div>

      {/* Agents Table */}
      <div className="data-card">
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Agent</th>
                <th>Type</th>
                <th>Contact</th>
                <th>Documents</th>
                <th>Location</th>
                <th>Status</th>
                <th>Verification</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAgents.length === 0 ? (
                <tr>
                  <td colSpan="8" className="empty-state">
                    <Users size={48} />
                    <p>No agents found</p>
                  </td>
                </tr>
              ) : (
                filteredAgents.map((agent) => (
                  <tr key={agent.id}>
                    <td>
                      <div className="agent-info">
                        <div className="agent-avatar">
                          <Users size={20} />
                        </div>
                        <div>
                          <div className="agent-name">{agent.full_name || 'N/A'}</div>
                          <div className="agent-meta">
                            ID: {agent.agent_code || agent.id?.substring(0, 8)}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="type-badge">
                        {agent.agent_type || 'Not Set'}
                      </span>
                    </td>
                    <td>
                      <div className="contact-info">
                        {agent.email && (
                          <div className="contact-item">
                            <Mail size={14} />
                            <span>{agent.email}</span>
                          </div>
                        )}
                        {agent.phone && (
                          <div className="contact-item">
                            <Phone size={14} />
                            <span>{agent.phone}</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td>
                      {agent.documents && Object.keys(agent.documents).length > 0 ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          {Object.entries(agent.documents).map(([key, value]) => (
                            value?.url && (
                              <a
                                key={key}
                                href={value.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                  padding: '4px 8px',
                                  background: '#f3f4f6',
                                  borderRadius: '4px',
                                  fontSize: '11px',
                                  textDecoration: 'none',
                                  color: '#374151',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '4px',
                                  width: 'fit-content'
                                }}
                                title={`View ${key}`}
                              >
                                <FileText size={12} />
                                {key.replace(/([A-Z])/g, ' $1').trim()}
                              </a>
                            )
                          ))}
                        </div>
                      ) : (
                        <span style={{ color: '#9ca3af', fontSize: '12px' }}>No documents</span>
                      )}
                    </td>
                    <td>
                      {agent.assigned_location ? (
                        <div className="location-info">
                          <MapPin size={14} />
                          <span>{agent.assigned_location}</span>
                        </div>
                      ) : (
                        <span className="text-muted">-</span>
                      )}
                    </td>
                    <td>
                      <span className={`badge ${agent.is_active ? 'success' : 'inactive'}`}>
                        {agent.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${agent.verification_status || 'pending'}`}>
                        {agent.verification_status || 'pending'}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="btn-icon"
                          title="View"
                          onClick={() => router.push(`/admin/agents/${agent.id}`)}
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          className="btn-icon"
                          title="Edit"
                          onClick={() => router.push(`/admin/agents/${agent.id}/edit`)}
                        >
                          <Edit size={16} />
                        </button>
                        {agent.verification_status === 'pending' && (
                          <>
                            <button
                              className="btn-icon success"
                              title="Verify"
                              onClick={() => handleVerifyAgent(agent.id, 'verified')}
                            >
                              <CheckCircle size={16} />
                            </button>
                            <button
                              className="btn-icon danger"
                              title="Reject"
                              onClick={() => handleVerifyAgent(agent.id, 'rejected')}
                            >
                              <XCircle size={16} />
                            </button>
                          </>
                        )}
                        <button
                          className={`btn-icon ${agent.is_active ? 'danger' : 'success'}`}
                          title={agent.is_active ? 'Deactivate' : 'Activate'}
                          onClick={() => handleToggleActive(agent.id, agent.is_active)}
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

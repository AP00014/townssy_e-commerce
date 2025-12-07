"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase";
import {
  Users,
  Search,
  Eye,
  Ban,
  CheckCircle,
  XCircle,
  Mail,
  Phone,
  Calendar,
  Shield,
  User,
  AlertTriangle,
} from "lucide-react";
import "../../styles/admin-users.css";

export default function UsersListPage() {
  const router = useRouter();
  const { user, profile, isAdmin, isSuperAdmin, isModerator } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    banned: 0,
    newToday: 0,
  });

  // Check permissions
  useEffect(() => {
    if (!isAdmin && !isSuperAdmin && !isModerator) {
      router.push("/admin");
    }
  }, [isAdmin, isSuperAdmin, isModerator, router]);

  // Fetch users
  useEffect(() => {
    fetchUsers();
  }, [roleFilter, statusFilter]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });

      // Apply filters
      if (roleFilter !== "all") {
        query = query.eq("role", roleFilter);
      }

      if (statusFilter !== "all") {
        query = query.eq("is_active", statusFilter === "active");
      }

      const { data, error } = await query;

      if (error) throw error;

      setUsers(data || []);

      // Calculate stats
      const allUsers = data || [];
      const total = allUsers.length;
      const active = allUsers.filter((u) => u.is_active).length;
      const banned = allUsers.filter((u) => !u.is_active).length;
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const newToday = allUsers.filter(
        (u) => new Date(u.created_at) >= today
      ).length;

      setStats({ total, active, banned, newToday });
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleActive = async (userId, currentStatus) => {
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ is_active: !currentStatus })
        .eq("id", userId);

      if (error) throw error;

      fetchUsers();
      alert(`User ${!currentStatus ? "activated" : "banned"} successfully!`);
    } catch (error) {
      console.error("Error updating user status:", error);
      alert("Failed to update user status: " + error.message);
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.username?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getRoleBadge = (role) => {
    const roleConfig = {
      super_admin: { label: "Super Admin", class: "super-admin" },
      admin: { label: "Admin", class: "admin" },
      moderator: { label: "Moderator", class: "moderator" },
      vendor: { label: "Vendor", class: "vendor" },
      agent: { label: "Agent", class: "agent" },
      user: { label: "Customer", class: "customer" },
    };
    return roleConfig[role] || { label: role, class: "customer" };
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner-large"></div>
        <p>Loading users...</p>
      </div>
    );
  }

  return (
    <div className="users-container">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1>User Management</h1>
          <p>Manage all platform users and their access</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid-4">
        <div className="stat-card">
          <div className="stat-content">
            <p className="stat-label">Total Users</p>
            <h3 className="stat-value">{stats.total}</h3>
          </div>
          <div className="stat-icon">
            <Users size={24} />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-content">
            <p className="stat-label">Active Users</p>
            <h3 className="stat-value">{stats.active}</h3>
          </div>
          <div className="stat-icon success">
            <CheckCircle size={24} />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-content">
            <p className="stat-label">Banned Users</p>
            <h3 className="stat-value">{stats.banned}</h3>
          </div>
          <div className="stat-icon danger">
            <XCircle size={24} />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-content">
            <p className="stat-label">New Today</p>
            <h3 className="stat-value">{stats.newToday}</h3>
          </div>
          <div className="stat-icon info">
            <Calendar size={24} />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="filters-bar">
        <div className="search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search by name, email, or username..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Roles</option>
            <option value="user">Customer</option>
            <option value="vendor">Vendor</option>
            <option value="agent">Agent</option>
            <option value="moderator">Moderator</option>
            <option value="admin">Admin</option>
            <option value="super_admin">Super Admin</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="banned">Banned</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="data-card">
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Contact</th>
                <th>Role</th>
                <th>Status</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="6" className="empty-state">
                    <Users size={48} />
                    <p>No users found</p>
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => {
                  const roleInfo = getRoleBadge(user.role);
                  return (
                    <tr key={user.id}>
                      <td>
                        <div className="user-info">
                          <div className="user-avatar">
                            {user.avatar_url ? (
                              <img src={user.avatar_url} alt="User" />
                            ) : (
                              <User size={20} />
                            )}
                          </div>
                          <div>
                            <div className="user-name">
                              {user.full_name ||
                                user.username ||
                                "Unnamed User"}
                            </div>
                            <div className="user-meta">
                              @{user.username || user.email?.split("@")[0]}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="contact-info">
                          <div className="contact-item">
                            <Mail size={14} />
                            <span>{user.email}</span>
                          </div>
                          {user.phone && (
                            <div className="contact-item">
                              <Phone size={14} />
                              <span>{user.phone}</span>
                            </div>
                          )}
                        </div>
                      </td>
                      <td>
                        <span className={`badge ${roleInfo.class}`}>
                          {roleInfo.label}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`badge ${
                            user.is_active ? "success" : "danger"
                          }`}
                        >
                          {user.is_active ? "Active" : "Banned"}
                        </span>
                      </td>
                      <td className="text-muted">
                        {new Date(user.created_at).toLocaleDateString()}
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button
                            className="btn-icon"
                            title="View Details"
                            onClick={() =>
                              router.push(`/admin/users/${user.id}`)
                            }
                          >
                            <Eye size={16} />
                          </button>
                          {isSuperAdmin && (
                            <button
                              className={`btn-icon ${
                                user.is_active ? "danger" : "success"
                              }`}
                              title={user.is_active ? "Ban User" : "Unban User"}
                              onClick={() =>
                                handleToggleActive(user.id, user.is_active)
                              }
                            >
                              {user.is_active ? (
                                <Ban size={16} />
                              ) : (
                                <CheckCircle size={16} />
                              )}
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

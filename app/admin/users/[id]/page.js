"use client";



import { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "../../../../lib/supabase";
import {
  User,
  Mail,
  Phone,
  Calendar,
  Shield,
  Ban,
  CheckCircle,
  ArrowLeft,
  ShoppingBag,
  DollarSign,
  MapPin,
  AlertTriangle,
} from "lucide-react";
import "../../../styles/admin-users.css";

export default function UserDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const {
    user: currentUser,
    profile: currentProfile,
    isAdmin,
    isSuperAdmin,
    isModerator,
  } = useAuth();
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalSpent: 0,
  });

  // Check permissions
  useEffect(() => {
    if (!isAdmin && !isSuperAdmin && !isModerator) {
      router.push("/admin");
    }
  }, [isAdmin, isSuperAdmin, isModerator, router]);

  // Fetch user details
  useEffect(() => {
    if (params.id) {
      fetchUserDetails();
    }
  }, [params.id]);

  const fetchUserDetails = async () => {
    try {
      setLoading(true);

      // Fetch user profile
      const { data: userData, error: userError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", params.id)
        .single();

      if (userError) throw userError;
      setUser(userData);

      // Fetch user's orders
      const { data: ordersData, error: ordersError } = await supabase
        .from("orders")
        .select("*")
        .eq("buyer_id", params.id)
        .order("created_at", { ascending: false })
        .limit(10);

      if (ordersError) {
        console.error("Error fetching orders:", ordersError);
      } else {
        setOrders(ordersData || []);

        // Calculate stats
        const totalOrders = ordersData?.length || 0;
        const totalSpent =
          ordersData?.reduce(
            (sum, order) => sum + (order.total_amount || 0),
            0
          ) || 0;

        setStats({ totalOrders, totalSpent });
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
      alert("Failed to load user details: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleActive = async () => {
    if (!isSuperAdmin) return;

    try {
      const { error } = await supabase
        .from("profiles")
        .update({ is_active: !user.is_active })
        .eq("id", user.id);

      if (error) throw error;

      setUser({ ...user, is_active: !user.is_active });
      alert(`User ${!user.is_active ? "activated" : "banned"} successfully!`);
    } catch (error) {
      console.error("Error updating user status:", error);
      alert("Failed to update user status: " + error.message);
    }
  };

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
        <p>Loading user details...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="error-container">
        <AlertTriangle size={48} />
        <h2>User not found</h2>
        <p>The requested user could not be found.</p>
        <button
          onClick={() => router.push("/admin/users")}
          className="btn-primary"
        >
          Back to Users
        </button>
      </div>
    );
  }

  const roleInfo = getRoleBadge(user.role);

  return (
    <div className="user-details-container">
      {/* Header */}
      <div className="page-header">
        <button
          onClick={() => router.push("/admin/users")}
          className="back-button"
        >
          <ArrowLeft size={20} />
          Back to Users
        </button>
        <div>
          <h1>User Details</h1>
          <p>View and manage user information</p>
        </div>
      </div>

      <div className="user-details-grid">
        {/* Profile Card */}
        <div className="profile-card">
          <div className="profile-header">
            <div className="profile-avatar">
              {user.avatar_url ? (
                <img src={user.avatar_url} alt="User Avatar" />
              ) : (
                <User size={48} />
              )}
            </div>
            <div className="profile-info">
              <h2>{user.full_name || user.username || "Unnamed User"}</h2>
              <div className="profile-meta">
                <span className={`role-badge ${roleInfo.class}`}>
                  <Shield size={16} />
                  {roleInfo.label}
                </span>
                <span
                  className={`status-badge ${
                    user.is_active ? "active" : "banned"
                  }`}
                >
                  {user.is_active ? "Active" : "Banned"}
                </span>
              </div>
            </div>
          </div>

          <div className="profile-details">
            <div className="detail-item">
              <Mail size={18} />
              <div>
                <label>Email</label>
                <span>{user.email}</span>
              </div>
            </div>

            {user.phone && (
              <div className="detail-item">
                <Phone size={18} />
                <div>
                  <label>Phone</label>
                  <span>{user.phone}</span>
                </div>
              </div>
            )}

            <div className="detail-item">
              <Calendar size={18} />
              <div>
                <label>Joined</label>
                <span>{new Date(user.created_at).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="detail-item">
              <Calendar size={18} />
              <div>
                <label>Last Updated</label>
                <span>{new Date(user.updated_at).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          {isSuperAdmin && (
            <div className="profile-actions">
              <button
                className={`btn-full ${user.is_active ? "danger" : "success"}`}
                onClick={handleToggleActive}
              >
                {user.is_active ? (
                  <>
                    <Ban size={18} />
                    Ban User
                  </>
                ) : (
                  <>
                    <CheckCircle size={18} />
                    Unban User
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Activity Stats */}
        <div className="stats-card">
          <h3>Activity Stats</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <ShoppingBag size={24} />
              <div>
                <span className="stat-number">{stats.totalOrders}</span>
                <span className="stat-label">Total Orders</span>
              </div>
            </div>
            <div className="stat-item">
              <DollarSign size={24} />
              <div>
                <span className="stat-number">
                  GH₵{stats.totalSpent.toFixed(2)}
                </span>
                <span className="stat-label">Total Spent</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="orders-card">
          <h3>Recent Orders</h3>
          {orders.length === 0 ? (
            <div className="empty-state">
              <ShoppingBag size={48} />
              <p>No orders found</p>
            </div>
          ) : (
            <div className="orders-list">
              {orders.map((order) => (
                <div key={order.id} className="order-item">
                  <div className="order-info">
                    <div className="order-id">#{order.order_number}</div>
                    <div className="order-date">
                      {new Date(order.created_at).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="order-amount">
                    GH₵{order.total_amount?.toFixed(2)}
                  </div>
                  <div className={`order-status ${order.status}`}>
                    {order.status}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Static params generation for static export
export async function generateStaticParams() {
  return []
}

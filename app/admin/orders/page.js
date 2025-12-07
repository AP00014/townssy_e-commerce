"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase";
import {
  FileText,
  Search,
  Filter,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  ArrowRight
} from "lucide-react";
import "../../styles/admin-orders.css";

export default function OrdersPage() {
  const { user, profile, isAdmin, isSuperAdmin, isModerator } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Check permissions
  useEffect(() => {
    if (!isAdmin && !isSuperAdmin && !isModerator) {
      router.push("/admin");
    }
  }, [isAdmin, isSuperAdmin, isModerator, router]);

  useEffect(() => {
    fetchOrders();
  }, [statusFilter]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from("orders")
        .select(`
          *,
          buyer:profiles!buyer_id(email, full_name),
          items:order_items(count)
        `)
        .order("created_at", { ascending: false });

      if (statusFilter !== "all") {
        query = query.eq("status", statusFilter);
      }

      const { data, error } = await query;

      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      pending: "warning",
      paid: "info",
      processing: "info",
      shipped: "primary",
      delivered: "success",
      cancelled: "danger",
      refunded: "secondary",
      disputed: "danger"
    };
    return <span className={`badge ${styles[status] || "secondary"}`}>{status}</span>;
  };

  const filteredOrders = orders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.buyer?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.order_number?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner-large"></div>
        <p>Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="orders-container">
      <div className="page-header">
        <div>
          <h1>Orders Management</h1>
          <p>View and manage customer orders</p>
        </div>
      </div>

      <div className="filters-bar">
        <div className="search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-group">
          <Filter size={20} />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Total</th>
              <th>Status</th>
              <th>Items</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td className="font-mono">#{order.order_number || order.id.slice(0, 8)}</td>
                  <td>
                    <div className="user-cell">
                      <div className="user-info">
                        <span className="user-name">
                          {order.buyer?.full_name || "Unknown"}
                        </span>
                        <span className="user-email">{order.buyer?.email}</span>
                      </div>
                    </div>
                  </td>
                  <td>{new Date(order.created_at).toLocaleDateString()}</td>
                  <td className="font-bold">GH₵{order.total_amount?.toFixed(2)}</td>
                  <td>{getStatusBadge(order.status)}</td>
                  <td>{order.items?.[0]?.count || 0} items</td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="btn-icon"
                        onClick={() => router.push(`/admin/orders/${order.id}`)}
                        title="View Order"
                      >
                        <Eye size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="empty-state">
                  <FileText size={48} />
                  <p>No orders found matching your criteria</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

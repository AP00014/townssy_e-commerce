"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useRouter } from "next/navigation";
import { supabase } from "../../../../lib/supabase";
import { AlertCircle, MessageSquare, CheckCircle } from "lucide-react";
import "../../../styles/admin-orders.css";

export default function DisputesPage() {
  const { user, profile, isAdmin, isSuperAdmin } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [disputes, setDisputes] = useState([]);

  useEffect(() => {
    if (!isAdmin && !isSuperAdmin) {
      router.push("/admin");
    }
  }, [isAdmin, isSuperAdmin, router]);

  useEffect(() => {
    // In a real app, you might have a separate disputes table
    // For now, we'll fetch orders with status 'disputed'
    fetchDisputes();
  }, []);

  const fetchDisputes = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("orders")
        .select(`
          *,
          buyer:profiles!buyer_id(email, full_name)
        `)
        .eq("status", "disputed")
        .order("updated_at", { ascending: false });

      if (error) throw error;
      setDisputes(data || []);
    } catch (error) {
      console.error("Error fetching disputes:", error);
    } finally {
      setLoading(false);
    }
  };

  const resolveDispute = async (orderId, resolution) => {
    try {
      setLoading(true);
      const newStatus = resolution === 'refund' ? "refunded" : "delivered";
      
      const { error } = await supabase
        .from("orders")
        .update({ status: newStatus })
        .eq("id", orderId);

      if (error) throw error;
      
      setDisputes(prev => prev.filter(o => o.id !== orderId));
      alert("Dispute resolved successfully");
    } catch (error) {
      console.error("Error resolving dispute:", error);
      alert("Failed to resolve dispute");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner-large"></div>
        <p>Loading disputes...</p>
      </div>
    );
  }

  return (
    <div className="orders-container">
      <div className="page-header">
        <div>
          <h1>Dispute Resolution</h1>
          <p>Handle customer disputes and refunds</p>
        </div>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {disputes.length > 0 ? (
              disputes.map((order) => (
                <tr key={order.id}>
                  <td className="font-mono">#{order.order_number || order.id.slice(0, 8)}</td>
                  <td>
                    <div className="user-info">
                      <span className="user-name">{order.buyer?.full_name}</span>
                      <span className="user-email">{order.buyer?.email}</span>
                    </div>
                  </td>
                  <td className="font-bold">GH₵{order.total_amount?.toFixed(2)}</td>
                  <td>{new Date(order.updated_at).toLocaleDateString()}</td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="btn-primary flex items-center gap-1 text-xs px-2 py-1"
                        onClick={() => router.push(`/admin/orders/${order.id}`)}
                      >
                        <MessageSquare size={14} />
                        View Details
                      </button>
                      <button 
                         className="btn-icon text-red-600"
                         onClick={() => resolveDispute(order.id, 'refund')}
                         title="Refund Customer"
                      >
                        Refund
                      </button>
                      <button 
                         className="btn-icon text-green-600"
                         onClick={() => resolveDispute(order.id, 'close')}
                         title="Close Dispute (No Refund)"
                      >
                        Close
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="empty-state">
                  <AlertCircle size={48} />
                  <p>No active disputes</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

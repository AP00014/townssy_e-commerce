"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useRouter } from "next/navigation";
import { supabase } from "../../../../lib/supabase";
import { Shield, CheckCircle, XCircle } from "lucide-react";
import "../../../styles/admin-orders.css";

export default function OrderVerificationPage() {
  const { user, profile, isAdmin, isSuperAdmin } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!isAdmin && !isSuperAdmin) {
      router.push("/admin");
    }
  }, [isAdmin, isSuperAdmin, router]);

  useEffect(() => {
    fetchOrdersToVerify();
  }, []);

  const fetchOrdersToVerify = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("orders")
        .select(`
          *,
          buyer:profiles!buyer_id(email, full_name, phone)
        `)
        .eq("status", "pending_verification")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (orderId, approved) => {
    try {
      setLoading(true);
      const newStatus = approved ? "processing" : "cancelled";
      const { error } = await supabase
        .from("orders")
        .update({ status: newStatus })
        .eq("id", orderId);

      if (error) throw error;
      
      setOrders(prev => prev.filter(o => o.id !== orderId));
      alert(`Order ${approved ? "verified" : "rejected"} successfully`);
    } catch (error) {
      console.error("Error verifying order:", error);
      alert("Failed to update order status");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner-large"></div>
        <p>Loading verification queue...</p>
      </div>
    );
  }

  return (
    <div className="orders-container">
      <div className="page-header">
        <div>
          <h1>Order Verification</h1>
          <p>Review flagged orders requiring manual approval</p>
        </div>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Amount</th>
              <th>Risk Reason</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order.id}>
                  <td className="font-mono">#{order.order_number || order.id.slice(0, 8)}</td>
                  <td>
                    <div className="user-info">
                      <span className="user-name">{order.buyer?.full_name}</span>
                      <span className="user-email">{order.buyer?.email}</span>
                    </div>
                  </td>
                  <td className="font-bold">GH₵{order.total_amount?.toFixed(2)}</td>
                  <td>
                    <span className="badge warning">High Value</span>
                  </td>
                  <td>{new Date(order.created_at).toLocaleDateString()}</td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="btn-icon text-green-600 hover:bg-green-50"
                        onClick={() => handleVerify(order.id, true)}
                        title="Approve"
                      >
                        <CheckCircle size={18} />
                      </button>
                      <button 
                        className="btn-icon danger"
                        onClick={() => handleVerify(order.id, false)}
                        title="Reject"
                      >
                        <XCircle size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="empty-state">
                  <Shield size={48} />
                  <p>No orders pending verification</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

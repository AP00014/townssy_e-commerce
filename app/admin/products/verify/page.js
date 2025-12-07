"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useRouter } from "next/navigation";
import { supabase } from "../../../../lib/supabase";
import { CheckCircle, XCircle, Package, ExternalLink } from "lucide-react";
import "../../../styles/admin-products.css";

export default function ProductVerificationPage() {
  const { user, profile, isAdmin, isSuperAdmin, isModerator } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!isAdmin && !isSuperAdmin && !isModerator) {
      router.push("/admin");
    }
  }, [isAdmin, isSuperAdmin, isModerator, router]);

  useEffect(() => {
    fetchPendingProducts();
  }, []);

  const fetchPendingProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("products")
        .select(`
          *,
          vendor:vendors(business_name),
          category:categories(name)
        `)
        .eq("verification_status", "pending")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const verifyProduct = async (productId, status) => {
    try {
      setLoading(true);
      const updates = { 
        verification_status: status,
        is_active: status === 'approved'
      };

      const { error } = await supabase
        .from("products")
        .update(updates)
        .eq("id", productId);

      if (error) throw error;
      
      setProducts(prev => prev.filter(p => p.id !== productId));
      alert(`Product ${status} successfully`);
    } catch (error) {
      console.error("Error verifying product:", error);
      alert("Failed to update product status");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner-large"></div>
        <p>Loading products queue...</p>
      </div>
    );
  }

  return (
    <div className="products-container">
      <div className="page-header">
        <div>
          <h1>Product Verification</h1>
          <p>Review and approve new product listings</p>
        </div>
      </div>

      <div className="products-grid">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                {product.images?.[0] ? (
                  <img src={product.images[0]} alt={product.name} />
                ) : (
                  <div className="placeholder-image">
                    <Package size={32} />
                  </div>
                )}
                <div className="status-badge pending">Pending</div>
              </div>
              
              <div className="product-info">
                <h3>{product.name}</h3>
                <div className="product-meta">
                  <span>{product.category?.name}</span>
                  <span>•</span>
                  <span>{product.vendor?.business_name}</span>
                </div>
                <div className="product-price">
                  GH₵{product.price.toFixed(2)}
                </div>
                
                <div className="product-actions">
                    <button 
                    className="btn-icon"
                    onClick={() => router.push(`/admin/products/${product.id}/edit`)}
                    title="View Details"
                    >
                    <ExternalLink size={18} />
                    </button>
                    <button 
                    className="btn-primary flex-1"
                    onClick={() => verifyProduct(product.id, 'approved')}
                    >
                    Approve
                    </button>
                    <button 
                    className="btn-secondary danger"
                    onClick={() => verifyProduct(product.id, 'rejected')}
                    >
                    Reject
                    </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state col-span-full">
            <CheckCircle size={48} />
            <p>All products verified! Good job.</p>
          </div>
        )}
      </div>
    </div>
  );
}

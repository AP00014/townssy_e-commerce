'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../../context/AuthContext';
import { supabase } from '../../../../../lib/supabase';
import {
  Package,
  ArrowLeft,
  Search,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Eye,
  AlertCircle
} from 'lucide-react';

export default function VendorProductsPage({ params }) {
  const router = useRouter();
  const { isAdmin, isSuperAdmin } = useAuth();
  const [vendor, setVendor] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [vendorId, setVendorId] = useState(null);

  useEffect(() => {
    const unwrapParams = async () => {
      const resolvedParams = await params;
      setVendorId(resolvedParams.id);
    };
    unwrapParams();
  }, [params]);

  useEffect(() => {
    if (!isAdmin && !isSuperAdmin) {
      router.push('/admin');
      return;
    }
    if (vendorId) {
      fetchVendorAndProducts();
    }
  }, [vendorId, isAdmin, isSuperAdmin]);

  const fetchVendorAndProducts = async () => {
    try {
      // Fetch vendor
      const { data: vendorData, error: vendorError } = await supabase
        .from('vendors')
        .select('*')
        .eq('id', vendorId)
        .single();

      if (vendorError) throw vendorError;
      setVendor(vendorData);

      // Fetch vendor products
      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select('*')
        .eq('vendor_id', vendorId)
        .order('created_at', { ascending: false });

      if (productsError) throw productsError;
      setProducts(productsData || []);
    } catch (error) {
      console.error('Error:', error);
      alert('Error loading data');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyProduct = async (productId, status) => {
    try {
      const { error } = await supabase
        .from('products')
        .update({ verification_status: status })
        .eq('id', productId);

      if (error) throw error;
      
      alert(`Product ${status} successfully!`);
      fetchVendorAndProducts();
    } catch (error) {
      console.error('Error:', error);
      alert('Error updating product');
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId);

      if (error) throw error;
      
      alert('Product deleted successfully');
      fetchVendorAndProducts();
    } catch (error) {
      console.error('Error:', error);
      alert('Error deleting product');
    }
  };

  const filteredProducts = products.filter(p =>
    p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    total: products.length,
    approved: products.filter(p => p.verification_status === 'approved').length,
    pending: products.filter(p => p.verification_status === 'pending').length,
    rejected: products.filter(p => p.verification_status === 'rejected').length,
    active: products.filter(p => p.is_active).length
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner-large"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="page-header">
        <div>
          <button
            onClick={() => router.back()}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'none',
              border: 'none',
              color: '#6b7280',
              cursor: 'pointer',
              marginBottom: '8px',
              fontSize: '14px'
            }}
          >
            <ArrowLeft size={16} />
            Back to Vendors
          </button>
          <h1>{vendor?.business_name} - Products</h1>
          <p>Manage and verify all products from this vendor</p>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <div style={{ background: 'white', padding: '16px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
          <div style={{ fontSize: '24px', fontWeight: '700' }}>{stats.total}</div>
          <div style={{ fontSize: '14px', color: '#6b7280' }}>Total Products</div>
        </div>
        <div style={{ background: 'white', padding: '16px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#10b981' }}>{stats.approved}</div>
          <div style={{ fontSize: '14px', color: '#6b7280' }}>Approved</div>
        </div>
        <div style={{ background: 'white', padding: '16px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#f59e0b' }}>{stats.pending}</div>
          <div style={{ fontSize: '14px', color: '#6b7280' }}>Pending Review</div>
        </div>
        <div style={{ background: 'white', padding: '16px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#3b82f6' }}>{stats.active}</div>
          <div style={{ fontSize: '14px', color: '#6b7280' }}>Active</div>
        </div>
      </div>

      {/* Search */}
      <div style={{
        background: 'white',
        padding: '20px',
        borderRadius: '12px',
        marginBottom: '24px',
        border: '1px solid #e5e7eb'
      }}>
        <div style={{ position: 'relative' }}>
          <Search size={20} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 12px 10px 40px',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '14px'
            }}
          />
        </div>
      </div>

      {/* Products Table */}
      <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Product</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Price</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Stock</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Status</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Verification</th>
              <th style={{ padding: '12px 16px', textAlign: 'right', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ padding: '60px 20px', textAlign: 'center', color: '#6b7280' }}>
                  <Package size={64} style={{ margin: '0 auto 16px', opacity: 0.3 }} />
                  <p>No products found</p>
                </td>
              </tr>
            ) : (
              filteredProducts.map(product => (
                <tr key={product.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                  <td style={{ padding: '16px' }}>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <div style={{ width: '60px', height: '60px', borderRadius: '8px', overflow: 'hidden', background: '#f9fafb' }}>
                        {product.images?.[0] ? (
                          <img src={product.images[0]} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af' }}>
                            <Package size={24} />
                          </div>
                        )}
                      </div>
                      <div>
                        <div style={{ fontWeight: '500', marginBottom: '4px' }}>{product.name}</div>
                        <div style={{ fontSize: '12px', color: '#6b7280' }}>{product.category}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '16px' }}>
                    <div style={{ fontWeight: '600' }}>${parseFloat(product.price).toFixed(2)}</div>
                  </td>
                  <td style={{ padding: '16px' }}>
                    <span style={{ color: product.stock_quantity > 10 ? '#10b981' : product.stock_quantity > 0 ? '#f59e0b' : '#ef4444' }}>
                      {product.stock_quantity} units
                    </span>
                  </td>
                  <td style={{ padding: '16px' }}>
                    <span style={{
                      padding: '4px 12px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: '600',
                      background: product.is_active ? '#d1fae5' : '#f3f4f6',
                      color: product.is_active ? '#065f46' : '#6b7280'
                    }}>
                      {product.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td style={{ padding: '16px' }}>
                    <span style={{
                      padding: '4px 12px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: '600',
                      background: product.verification_status === 'approved' ? '#d1fae5' : product.verification_status === 'pending' ? '#fef3c7' : '#fee2e2',
                      color: product.verification_status === 'approved' ? '#065f46' : product.verification_status === 'pending' ? '#92400e' : '#991b1b'
                    }}>
                      {product.verification_status}
                    </span>
                  </td>
                  <td style={{ padding: '16px' }}>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                      {product.verification_status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleVerifyProduct(product.id, 'approved')}
                            style={{
                              padding: '8px',
                              background: '#d1fae5',
                              border: 'none',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              color: '#065f46'
                            }}
                            title="Approve"
                          >
                            <CheckCircle size={16} />
                          </button>
                          <button
                            onClick={() => handleVerifyProduct(product.id, 'rejected')}
                            style={{
                              padding: '8px',
                              background: '#fee2e2',
                              border: 'none',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              color: '#991b1b'
                            }}
                            title="Reject"
                          >
                            <XCircle size={16} />
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => window.open(`/products/${product.id}`, '_blank')}
                        style={{
                          padding: '8px',
                          background: '#f3f4f6',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          color: '#6b7280'
                        }}
                        title="View"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        style={{
                          padding: '8px',
                          background: '#fee2e2',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          color: '#991b1b'
                        }}
                        title="Delete"
                      >
                        <Trash2 size={16} />
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
  );
}

// Static params generation for static export
export async function generateStaticParams() {
  return []
}

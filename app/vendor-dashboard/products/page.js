'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../../lib/supabase';
import Link from 'next/link';
import {
  Package,
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  Filter
} from 'lucide-react';

export default function ProductsListPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    if (user) {
      fetchProducts();
    }
  }, [user]);

  useEffect(() => {
    filterProducts();
  }, [searchTerm, filterStatus, products]);

  const fetchProducts = async () => {
    try {
      const { data: vendorData } = await supabase
        .from('vendors')
        .select('id')
        .eq('user_id', user.id)
        .single();

      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('vendor_id', vendorData.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = [...products];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (filterStatus !== 'all') {
      if (filterStatus === 'active') {
        filtered = filtered.filter(p => p.is_active);
      } else if (filterStatus === 'inactive') {
        filtered = filtered.filter(p => !p.is_active);
      } else {
        filtered = filtered.filter(p => p.verification_status === filterStatus);
      }
    }

    setFilteredProducts(filtered);
  };

  const toggleProductStatus = async (productId, currentStatus) => {
    try {
      const { error } = await supabase
        .from('products')
        .update({ is_active: !currentStatus })
        .eq('id', productId);

      if (error) throw error;
      
      fetchProducts(); // Refresh list
    } catch (error) {
      console.error('Error toggling product status:', error);
      alert('Error updating product status');
    }
  };

  const deleteProduct = async (productId) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId);

      if (error) throw error;
      
      alert('Product deleted successfully');
      fetchProducts(); // Refresh list
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Error deleting product');
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      'pending': { bg: '#fef3c7', color: '#92400e', text: 'Pending Review' },
      'approved': { bg: '#d1fae5', color: '#065f46', text: 'Approved' },
      'rejected': { bg: '#fee2e2', color: '#991b1b', text: 'Rejected' },
      'flagged': { bg: '#fef08a', color: '#854d0e', text: 'Flagged' },
    };
    
    const badge = badges[status] || badges['pending'];
    
    return (
      <span style={{
        display: 'inline-block',
        padding: '4px 12px',
        borderRadius: '12px',
        fontSize: '12px',
        fontWeight: '600',
        background: badge.bg,
        color: badge.color
      }}>
        {badge.text}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner-large"></div>
        <p>Loading products...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1>My Products</h1>
          <p>Manage your product inventory</p>
        </div>
        <Link href="/vendor-dashboard/products/create" className="btn-primary">
          <Plus size={20} />
          Add Product
        </Link>
      </div>

      {/* Filters */}
      <div style={{
        background: 'white',
        padding: '20px',
        borderRadius: '12px',
        marginBottom: '24px',
        border: '1px solid #e5e7eb'
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '16px', alignItems: 'center' }}>
          {/* Search */}
          <div style={{ position: 'relative' }}>
            <Search size={20} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px 10px 40px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '14px'
              }}
            />
          </div>

          {/* Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            style={{
              padding: '10px 36px 10px 12px',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '14px',
              cursor: 'pointer',
              appearance: 'none',
              background: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e") no-repeat`,
              backgroundPosition: 'right 8px center',
              backgroundSize: '20px'
            }}
          >
            <option value="all">All Products</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="pending">Pending Review</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <div style={{ background: 'white', padding: '16px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#1f2937' }}>{products.length}</div>
          <div style={{ fontSize: '14px', color: '#6b7280' }}>Total Products</div>
        </div>
        <div style={{ background: 'white', padding: '16px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#10b981' }}>{products.filter(p => p.is_active).length}</div>
          <div style={{ fontSize: '14px', color: '#6b7280' }}>Active</div>
        </div>
        <div style={{ background: 'white', padding: '16px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#f59e0b' }}>{products.filter(p => p.verification_status === 'pending').length}</div>
          <div style={{ fontSize: '14px', color: '#6b7280' }}>Pending Review</div>
        </div>
        <div style={{ background: 'white', padding: '16px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#6b7280' }}>{products.filter(p => !p.is_active).length}</div>
          <div style={{ fontSize: '14px', color: '#6b7280' }}>Inactive</div>
        </div>
      </div>

      {/* Products List */}
      {filteredProducts.length === 0 ? (
        <div style={{
          background: 'white',
          padding: '60px 20px',
          borderRadius: '12px',
          border: '1px solid #e5e7eb',
          textAlign: 'center'
        }}>
          <Package size={64} style={{ margin: '0 auto 16px', color: '#d1d5db' }} />
          <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>
            {searchTerm || filterStatus !== 'all' ? 'No products found' : 'No products yet'}
          </h3>
          <p style={{ color: '#6b7280', marginBottom: '20px' }}>
            {searchTerm || filterStatus !== 'all' 
              ? 'Try adjusting your filters'
              : 'Get started by creating your first product'}
          </p>
          {!searchTerm && filterStatus === 'all' && (
            <Link href="/vendor-dashboard/products/create" className="btn-primary">
              <Plus size={20} />
              Create Product
            </Link>
          )}
        </div>
      ) : (
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
              {filteredProducts.map(product => (
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
                    {product.compare_price && (
                      <div style={{ fontSize: '12px', color: '#9ca3af', textDecoration: 'line-through' }}>
                        ${parseFloat(product.compare_price).toFixed(2)}
                      </div>
                    )}
                  </td>
                  <td style={{ padding: '16px' }}>
                    <span style={{
                      color: product.stock_quantity > 10 ? '#10b981' : product.stock_quantity > 0 ? '#f59e0b' : '#ef4444'
                    }}>
                      {product.stock_quantity} units
                    </span>
                  </td>
                  <td style={{ padding: '16px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', width: 'fit-content' }}>
                      <input
                        type="checkbox"
                        checked={product.is_active}
                        onChange={() => toggleProductStatus(product.id, product.is_active)}
                        style={{ marginRight: '8px' }}
                      />
                      <span style={{ fontSize: '14px', color: product.is_active ? '#10b981' : '#6b7280' }}>
                        {product.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </label>
                  </td>
                  <td style={{ padding: '16px' }}>
                    {getStatusBadge(product.verification_status)}
                  </td>
                  <td style={{ padding: '16px' }}>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                      <button
                        onClick={() => router.push(`/products/${product.id}`)}
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
                        onClick={() => router.push(`/vendor-dashboard/products/edit/${product.id}`)}
                        style={{
                          padding: '8px',
                          background: '#dbeafe',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          color: '#1e40af'
                        }}
                        title="Edit"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => deleteProduct(product.id)}
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
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

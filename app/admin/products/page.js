'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import { supabase } from '../../../lib/supabase';
import {
  Package,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Download,
  Upload
} from 'lucide-react';
import '../../styles/admin-products.css';

export default function ProductsListPage() {
  const router = useRouter();
  const { user, profile, isAdmin, isSuperAdmin, isModerator } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [categories, setCategories] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0
  });

  // Check permissions
  useEffect(() => {
    if (!isAdmin && !isSuperAdmin && !isModerator) {
      router.push('/admin');
    }
  }, [isAdmin, isSuperAdmin, isModerator, router]);

  // Fetch categories
  useEffect(() => {
    fetchCategories();
  }, []);

  // Fetch products
  useEffect(() => {
    fetchProducts();
  }, [statusFilter, categoryFilter]);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('id, name')
        .eq('is_active', true)
        .order('name');

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('products')
        .select(`
          *,
          vendor:vendors(id, business_name),
          category:categories(id, name)
        `)
        .order('created_at', { ascending: false });

      // Apply filters
      if (statusFilter !== 'all') {
        query = query.eq('verification_status', statusFilter);
      }

      if (categoryFilter !== 'all') {
        query = query.eq('category_id', categoryFilter);
      }

      const { data, error } = await query;

      if (error) throw error;

      setProducts(data || []);

      // Calculate stats
      const total = data?.length || 0;
      const pending = data?.filter(p => p.verification_status === 'pending').length || 0;
      const approved = data?.filter(p => p.verification_status === 'approved').length || 0;
      const rejected = data?.filter(p => p.verification_status === 'rejected').length || 0;

      setStats({ total, pending, approved, rejected });
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
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

      // Refresh products
      fetchProducts();
      alert('Product deleted successfully!');
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product: ' + error.message);
    }
  };

  const handleVerifyProduct = async (productId, status) => {
    try {
      const { error } = await supabase
        .from('products')
        .update({
          verification_status: status,
          verified_by: user.id,
          verification_notes: `${status === 'approved' ? 'Approved' : 'Rejected'} by admin`
        })
        .eq('id', productId);

      if (error) throw error;

      // Refresh products
      fetchProducts();
      alert(`Product ${status} successfully!`);
    } catch (error) {
      console.error('Error verifying product:', error);
      alert('Failed to verify product: ' + error.message);
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.sku?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner-large"></div>
        <p>Loading products...</p>
      </div>
    );
  }

  return (
    <div className="products-container">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1>Product Management</h1>
          <p>Manage all products across the platform</p>
        </div>
        <div className="header-actions">
          <button className="btn-secondary">
            <Download size={18} />
            Export
          </button>
          <button
            className="btn-primary"
            onClick={() => router.push('/admin/products/create')}
          >
            <Plus size={18} />
            Add Product
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid-4">
        <div className="stat-card">
          <div className="stat-content">
            <p className="stat-label">Total Products</p>
            <h3 className="stat-value">{stats.total}</h3>
          </div>
          <div className="stat-icon">
            <Package size={24} />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-content">
            <p className="stat-label">Pending Approval</p>
            <h3 className="stat-value">{stats.pending}</h3>
          </div>
          <div className="stat-icon warning">
            <Clock size={24} />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-content">
            <p className="stat-label">Approved</p>
            <h3 className="stat-value">{stats.approved}</h3>
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
      </div>

      {/* Filters */}
      <div className="filters-bar">
        <div className="search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search products by name or SKU..."
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
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="flagged">Flagged</option>
          </select>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="data-card">
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>SKU</th>
                <th>Category</th>
                <th>Vendor</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan="8" className="empty-state">
                    <Package size={48} />
                    <p>No products found</p>
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <div className="product-info">
                        {product.images && product.images[0] ? (
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="product-thumb"
                          />
                        ) : (
                          <div className="product-thumb-placeholder">
                            <Package size={20} />
                          </div>
                        )}
                        <div>
                          <div className="product-name">{product.name}</div>
                          {product.is_featured && (
                            <span className="badge featured">Featured</span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="text-mono">{product.sku || '-'}</td>
                    <td>{product.category?.name || '-'}</td>
                    <td>{product.vendor?.business_name || '-'}</td>
                    <td className="text-bold">${product.price.toFixed(2)}</td>
                    <td>
                      <span className={`stock-badge ${product.stock_quantity < 10 ? 'low' : ''}`}>
                        {product.stock_quantity}
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${product.verification_status}`}>
                        {product.verification_status}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="btn-icon"
                          title="View"
                          onClick={() => router.push(`/products/${product.id}`)}
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          className="btn-icon"
                          title="Edit"
                          onClick={() => router.push(`/admin/products/${product.id}/edit`)}
                        >
                          <Edit size={16} />
                        </button>
                        {product.verification_status === 'pending' && (
                          <>
                            <button
                              className="btn-icon success"
                              title="Approve"
                              onClick={() => handleVerifyProduct(product.id, 'approved')}
                            >
                              <CheckCircle size={16} />
                            </button>
                            <button
                              className="btn-icon danger"
                              title="Reject"
                              onClick={() => handleVerifyProduct(product.id, 'rejected')}
                            >
                              <XCircle size={16} />
                            </button>
                          </>
                        )}
                        {isSuperAdmin && (
                          <button
                            className="btn-icon danger"
                            title="Delete"
                            onClick={() => handleDeleteProduct(product.id)}
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
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

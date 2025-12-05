'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useRouter } from 'next/navigation';
import { supabase } from '../../../../lib/supabase';
import {
  FolderTree,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Image as ImageIcon,
  ChevronRight,
  ChevronDown,
  GripVertical
} from 'lucide-react';
import '../../../styles/admin-categories.css';

export default function CategoriesPage() {
  const router = useRouter();
  const { user, profile, isAdmin, isSuperAdmin } = useAuth();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategories, setExpandedCategories] = useState(new Set());
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    inactive: 0,
    parents: 0,
    children: 0
  });

  // Check permissions
  useEffect(() => {
    if (!isAdmin && !isSuperAdmin) {
      router.push('/admin');
    }
  }, [isAdmin, isSuperAdmin, router]);

  // Fetch categories
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('sort_order', { ascending: true })
        .order('name', { ascending: true });

      if (error) throw error;

      setCategories(data || []);

      // Calculate stats
      const total = data?.length || 0;
      const active = data?.filter(c => c.is_active).length || 0;
      const inactive = total - active;
      const parents = data?.filter(c => !c.parent_id).length || 0;
      const children = total - parents;

      setStats({ total, active, inactive, parents, children });
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    // Check if category has children
    const hasChildren = categories.some(c => c.parent_id === categoryId);
    
    if (hasChildren) {
      alert('Cannot delete category with subcategories. Please delete or reassign subcategories first.');
      return;
    }

    if (!confirm('Are you sure you want to delete this category?')) return;

    try {
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', categoryId);

      if (error) throw error;

      fetchCategories();
      alert('Category deleted successfully!');
    } catch (error) {
      console.error('Error deleting category:', error);
      alert('Failed to delete category: ' + error.message);
    }
  };

  const handleToggleActive = async (categoryId, currentStatus) => {
    try {
      const { error } = await supabase
        .from('categories')
        .update({ is_active: !currentStatus })
        .eq('id', categoryId);

      if (error) throw error;

      fetchCategories();
    } catch (error) {
      console.error('Error updating category:', error);
      alert('Failed to update category status: ' + error.message);
    }
  };

  const toggleExpand = (categoryId) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  // Build category tree structure
  const buildCategoryTree = () => {
    const parentCategories = categories.filter(c => !c.parent_id);
    return parentCategories.map(parent => ({
      ...parent,
      children: categories.filter(c => c.parent_id === parent.id)
    }));
  };

  const filteredCategories = buildCategoryTree().filter(category => {
    const matchesSearch = category.name.toLowerCase().includes(searchQuery.toLowerCase());
    const childMatches = category.children?.some(child => 
      child.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return matchesSearch || childMatches;
  });

  const CategoryRow = ({ category, isChild = false }) => (
    <>
      <tr className={isChild ? 'child-row' : 'parent-row'}>
        <td>
          <div className="category-name-cell">
            {!isChild && category.children?.length > 0 && (
              <button 
                className="expand-button"
                onClick={() => toggleExpand(category.id)}
              >
                {expandedCategories.has(category.id) ? (
                  <ChevronDown size={16} />
                ) : (
                  <ChevronRight size={16} />
                )}
              </button>
            )}
            {isChild && <span className="indent"></span>}
            <div className="category-info">
              {category.image_url ? (
                <img src={category.image_url} alt={category.name} className="category-thumb" />
              ) : (
                <div className="category-thumb-placeholder">
                  <FolderTree size={20} />
                </div>
              )}
              <div>
                <div className="category-name">{category.name}</div>
                <div className="category-slug">/{category.slug}</div>
              </div>
            </div>
          </div>
        </td>
        <td className="text-center">
          <span className={`badge ${category.is_active ? 'success' : 'inactive'}`}>
            {category.is_active ? 'Active' : 'Inactive'}
          </span>
        </td>
        <td className="text-center">{category.sort_order || 0}</td>
        <td className="text-muted">{category.description || '-'}</td>
        <td>
          <div className="action-buttons">
            <button
              className="btn-icon"
              title={category.is_active ? 'Deactivate' : 'Activate'}
              onClick={() => handleToggleActive(category.id, category.is_active)}
            >
              {category.is_active ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
            <button
              className="btn-icon"
              title="Edit"
              onClick={() => router.push(`/admin/products/categories/${category.id}/edit`)}
            >
              <Edit size={16} />
            </button>
            {isSuperAdmin && (
              <button
                className="btn-icon danger"
                title="Delete"
                onClick={() => handleDeleteCategory(category.id)}
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>
        </td>
      </tr>
      {!isChild && expandedCategories.has(category.id) && category.children?.map(child => (
        <CategoryRow key={child.id} category={child} isChild={true} />
      ))}
    </>
  );

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner-large"></div>
        <p>Loading categories...</p>
      </div>
    );
  }

  return (
    <div className="categories-container">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1>Category Management</h1>
          <p>Organize products into categories and subcategories</p>
        </div>
        <div className="header-actions">
          <button
            className="btn-primary"
            onClick={() => router.push('/admin/products/categories/create')}
          >
            <Plus size={18} />
            Add Category
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid-4">
        <div className="stat-card">
          <div className="stat-content">
            <p className="stat-label">Total Categories</p>
            <h3 className="stat-value">{stats.total}</h3>
          </div>
          <div className="stat-icon">
            <FolderTree size={24} />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-content">
            <p className="stat-label">Parent Categories</p>
            <h3 className="stat-value">{stats.parents}</h3>
          </div>
          <div className="stat-icon">
            <FolderTree size={24} />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-content">
            <p className="stat-label">Subcategories</p>
            <h3 className="stat-value">{stats.children}</h3>
          </div>
          <div className="stat-icon">
            <ChevronRight size={24} />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-content">
            <p className="stat-label">Active</p>
            <h3 className="stat-value">{stats.active}</h3>
            <span className="stat-change">{stats.inactive} inactive</span>
          </div>
          <div className="stat-icon success">
            <Eye size={24} />
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="filters-bar">
        <div className="search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Categories Table */}
      <div className="data-card">
        <div className="table-container">
          <table className="data-table categories-table">
            <thead>
              <tr>
                <th>Category</th>
                <th className="text-center">Status</th>
                <th className="text-center">Order</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCategories.length === 0 ? (
                <tr>
                  <td colSpan="5" className="empty-state">
                    <FolderTree size={48} />
                    <p>No categories found</p>
                  </td>
                </tr>
              ) : (
                filteredCategories.map((category) => (
                  <CategoryRow key={category.id} category={category} />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Help Text */}
      <div className="info-card">
        <h4>Category Management Tips</h4>
        <ul>
          <li>Use parent categories for main product groups (e.g., Electronics, Fashion)</li>
          <li>Create subcategories to organize products more specifically</li>
          <li>Sort order controls how categories appear on your storefront</li>
          <li>Inactive categories won't show on your storefront but products remain assigned</li>
          <li>Category slugs are used in URLs - keep them short and descriptive</li>
        </ul>
      </div>
    </div>
  );
}

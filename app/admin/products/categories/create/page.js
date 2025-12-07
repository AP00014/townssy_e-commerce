'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../../../context/AuthContext';
import { useRouter } from 'next/navigation';
import { supabase } from '../../../../../lib/supabase';
import {
  FolderTree,
  ArrowLeft,
  Save,
  Upload,
  X,
  Image as ImageIcon
} from 'lucide-react';
import '../../../../styles/admin-categories.css';

export default function CreateCategoryPage() {
  const router = useRouter();
  const { user, profile, isAdmin, isSuperAdmin } = useAuth();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    parent_id: '',
    description: '',
    is_active: true,
    sort_order: 0
  });

  // Check permissions
  useEffect(() => {
    if (!isAdmin && !isSuperAdmin) {
      router.push('/admin');
    }
  }, [isAdmin, isSuperAdmin, router]);

  // Fetch parent categories
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('id, name, parent_id')
        .is('parent_id', null) // Only get parent categories
        .order('name');

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name === 'name') {
      // Auto-generate slug from name
      setFormData(prev => ({
        ...prev,
        name: value,
        slug: generateSlug(value)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const uploadImage = async () => {
    if (!imageFile) return null;

    const fileExt = imageFile.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
    const filePath = `categories/${fileName}`;

    const { data, error } = await supabase.storage
      .from('product-images')
      .upload(filePath, imageFile);

    if (error) {
      console.error('Error uploading image:', error);
      return null;
    }

    const { data: urlData } = supabase.storage
      .from('product-images')
      .getPublicUrl(filePath);

    return urlData.publicUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);

      // Upload image if present
      const imageUrl = await uploadImage();

      // Prepare category data
      const categoryData = {
        ...formData,
        parent_id: formData.parent_id || null,
        sort_order: parseInt(formData.sort_order) || 0,
        image_url: imageUrl
      };

      // Insert category
      const { data, error } = await supabase
        .from('categories')
        .insert([categoryData])
        .select()
        .single();

      if (error) throw error;

      alert('Category created successfully!');
      router.push('/admin/products/categories');
    } catch (error) {
      console.error('Error creating category:', error);
      alert('Failed to create category: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-category-container">
      {/* Header */}
      <div className="page-header">
        <div>
          <button
            className="back-button"
            onClick={() => router.back()}
          >
            <ArrowLeft size={20} />
            Back
          </button>
          <h1>Create New Category</h1>
          <p>Add a new product category or subcategory</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="category-form">
        <div className="form-grid">
          {/* Basic Information */}
          <div className="form-section">
            <h3>Basic Information</h3>
            
            <div className="form-group">
              <label htmlFor="name">Category Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="e.g., Electronics, Fashion, Home Decor"
              />
              <span className="help-text">The display name for this category</span>
            </div>

            <div className="form-group">
              <label htmlFor="slug">URL Slug *</label>
              <input
                type="text"
                id="slug"
                name="slug"
                value={formData.slug}
                onChange={handleInputChange}
                required
                pattern="[a-z0-9-]+"
                placeholder="e.g., electronics"
              />
              <span className="help-text">Auto-generated from name. Used in URLs (lowercase, no spaces)</span>
            </div>

            <div className="form-group">
              <label htmlFor="parent_id">Parent Category</label>
              <select
                id="parent_id"
                name="parent_id"
                value={formData.parent_id}
                onChange={handleInputChange}
              >
                <option value="">None (Top Level Category)</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
              <span className="help-text">Leave empty for a main category, or select a parent for a subcategory</span>
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="3"
                placeholder="Brief description of this category"
              />
            </div>
          </div>

          {/* Settings */}
          <div className="form-section">
            <h3>Settings</h3>

            <div className="form-group">
              <label htmlFor="sort_order">Sort Order</label>
              <input
                type="number"
                id="sort_order"
                name="sort_order"
                value={formData.sort_order}
                onChange={handleInputChange}
                min="0"
                placeholder="0"
              />
              <span className="help-text">Lower numbers appear first (0 = top)</span>
            </div>

            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="is_active"
                  checked={formData.is_active}
                  onChange={handleInputChange}
                />
                <span>Active</span>
              </label>
              <span className="help-text">Only active categories appear on the storefront</span>
            </div>

            {/* Category Image */}
            <div className="form-group">
              <label>Category Image</label>
              
              {imagePreview ? (
                <div className="image-preview-single">
                  <img src={imagePreview} alt="Category preview" />
                  <button
                    type="button"
                    className="remove-image"
                    onClick={removeImage}
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <div className="image-upload-area-small">
                  <label htmlFor="image" className="upload-label-small">
                    <ImageIcon size={32} />
                    <p>Click to upload image</p>
                    <span>Recommended: 400x400px, PNG or JPG</span>
                    <input
                      type="file"
                      id="image"
                      accept="image/*"
                      onChange={handleImageChange}
                      style={{ display: 'none' }}
                    />
                  </label>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="info-box">
          <h4>💡 Category Tips</h4>
          <ul>
            <li><strong>Parent Categories</strong>: Main groups like "Electronics" or "Fashion"</li>
            <li><strong>Subcategories</strong>: Specific types like "Smartphones" under "Electronics"</li>
            <li><strong>Sort Order</strong>: Use 10, 20, 30 to leave room for future additions</li>
            <li><strong>Slug</strong>: Keep it simple and SEO-friendly (e.g., "mens-shoes")</li>
            <li><strong>Images</strong>: Add images to make categories more appealing</li>
          </ul>
        </div>

        {/* Form Actions */}
        <div className="form-actions">
          <button
            type="button"
            className="btn-secondary"
            onClick={() => router.back()}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn-primary"
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="spinner-sm"></div>
                Creating...
              </>
            ) : (
              <>
                <Save size={18} />
                Create Category
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

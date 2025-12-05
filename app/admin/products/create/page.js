'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useRouter } from 'next/navigation';
import { supabase } from '../../../../lib/supabase';
import {
  Package,
  Upload,
  X,
  Plus,
  Minus,
  Save,
  ArrowLeft,
  Image as ImageIcon
} from 'lucide-react';
import '../../../styles/admin-products.css';

export default function CreateProductPage() {
  const router = useRouter();
  const { user, profile, isAdmin, isSuperAdmin } = useAuth();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category_id: '',
    vendor_id: '',
    price: '',
    compare_price: '',
    stock_quantity: 0,
    sku: '',
    specifications: {},
    is_featured: false,
    is_active: true,
    verification_status: 'approved' // Admin can directly approve
  });

  const [specFields, setSpecFields] = useState([{ key: '', value: '' }]);

  // Check permissions
  useEffect(() => {
    if (!isAdmin && !isSuperAdmin) {
      router.push('/admin');
    }
  }, [isAdmin, isSuperAdmin, router]);

  // Fetch categories and vendors
  useEffect(() => {
    fetchCategories();
    fetchVendors();
  }, []);

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

  const fetchVendors = async () => {
    try {
      const { data, error } = await supabase
        .from('vendors')
        .select('id, business_name, verification_status')
        .eq('verification_status', 'verified')
        .order('business_name');

      if (error) throw error;
      setVendors(data || []);
    } catch (error) {
      console.error('Error fetching vendors:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newPreviews = files.map(file => URL.createObjectURL(file));
    
    setImageFiles(prev => [...prev, ...files]);
    setImagePreviews(prev => [...prev, ...newPreviews]);
  };

  const removeImage = (index) => {
    setImageFiles(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleSpecChange = (index, field, value) => {
    const newSpecFields = [...specFields];
    newSpecFields[index][field] = value;
    setSpecFields(newSpecFields);
  };

  const addSpecField = () => {
    setSpecFields([...specFields, { key: '', value: '' }]);
  };

  const removeSpecField = (index) => {
    setSpecFields(specFields.filter((_, i) => i !== index));
  };

  const uploadImages = async () => {
    const uploadedUrls = [];

    for (const file of imageFiles) {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
      const filePath = `products/${fileName}`;

      const { data, error } = await supabase.storage
        .from('product-images')
        .upload(filePath, file);

      if (error) {
        console.error('Error uploading image:', error);
        continue;
      }

      const { data: urlData } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath);

      uploadedUrls.push(urlData.publicUrl);
    }

    return uploadedUrls;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);

      // Upload images
      const imageUrls = await uploadImages();

      // Prepare specifications
      const specifications = {};
      specFields.forEach(field => {
        if (field.key && field.value) {
          specifications[field.key] = field.value;
        }
      });

      // Prepare product data
      const productData = {
        ...formData,
        images: imageUrls,
        specifications,
        price: parseFloat(formData.price),
        compare_price: formData.compare_price ? parseFloat(formData.compare_price) : null,
        stock_quantity: parseInt(formData.stock_quantity) || 0,
        verified_by: user.id
      };

      // Insert product
      const { data, error } = await supabase
        .from('products')
        .insert([productData])
        .select()
        .single();

      if (error) throw error;

      alert('Product created successfully!');
      router.push('/admin/products');
    } catch (error) {
      console.error('Error creating product:', error);
      alert('Failed to create product: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-product-container">
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
          <h1>Create New Product</h1>
          <p>Add a new product to the platform</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-grid">
          {/* Basic Information */}
          <div className="form-section">
            <h3>Basic Information</h3>
            
            <div className="form-group">
              <label htmlFor="name">Product Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Enter product name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="4"
                placeholder="Enter product description"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="category_id">Category *</label>
                <select
                  id="category_id"
                  name="category_id"
                  value={formData.category_id}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="vendor_id">Vendor *</label>
                <select
                  id="vendor_id"
                  name="vendor_id"
                  value={formData.vendor_id}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Vendor</option>
                  {vendors.map(vendor => (
                    <option key={vendor.id} value={vendor.id}>
                      {vendor.business_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="sku">SKU</label>
              <input
                type="text"
                id="sku"
                name="sku"
                value={formData.sku}
                onChange={handleInputChange}
                placeholder="Enter SKU"
              />
            </div>
          </div>

          {/* Pricing & Inventory */}
          <div className="form-section">
            <h3>Pricing & Inventory</h3>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="price">Price *</label>
                <div className="input-with-prefix">
                  <span className="prefix">$</span>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="compare_price">Compare Price</label>
                <div className="input-with-prefix">
                  <span className="prefix">$</span>
                  <input
                    type="number"
                    id="compare_price"
                    name="compare_price"
                    value={formData.compare_price}
                    onChange={handleInputChange}
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="stock_quantity">Stock Quantity</label>
              <input
                type="number"
                id="stock_quantity"
                name="stock_quantity"
                value={formData.stock_quantity}
                onChange={handleInputChange}
                min="0"
              />
            </div>

            <div className="form-group">
              <label htmlFor="verification_status">Verification Status</label>
              <select
                id="verification_status"
                name="verification_status"
                value={formData.verification_status}
                onChange={handleInputChange}
              >
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
                <option value="flagged">Flagged</option>
              </select>
            </div>

            <div className="form-checkboxes">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="is_featured"
                  checked={formData.is_featured}
                  onChange={handleInputChange}
                />
                <span>Featured Product</span>
              </label>

              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="is_active"
                  checked={formData.is_active}
                  onChange={handleInputChange}
                />
                <span>Active</span>
              </label>
            </div>
          </div>
        </div>

        {/* Product Images */}
        <div className="form-section">
          <h3>Product Images</h3>
          
          <div className="image-upload-area">
            <label htmlFor="images" className="upload-label">
              <ImageIcon size={48} />
              <p>Click to upload images</p>
              <span>PNG, JPG, GIF up to 10MB</span>
              <input
                type="file"
                id="images"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                style={{ display: 'none' }}
              />
            </label>

            {imagePreviews.length > 0 && (
              <div className="image-previews">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="image-preview">
                    <img src={preview} alt={`Preview ${index + 1}`} />
                    <button
                      type="button"
                      className="remove-image"
                      onClick={() => removeImage(index)}
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Specifications */}
        <div className="form-section">
          <div className="section-header">
            <h3>Specifications</h3>
            <button
              type="button"
              className="btn-secondary-sm"
              onClick={addSpecField}
            >
              <Plus size={16} />
              Add Field
            </button>
          </div>

          <div className="spec-fields">
            {specFields.map((field, index) => (
              <div key={index} className="spec-field-row">
                <input
                  type="text"
                  placeholder="Key (e.g., Color)"
                  value={field.key}
                  onChange={(e) => handleSpecChange(index, 'key', e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Value (e.g., Red)"
                  value={field.value}
                  onChange={(e) => handleSpecChange(index, 'value', e.target.value)}
                />
                {specFields.length > 1 && (
                  <button
                    type="button"
                    className="btn-icon danger"
                    onClick={() => removeSpecField(index)}
                  >
                    <Minus size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>
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
                Create Product
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

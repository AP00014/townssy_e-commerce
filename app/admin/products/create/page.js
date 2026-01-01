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
  const [uploadingImages, setUploadingImages] = useState(false);
  const [categories, setCategories] = useState([]);
  const [sections, setSections] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [errors, setErrors] = useState({});
  const [submitProgress, setSubmitProgress] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category_ids: [], // Array of category IDs
    primary_category_id: '', // Primary category (first selected)
    section_ids: [], // Array of section IDs
    location: '',
    region: '',
    delivery: false,
    delivery_options: [],
    supplier_whatsapp: '',
    supplier_type: '', // 'supplier' or 'manufacturer' - required
    price: '',
    compare_price: '',
    stock_quantity: 0,
    sku: '',
    specifications: {},
    is_featured: false,
    is_active: true,
    verification_status: 'approved' // Admin can directly approve
  });

  const [deliveryOption, setDeliveryOption] = useState('');

  const [specFields, setSpecFields] = useState([{ key: '', value: '' }]);

  // Check permissions
  useEffect(() => {
    if (!isAdmin && !isSuperAdmin) {
      router.push('/admin');
    }
  }, [isAdmin, isSuperAdmin, router]);

  // Fetch categories and sections
  useEffect(() => {
    fetchCategories();
    fetchSections();
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

  const fetchSections = async () => {
    try {
      const { data, error } = await supabase
        .from('home_sections')
        .select('id, display_name, name, section_type')
        .eq('is_active', true)
        .order('sort_order');

      if (error) throw error;
      setSections(data || []);
    } catch (error) {
      console.error('Error fetching sections:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleCategoryChange = (categoryId) => {
    setFormData(prev => {
      const categoryIds = [...prev.category_ids];
      const index = categoryIds.indexOf(categoryId);
      
      if (index > -1) {
        // Remove category
        categoryIds.splice(index, 1);
        // If removed category was primary, set first remaining as primary
        const newPrimary = categoryIds.length > 0 ? categoryIds[0] : '';
        return {
          ...prev,
          category_ids: categoryIds,
          primary_category_id: prev.primary_category_id === categoryId ? newPrimary : prev.primary_category_id
        };
      } else {
        // Add category
        const newCategoryIds = [...categoryIds, categoryId];
        // If no primary category set, make this the primary
        const newPrimary = prev.primary_category_id || categoryId;
        return {
          ...prev,
          category_ids: newCategoryIds,
          primary_category_id: newPrimary
        };
      }
    });
  };

  const setPrimaryCategory = (categoryId) => {
    setFormData(prev => ({
      ...prev,
      primary_category_id: categoryId
    }));
  };

  const handleSectionChange = (sectionId) => {
    setFormData(prev => {
      const sectionIds = [...prev.section_ids];
      const index = sectionIds.indexOf(sectionId);
      
      if (index > -1) {
        // Remove section
        sectionIds.splice(index, 1);
      } else {
        // Add section
        sectionIds.push(sectionId);
      }
      
      return {
        ...prev,
        section_ids: sectionIds
      };
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = [];
    const validPreviews = [];
    const errors = [];

    files.forEach(file => {
      // Validate file type (matching storage bucket allowed_mime_types)
      const validTypes = [
        'image/jpeg', 
        'image/jpg', 
        'image/png', 
        'image/gif', 
        'image/webp'
      ];
      if (!validTypes.includes(file.type)) {
        errors.push(`"${file.name}" is not a valid image type. Please use JPEG, PNG, WebP, or GIF.`);
        return;
      }

      // Validate file size (max 10MB - matching storage bucket file_size_limit)
      const maxSize = 10 * 1024 * 1024; // 10MB (10485760 bytes)
      if (file.size > maxSize) {
        errors.push(`"${file.name}" is too large. Maximum size is 10MB.`);
        return;
      }

      validFiles.push(file);
      validPreviews.push(URL.createObjectURL(file));
    });

    if (errors.length > 0) {
      alert(`Some images were rejected:\n\n${errors.join('\n')}`);
      // Clear errors from state
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.images;
        return newErrors;
      });
    }

    if (validFiles.length > 0) {
      setImageFiles(prev => [...prev, ...validFiles]);
      setImagePreviews(prev => [...prev, ...validPreviews]);
      // Clear image error if images are added
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.images;
        return newErrors;
      });
    }
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

  const addDeliveryOption = () => {
    if (deliveryOption.trim()) {
      setFormData(prev => ({
        ...prev,
        delivery_options: [...prev.delivery_options, deliveryOption.trim()]
      }));
      setDeliveryOption('');
    }
  };

  const removeDeliveryOption = (index) => {
    setFormData(prev => ({
      ...prev,
      delivery_options: prev.delivery_options.filter((_, i) => i !== index)
    }));
  };

  const uploadImages = async () => {
    if (imageFiles.length === 0) {
      return [];
    }

    setUploadingImages(true);
    const uploadedUrls = [];
    const errors = [];

    try {
      // Skip bucket check - it can hang. We'll validate during actual upload instead.
      setSubmitProgress('Preparing upload...');
      console.log(`📦 Starting upload of ${imageFiles.length} image(s)...`);

      for (let i = 0; i < imageFiles.length; i++) {
        const file = imageFiles[i];
        const fileNumber = i + 1;
        setSubmitProgress(`Uploading image ${fileNumber} of ${imageFiles.length}: ${file.name}...`);

        try {
          // Validate file type (matching storage bucket allowed_mime_types)
          const validTypes = [
            'image/jpeg', 
            'image/jpg', 
            'image/png', 
            'image/gif', 
            'image/webp'
          ];
          if (!validTypes.includes(file.type)) {
            errors.push(`File "${file.name}" is not a valid image type. Please use JPEG, PNG, WebP, or GIF.`);
            continue;
          }

          // Validate file size (max 10MB - matching storage bucket file_size_limit: 10485760 bytes)
          const maxSize = 10 * 1024 * 1024; // 10MB
          if (file.size > maxSize) {
            errors.push(`File "${file.name}" is too large (${(file.size / 1024 / 1024).toFixed(2)}MB). Maximum size is 10MB.`);
            continue;
          }

          const fileExt = file.name.split('.').pop();
          const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
          const filePath = `products/${fileName}`;

          console.log(`📤 Uploading ${file.name} (${(file.size / 1024 / 1024).toFixed(2)}MB) to ${filePath}...`);

          // Create upload promise with timeout
          const uploadPromise = supabase.storage
            .from('product-images')
            .upload(filePath, file, {
              cacheControl: '3600',
              upsert: false
            });

          // Add timeout (60 seconds per image)
          const timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => reject(new Error('Upload timeout: Image upload took too long. Please try again with a smaller file.')), 60000);
          });

          const { data: uploadData, error: uploadError } = await Promise.race([
            uploadPromise,
            timeoutPromise
          ]);

          if (uploadError) {
            console.error(`❌ Error uploading ${file.name}:`, uploadError);
            
            // Provide more specific error messages
            let errorMessage = uploadError.message;
            if (uploadError.message?.includes('new row violates row-level security')) {
              errorMessage = 'Permission denied. Please ensure you have admin privileges.';
            } else if (uploadError.message?.includes('timeout') || uploadError.message?.includes('network')) {
              errorMessage = 'Network error. Please check your connection and try again.';
            } else if (uploadError.message?.includes('size') || uploadError.message?.includes('limit')) {
              errorMessage = 'File size exceeds limit. Maximum size is 10MB.';
            }
            
            errors.push(`Failed to upload "${file.name}": ${errorMessage}`);
            continue;
          }

          if (!uploadData || !uploadData.path) {
            console.error('Upload succeeded but no path returned:', uploadData);
            errors.push(`Upload succeeded for "${file.name}" but could not get file path.`);
            continue;
          }

          // Get public URL
          const { data: urlData } = supabase.storage
            .from('product-images')
            .getPublicUrl(uploadData.path);

          if (!urlData || !urlData.publicUrl) {
            console.error('Could not get public URL for:', uploadData.path);
            errors.push(`Could not get public URL for "${file.name}"`);
            continue;
          }

          console.log(`✅ Image ${fileNumber}/${imageFiles.length} uploaded: ${file.name} -> ${urlData.publicUrl}`);
          uploadedUrls.push(urlData.publicUrl);
          
          // Small delay to prevent overwhelming the server
          if (i < imageFiles.length - 1) {
            await new Promise(resolve => setTimeout(resolve, 100));
          }
        } catch (error) {
          console.error(`❌ Error processing ${file.name}:`, error);
          errors.push(`Failed to upload "${file.name}": ${error.message || 'Unknown error'}`);
        }
      }

      // Final status
      if (uploadedUrls.length > 0) {
        setSubmitProgress(`✅ ${uploadedUrls.length} image(s) uploaded successfully${errors.length > 0 ? `, ${errors.length} failed` : ''}`);
      }

      if (errors.length > 0 && uploadedUrls.length === 0) {
        throw new Error(`All image uploads failed:\n${errors.join('\n')}`);
      }

      if (errors.length > 0) {
        console.warn('⚠️ Some images failed to upload:', errors);
        // Show warning but don't block if at least one image uploaded
        const warningMessage = `Warning: ${errors.length} image(s) failed to upload:\n${errors.slice(0, 3).join('\n')}${errors.length > 3 ? `\n...and ${errors.length - 3} more` : ''}`;
        alert(warningMessage);
      }

      console.log(`✅ Upload complete: ${uploadedUrls.length} successful, ${errors.length} failed`);
      return uploadedUrls;
    } catch (error) {
      console.error('❌ Error in uploadImages:', error);
      setSubmitProgress(`❌ Upload failed: ${error.message}`);
      throw error;
    } finally {
      setUploadingImages(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate required fields
    if (!formData.name || formData.name.trim() === '') {
      newErrors.name = 'Product name is required';
    }

    if (formData.category_ids.length === 0) {
      newErrors.categories = 'Please select at least one category';
    }

    if (!formData.supplier_type || (formData.supplier_type !== 'supplier' && formData.supplier_type !== 'manufacturer')) {
      newErrors.supplier_type = 'Please select either Supplier or Manufacturer';
    }

    if (!formData.price || isNaN(parseFloat(formData.price)) || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Valid price is required';
    }

    if (formData.compare_price && (isNaN(parseFloat(formData.compare_price)) || parseFloat(formData.compare_price) <= 0)) {
      newErrors.compare_price = 'Compare price must be a valid number';
    }

    if (formData.compare_price && parseFloat(formData.compare_price) <= parseFloat(formData.price)) {
      newErrors.compare_price = 'Compare price must be greater than regular price';
    }

    if (imageFiles.length === 0) {
      newErrors.images = 'Please upload at least one product image';
    }

    if (formData.sku && formData.sku.trim() !== '') {
      // Check if SKU already exists (optional validation)
      // This could be done on the backend
    }

    setErrors(newErrors);
    return { isValid: Object.keys(newErrors).length === 0, errors: newErrors };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('🚀 Form submission started');
    console.log('Form data:', formData);
    console.log('Image files:', imageFiles.length);
    
    // Validate form
    const validation = validateForm();
    console.log('Validation result:', validation);
    
    if (!validation.isValid) {
      console.error('❌ Validation failed:', validation.errors);
      const errorMessages = Object.entries(validation.errors)
        .map(([field, message]) => `${field}: ${message}`)
        .join('\n');
      alert(`Please fix the following errors:\n\n${errorMessages}`);
      
      // Scroll to first error
      const firstErrorField = Object.keys(validation.errors)[0];
      if (firstErrorField) {
        const element = document.querySelector(`[name="${firstErrorField}"]`) || 
                        document.querySelector(`#${firstErrorField}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          element.focus();
        }
      }
      return;
    }
    
    console.log('✅ Validation passed, proceeding with submission...');
    
    try {
      setLoading(true);
      setSubmitProgress('Starting product creation...');

      // Upload images
      console.log('📷 Uploading images...');
      setSubmitProgress('Uploading images...');
      const imageUrls = await uploadImages();
      console.log('✅ Images uploaded:', imageUrls.length, 'files');
      
      if (imageUrls.length === 0 && imageFiles.length > 0) {
        throw new Error('Failed to upload images. Please try again.');
      }

      // Check if user is authenticated
      if (!user || !user.id) {
        console.error('❌ User not authenticated');
        throw new Error('You must be logged in to create a product. Please log in and try again.');
      }

      // Prepare specifications
      console.log('📋 Preparing specifications...');
      setSubmitProgress('Preparing product data...');
      const specifications = {};
      specFields.forEach(field => {
        if (field.key && field.value) {
          specifications[field.key] = field.value;
        }
      });

      // Prepare product data (use primary category for category_id for backward compatibility)
      console.log('📦 Preparing product data...');
      const productData = {
        name: formData.name,
        description: formData.description,
        category_id: formData.primary_category_id, // Primary category for backward compatibility
        location: formData.location,
        region: formData.region,
        delivery: formData.delivery,
        delivery_options: formData.delivery_options,
        supplier_whatsapp: formData.supplier_whatsapp,
        supplier_type: formData.supplier_type,
        images: imageUrls,
        specifications,
        price: parseFloat(formData.price),
        compare_price: formData.compare_price ? parseFloat(formData.compare_price) : null,
        stock_quantity: parseInt(formData.stock_quantity) || 0,
        sku: formData.sku,
        is_featured: formData.is_featured,
        is_active: formData.is_active,
        verification_status: formData.verification_status,
        verified_by: user.id,
        admin_name: profile?.full_name || user.email || 'Admin' // Store admin name when admin creates product
      };

      // Insert product
      setSubmitProgress('Creating product in database...');
      console.log('Creating product with data:', {
        ...productData,
        images: imageUrls.length,
        category_ids: formData.category_ids.length,
        section_ids: formData.section_ids.length
      });

      const { data: product, error } = await supabase
        .from('products')
        .insert([productData])
        .select()
        .single();

      if (error) {
        console.error('Product creation error:', error);
        throw new Error(`Failed to create product: ${error.message}`);
      }

      console.log('Product created successfully:', product.id);

      // Insert product-category relationships
      setSubmitProgress('Linking categories...');
      const categoryRelations = formData.category_ids.map((catId, index) => ({
        product_id: product.id,
        category_id: catId,
        is_primary: catId === formData.primary_category_id,
        sort_order: index
      }));

      const { error: categoryError } = await supabase
        .from('product_categories')
        .insert(categoryRelations);

      if (categoryError) {
        console.error('Error inserting categories:', categoryError);
        throw new Error(`Product created but failed to link categories: ${categoryError.message}`);
      }

      console.log('Categories linked successfully');

      // Insert product-section relationships
      if (formData.section_ids.length > 0) {
        setSubmitProgress('Linking homepage sections...');
        const sectionRelations = formData.section_ids.map((sectionId, index) => ({
          product_id: product.id,
          section_id: sectionId,
          sort_order: index,
          is_pinned: false
        }));

        const { error: sectionError } = await supabase
          .from('product_section_placements')
          .insert(sectionRelations);

        if (sectionError) {
          console.error('Error inserting sections:', sectionError);
          // Non-critical error - product is created, just log it
          console.warn('Product created but sections linking failed:', sectionError.message);
        } else {
          console.log('Sections linked successfully');
        }
      }

      setSubmitProgress('Product created successfully!');
      console.log('✅ Product creation complete:', {
        productId: product.id,
        name: product.name,
        categories: formData.category_ids.length,
        sections: formData.section_ids.length,
        images: imageUrls.length
      });

      alert(`Product "${product.name}" created successfully!\n\n- Categories: ${formData.category_ids.length}\n- Sections: ${formData.section_ids.length}\n- Images: ${imageUrls.length}`);
      router.push('/admin/products');
    } catch (error) {
      console.error('❌ Error creating product:', error);
      setSubmitProgress('');
      const errorMessage = error.message || 'An unknown error occurred';
      alert(`Failed to create product:\n\n${errorMessage}\n\nPlease check the console for more details.`);
      
      // Log full error details for debugging
      console.error('Full error details:', {
        error,
        formData: {
          ...formData,
          category_ids: formData.category_ids.length,
          section_ids: formData.section_ids.length,
          delivery_options: formData.delivery_options.length
        },
        imageFilesCount: imageFiles.length,
        specFieldsCount: specFields.length
      });
    } finally {
      setLoading(false);
      setUploadingImages(false);
      setSubmitProgress('');
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
                className={errors.name ? 'error' : ''}
              />
              {errors.name && <span className="field-error-text">{errors.name}</span>}
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

            <div className="form-group">
              <label htmlFor="category-search">Categories *</label>
              <div className="category-selection-wrapper">
                {/* Selected Categories Summary */}
                {formData.category_ids.length > 0 && (
                  <div className="selected-categories-summary">
                    <div className="summary-header">
                      <span className="summary-count">
                        {formData.category_ids.length} {formData.category_ids.length === 1 ? 'Category' : 'Categories'} Selected
                      </span>
                      {formData.primary_category_id && (
                        <span className="primary-badge">
                          <span className="star-icon">★</span>
                          Primary: {categories.find(c => c.id === formData.primary_category_id)?.name}
                        </span>
                      )}
                    </div>
                    <div className="selected-categories-tags">
                      {formData.category_ids.map(catId => {
                        const cat = categories.find(c => c.id === catId);
                        const isPrimary = catId === formData.primary_category_id;
                        return cat ? (
                          <div key={catId} className={`category-tag ${isPrimary ? 'primary' : ''}`}>
                            <span>{cat.name}</span>
                            {isPrimary && <span className="tag-star">★</span>}
                            <button
                              type="button"
                              className="tag-remove"
                              onClick={(e) => {
                                e.preventDefault();
                                handleCategoryChange(catId);
                              }}
                              title="Remove category"
                            >
                              ×
                            </button>
                          </div>
                        ) : null;
                      })}
                    </div>
                  </div>
                )}
                
                {/* Category Selection Area */}
                <div className="category-selection">
                  <div className="category-grid">
                    {categories.map(cat => {
                      const isSelected = formData.category_ids.includes(cat.id);
                      const isPrimary = formData.primary_category_id === cat.id;
                      return (
                        <div
                          key={cat.id}
                          className={`category-card ${isSelected ? 'selected' : ''} ${isPrimary ? 'primary' : ''}`}
                          onClick={() => handleCategoryChange(cat.id)}
                        >
                          <div className="category-card-content">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => handleCategoryChange(cat.id)}
                              className="category-checkbox"
                            />
                            <span className="category-name">{cat.name}</span>
                            {isSelected && (
                              <button
                                type="button"
                                className={`primary-category-btn ${isPrimary ? 'active' : ''}`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setPrimaryCategory(cat.id);
                                }}
                                title={isPrimary ? 'Primary Category' : 'Set as Primary'}
                              >
                                {isPrimary ? '★' : '☆'}
                              </button>
                            )}
                          </div>
                          {isPrimary && (
                            <div className="primary-indicator">Primary Category</div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  {formData.category_ids.length === 0 && (
                    <div className="category-error-message">
                      <span className="error-icon">⚠</span>
                      {errors.categories || 'Please select at least one category'}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="section-search">Homepage Sections (Optional)</label>
              <div className="category-selection-wrapper">
                {/* Selected Sections Summary */}
                {formData.section_ids.length > 0 && (
                  <div className="selected-categories-summary">
                    <div className="summary-header">
                      <span className="summary-count">
                        {formData.section_ids.length} {formData.section_ids.length === 1 ? 'Section' : 'Sections'} Selected
                      </span>
                    </div>
                    <div className="selected-categories-tags">
                      {formData.section_ids.map(sectionId => {
                        const section = sections.find(s => s.id === sectionId);
                        return section ? (
                          <div key={sectionId} className="category-tag">
                            <span>{section.display_name}</span>
                            <button
                              type="button"
                              className="tag-remove"
                              onClick={(e) => {
                                e.preventDefault();
                                handleSectionChange(sectionId);
                              }}
                              title="Remove section"
                            >
                              ×
                            </button>
                          </div>
                        ) : null;
                      })}
                    </div>
                  </div>
                )}
                
                {/* Section Selection Area */}
                <div className="category-selection">
                  <div className="category-grid">
                    {sections.map(section => {
                      const isSelected = formData.section_ids.includes(section.id);
                      return (
                        <div
                          key={section.id}
                          className={`category-card ${isSelected ? 'selected' : ''}`}
                          onClick={() => handleSectionChange(section.id)}
                        >
                          <div className="category-card-content">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => handleSectionChange(section.id)}
                              className="category-checkbox"
                            />
                            <span className="category-name">{section.display_name}</span>
                            <span className="section-type-badge" style={{ fontSize: '11px', padding: '2px 6px', marginLeft: 'auto' }}>
                              {section.section_type}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {sections.length === 0 && (
                    <div className="category-error-message" style={{ color: '#64748b' }}>
                      <span className="error-icon">ℹ</span>
                      No active sections available. Create sections in the Sections management page.
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="location">Location *</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., Accra, Kumasi"
                />
              </div>

              <div className="form-group">
                <label htmlFor="region">Region *</label>
                <input
                  type="text"
                  id="region"
                  name="region"
                  value={formData.region}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., Greater Accra, Ashanti"
                />
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

            <div className="form-group">
              <label htmlFor="supplier_whatsapp">Supplier WhatsApp Link</label>
              <input
                type="url"
                id="supplier_whatsapp"
                name="supplier_whatsapp"
                value={formData.supplier_whatsapp}
                onChange={handleInputChange}
                placeholder="https://wa.me/233XXXXXXXXX"
              />
              <small style={{ color: '#64748b', fontSize: '12px', marginTop: '4px', display: 'block' }}>
                Format: https://wa.me/233XXXXXXXXX (include country code)
              </small>
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
                    className={errors.price ? 'error' : ''}
                  />
                </div>
                {errors.price && <span className="field-error-text">{errors.price}</span>}
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
                    className={errors.compare_price ? 'error' : ''}
                  />
                </div>
                {errors.compare_price && <span className="field-error-text">{errors.compare_price}</span>}
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

            <div className="form-group">
              <label>Product Status</label>
              <div className="status-checkboxes">
                <label className={`status-checkbox ${formData.is_featured ? 'checked' : ''}`}>
                <input
                  type="checkbox"
                  name="is_featured"
                  checked={formData.is_featured}
                  onChange={handleInputChange}
                />
                  <div className="checkbox-custom">
                    <svg className="checkbox-icon" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M16.7071 5.29289C17.0976 5.68342 17.0976 6.31658 16.7071 6.70711L8.70711 14.7071C8.31658 15.0976 7.68342 15.0976 7.29289 14.7071L3.29289 10.7071C2.90237 10.3166 2.90237 9.68342 3.29289 9.29289C3.68342 8.90237 4.31658 8.90237 4.70711 9.29289L8 12.5858L15.2929 5.29289C15.6834 4.90237 16.3166 4.90237 16.7071 5.29289Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                  <div className="checkbox-content">
                    <span className="checkbox-label-text">Featured Product</span>
                    <span className="checkbox-description">Show this product prominently on the homepage</span>
                  </div>
              </label>

                <label className={`status-checkbox ${formData.is_active ? 'checked' : ''}`}>
                  <input
                    type="checkbox"
                    name="is_active"
                    checked={formData.is_active}
                    onChange={handleInputChange}
                  />
                  <div className="checkbox-custom">
                    <svg className="checkbox-icon" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M16.7071 5.29289C17.0976 5.68342 17.0976 6.31658 16.7071 6.70711L8.70711 14.7071C8.31658 15.0976 7.68342 15.0976 7.29289 14.7071L3.29289 10.7071C2.90237 10.3166 2.90237 9.68342 3.29289 9.29289C3.68342 8.90237 4.31658 8.90237 4.70711 9.29289L8 12.5858L15.2929 5.29289C15.6834 4.90237 16.3166 4.90237 16.7071 5.29289Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                  <div className="checkbox-content">
                    <span className="checkbox-label-text">Active</span>
                    <span className="checkbox-description">Product will be visible to customers</span>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Delivery Information */}
          <div className="form-section">
            <h3>Delivery Information</h3>

            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="delivery"
                  checked={formData.delivery}
                  onChange={handleInputChange}
                />
                <span>Delivery Available</span>
              </label>
            </div>

            {formData.delivery && (
              <div className="form-group">
                <label>Delivery Options</label>
                <div className="spec-fields">
                  <div className="spec-field-row">
                    <input
                      type="text"
                      placeholder="e.g., Standard Delivery (3-5 days)"
                      value={deliveryOption}
                      onChange={(e) => setDeliveryOption(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addDeliveryOption();
                        }
                      }}
                    />
                    <button
                      type="button"
                      className="btn-secondary-sm"
                      onClick={addDeliveryOption}
                    >
                      <Plus size={16} />
                      Add Option
                    </button>
                  </div>
                  {formData.delivery_options.map((option, index) => (
                    <div key={index} className="spec-field-row">
                      <input
                        type="text"
                        value={option}
                        readOnly
                        style={{ background: '#f8fafc' }}
                      />
                      <button
                        type="button"
                        className="btn-icon danger"
                        onClick={() => removeDeliveryOption(index)}
                      >
                        <Minus size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Product Images */}
        <div className="form-section">
          <h3>Product Images *</h3>
          
          {errors.images && (
            <div className="category-error-message" style={{ marginBottom: '12px' }}>
              <span className="error-icon">⚠</span>
              {errors.images}
            </div>
          )}
          
          <div className="image-upload-area">
            <label htmlFor="images" className="upload-label">
              <ImageIcon size={48} />
              <p>Click to upload images</p>
              <span>PNG, JPG, GIF, WebP up to 10MB each</span>
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
                    <div className="image-preview-info">
                      <span className="image-number">{index + 1}</span>
                      {imageFiles[index] && (
                        <span className="image-size">
                          {(imageFiles[index].size / 1024 / 1024).toFixed(2)} MB
                        </span>
                      )}
                    </div>
                    <button
                      type="button"
                      className="remove-image"
                      onClick={() => removeImage(index)}
                      title="Remove image"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
            {imageFiles.length > 0 && (
              <div style={{ marginTop: '8px', fontSize: '12px', color: '#64748b' }}>
                {imageFiles.length} image{imageFiles.length !== 1 ? 's' : ''} selected
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

        {/* Supplier/Manufacturer Selection */}
        <div className="form-section">
          <h3>Product Source *</h3>
          <div className="form-group">
            <label className="required-label">Select Product Source</label>
            <div className="supplier-type-options">
              <label className={`supplier-type-option ${formData.supplier_type === 'supplier' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="supplier_type"
                  value="supplier"
                  checked={formData.supplier_type === 'supplier'}
                  onChange={handleInputChange}
                  required
                />
                <div className="option-content">
                  <div className="option-icon supplier-icon">
                    <Package size={24} />
                  </div>
                  <div className="option-details">
                    <span className="option-title">Supplier</span>
                    <span className="option-description">Product from a supplier/distributor</span>
                  </div>
                </div>
              </label>

              <label className={`supplier-type-option ${formData.supplier_type === 'manufacturer' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="supplier_type"
                  value="manufacturer"
                  checked={formData.supplier_type === 'manufacturer'}
                  onChange={handleInputChange}
                  required
                />
                <div className="option-content">
                  <div className="option-icon manufacturer-icon">
                    <Package size={24} />
                  </div>
                  <div className="option-details">
                    <span className="option-title">Manufacturer</span>
                    <span className="option-description">Product directly from manufacturer</span>
                  </div>
                </div>
              </label>
            </div>
            {errors.supplier_type && (
              <p className="field-error">{errors.supplier_type}</p>
            )}
            {!formData.supplier_type && !errors.supplier_type && (
              <p className="field-error">Please select either Supplier or Manufacturer</p>
            )}
          </div>
        </div>

        {/* Progress Indicator */}
        {submitProgress && (
          <div className="submit-progress" style={{
            padding: '12px 16px',
            background: uploadingImages ? '#fef3c7' : '#f0fdf4',
            border: `1px solid ${uploadingImages ? '#f59e0b' : '#10b981'}`,
            borderRadius: '8px',
            marginBottom: '16px',
            color: uploadingImages ? '#92400e' : '#065f46',
            fontSize: '14px',
            fontWeight: '500',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            {uploadingImages && (
              <div style={{
                width: '16px',
                height: '16px',
                border: '2px solid #f3f3f3',
                borderTop: '2px solid #f59e0b',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }}></div>
            )}
            <span>{submitProgress}</span>
          </div>
        )}

        {/* Form Actions */}
        <div className="form-actions">
          <button
            type="button"
            className="btn-secondary"
            onClick={() => router.back()}
            disabled={loading || uploadingImages}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn-primary"
            disabled={loading || uploadingImages}
            onClick={(e) => {
              console.log('🔘 Create Product button clicked');
              console.log('Button disabled?', loading || uploadingImages);
              console.log('Loading state:', loading);
              console.log('Uploading images state:', uploadingImages);
              // Let the form's onSubmit handle it
            }}
          >
            {loading || uploadingImages ? (
              <>
                <div className="spinner-sm"></div>
                {uploadingImages ? 'Uploading Images...' : submitProgress || 'Creating...'}
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

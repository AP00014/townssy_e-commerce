"use client";



import { useState, useEffect } from "react";
import { useAuth } from "../../../../context/AuthContext";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "../../../../../lib/supabase";
import {
  Package,
  Upload,
  X,
  Plus,
  Minus,
  Save,
  ArrowLeft,
  Image as ImageIcon,
  Trash2,
} from "lucide-react";
import "../../../../styles/admin-products.css";

export default function EditProductPageClient() {
  const router = useRouter();
  const params = useParams();
  const productId = params.id;
  const { user, profile, isAdmin, isSuperAdmin } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category_ids: [], // Array of category IDs
    primary_category_id: "", // Primary category
    section_ids: [], // Array of section IDs
    location: "",
    region: "",
    delivery: false,
    delivery_options: [],
    supplier_whatsapp: "",
    supplier_type: "",
    price: "",
    compare_price: "",
    stock_quantity: 0,
    sku: "",
    specifications: {},
    is_featured: false,
    is_active: true,
    verification_status: "pending",
  });

  const [specFields, setSpecFields] = useState([{ key: "", value: "" }]);
  const [deliveryOption, setDeliveryOption] = useState('');
  const [sections, setSections] = useState([]);

  // Check permissions
  useEffect(() => {
    if (!isAdmin && !isSuperAdmin) {
      router.push("/admin");
    }
  }, [isAdmin, isSuperAdmin, router]);

  // Fetch product data
  useEffect(() => {
    if (productId) {
      fetchProduct();
      fetchCategories();
      fetchSections();
    }
  }, [productId]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", productId)
        .single();

      if (error) throw error;

      // Fetch product categories from junction table
      const { data: productCategories, error: categoriesError } = await supabase
        .from("product_categories")
        .select("category_id, is_primary")
        .eq("product_id", productId)
        .order("is_primary", { ascending: false })
        .order("sort_order", { ascending: true });

      // Get category IDs
      const categoryIds = productCategories?.map(pc => pc.category_id) || [];
      // Get primary category (from junction table or fallback to category_id)
      const primaryCategory = productCategories?.find(pc => pc.is_primary)?.category_id 
        || data.category_id 
        || (categoryIds.length > 0 ? categoryIds[0] : '');

      // If no categories in junction table but category_id exists, use it
      if (categoryIds.length === 0 && data.category_id) {
        categoryIds.push(data.category_id);
      }

      // Fetch product sections from junction table
      const { data: productSections, error: sectionsError } = await supabase
        .from("product_section_placements")
        .select("section_id")
        .eq("product_id", productId)
        .order("sort_order", { ascending: true });

      const sectionIds = productSections?.map(ps => ps.section_id) || [];

      setFormData({
        name: data.name || "",
        description: data.description || "",
        category_ids: categoryIds,
        primary_category_id: primaryCategory,
        section_ids: sectionIds,
        location: data.location || "",
        region: data.region || "",
        delivery: data.delivery || false,
        delivery_options: data.delivery_options || [],
        supplier_whatsapp: data.supplier_whatsapp || "",
        supplier_type: data.supplier_type || "",
        price: data.price || "",
        compare_price: data.compare_price || "",
        stock_quantity: data.stock_quantity || 0,
        sku: data.sku || "",
        specifications: data.specifications || {},
        is_featured: data.is_featured || false,
        is_active: data.is_active || true,
        verification_status: data.verification_status || "pending",
      });

      // Set existing images
      setExistingImages(data.images || []);

      // Set specifications
      if (data.specifications && Object.keys(data.specifications).length > 0) {
        const specs = Object.entries(data.specifications).map(
          ([key, value]) => ({
            key,
            value,
          })
        );
        setSpecFields(specs);
      }
    } catch (error) {
      console.error("Error fetching product:", error);
      alert("Failed to load product: " + error.message);
      router.push("/admin/products");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from("categories")
        .select("id, name")
        .eq("is_active", true)
        .order("name");

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchSections = async () => {
    try {
      const { data, error } = await supabase
        .from("home_sections")
        .select("id, display_name, name, section_type")
        .eq("is_active", true)
        .order("sort_order");

      if (error) throw error;
      setSections(data || []);
    } catch (error) {
      console.error("Error fetching sections:", error);
    }
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

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
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

      // Validate file size (max 10MB - matching storage bucket file_size_limit: 10485760 bytes)
      const maxSize = 10 * 1024 * 1024; // 10MB
      if (file.size > maxSize) {
        errors.push(`"${file.name}" is too large. Maximum size is 10MB.`);
        return;
      }

      validFiles.push(file);
      validPreviews.push(URL.createObjectURL(file));
    });

    if (errors.length > 0) {
      alert(`Some images were rejected:\n\n${errors.join('\n')}`);
    }

    if (validFiles.length > 0) {
      setImageFiles((prev) => [...prev, ...validFiles]);
      setImagePreviews((prev) => [...prev, ...validPreviews]);
    }
  };

  const removeExistingImage = (index) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  const removeNewImage = (index) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSpecChange = (index, field, value) => {
    const newSpecFields = [...specFields];
    newSpecFields[index][field] = value;
    setSpecFields(newSpecFields);
  };

  const addSpecField = () => {
    setSpecFields([...specFields, { key: "", value: "" }]);
  };

  const removeSpecField = (index) => {
    setSpecFields(specFields.filter((_, i) => i !== index));
  };

  const uploadImages = async () => {
    if (imageFiles.length === 0) {
      return [];
    }

    const uploadedUrls = [];
    const errors = [];

    for (let i = 0; i < imageFiles.length; i++) {
      const file = imageFiles[i];

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
        errors.push(`File "${file.name}" is too large. Maximum size is 10MB.`);
        continue;
      }

      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()
        .toString(36)
        .substring(2)}_${Date.now()}.${fileExt}`;
      const filePath = `products/${fileName}`;

      const { data: uploadData, error } = await supabase.storage
        .from("product-images")
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        console.error("Error uploading image:", error);
        errors.push(`Failed to upload "${file.name}": ${error.message}`);
        continue;
      }

      if (!uploadData || !uploadData.path) {
        console.error('Upload succeeded but no path returned:', uploadData);
        errors.push(`Upload succeeded for "${file.name}" but could not get file path.`);
        continue;
      }

      // Use the path from the upload response, not the original filePath
      const { data: urlData } = supabase.storage
        .from("product-images")
        .getPublicUrl(uploadData.path);

      if (!urlData || !urlData.publicUrl) {
        console.error('Could not get public URL for:', uploadData.path);
        errors.push(`Could not get public URL for "${file.name}"`);
        continue;
      }

      console.log(`✅ Image uploaded: ${file.name} -> ${urlData.publicUrl}`);
      uploadedUrls.push(urlData.publicUrl);
    }

    if (errors.length > 0 && uploadedUrls.length === 0) {
      throw new Error(`Image upload failed: ${errors.join(', ')}`);
    }

    if (errors.length > 0) {
      console.warn('Some images failed to upload:', errors);
      alert(`Warning: ${errors.length} image(s) failed to upload:\n${errors.join('\n')}`);
    }

    return uploadedUrls;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      // Upload new images
      const newImageUrls = await uploadImages();
      const allImages = [...existingImages, ...newImageUrls];

      // Prepare specifications
      const specifications = {};
      specFields.forEach((field) => {
        if (field.key && field.value) {
          specifications[field.key] = field.value;
        }
      });

      // Validate categories
      if (formData.category_ids.length === 0) {
        alert('Please select at least one category');
        setSaving(false);
        return;
      }

      // Validate supplier type (required)
      if (!formData.supplier_type || (formData.supplier_type !== 'supplier' && formData.supplier_type !== 'manufacturer')) {
        alert('Please select either Supplier or Manufacturer');
        setSaving(false);
        return;
      }

      // Prepare product data (exclude category_ids, use primary_category_id for category_id)
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
        images: allImages,
        specifications,
        price: parseFloat(formData.price),
        compare_price: formData.compare_price
          ? parseFloat(formData.compare_price)
          : null,
        stock_quantity: parseInt(formData.stock_quantity) || 0,
        sku: formData.sku,
        is_featured: formData.is_featured,
        is_active: formData.is_active,
        verification_status: formData.verification_status,
        admin_name: !formData.vendor_id && profile?.full_name ? profile.full_name : undefined // Update admin_name if product has no vendor
      };

      // Update product
      const { error } = await supabase
        .from("products")
        .update(productData)
        .eq("id", productId);

      if (error) throw error;

      // Update product-category relationships
      // First, delete existing relationships
      const { error: deleteError } = await supabase
        .from("product_categories")
        .delete()
        .eq("product_id", productId);

      if (deleteError) {
        console.error("Error deleting old categories:", deleteError);
      }

      // Then, insert new relationships
      const categoryRelations = formData.category_ids.map((catId, index) => ({
        product_id: productId,
        category_id: catId,
        is_primary: catId === formData.primary_category_id,
        sort_order: index
      }));

      const { error: categoryError } = await supabase
        .from("product_categories")
        .insert(categoryRelations);

      if (categoryError) {
        console.error("Error inserting categories:", categoryError);
        // Product is updated but categories failed - still show success but log error
      }

      // Update product-section relationships
      // First, delete existing relationships
      const { error: deleteSectionError } = await supabase
        .from("product_section_placements")
        .delete()
        .eq("product_id", productId);

      if (deleteSectionError) {
        console.error("Error deleting old sections:", deleteSectionError);
      }

      // Then, insert new relationships
      if (formData.section_ids.length > 0) {
        const sectionRelations = formData.section_ids.map((sectionId, index) => ({
          product_id: productId,
          section_id: sectionId,
          sort_order: index,
          is_pinned: false
        }));

        const { error: sectionError } = await supabase
          .from("product_section_placements")
          .insert(sectionRelations);

        if (sectionError) {
          console.error("Error inserting sections:", sectionError);
          // Product is updated but sections failed - still show success but log error
        }
      }

      alert("Product updated successfully!");
      router.push("/admin/products");
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product: " + error.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner-large"></div>
        <p>Loading product...</p>
      </div>
    );
  }

  return (
    <div className="create-product-container">
      {/* Header */}
      <div className="page-header">
        <div>
          <button className="back-button" onClick={() => router.back()}>
            <ArrowLeft size={20} />
            Back
          </button>
          <h1>Edit Product</h1>
          <p>Update product information</p>
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
                      Please select at least one category
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

          {/* Existing Images */}
          {existingImages.length > 0 && (
            <div className="existing-images">
              <h4>Current Images</h4>
              <div className="image-previews">
                {existingImages.map((url, index) => (
                  <div key={index} className="image-preview">
                    <img src={url} alt={`Product ${index + 1}`} />
                    <button
                      type="button"
                      className="remove-image"
                      onClick={() => removeExistingImage(index)}
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="image-upload-area">
            <label htmlFor="images" className="upload-label">
              <ImageIcon size={48} />
              <p>Click to upload new images</p>
              <span>PNG, JPG, GIF, WebP up to 10MB each</span>
              <input
                type="file"
                id="images"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
            </label>

            {imagePreviews.length > 0 && (
              <div className="image-previews">
                <h4>New Images</h4>
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="image-preview">
                    <img src={preview} alt={`Preview ${index + 1}`} />
                    <button
                      type="button"
                      className="remove-image"
                      onClick={() => removeNewImage(index)}
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
                  onChange={(e) =>
                    handleSpecChange(index, "key", e.target.value)
                  }
                />
                <input
                  type="text"
                  placeholder="Value (e.g., Red)"
                  value={field.value}
                  onChange={(e) =>
                    handleSpecChange(index, "value", e.target.value)
                  }
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
            {!formData.supplier_type && (
              <p className="field-error">Please select either Supplier or Manufacturer</p>
            )}
          </div>
        </div>

        {/* Form Actions */}
        <div className="form-actions">
          <button
            type="button"
            className="btn-secondary"
            onClick={() => router.back()}
            disabled={saving}
          >
            Cancel
          </button>
          <button type="submit" className="btn-primary" disabled={saving}>
            {saving ? (
              <>
                <div className="spinner-sm"></div>
                Saving...
              </>
            ) : (
              <>
                <Save size={18} />
                Save Changes
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
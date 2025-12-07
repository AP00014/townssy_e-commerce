"use client";



import { useState, useEffect } from "react";
import { useAuth } from "../../../../../context/AuthContext";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "../../../../../../lib/supabase";
import {
  FolderTree,
  ArrowLeft,
  Save,
  Upload,
  X,
  Image as ImageIcon,
  Trash2,
} from "lucide-react";
import "../../../../../styles/admin-categories.css";

export default function EditCategoryPage() {
  const router = useRouter();
  const params = useParams();
  const categoryId = params.id;
  const { user, profile, isAdmin, isSuperAdmin } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [existingImage, setExistingImage] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    parent_id: "",
    description: "",
    is_active: true,
    sort_order: 0,
  });

  // Check permissions
  useEffect(() => {
    if (!isAdmin && !isSuperAdmin) {
      router.push("/admin");
    }
  }, [isAdmin, isSuperAdmin, router]);

  // Fetch category data
  useEffect(() => {
    if (categoryId) {
      fetchCategory();
      fetchCategories();
    }
  }, [categoryId]);

  const fetchCategory = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .eq("id", categoryId)
        .single();

      if (error) throw error;

      setFormData({
        name: data.name || "",
        slug: data.slug || "",
        parent_id: data.parent_id || "",
        description: data.description || "",
        is_active: data.is_active !== false,
        sort_order: data.sort_order || 0,
      });

      setExistingImage(data.image_url);
    } catch (error) {
      console.error("Error fetching category:", error);
      alert("Failed to load category: " + error.message);
      router.push("/admin/products/categories");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from("categories")
        .select("id, name, parent_id")
        .is("parent_id", null)
        .neq("id", categoryId) // Exclude current category to prevent circular reference
        .order("name");

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "name") {
      setFormData((prev) => ({
        ...prev,
        name: value,
        slug: generateSlug(value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
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

  const removeExistingImage = () => {
    setExistingImage(null);
  };

  const removeNewImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const uploadImage = async () => {
    if (!imageFile) return existingImage;

    const fileExt = imageFile.name.split(".").pop();
    const fileName = `${Math.random()
      .toString(36)
      .substring(2)}_${Date.now()}.${fileExt}`;
    const filePath = `categories/${fileName}`;

    const { data, error } = await supabase.storage
      .from("product-images")
      .upload(filePath, imageFile);

    if (error) {
      console.error("Error uploading image:", error);
      return existingImage;
    }

    const { data: urlData } = supabase.storage
      .from("product-images")
      .getPublicUrl(filePath);

    return urlData.publicUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      // Upload new image if present
      const imageUrl = await uploadImage();

      // Prepare category data
      const categoryData = {
        ...formData,
        parent_id: formData.parent_id || null,
        sort_order: parseInt(formData.sort_order) || 0,
        image_url: imageUrl,
      };

      // Update category
      const { error } = await supabase
        .from("categories")
        .update(categoryData)
        .eq("id", categoryId);

      if (error) throw error;

      alert("Category updated successfully!");
      router.push("/admin/products/categories");
    } catch (error) {
      console.error("Error updating category:", error);
      alert("Failed to update category: " + error.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner-large"></div>
        <p>Loading category...</p>
      </div>
    );
  }

  return (
    <div className="create-category-container">
      {/* Header */}
      <div className="page-header">
        <div>
          <button className="back-button" onClick={() => router.back()}>
            <ArrowLeft size={20} />
            Back
          </button>
          <h1>Edit Category</h1>
          <p>Update category information</p>
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
              <span className="help-text">
                The display name for this category
              </span>
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
              <span className="help-text">
                Used in URLs (lowercase, no spaces)
              </span>
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
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <span className="help-text">Leave empty for a main category</span>
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
              <span className="help-text">
                Lower numbers appear first (0 = top)
              </span>
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
              <span className="help-text">
                Only active categories appear on the storefront
              </span>
            </div>

            {/* Category Image */}
            <div className="form-group">
              <label>Category Image</label>

              {/* Existing Image */}
              {existingImage && !imagePreview && (
                <div className="existing-image-single">
                  <h4>Current Image</h4>
                  <div className="image-preview-single">
                    <img src={existingImage} alt="Category" />
                    <button
                      type="button"
                      className="remove-image"
                      onClick={removeExistingImage}
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              )}

              {/* New Image Preview */}
              {imagePreview && (
                <div className="existing-image-single">
                  <h4>New Image</h4>
                  <div className="image-preview-single">
                    <img src={imagePreview} alt="Category preview" />
                    <button
                      type="button"
                      className="remove-image"
                      onClick={removeNewImage}
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              )}

              {/* Upload Area */}
              {!imagePreview && (
                <div className="image-upload-area-small">
                  <label htmlFor="image" className="upload-label-small">
                    <ImageIcon size={32} />
                    <p>
                      {existingImage
                        ? "Click to change image"
                        : "Click to upload image"}
                    </p>
                    <span>Recommended: 400x400px, PNG or JPG</span>
                    <input
                      type="file"
                      id="image"
                      accept="image/*"
                      onChange={handleImageChange}
                      style={{ display: "none" }}
                    />
                  </label>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Warning if category has products */}
        <div className="warning-box">
          <h4>⚠️ Important Notes</h4>
          <ul>
            <li>Changing the slug will affect product URLs</li>
            <li>Making a category inactive will hide it from the storefront</li>
            <li>Products assigned to this category will not be affected</li>
            <li>Use caution when changing parent categories</li>
          </ul>
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

// Static params generation for static export
export async function generateStaticParams() {
  return []
}

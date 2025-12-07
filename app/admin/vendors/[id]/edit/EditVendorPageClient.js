"use client";



import { useState, useEffect } from "react";
import { useAuth } from "../../../../context/AuthContext";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "../../../../../lib/supabase";
import {
  ArrowLeft,
  Save,
  Store,
  Mail,
  Phone,
  MapPin,
  FileText,
  DollarSign,
} from "lucide-react";
import "../../../../styles/admin-vendors.css";

export default function EditVendorPageClient() {
  const router = useRouter();
  const params = useParams();
  const vendorId = params.id;
  const { user, profile, isAdmin, isSuperAdmin } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    business_name: "",
    business_type: "Retailer",
    business_description: "",
    tax_id: "",
    business_address: "",
    phone_number: "",
    email: "",
    commission_rate: 10,
    verification_status: "pending",
    verification_notes: "",
    is_active: true,
  });

  // Fetch vendor data
  useEffect(() => {
    if (vendorId) {
      fetchVendor();
    }
  }, [vendorId]);

  const fetchVendor = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("vendors")
        .select("*")
        .eq("id", vendorId)
        .single();

      if (error) throw error;

      setFormData({
        business_name: data.business_name || "",
        business_type: data.business_type || "Retailer",
        business_description: data.business_description || "",
        tax_id: data.tax_id || "",
        business_address: data.business_address || "",
        phone_number: data.phone_number || "",
        email: data.email || "",
        commission_rate: data.commission_rate || 10,
        verification_status: data.verification_status || "pending",
        verification_notes: data.verification_notes || "",
        is_active: data.is_active !== false,
      });
    } catch (error) {
      console.error("Error fetching vendor:", error);
      alert("Failed to load vendor: " + error.message);
      router.push("/admin/vendors");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      // Update vendor
      const { error } = await supabase
        .from("vendors")
        .update({
          ...formData,
          commission_rate: parseFloat(formData.commission_rate) || 0,
        })
        .eq("id", vendorId);

      if (error) throw error;

      alert("Vendor updated successfully!");
      router.push("/admin/vendors");
    } catch (error) {
      console.error("Error updating vendor:", error);
      alert("Failed to update vendor: " + error.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner-large"></div>
        <p>Loading vendor...</p>
      </div>
    );
  }

  return (
    <div className="create-vendor-container">
      {/* Header */}
      <div className="page-header">
        <div>
          <button className="back-button" onClick={() => router.back()}>
            <ArrowLeft size={20} />
            Back
          </button>
          <h1>Edit Vendor</h1>
          <p>Update vendor information</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="vendor-form">
        <div className="form-grid">
          {/* Business Information */}
          <div className="form-section">
            <h3>Business Information</h3>

            <div className="form-group">
              <label htmlFor="business_name">Business Name *</label>
              <input
                type="text"
                id="business_name"
                name="business_name"
                value={formData.business_name}
                onChange={handleInputChange}
                required
                placeholder="e.g., ABC Electronics Ltd"
              />
            </div>

            <div className="form-group">
              <label htmlFor="business_type">Business Type *</label>
              <select
                id="business_type"
                name="business_type"
                value={formData.business_type}
                onChange={handleInputChange}
                required
              >
                <option value="Manufacturer">Manufacturer</option>
                <option value="Wholesaler">Wholesaler</option>
                <option value="Retailer">Retailer</option>
                <option value="Distributor">Distributor</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="business_description">Business Description</label>
              <textarea
                id="business_description"
                name="business_description"
                value={formData.business_description}
                onChange={handleInputChange}
                rows="4"
                placeholder="Brief description of the business..."
              />
            </div>

            <div className="form-group">
              <label htmlFor="tax_id">Tax ID / Registration Number</label>
              <input
                type="text"
                id="tax_id"
                name="tax_id"
                value={formData.tax_id}
                onChange={handleInputChange}
                placeholder="e.g., 123-45-6789"
              />
            </div>

            <div className="form-group">
              <label htmlFor="business_address">Business Address</label>
              <textarea
                id="business_address"
                name="business_address"
                value={formData.business_address}
                onChange={handleInputChange}
                rows="3"
                placeholder="Full business address"
              />
            </div>
          </div>

          {/* Contact & Settings */}
          <div className="form-section">
            <h3>Contact Information</h3>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-with-icon">
                <Mail size={18} />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="vendor@example.com"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="phone_number">Phone Number</label>
              <div className="input-with-icon">
                <Phone size={18} />
                <input
                  type="tel"
                  id="phone_number"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleInputChange}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>

            <h3 style={{ marginTop: "2rem" }}>Settings</h3>

            <div className="form-group">
              <label htmlFor="commission_rate">Commission Rate (%)</label>
              <div className="input-with-icon">
                <DollarSign size={18} />
                <input
                  type="number"
                  id="commission_rate"
                  name="commission_rate"
                  value={formData.commission_rate}
                  onChange={handleInputChange}
                  min="0"
                  max="100"
                  step="0.01"
                  placeholder="10.00"
                />
              </div>
              <span className="help-text">
                Platform fee percentage on sales
              </span>
            </div>

            <div className="form-group">
              <label htmlFor="verification_status">Verification Status</label>
              <select
                id="verification_status"
                name="verification_status"
                value={formData.verification_status}
                onChange={handleInputChange}
              >
                <option value="pending">Pending Review</option>
                <option value="verified">Verified</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="verification_notes">Verification Notes</label>
              <textarea
                id="verification_notes"
                name="verification_notes"
                value={formData.verification_notes}
                onChange={handleInputChange}
                rows="3"
                placeholder="Internal notes about verification status..."
              />
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
                Only active vendors can sell on the platform
              </span>
            </div>
          </div>
        </div>

        {/* Warning Box */}
        <div className="warning-box">
          <h4>⚠️ Important Notes</h4>
          <ul>
            <li>
              Changing verification status will affect the vendor's ability to
              sell
            </li>
            <li>
              Deactivating a vendor will hide all their products from the
              storefront
            </li>
            <li>Commission rate changes apply to future transactions only</li>
            <li>
              Contact information changes should be communicated to the vendor
            </li>
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
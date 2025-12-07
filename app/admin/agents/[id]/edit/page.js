"use client";



import { useState, useEffect } from "react";
import { useAuth } from "../../../../context/AuthContext";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "../../../../../lib/supabase";
import {
  ArrowLeft,
  Save,
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
} from "lucide-react";
import "../../../../styles/admin-agents.css";

export default function EditAgentPage() {
  const router = useRouter();
  const params = useParams();
  const agentId = params.id;
  const { user, profile, isAdmin, isSuperAdmin } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    agent_type: "delivery",
    agent_code: "",
    assigned_location: "",
    address: "",
    national_id: "",
    bank_account: "",
    emergency_contact: "",
    emergency_phone: "",
    verification_status: "pending",
    verification_notes: "",
    is_active: true,
    notes: "",
  });

  // Fetch agent data
  useEffect(() => {
    if (agentId) {
      fetchAgent();
    }
  }, [agentId]);

  const fetchAgent = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("agents")
        .select("*")
        .eq("id", agentId)
        .single();

      if (error) throw error;

      setFormData({
        full_name: data.full_name || "",
        email: data.email || "",
        phone: data.phone || "",
        agent_type: data.agent_type || "delivery",
        agent_code: data.agent_code || "",
        assigned_location: data.assigned_location || "",
        address: data.address || "",
        national_id: data.national_id || "",
        bank_account: data.bank_account || "",
        emergency_contact: data.emergency_contact || "",
        emergency_phone: data.emergency_phone || "",
        verification_status: data.verification_status || "pending",
        verification_notes: data.verification_notes || "",
        is_active: data.is_active !== false,
        notes: data.notes || "",
      });
    } catch (error) {
      console.error("Error fetching agent:", error);
      alert("Failed to load agent: " + error.message);
      router.push("/admin/agents");
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

      // Update agent
      const { error } = await supabase
        .from("agents")
        .update(formData)
        .eq("id", agentId);

      if (error) throw error;

      alert("Agent updated successfully!");
      router.push("/admin/agents");
    } catch (error) {
      console.error("Error updating agent:", error);
      alert("Failed to update agent: " + error.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner-large"></div>
        <p>Loading agent...</p>
      </div>
    );
  }

  return (
    <div className="create-agent-container">
      {/* Header */}
      <div className="page-header">
        <div>
          <button className="back-button" onClick={() => router.back()}>
            <ArrowLeft size={20} />
            Back
          </button>
          <h1>Edit Agent</h1>
          <p>Update agent information</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="agent-form">
        <div className="form-grid">
          {/* Personal Information */}
          <div className="form-section">
            <h3>Personal Information</h3>

            <div className="form-group">
              <label htmlFor="full_name">Full Name *</label>
              <input
                type="text"
                id="full_name"
                name="full_name"
                value={formData.full_name}
                onChange={handleInputChange}
                required
                placeholder="e.g., John Doe"
              />
            </div>

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
                  placeholder="agent@example.com"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number *</label>
              <div className="input-with-icon">
                <Phone size={18} />
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="national_id">National ID / SSN</label>
              <input
                type="text"
                id="national_id"
                name="national_id"
                value={formData.national_id}
                onChange={handleInputChange}
                placeholder="123-45-6789"
              />
            </div>

            <div className="form-group">
              <label htmlFor="address">Address</label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                rows="3"
                placeholder="Full residential address"
              />
            </div>
          </div>

          {/* Agent Details */}
          <div className="form-section">
            <h3>Agent Details</h3>

            <div className="form-group">
              <label htmlFor="agent_type">Agent Type *</label>
              <select
                id="agent_type"
                name="agent_type"
                value={formData.agent_type}
                onChange={handleInputChange}
                required
              >
                <option value="delivery">Delivery Agent</option>
                <option value="sales">Sales Agent</option>
                <option value="support">Support Agent</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="agent_code">Agent Code</label>
              <input
                type="text"
                id="agent_code"
                name="agent_code"
                value={formData.agent_code}
                onChange={handleInputChange}
                placeholder="e.g., DE1234"
              />
            </div>

            <div className="form-group">
              <label htmlFor="assigned_location">Assigned Location</label>
              <div className="input-with-icon">
                <MapPin size={18} />
                <input
                  type="text"
                  id="assigned_location"
                  name="assigned_location"
                  value={formData.assigned_location}
                  onChange={handleInputChange}
                  placeholder="e.g., Downtown, Zone A"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="bank_account">Bank Account Number</label>
              <input
                type="text"
                id="bank_account"
                name="bank_account"
                value={formData.bank_account}
                onChange={handleInputChange}
                placeholder="For salary payments"
              />
            </div>

            <h3 style={{ marginTop: "2rem" }}>Emergency Contact</h3>

            <div className="form-group">
              <label htmlFor="emergency_contact">Contact Name</label>
              <input
                type="text"
                id="emergency_contact"
                name="emergency_contact"
                value={formData.emergency_contact}
                onChange={handleInputChange}
                placeholder="Emergency contact person"
              />
            </div>

            <div className="form-group">
              <label htmlFor="emergency_phone">Contact Phone</label>
              <div className="input-with-icon">
                <Phone size={18} />
                <input
                  type="tel"
                  id="emergency_phone"
                  name="emergency_phone"
                  value={formData.emergency_phone}
                  onChange={handleInputChange}
                  placeholder="Emergency contact number"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Full Width Section */}
        <div className="form-section">
          <h3>Settings & Notes</h3>

          <div className="form-row">
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
                Only active agents can receive assignments
              </span>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="verification_notes">Verification Notes</label>
            <textarea
              id="verification_notes"
              name="verification_notes"
              value={formData.verification_notes}
              onChange={handleInputChange}
              rows="2"
              placeholder="Notes about verification status..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="notes">Internal Notes</label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              rows="4"
              placeholder="Additional notes about this agent..."
            />
          </div>
        </div>

        {/* Warning Box */}
        <div className="warning-box">
          <h4>⚠️ Important Notes</h4>
          <ul>
            <li>
              Changing verification status will affect the agent's ability to
              access the system
            </li>
            <li>
              Deactivating an agent will stop all their assignments and tasks
            </li>
            <li>
              Agent code should remain unique and not be changed unless
              necessary
            </li>
            <li>
              Contact information changes should be communicated to the agent
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

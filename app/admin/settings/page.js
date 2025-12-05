"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase";
import {
  Settings,
  Save,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  DollarSign,
  Percent,
  Mail,
  Shield,
  Globe,
  CreditCard,
} from "lucide-react";
import "../../styles/admin-settings.css";

export default function PlatformSettingsPage() {
  const router = useRouter();
  const { user, profile, isSuperAdmin } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({
    // Financial settings
    platform_fee: 10,
    minimum_payout: 50,
    commission_rate: 5,

    // Platform settings
    maintenance_mode: false,
    registration_enabled: true,
    email_verification_required: true,

    // Email settings
    smtp_enabled: false,
    support_email: "",

    // Payment settings
    stripe_enabled: false,
    mtn_mobile_money_enabled: false,
    mtn_api_key: "",
    mtn_subscription_key: "",
  });

  // Check permissions
  useEffect(() => {
    if (!isSuperAdmin) {
      router.push("/admin");
    }
  }, [isSuperAdmin, router]);

  // Load settings
  useEffect(() => {
    if (isSuperAdmin) {
      fetchSettings();
    }
  }, [isSuperAdmin]);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("platform_settings")
        .select("*");

      if (error) throw error;

      // Convert settings array to object
      const settingsObj = {};
      data.forEach((setting) => {
        settingsObj[setting.key] = setting.value;
      });

      setSettings((prev) => ({ ...prev, ...settingsObj }));
    } catch (error) {
      console.error("Error fetching settings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSetting = async (key, value) => {
    try {
      setSaving(true);
      const { error } = await supabase.from("platform_settings").upsert({
        key,
        value,
        category: getCategoryForKey(key),
        updated_by: user.id,
      });

      if (error) throw error;

      setSettings((prev) => ({ ...prev, [key]: value }));
      alert("Setting saved successfully!");
    } catch (error) {
      console.error("Error saving setting:", error);
      alert("Failed to save setting: " + error.message);
    } finally {
      setSaving(false);
    }
  };

  const getCategoryForKey = (key) => {
    const categories = {
      platform_fee: "financial",
      minimum_payout: "financial",
      commission_rate: "financial",
      maintenance_mode: "platform",
      registration_enabled: "platform",
      email_verification_required: "platform",
      smtp_enabled: "email",
      support_email: "email",
      stripe_enabled: "payment",
      mtn_mobile_money_enabled: "payment",
      mtn_api_key: "payment",
      mtn_subscription_key: "payment",
    };
    return categories[key] || "platform";
  };

  const handleInputChange = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner-large"></div>
        <p>Loading platform settings...</p>
      </div>
    );
  }

  return (
    <div className="settings-container">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1>Platform Settings</h1>
          <p>Configure global platform settings and preferences</p>
        </div>
        <div className="header-actions">
          <button
            className="btn-secondary"
            onClick={fetchSettings}
            disabled={loading}
          >
            <RefreshCw size={18} />
            Refresh
          </button>
        </div>
      </div>

      <div className="settings-grid">
        {/* Financial Settings */}
        <div className="settings-card">
          <div className="card-header">
            <DollarSign size={24} />
            <h3>Financial Settings</h3>
          </div>
          <div className="card-content">
            <div className="setting-item">
              <label>Platform Fee (%)</label>
              <div className="input-group">
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  value={settings.platform_fee || 10}
                  onChange={(e) =>
                    handleInputChange(
                      "platform_fee",
                      parseFloat(e.target.value)
                    )
                  }
                />
                <button
                  className="btn-save"
                  onClick={() =>
                    handleSaveSetting("platform_fee", settings.platform_fee)
                  }
                  disabled={saving}
                >
                  <Save size={16} />
                </button>
              </div>
              <p className="setting-description">
                Percentage fee charged on all transactions
              </p>
            </div>

            <div className="setting-item">
              <label>Minimum Payout (GH₵)</label>
              <div className="input-group">
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={settings.minimum_payout || 50}
                  onChange={(e) =>
                    handleInputChange(
                      "minimum_payout",
                      parseFloat(e.target.value)
                    )
                  }
                />
                <button
                  className="btn-save"
                  onClick={() =>
                    handleSaveSetting("minimum_payout", settings.minimum_payout)
                  }
                  disabled={saving}
                >
                  <Save size={16} />
                </button>
              </div>
              <p className="setting-description">
                Minimum amount required for vendor payouts in Ghanaian Cedis
              </p>
            </div>

            <div className="setting-item">
              <label>Agent Commission (%)</label>
              <div className="input-group">
                <input
                  type="number"
                  min="0"
                  max="50"
                  step="0.1"
                  value={settings.commission_rate || 5}
                  onChange={(e) =>
                    handleInputChange(
                      "commission_rate",
                      parseFloat(e.target.value)
                    )
                  }
                />
                <button
                  className="btn-save"
                  onClick={() =>
                    handleSaveSetting(
                      "commission_rate",
                      settings.commission_rate
                    )
                  }
                  disabled={saving}
                >
                  <Save size={16} />
                </button>
              </div>
              <p className="setting-description">
                Commission rate for delivery agents
              </p>
            </div>
          </div>
        </div>

        {/* Platform Settings */}
        <div className="settings-card">
          <div className="card-header">
            <Globe size={24} />
            <h3>Platform Settings</h3>
          </div>
          <div className="card-content">
            <div className="setting-item">
              <label>Maintenance Mode</label>
              <div className="toggle-group">
                <label className="toggle">
                  <input
                    type="checkbox"
                    checked={settings.maintenance_mode || false}
                    onChange={(e) =>
                      handleInputChange("maintenance_mode", e.target.checked)
                    }
                  />
                  <span className="toggle-slider"></span>
                </label>
                <button
                  className="btn-save"
                  onClick={() =>
                    handleSaveSetting(
                      "maintenance_mode",
                      settings.maintenance_mode
                    )
                  }
                  disabled={saving}
                >
                  <Save size={16} />
                </button>
              </div>
              <p className="setting-description">
                Enable maintenance mode to restrict access
              </p>
            </div>

            <div className="setting-item">
              <label>User Registration</label>
              <div className="toggle-group">
                <label className="toggle">
                  <input
                    type="checkbox"
                    checked={settings.registration_enabled !== false}
                    onChange={(e) =>
                      handleInputChange(
                        "registration_enabled",
                        e.target.checked
                      )
                    }
                  />
                  <span className="toggle-slider"></span>
                </label>
                <button
                  className="btn-save"
                  onClick={() =>
                    handleSaveSetting(
                      "registration_enabled",
                      settings.registration_enabled
                    )
                  }
                  disabled={saving}
                >
                  <Save size={16} />
                </button>
              </div>
              <p className="setting-description">
                Allow new users to register accounts
              </p>
            </div>

            <div className="setting-item">
              <label>Email Verification</label>
              <div className="toggle-group">
                <label className="toggle">
                  <input
                    type="checkbox"
                    checked={settings.email_verification_required !== false}
                    onChange={(e) =>
                      handleInputChange(
                        "email_verification_required",
                        e.target.checked
                      )
                    }
                  />
                  <span className="toggle-slider"></span>
                </label>
                <button
                  className="btn-save"
                  onClick={() =>
                    handleSaveSetting(
                      "email_verification_required",
                      settings.email_verification_required
                    )
                  }
                  disabled={saving}
                >
                  <Save size={16} />
                </button>
              </div>
              <p className="setting-description">
                Require email verification for new accounts
              </p>
            </div>
          </div>
        </div>

        {/* Email Settings */}
        <div className="settings-card">
          <div className="card-header">
            <Mail size={24} />
            <h3>Email Settings</h3>
          </div>
          <div className="card-content">
            <div className="setting-item">
              <label>SMTP Enabled</label>
              <div className="toggle-group">
                <label className="toggle">
                  <input
                    type="checkbox"
                    checked={settings.smtp_enabled || false}
                    onChange={(e) =>
                      handleInputChange("smtp_enabled", e.target.checked)
                    }
                  />
                  <span className="toggle-slider"></span>
                </label>
                <button
                  className="btn-save"
                  onClick={() =>
                    handleSaveSetting("smtp_enabled", settings.smtp_enabled)
                  }
                  disabled={saving}
                >
                  <Save size={16} />
                </button>
              </div>
              <p className="setting-description">
                Enable SMTP for sending emails
              </p>
            </div>

            <div className="setting-item">
              <label>Support Email</label>
              <div className="input-group">
                <input
                  type="email"
                  placeholder="support@yourdomain.com"
                  value={settings.support_email || ""}
                  onChange={(e) =>
                    handleInputChange("support_email", e.target.value)
                  }
                />
                <button
                  className="btn-save"
                  onClick={() =>
                    handleSaveSetting("support_email", settings.support_email)
                  }
                  disabled={saving}
                >
                  <Save size={16} />
                </button>
              </div>
              <p className="setting-description">
                Email address for customer support
              </p>
            </div>
          </div>
        </div>

        {/* Payment Settings */}
        <div className="settings-card">
          <div className="card-header">
            <CreditCard size={24} />
            <h3>Payment Settings</h3>
          </div>
          <div className="card-content">
            <div className="setting-item">
              <label>Stripe Integration</label>
              <div className="toggle-group">
                <label className="toggle">
                  <input
                    type="checkbox"
                    checked={settings.stripe_enabled || false}
                    onChange={(e) =>
                      handleInputChange("stripe_enabled", e.target.checked)
                    }
                  />
                  <span className="toggle-slider"></span>
                </label>
                <button
                  className="btn-save"
                  onClick={() =>
                    handleSaveSetting("stripe_enabled", settings.stripe_enabled)
                  }
                  disabled={saving}
                >
                  <Save size={16} />
                </button>
              </div>
              <p className="setting-description">
                Enable Stripe payment processing for card payments
              </p>
            </div>

            <div className="setting-item">
              <label>MTN Mobile Money</label>
              <div className="toggle-group">
                <label className="toggle">
                  <input
                    type="checkbox"
                    checked={settings.mtn_mobile_money_enabled || false}
                    onChange={(e) =>
                      handleInputChange(
                        "mtn_mobile_money_enabled",
                        e.target.checked
                      )
                    }
                  />
                  <span className="toggle-slider"></span>
                </label>
                <button
                  className="btn-save"
                  onClick={() =>
                    handleSaveSetting(
                      "mtn_mobile_money_enabled",
                      settings.mtn_mobile_money_enabled
                    )
                  }
                  disabled={saving}
                >
                  <Save size={16} />
                </button>
              </div>
              <p className="setting-description">
                Enable MTN Mobile Money for mobile payments
              </p>
            </div>

            <div className="setting-item">
              <label>MTN API Key</label>
              <div className="input-group">
                <input
                  type="password"
                  placeholder="Enter MTN API Key"
                  value={settings.mtn_api_key || ""}
                  onChange={(e) =>
                    handleInputChange("mtn_api_key", e.target.value)
                  }
                />
                <button
                  className="btn-save"
                  onClick={() =>
                    handleSaveSetting("mtn_api_key", settings.mtn_api_key)
                  }
                  disabled={saving}
                >
                  <Save size={16} />
                </button>
              </div>
              <p className="setting-description">
                API key for MTN Mobile Money integration
              </p>
            </div>

            <div className="setting-item">
              <label>MTN Subscription Key</label>
              <div className="input-group">
                <input
                  type="password"
                  placeholder="Enter MTN Subscription Key"
                  value={settings.mtn_subscription_key || ""}
                  onChange={(e) =>
                    handleInputChange("mtn_subscription_key", e.target.value)
                  }
                />
                <button
                  className="btn-save"
                  onClick={() =>
                    handleSaveSetting(
                      "mtn_subscription_key",
                      settings.mtn_subscription_key
                    )
                  }
                  disabled={saving}
                >
                  <Save size={16} />
                </button>
              </div>
              <p className="setting-description">
                Subscription key for MTN Mobile Money API
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";
import {
  Store,
  Upload,
  CheckCircle,
  XCircle,
  AlertCircle,
  ArrowLeft,
  FileText,
  Building,
  Phone,
  Mail,
  MapPin,
  DollarSign,
  Users,
} from "lucide-react";
import "../styles/vendor-application.css";

export default function VendorApplicationPage() {
  const router = useRouter();
  const { user, profile, isAuthenticated, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Form data
  const [formData, setFormData] = useState({
    businessName: "",
    businessType: "",
    contactName: "",
    email: "",
    phone: "",
    businessAddress: "",
    businessDescription: "",
    registrationNumber: "",
    taxId: "",
    website: "",
    socialMedia: {
      facebook: "",
      instagram: "",
      twitter: "",
    },
    documents: [],
    termsAccepted: false,
  });

  // File uploads
  const [uploadedFiles, setUploadedFiles] = useState({
    businessLicense: null,
    taxCertificate: null,
    identityProof: null,
    businessRegistration: null,
  });

  // Redirect if not authenticated (only after auth loading is complete)
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/");
    } else if (!authLoading && isAuthenticated) {
      // Pre-fill form with user data
      setFormData((prev) => ({
        ...prev,
        contactName: profile?.full_name || "",
        email: user?.email || "",
        phone: profile?.phone || "",
      }));
    }
  }, [authLoading, isAuthenticated, profile, user, router]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSocialMediaChange = (platform, value) => {
    setFormData((prev) => ({
      ...prev,
      socialMedia: {
        ...prev.socialMedia,
        [platform]: value,
      },
    }));
  };

  const handleFileUpload = async (fileType, file) => {
    if (!file) return;

    // Validate file type and size
    const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(file.type)) {
      alert("Please upload a valid file type (JPEG, PNG, or PDF)");
      return;
    }

    if (file.size > maxSize) {
      alert("File size must be less than 5MB");
      return;
    }

    try {
      // Upload to Supabase Storage
      const fileExt = file.name.split(".").pop();
      const fileName = `${user.id}/${fileType}_${Date.now()}.${fileExt}`;
      const { data, error } = await supabase.storage
        .from("vendor-documents")
        .upload(fileName, file);

      if (error) throw error;

      // Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from("vendor-documents").getPublicUrl(fileName);

      setUploadedFiles((prev) => ({
        ...prev,
        [fileType]: {
          name: file.name,
          url: publicUrl,
          size: file.size,
        },
      }));
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload file. Please try again.");
    }
  };

  const validateStep = (currentStep) => {
    switch (currentStep) {
      case 1:
        if (
          !formData.businessName ||
          !formData.businessType ||
          !formData.contactName
        ) {
          setError("Please fill in all required business information fields");
          return false;
        }
        break;
      case 2:
        if (!formData.businessAddress || !formData.businessDescription) {
          setError("Please fill in business address and description");
          return false;
        }
        break;
      case 3:
        if (!uploadedFiles.businessLicense || !uploadedFiles.identityProof) {
          setError(
            "Please upload required documents (Business License and Identity Proof)"
          );
          return false;
        }
        if (!formData.termsAccepted) {
          setError("Please accept the terms and conditions");
          return false;
        }
        break;
    }
    setError("");
    return true;
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
    setError("");
  };

  const handleSubmit = async () => {
    if (!validateStep(step)) return;

    setLoading(true);
    setError("");

    try {
      // Create vendor application
      const applicationData = {
        user_id: user.id,
        email: formData.email,
        business_name: formData.businessName,
        contact_name: formData.contactName,
        phone: formData.phone,
        business_type: formData.businessType,
        business_address: formData.businessAddress,
        description: formData.businessDescription,
        registration_number: formData.registrationNumber,
        tax_id: formData.taxId,
        website: formData.website,
        social_media: formData.socialMedia,
        documents: {
          businessLicense: uploadedFiles.businessLicense,
          taxCertificate: uploadedFiles.taxCertificate,
          identityProof: uploadedFiles.identityProof,
          businessRegistration: uploadedFiles.businessRegistration,
        },
      };

      const { data, error } = await supabase
        .from("vendor_applications")
        .insert([applicationData])
        .select();

      if (error) throw error;

      setSuccess(true);

      // Redirect after success
      setTimeout(() => {
        router.push("/");
      }, 3000);
    } catch (error) {
      console.error("Error submitting application:", error);
      setError("Failed to submit application. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Show loading while checking authentication
  if (authLoading) {
    return (
      <div className="application-loading">
        <div className="spinner-large"></div>
        <p>Checking authentication...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect
  }

  if (success) {
    return (
      <div className="application-success">
        <div className="success-content">
          <CheckCircle size={64} className="success-icon" />
          <h2>Application Submitted Successfully!</h2>
          <p>
            Thank you for your interest in becoming a vendor on our platform.
            Your application has been submitted and is currently under review.
          </p>
          <div className="success-details">
            <p>
              <strong>What happens next?</strong>
            </p>
            <ul>
              <li>
                Our team will review your application within 2-3 business days
              </li>
              <li>You'll receive an email notification with the decision</li>
              <li>
                If approved, you'll get access to vendor dashboard and selling
                tools
              </li>
            </ul>
          </div>
          <button onClick={() => router.push("/")} className="btn-primary">
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  const businessTypes = [
    "Manufacturer",
    "Wholesaler",
    "Retailer",
    "Distributor",
    "Service Provider",
    "Digital Products",
    "Handmade Crafts",
    "Other",
  ];

  return (
    <div className="vendor-application-container">
      {/* Header */}
      <div className="application-header">
        <button onClick={() => router.back()} className="back-button">
          <ArrowLeft size={20} />
          Back
        </button>
        <div className="header-content">
          <h1>Become a Vendor & Affiliate</h1>
          <p>Join our marketplace, advertise products, and earn by referring buyers and other vendors</p>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="progress-steps">
        <div
          className={`step ${step >= 1 ? "active" : ""} ${
            step > 1 ? "completed" : ""
          }`}
        >
          <div className="step-number">1</div>
          <span>Business Info</span>
        </div>
        <div
          className={`step ${step >= 2 ? "active" : ""} ${
            step > 2 ? "completed" : ""
          }`}
        >
          <div className="step-number">2</div>
          <span>Details</span>
        </div>
        <div className={`step ${step >= 3 ? "active" : ""}`}>
          <div className="step-number">3</div>
          <span>Documents</span>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="error-message">
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
      )}

      {/* Step 1: Business Information */}
      {step === 1 && (
        <div className="application-step">
          <div className="step-content">
            <h3>Business Information</h3>
            <p>Tell us about your business</p>

            <div className="form-grid">
              <div className="form-group">
                <label>Business Name *</label>
                <input
                  type="text"
                  value={formData.businessName}
                  onChange={(e) =>
                    handleInputChange("businessName", e.target.value)
                  }
                  placeholder="Enter your business name"
                  required
                />
              </div>

              <div className="form-group">
                <label>Business Type *</label>
                <select
                  value={formData.businessType}
                  onChange={(e) =>
                    handleInputChange("businessType", e.target.value)
                  }
                  required
                >
                  <option value="">Select business type</option>
                  {businessTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Contact Name *</label>
                <input
                  type="text"
                  value={formData.contactName}
                  onChange={(e) =>
                    handleInputChange("contactName", e.target.value)
                  }
                  placeholder="Primary contact person"
                  required
                />
              </div>

              <div className="form-group">
                <label>Email Address *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="business@example.com"
                  required
                />
              </div>

              <div className="form-group">
                <label>Phone Number *</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="+233 XX XXX XXXX"
                  required
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Business Details */}
      {step === 2 && (
        <div className="application-step">
          <div className="step-content">
            <h3>Business Details</h3>
            <p>Provide more information about your business</p>

            <div className="form-grid">
              <div className="form-group full-width">
                <label>Business Address *</label>
                <textarea
                  value={formData.businessAddress}
                  onChange={(e) =>
                    handleInputChange("businessAddress", e.target.value)
                  }
                  placeholder="Full business address including city, region, and country"
                  rows={3}
                  required
                />
              </div>

              <div className="form-group full-width">
                <label>Business Description *</label>
                <textarea
                  value={formData.businessDescription}
                  onChange={(e) =>
                    handleInputChange("businessDescription", e.target.value)
                  }
                  placeholder="Describe your business, products, and target market"
                  rows={4}
                  required
                />
              </div>

              <div className="form-group">
                <label>Registration Number</label>
                <input
                  type="text"
                  value={formData.registrationNumber}
                  onChange={(e) =>
                    handleInputChange("registrationNumber", e.target.value)
                  }
                  placeholder="Business registration number"
                />
              </div>

              <div className="form-group">
                <label>Tax ID</label>
                <input
                  type="text"
                  value={formData.taxId}
                  onChange={(e) => handleInputChange("taxId", e.target.value)}
                  placeholder="Tax identification number"
                />
              </div>

              <div className="form-group">
                <label>Website</label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => handleInputChange("website", e.target.value)}
                  placeholder="https://yourwebsite.com"
                />
              </div>
            </div>

            <div className="social-media-section">
              <h4>Social Media (Optional)</h4>
              <div className="social-media-grid">
                <div className="form-group">
                  <label>Facebook</label>
                  <input
                    type="url"
                    value={formData.socialMedia.facebook}
                    onChange={(e) =>
                      handleSocialMediaChange("facebook", e.target.value)
                    }
                    placeholder="https://facebook.com/yourpage"
                  />
                </div>

                <div className="form-group">
                  <label>Instagram</label>
                  <input
                    type="url"
                    value={formData.socialMedia.instagram}
                    onChange={(e) =>
                      handleSocialMediaChange("instagram", e.target.value)
                    }
                    placeholder="https://instagram.com/yourhandle"
                  />
                </div>

                <div className="form-group">
                  <label>Twitter</label>
                  <input
                    type="url"
                    value={formData.socialMedia.twitter}
                    onChange={(e) =>
                      handleSocialMediaChange("twitter", e.target.value)
                    }
                    placeholder="https://twitter.com/yourhandle"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Documents */}
      {step === 3 && (
        <div className="application-step">
          <div className="step-content">
            <h3>Document Upload</h3>
            <p>Please upload the required documents to verify your business</p>

            <div className="documents-section">
              <div className="document-upload">
                <div className="document-item">
                  <div className="document-header">
                    <FileText size={24} />
                    <div>
                      <h5>Business License *</h5>
                      <p>JPEG, PNG, or PDF (Max 5MB)</p>
                    </div>
                  </div>
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png,.pdf"
                    onChange={(e) =>
                      handleFileUpload("businessLicense", e.target.files[0])
                    }
                    className="file-input"
                  />
                  {uploadedFiles.businessLicense && (
                    <div className="file-uploaded">
                      <CheckCircle size={16} />
                      <span>{uploadedFiles.businessLicense.name}</span>
                    </div>
                  )}
                </div>

                <div className="document-item">
                  <div className="document-header">
                    <Users size={24} />
                    <div>
                      <h5>Identity Proof *</h5>
                      <p>National ID, Passport, or Driver's License</p>
                    </div>
                  </div>
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png,.pdf"
                    onChange={(e) =>
                      handleFileUpload("identityProof", e.target.files[0])
                    }
                    className="file-input"
                  />
                  {uploadedFiles.identityProof && (
                    <div className="file-uploaded">
                      <CheckCircle size={16} />
                      <span>{uploadedFiles.identityProof.name}</span>
                    </div>
                  )}
                </div>

                <div className="document-item">
                  <div className="document-header">
                    <Building size={24} />
                    <div>
                      <h5>Tax Certificate</h5>
                      <p>Tax clearance certificate (Optional)</p>
                    </div>
                  </div>
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png,.pdf"
                    onChange={(e) =>
                      handleFileUpload("taxCertificate", e.target.files[0])
                    }
                    className="file-input"
                  />
                  {uploadedFiles.taxCertificate && (
                    <div className="file-uploaded">
                      <CheckCircle size={16} />
                      <span>{uploadedFiles.taxCertificate.name}</span>
                    </div>
                  )}
                </div>

                <div className="document-item">
                  <div className="document-header">
                    <Store size={24} />
                    <div>
                      <h5>Business Registration</h5>
                      <p>Certificate of incorporation (Optional)</p>
                    </div>
                  </div>
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png,.pdf"
                    onChange={(e) =>
                      handleFileUpload(
                        "businessRegistration",
                        e.target.files[0]
                      )
                    }
                    className="file-input"
                  />
                  {uploadedFiles.businessRegistration && (
                    <div className="file-uploaded">
                      <CheckCircle size={16} />
                      <span>{uploadedFiles.businessRegistration.name}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="terms-section">
                <label className="terms-checkbox">
                  <input
                    type="checkbox"
                    checked={formData.termsAccepted}
                    onChange={(e) =>
                      handleInputChange("termsAccepted", e.target.checked)
                    }
                  />
                  <span>
                    I agree to the vendor terms and conditions. I understand that as a vendor, my primary role involves advertising and affiliating users to become buyers or other vendors, for which I will be compensated. I accept the commission rates and platform policies.
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="step-navigation">
        {step > 1 && (
          <button onClick={prevStep} className="btn-secondary">
            Previous
          </button>
        )}

        <div className="step-indicator">Step {step} of 3</div>

        {step < 3 ? (
          <button onClick={nextStep} className="btn-primary">
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="btn-primary"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Application"}
          </button>
        )}
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";
import {
  Truck, // Changed icon
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
  Car, // Added icon
  CreditCard, // Added icon
  Users,
} from "lucide-react";
import "../styles/vendor-application.css"; // Re-using vendor styles for consistency

export default function AgentApplicationPage() {
  const router = useRouter();
  const { user, profile, isAuthenticated, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Form data
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    agentType: "",
    assignedLocation: "",
    vehicleType: "",
    vehicleModel: "",
    licensePlate: "",
    bankName: "",
    accountNumber: "",
    documents: [],
    termsAccepted: false,
  });

  // File uploads
  const [uploadedFiles, setUploadedFiles] = useState({
    identityProof: null,
    drivingLicense: null,
    vehicleRegistration: null,
    insurance: null,
  });

  // Redirect if not authenticated (only after auth loading is complete)
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/");
    } else if (!authLoading && isAuthenticated) {
      // Pre-fill form with user data
      setFormData((prev) => ({
        ...prev,
        fullName: profile?.full_name || "",
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
        .from("agent-documents") // Changed bucket name
        .upload(fileName, file);

      if (error) throw error;

      // Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from("agent-documents").getPublicUrl(fileName);

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
          !formData.fullName ||
          !formData.phone ||
          !formData.agentType ||
          !formData.assignedLocation
        ) {
          setError("Please fill in all personal and role information fields");
          return false;
        }
        break;
      case 2:
        if (formData.agentType === "delivery") {
             if (!formData.vehicleType || !formData.licensePlate) {
                 setError("Please fill in vehicle details");
                 return false;
             }
        }
        if (!formData.bankName || !formData.accountNumber) {
            setError("Please fill in bank details for payouts");
             return false;
        }
        break;
      case 3:
        if (!uploadedFiles.identityProof) {
          setError(
            "Please upload Identity Proof"
          );
          return false;
        }
        if (formData.agentType === "delivery" && !uploadedFiles.drivingLicense) {
             setError("Please upload Driving License");
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
      // Create agent profile directly in 'agents' table with pending status
      const agentData = {
        user_id: user.id,
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        agent_type: formData.agentType,
        assigned_location: formData.assignedLocation,
        vehicle_info: {
             type: formData.vehicleType,
             model: formData.vehicleModel,
             license_plate: formData.licensePlate
        },
        bank_details: {
            bank_name: formData.bankName,
            account_number: formData.accountNumber
        },
        documents: {
          identityProof: uploadedFiles.identityProof,
          drivingLicense: uploadedFiles.drivingLicense,
          vehicleRegistration: uploadedFiles.vehicleRegistration,
          insurance: uploadedFiles.insurance,
        },
        verification_status: 'pending',
        is_active: false // Inactive until verified
      };

      const { data, error } = await supabase
        .from("agents")
        .insert([agentData])
        .select();

      if (error) throw error;

      setSuccess(true);

      // Redirect after success
      setTimeout(() => {
        router.push("/");
      }, 3000);
    } catch (error) {
      console.error("Error submitting application:", error);
      setError("Failed to submit application. Please try again. " + error.message);
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
          <h2>Agent Application Submitted!</h2>
          <p>
            Thank you for applying to become an agent. Your application is under review.
          </p>
          <div className="success-details">
            <p>
              <strong>Next Steps:</strong>
            </p>
            <ul>
              <li>
                Our team will verify your documents within 2-3 business days.
              </li>
              <li>You will receive an email once your account is activated.</li>
              <li>
                Once approved, you can start accepting tasks and earning commissions.
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

  const agentTypes = [
    { value: "delivery", label: "Delivery Agent" },
    { value: "sales", label: "Sales Agent" },
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
          <h1>Become an Agent</h1>
          <p>Join our logistics and verification network to earn extra income</p>
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
          <span>Personal Info</span>
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

      {/* Step 1: Personal & Role Information */}
      {step === 1 && (
        <div className="application-step">
          <div className="step-content">
            <h3>Personal Information</h3>
            <p>Tell us about yourself and your role</p>

            <div className="form-grid">
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) =>
                    handleInputChange("fullName", e.target.value)
                  }
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="form-group">
                <label>Agent Type *</label>
                <select
                  value={formData.agentType}
                  onChange={(e) =>
                    handleInputChange("agentType", e.target.value)
                  }
                  required
                >
                  <option value="">Select agent type</option>
                  {agentTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Email Address *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="your.email@example.com"
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

                <div className="form-group full-width">
                <label>Assigned Location (City/Region) *</label>
                <input
                  type="text"
                  value={formData.assignedLocation}
                  onChange={(e) => handleInputChange("assignedLocation", e.target.value)}
                  placeholder="e.g. Accra, Kumasi"
                  required
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Vehicle & Bank Details */}
      {step === 2 && (
        <div className="application-step">
          <div className="step-content">
            <h3>Additional Details</h3>
            <p>Vehicle information (if applicable) and payment details</p>

            <div className="form-grid">
               {formData.agentType === 'delivery' && (
                   <>
                    <h4 className="full-width" style={{marginTop: '0', marginBottom: '10px', color: '#666'}}>Vehicle Information</h4>
                      <div className="form-group">
                        <label>Vehicle Type *</label>
                        <select
                          value={formData.vehicleType}
                          onChange={(e) =>
                            handleInputChange("vehicleType", e.target.value)
                          }
                        >
                          <option value="">Select vehicle</option>
                          <option value="motorbike">Motorbike</option>
                          <option value="car">Car</option>
                          <option value="van">Van</option>
                          <option value="truck">Truck</option>
                          <option value="bicycle">Bicycle</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label>Vehicle Model</label>
                        <input
                          type="text"
                          value={formData.vehicleModel}
                          onChange={(e) =>
                            handleInputChange("vehicleModel", e.target.value)
                          }
                          placeholder="e.g. Toyota Corolla"
                        />
                      </div>

                      <div className="form-group">
                        <label>License Plate Number *</label>
                        <input
                          type="text"
                          value={formData.licensePlate}
                          onChange={(e) =>
                            handleInputChange("licensePlate", e.target.value)
                          }
                          placeholder="Enter license plate"
                        />
                      </div>
                      <div className="form-group"></div> 
                   </>
               )}

              <h4 className="full-width" style={{marginTop: '10px', marginBottom: '10px', color: '#666'}}>Bank Details (For Payouts)</h4>
              
              <div className="form-group">
                <label>Bank Name *</label>
                <input
                  type="text"
                  value={formData.bankName}
                  onChange={(e) => handleInputChange("bankName", e.target.value)}
                  placeholder="e.g. GCB Bank"
                  required
                />
              </div>

              <div className="form-group">
                <label>Account Number / Mobile Money *</label>
                <input
                  type="text"
                  value={formData.accountNumber}
                  onChange={(e) => handleInputChange("accountNumber", e.target.value)}
                  placeholder="Enter account number"
                  required
                />
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
            <p>Please upload the required documents for verification</p>

            <div className="documents-section">
              <div className="document-upload">
                <div className="document-item">
                  <div className="document-header">
                    <Users size={24} />
                    <div>
                      <h5>Identity Proof *</h5>
                      <p>National ID, Passport, or Voter ID</p>
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
                      <div className="file-info">
                        <CheckCircle size={16} />
                        <span>{uploadedFiles.identityProof.name}</span>
                      </div>
                      {uploadedFiles.identityProof.url && (uploadedFiles.identityProof.name.match(/\.(jpg|jpeg|png)$/i)) && (
                        <div className="file-preview">
                          <img 
                            src={uploadedFiles.identityProof.url} 
                            alt="Identity Proof Preview" 
                            style={{ maxWidth: '100%', maxHeight: '200px', marginTop: '10px', borderRadius: '4px' }} 
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {formData.agentType === 'delivery' && (
                    <div className="document-item">
                    <div className="document-header">
                        <Car size={24} />
                        <div>
                        <h5>Driving License *</h5>
                        <p>Valid driving license for your vehicle type</p>
                        </div>
                    </div>
                    <input
                        type="file"
                        accept=".jpg,.jpeg,.png,.pdf"
                        onChange={(e) =>
                        handleFileUpload("drivingLicense", e.target.files[0])
                        }
                        className="file-input"
                    />
                    {uploadedFiles.drivingLicense && (
                        <div className="file-uploaded">
                        <div className="file-info">
                            <CheckCircle size={16} />
                            <span>{uploadedFiles.drivingLicense.name}</span>
                        </div>
                        {uploadedFiles.drivingLicense.url && (uploadedFiles.drivingLicense.name.match(/\.(jpg|jpeg|png)$/i)) && (
                            <div className="file-preview">
                            <img 
                                src={uploadedFiles.drivingLicense.url} 
                                alt="Driving License Preview" 
                                style={{ maxWidth: '100%', maxHeight: '200px', marginTop: '10px', borderRadius: '4px' }} 
                            />
                            </div>
                        )}
                        </div>
                    )}
                    </div>
                )}
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
                    I agree to the agent terms and conditions. I verify that all provided information is accurate. I understand that background checks may be conducted.
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

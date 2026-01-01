"use client";

import { useState, useEffect, useRef } from "react";
import {
  X,
  UserCheck,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  CheckCircle,
  XCircle,
  Phone,
  FileText,
  Package,
  Heart,
  MessageSquare,
  LogOut,
  Settings,
  CreditCard,
  Truck,
  ShoppingBag,
  Shield
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../../lib/supabase";
import "../styles/profilemodal.css";

export default function ProfileModal({ isOpen, onClose, variant = "auto" }) {
  const { signUp, signIn, signOut, isAuthenticated, user, profile, isAdmin, isSuperAdmin, isModerator, loading: authLoading } = useAuth();
  
  const [isLogin, setIsLogin] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [unreadMessagesCount, setUnreadMessagesCount] = useState(0);

  // Form fields
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);

  // Validation states
  const [usernameError, setUsernameError] = useState("");
  const [usernameSuccess, setUsernameSuccess] = useState(false);
  const [fullNameError, setFullNameError] = useState("");
  const [fullNameSuccess, setFullNameSuccess] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [emailSuccess, setEmailSuccess] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [phoneSuccess, setPhoneSuccess] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const modalRef = useRef(null);

  // Password strength calculation
  const getPasswordStrength = (password) => {
    let score = 0;
    let feedback = [];

    if (password.length >= 8) score++;
    else feedback.push("At least 8 characters");

    if (/[a-z]/.test(password)) score++;
    else feedback.push("Lowercase letter");

    if (/[A-Z]/.test(password)) score++;
    else feedback.push("Uppercase letter");

    if (/[0-9]/.test(password)) score++;
    else feedback.push("Number");

    if (/[^A-Za-z0-9]/.test(password)) score++;
    else feedback.push("Special character");

    const colors = ["#ef4444", "#f97316", "#eab308", "#22c55e", "#10b981"];
    const labels = ["Very Weak", "Weak", "Fair", "Good", "Strong"];

    return {
      score,
      color: colors[Math.min(score - 1, 4)],
      label: labels[Math.min(score - 1, 4)],
      feedback,
    };
  };

  const passwordStrength = getPasswordStrength(password);

  // Detect mobile vs desktop
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Fetch unread messages count
  useEffect(() => {
    if (!isAuthenticated || !user) {
      setUnreadMessagesCount(0);
      return;
    }

    const fetchUnreadCount = async () => {
      try {
        // Get all conversations where user is a participant
        // Use parallel queries instead of .or() to avoid connection issues
        const [result1, result2] = await Promise.all([
          supabase
            .from('conversations')
            .select('id')
            .eq('participant1_id', user.id),
          supabase
            .from('conversations')
            .select('id')
            .eq('participant2_id', user.id)
        ]);

        const conversations1 = result1.data || [];
        const conversations2 = result2.data || [];
        const convError = result1.error || result2.error;

        // Combine and deduplicate conversations
        const allConversations = [...conversations1, ...conversations2].filter(
          (conv, index, self) => index === self.findIndex(c => c.id === conv.id)
        );

        if (convError || !allConversations || allConversations.length === 0) {
          setUnreadMessagesCount(0);
          return;
        }

        const conversationIds = allConversations.map(c => c.id);

        // Count unread messages (messages not sent by the user)
        const { count, error } = await supabase
          .from('messages')
          .select('*', { count: 'exact', head: true })
          .in('conversation_id', conversationIds)
          .eq('is_read', false)
          .neq('sender_id', user.id);

        if (error) {
          console.error('Error fetching unread count:', error);
          setUnreadMessagesCount(0);
          return;
        }

        setUnreadMessagesCount(count || 0);
      } catch (error) {
        console.error('Error fetching unread messages count:', error);
        setUnreadMessagesCount(0);
      }
    };

    fetchUnreadCount();

    // Set up real-time subscription for new messages
    const channel = supabase
      .channel('profile-modal-unread-messages')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'messages',
          filter: `is_read=eq.false`
        },
        () => {
          fetchUnreadCount();
        }
      )
      .subscribe();

    // Poll for updates every 30 seconds as fallback
    const pollInterval = setInterval(fetchUnreadCount, 30000);

    return () => {
      supabase.removeChannel(channel);
      clearInterval(pollInterval);
    };
  }, [user, isAuthenticated]);

  // Determine if we should use modal or dropdown
  const useModal = variant === "modal" || (variant === "auto" && isMobile);
  const useDropdown =
    variant === "dropdown" || (variant === "auto" && !isMobile);

  // Validation functions
  const validateUsername = (value) => {
    if (!value) {
      setUsernameError("");
      setUsernameSuccess(false);
      return;
    }

    if (value.length < 3) {
      setUsernameError("Username must be at least 3 characters");
      setUsernameSuccess(false);
    } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
      setUsernameError(
        "Username can only contain letters, numbers, and underscores"
      );
      setUsernameSuccess(false);
    } else {
      setUsernameError("");
      setUsernameSuccess(true);
    }
  };

  const validateFullName = (value) => {
    if (!value) {
      setFullNameError("");
      setFullNameSuccess(false);
      return;
    }

    if (value.length < 2) {
      setFullNameError("Full name must be at least 2 characters");
      setFullNameSuccess(false);
    } else if (!/^[a-zA-Z\s]+$/.test(value)) {
      setFullNameError("Full name can only contain letters and spaces");
      setFullNameSuccess(false);
    } else {
      setFullNameError("");
      setFullNameSuccess(true);
    }
  };

  const validateEmail = (value) => {
    if (!value) {
      setEmailError("");
      setEmailSuccess(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setEmailError("Please enter a valid email address");
      setEmailSuccess(false);
    } else {
      setEmailError("");
      setEmailSuccess(true);
    }
  };

  // Handle input changes with validation
  useEffect(() => {
    validateUsername(username);
  }, [username]);

  useEffect(() => {
    validateFullName(fullName);
  }, [fullName]);

  useEffect(() => {
    validateEmail(email);
  }, [email]);

  useEffect(() => {
    if (!isLogin && confirmPassword) {
      if (password !== confirmPassword) {
        setConfirmPasswordError("Passwords do not match");
      } else {
        setConfirmPasswordError("");
      }
    }
  }, [password, confirmPassword, isLogin]);

  const validatePhone = (value) => {
    if (!value) {
      setPhoneError("");
      setPhoneSuccess(false);
      return;
    }
    // Basic international phone regex or simple length check
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    if (!phoneRegex.test(value)) {
      setPhoneError("Please enter a valid phone number");
      setPhoneSuccess(false);
    } else {
      setPhoneError("");
      setPhoneSuccess(true);
    }
  };

  useEffect(() => {
    validatePhone(phoneNumber);
  }, [phoneNumber]);

  const handleGoogleAuth = () => {
    console.log("Google OAuth clicked");
    // In production, this would redirect to OAuth endpoint
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      let result;
      if (isLogin) {
        result = await signIn(email, password);
        if (result.error) {
          setError(result.error.message || "Authentication failed");
        } else {
          setSuccessMessage("Login successful! Welcome back.");
          setTimeout(() => {
            onClose();
          }, 1500);
        }
      } else {
        // Sign up flow
        result = await signUp(email, password, {
          username,
          full_name: fullName,
          phone: phoneNumber
        });

        if (result.error) {
          setError(result.error.message || "Sign up failed");
        } else {
          // Check if email confirmation is required
          if (result.data.user && !result.data.session) {
            // Email confirmation required
            setSuccessMessage("Account created! Please check your email to confirm your account before signing in.");
            
            // Clear form fields
            setUsername("");
            setFullName("");
            setPassword("");
            setConfirmPassword("");
            setPhoneNumber("");
            setAcceptTerms(false);
            
            // Switch to login view after delay
            setTimeout(() => {
              setIsLogin(true);
              setSuccessMessage("");
            }, 4000);
          } else {
            // No email confirmation required (auto-logged in)
            setSuccessMessage("Account created successfully! Welcome to our community.");
            setTimeout(() => {
              onClose();
            }, 1500);
          }
        }
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setError("");
    setSuccessMessage("");
    setUsername("");
    setFullName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setPhoneNumber("");
    setAcceptTerms(false);
    setShowPassword(false);
  };

  if (!isOpen) return null;

  const authenticatedContent = (
    <div className="profile-dashboard">
      <div className="profile-header">
        <div className="profile-avatar">
          {profile?.avatar_url ? (
            <img src={profile.avatar_url} alt="Avatar" />
          ) : (
            <div className="avatar-placeholder">
              {profile?.full_name?.charAt(0) || user?.email?.charAt(0).toUpperCase() || "U"}
            </div>
          )}
        </div>
        <div className="profile-info">
          <h3>Hi, {profile?.full_name || user?.email?.split('@')[0] || "User"}</h3>
          <span className="membership-badge">Free Member</span>
        </div>
      </div>
  
      <div className="profile-orders-section">
        <div className="section-header">
          <h4>My Orders</h4>
          <a href="/orders" className="view-all">View All</a>
        </div>
        <div className="order-status-grid">
          <div className="status-item">
            <CreditCard size={20} />
            <span>Unpaid</span>
          </div>
          <div className="status-item">
            <Package size={20} />
            <span>To Ship</span>
          </div>
          <div className="status-item">
            <Truck size={20} />
            <span>Shipped</span>
          </div>
          <div className="status-item">
            <MessageSquare size={20} />
            <span>To Review</span>
          </div>
        </div>
      </div>
  
      <div className="profile-menu-list">
        {(isAdmin || isSuperAdmin || isModerator) && (
          <a href="/admin" className="menu-item admin-menu-item">
            <Shield size={18} />
            <span>Admin Dashboard</span>
            <span className="admin-badge-small">
              {isSuperAdmin ? 'Super' : isAdmin ? 'Admin' : 'Mod'}
            </span>
          </a>
        )}
        <a href="/vendor-application" className="menu-item vendor-menu-item">
          <ShoppingBag size={18} />
          <span>Become a Vendor</span>
        </a>
        <a href="/agent-application" className="menu-item">
          <Truck size={18} />
          <span>Become an Agent</span>
        </a>
        <a href="/favorites" className="menu-item">
          <Heart size={18} />
          <span>My Favorites</span>
        </a>
        <a 
          href={(isAdmin || isSuperAdmin) ? "/admin/messages" : "/messages"} 
          className="menu-item"
        >
          <MessageSquare size={18} />
          <span>Messages</span>
          {unreadMessagesCount > 0 && (
            <span className="badge-count">{unreadMessagesCount > 99 ? '99+' : unreadMessagesCount}</span>
          )}
        </a>
        <a href="/settings" className="menu-item">
          <Settings size={18} />
          <span>Account Settings</span>
        </a>
      </div>
  
      <button onClick={signOut} className="sign-out-btn">
        <LogOut size={18} />
        Sign Out
      </button>
    </div>
  );

  const authFormContent = (
    <>
      <div className="modal-header">
        <h2>{isLogin ? "Welcome Back" : "Join Our Community"}</h2>
        <p>{isLogin ? "Sign in to your account" : "Create your account"}</p>
      </div>

      {error && <div className="error-message">{error}</div>}

      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}

      {/* <div className="google-auth-section">
        <button
          type="button"
          className="google-auth-button"
          onClick={handleGoogleAuth}
          disabled={loading}
        >
          <svg
            className="google-icon"
            viewBox="0 0 24 24"
            width="20"
            height="20"
          >
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Continue with Google
        </button>

        <div className="divider">
          <span>or</span>
        </div>
      </div> */}

      <form onSubmit={handleSubmit} className="auth-form">
        {!isLogin && (
          <>
            <div className="input-group">
              <UserCheck className="input-icon" size={20} />
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required={!isLogin}
                className={`auth-input ${
                  usernameError ? "error" : usernameSuccess ? "success" : ""
                } ${
                  usernameSuccess
                    ? "input-valid"
                    : usernameError
                    ? "input-invalid"
                    : ""
                }`}
                style={{
                  borderColor: username
                    ? usernameSuccess
                      ? "#10b981"
                      : usernameError
                      ? "#ef4444"
                      : undefined
                    : undefined,
                }}
                disabled={loading}
              />
              {usernameError && (
                <div className="field-error">
                  <XCircle size={16} />
                  <span>{usernameError}</span>
                </div>
              )}
              {usernameSuccess && !usernameError && (
                <div className="field-success">
                  <CheckCircle size={16} />
                  <span>Username looks good!</span>
                </div>
              )}
            </div>

            <div className="input-group">
              <User className="input-icon" size={20} />
              <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required={!isLogin}
                className={`auth-input ${
                  fullNameError ? "error" : fullNameSuccess ? "success" : ""
                } ${
                  fullNameSuccess
                    ? "input-valid"
                    : fullNameError
                    ? "input-invalid"
                    : ""
                }`}
                style={{
                  borderColor: fullName
                    ? fullNameSuccess
                      ? "#10b981"
                      : fullNameError
                      ? "#ef4444"
                      : undefined
                    : undefined,
                }}
                disabled={loading}
              />
              {fullNameError && (
                <div className="field-error">
                  <XCircle size={16} />
                  <span>{fullNameError}</span>
                </div>
              )}
              {fullNameSuccess && !fullNameError && (
                <div className="field-success">
                  <CheckCircle size={16} />
                  <span>Full name looks good!</span>
                </div>
              )}
            </div>
          </>
        )}

        <div className="input-group">
          <Mail className="input-icon" size={20} />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={`auth-input ${
              emailError ? "error" : emailSuccess ? "success" : ""
            } ${
              emailSuccess ? "input-valid" : emailError ? "input-invalid" : ""
            }`}
            style={{
              borderColor: email
                ? emailSuccess
                  ? "#10b981"
                  : emailError
                  ? "#ef4444"
                  : undefined
                : undefined,
            }}
            disabled={loading}
          />
          {emailError && (
            <div className="field-error">
              <XCircle size={16} />
              <span>{emailError}</span>
            </div>
          )}
          {emailSuccess && !emailError && (
            <div className="field-success">
              <CheckCircle size={16} />
              <span>Email looks good!</span>
            </div>
          )}
        </div>

        {!isLogin && (
          <>
            <div className="input-group">
              <Phone className="input-icon" size={20} />
              <input
                type="tel"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required={!isLogin}
                className={`auth-input ${
                  phoneError ? "error" : phoneSuccess ? "success" : ""
                } ${
                  phoneSuccess
                    ? "input-valid"
                    : phoneError
                    ? "input-invalid"
                    : ""
                }`}
                style={{
                  borderColor: phoneNumber
                    ? phoneSuccess
                      ? "#10b981"
                      : phoneError
                      ? "#ef4444"
                      : undefined
                    : undefined,
                }}
                disabled={loading}
              />
              {phoneError && (
                <div className="field-error">
                  <XCircle size={16} />
                  <span>{phoneError}</span>
                </div>
              )}
            </div>
          </>
        )}

        <div className="input-group">
          <Lock className="input-icon" size={20} />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="auth-input"
            style={{
              borderColor: password ? passwordStrength.color : undefined,
            }}
            disabled={loading}
          />
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
            disabled={loading}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
          {password && (
            <div className="password-strength">
              <div className="strength-bar">
                <div
                  className="strength-fill"
                  style={{
                    width: `${(passwordStrength.score / 5) * 100}%`,
                    backgroundColor: passwordStrength.color,
                  }}
                ></div>
              </div>
              <span
                className="strength-label"
                style={{ color: passwordStrength.color }}
              >
                {passwordStrength.label}
              </span>
            </div>
          )}
        </div>

        {!isLogin && (
          <div className="input-group">
            <Lock className="input-icon" size={20} />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required={!isLogin}
              className={`auth-input ${confirmPasswordError ? "error" : ""}`}
              disabled={loading}
            />
            {confirmPasswordError && (
              <div className="field-error">
                <XCircle size={16} />
                <span>{confirmPasswordError}</span>
              </div>
            )}
          </div>
        )}

        {!isLogin && (
          <div className="terms-checkbox-container">
            <label className="terms-label">
              <input
                type="checkbox"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                required
                className="terms-input"
              />
              <span className="terms-text">
                I agree to the{" "}
                <a href="#" className="terms-link">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="terms-link">
                  Privacy Policy
                </a>
              </span>
            </label>
          </div>
        )}

        <button
          type="submit"
          className="auth-button primary"
          disabled={
            loading ||
            !!emailError ||
            passwordStrength.score < 4 ||
            (!isLogin &&
              (!!usernameError ||
                !!fullNameError ||
                !!phoneError ||
                !!confirmPasswordError ||
                !acceptTerms))
          }
        >
          {loading ? "Processing..." : isLogin ? "Sign In" : "Sign Up"}
        </button>
      </form>

      <div className="auth-switch">
        <p>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            type="button"
            className="switch-button"
            onClick={switchMode}
            disabled={loading}
          >
            {isLogin ? "Sign Up" : "Sign In"}
          </button>
        </p>
      </div>
    </>
  );

  const modalContent = (
    <>
      <button className="close-button" onClick={onClose}>
        <X size={20} />
      </button>
      {authLoading ? (
        <div className="auth-loading">
          <div className="spinner-large"></div>
          <p>Loading...</p>
        </div>
      ) : (
        isAuthenticated ? authenticatedContent : authFormContent
      )}
    </>
  );

  if (useDropdown) {
    return (
      <div
        className="profile-dropdown"
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content">{modalContent}</div>
      </div>
    );
  }

  // Modal for mobile
  return (
    <>
      <div className="modal-overlay" onClick={onClose}></div>
      <div
        className="profile-modal"
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
      >
        {modalContent}
      </div>
    </>
  );
}

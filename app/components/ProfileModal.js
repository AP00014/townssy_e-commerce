'use client';

import { useState, useEffect, useRef } from 'react';
import {
  X,
  UserCheck,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  CheckCircle,
  XCircle
} from 'lucide-react';

export default function ProfileModal({ isOpen, onClose, variant = 'auto' }) {
  const [isLogin, setIsLogin] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Form fields
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Validation states
  const [usernameError, setUsernameError] = useState('');
  const [usernameSuccess, setUsernameSuccess] = useState(false);
  const [fullNameError, setFullNameError] = useState('');
  const [fullNameSuccess, setFullNameSuccess] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [emailSuccess, setEmailSuccess] = useState(false);

  const modalRef = useRef(null);

  // Password strength calculation
  const getPasswordStrength = (password) => {
    let score = 0;
    let feedback = [];

    if (password.length >= 8) score++;
    else feedback.push('At least 8 characters');

    if (/[a-z]/.test(password)) score++;
    else feedback.push('Lowercase letter');

    if (/[A-Z]/.test(password)) score++;
    else feedback.push('Uppercase letter');

    if (/[0-9]/.test(password)) score++;
    else feedback.push('Number');

    if (/[^A-Za-z0-9]/.test(password)) score++;
    else feedback.push('Special character');

    const colors = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#10b981'];
    const labels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];

    return {
      score,
      color: colors[Math.min(score - 1, 4)],
      label: labels[Math.min(score - 1, 4)],
      feedback
    };
  };

  const passwordStrength = getPasswordStrength(password);

  // Detect mobile vs desktop
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Determine if we should use modal or dropdown
  const useModal = variant === 'modal' || (variant === 'auto' && isMobile);
  const useDropdown = variant === 'dropdown' || (variant === 'auto' && !isMobile);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      if (useModal) {
        document.addEventListener('mousedown', handleClickOutside);
        document.body.style.overflow = 'hidden';
      } else {
        document.addEventListener('mousedown', handleClickOutside);
      }
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, useModal]);

  // Validation functions
  const validateUsername = (value) => {
    if (!value) {
      setUsernameError('');
      setUsernameSuccess(false);
      return;
    }

    if (value.length < 3) {
      setUsernameError('Username must be at least 3 characters');
      setUsernameSuccess(false);
    } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
      setUsernameError('Username can only contain letters, numbers, and underscores');
      setUsernameSuccess(false);
    } else {
      setUsernameError('');
      setUsernameSuccess(true);
    }
  };

  const validateFullName = (value) => {
    if (!value) {
      setFullNameError('');
      setFullNameSuccess(false);
      return;
    }

    if (value.length < 2) {
      setFullNameError('Full name must be at least 2 characters');
      setFullNameSuccess(false);
    } else if (!/^[a-zA-Z\s]+$/.test(value)) {
      setFullNameError('Full name can only contain letters and spaces');
      setFullNameSuccess(false);
    } else {
      setFullNameError('');
      setFullNameSuccess(true);
    }
  };

  const validateEmail = (value) => {
    if (!value) {
      setEmailError('');
      setEmailSuccess(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setEmailError('Please enter a valid email address');
      setEmailSuccess(false);
    } else {
      setEmailError('');
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

  const handleGoogleAuth = () => {
    console.log('Google OAuth clicked');
    // In production, this would redirect to OAuth endpoint
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      if (isLogin) {
        setSuccessMessage('Login successful! Welcome back.');
      } else {
        setSuccessMessage('Account created successfully! Welcome to our community.');
      }

      // Reset form after success
      setTimeout(() => {
        setUsername('');
        setFullName('');
        setEmail('');
        setPassword('');
        setSuccessMessage('');
        onClose();
      }, 2000);

    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setSuccessMessage('');
    setUsername('');
    setFullName('');
    setEmail('');
    setPassword('');
    setShowPassword(false);
  };

  if (!isOpen) return null;

  const modalContent = (
    <>
      <button className="close-button" onClick={onClose}>
        <X size={20} />
      </button>

      <div className="modal-header">
        <h2>{isLogin ? "Welcome Back" : "Join Our Community"}</h2>
        <p>{isLogin ? "Sign in to your account" : "Create your account"}</p>
      </div>

      {error && <div className="error-message">{error}</div>}

      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}

      <div className="google-auth-section">
        <button
          type="button"
          className="google-auth-button"
          onClick={handleGoogleAuth}
          disabled={loading}
        >
          <svg className="google-icon" viewBox="0 0 24 24" width="20" height="20">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continue with Google
        </button>

        <div className="divider">
          <span>or</span>
        </div>
      </div>

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
                className={`auth-input ${usernameError ? "error" : usernameSuccess ? "success" : ""} ${usernameSuccess ? "input-valid" : usernameError ? "input-invalid" : ""}`}
                style={{ borderColor: username ? (usernameSuccess ? '#10b981' : usernameError ? '#ef4444' : undefined) : undefined }}
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
                className={`auth-input ${fullNameError ? "error" : fullNameSuccess ? "success" : ""} ${fullNameSuccess ? "input-valid" : fullNameError ? "input-invalid" : ""}`}
                style={{ borderColor: fullName ? (fullNameSuccess ? '#10b981' : fullNameError ? '#ef4444' : undefined) : undefined }}
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
            className={`auth-input ${emailError ? "error" : emailSuccess ? "success" : ""} ${emailSuccess ? "input-valid" : emailError ? "input-invalid" : ""}`}
            style={{ borderColor: email ? (emailSuccess ? '#10b981' : emailError ? '#ef4444' : undefined) : undefined }}
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

        <div className="input-group">
          <Lock className="input-icon" size={20} />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="auth-input"
            style={{ borderColor: password ? passwordStrength.color : undefined }}
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
                    backgroundColor: passwordStrength.color
                  }}
                ></div>
              </div>
              <span className="strength-label" style={{ color: passwordStrength.color }}>
                {passwordStrength.label}
              </span>
            </div>
          )}
        </div>

        <button
          type="submit"
          className="auth-button primary"
          disabled={
            loading ||
            !!emailError ||
            passwordStrength.score < 4 ||
            (!isLogin && (!!usernameError || !!fullNameError))
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

  if (useDropdown) {
    return (
      <div className="profile-dropdown" ref={modalRef} onClick={(e) => e.stopPropagation()}>
        <div className="modal-content">
          {modalContent}
        </div>
      </div>
    );
  }

  // Modal for mobile
  return (
    <>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="profile-modal" ref={modalRef} onClick={(e) => e.stopPropagation()}>
        {modalContent}
      </div>
    </>
  );
}


'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../../lib/supabase';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import { 
  ArrowLeft, 
  User, 
  Mail, 
  Phone, 
  Lock, 
  Bell, 
  Shield, 
  Trash2,
  Camera,
  Save,
  Eye,
  EyeOff,
  CheckCircle,
  XCircle
} from 'lucide-react';
import Link from 'next/link';
import { SITE_LOGO_SVG } from '../utils/siteLogo';
import '../styles/settings.css';

export default function SettingsPage() {
  const router = useRouter();
  const { user, profile, loading: authLoading, updateProfile } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Profile form state
  const [formData, setFormData] = useState({
    full_name: '',
    username: '',
    email: '',
    phone: '',
    avatar_url: ''
  });

  // Avatar upload state
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  // Password change state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  // Preferences state
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    smsNotifications: false,
    marketingEmails: false
  });

  // Check authentication
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth/login?redirect=/settings');
    }
  }, [user, authLoading, router]);

  // Load user data
  useEffect(() => {
    if (user && profile) {
      const avatarUrl = profile.avatar_url || '';
      setFormData({
        full_name: profile.full_name || '',
        username: profile.username || '',
        email: profile.email || user.email || '',
        phone: profile.phone || '',
        avatar_url: avatarUrl
      });
      setAvatarPreview(avatarUrl || SITE_LOGO_SVG);
      setLoading(false);
    }
  }, [user, profile]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setErrorMessage('');
    setSuccessMessage('');
  };

  const handleAvatarSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setErrorMessage('Invalid file type. Please use JPEG, PNG, WebP, or GIF.');
      return;
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      setErrorMessage('File is too large. Maximum size is 5MB.');
      return;
    }

    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
    setErrorMessage('');
    setSuccessMessage('');
  };

  const uploadAvatar = async () => {
    if (!avatarFile || !user) return null;

    try {
      setUploadingAvatar(true);
      
      // Generate unique filename
      // Path should be: {user_id}/filename.ext (no 'avatars/' prefix since bucket is already 'avatars')
      const fileExt = avatarFile.name.split('.').pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${user.id}/${fileName}`;

      // Upload to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, avatarFile, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        // If file already exists, try to delete old one and upload again
        if (uploadError.message.includes('already exists')) {
          // Delete old file if exists
          await supabase.storage
            .from('avatars')
            .remove([filePath]);
          
          // Retry upload with new filename
          const retryFileName = `${Date.now()}_${Math.random().toString(36).substring(2)}.${fileExt}`;
          const retryPath = `${user.id}/${retryFileName}`;
          
          const { data: retryData, error: retryError } = await supabase.storage
            .from('avatars')
            .upload(retryPath, avatarFile, {
              cacheControl: '3600',
              upsert: false
            });

          if (retryError) throw retryError;
          
          // Get public URL
          const { data: urlData } = supabase.storage
            .from('avatars')
            .getPublicUrl(retryData.path);

          return urlData.publicUrl;
        }
        throw uploadError;
      }

      if (!uploadData || !uploadData.path) {
        throw new Error('Upload succeeded but no path returned');
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('avatars')
        .getPublicUrl(uploadData.path);

      if (!urlData || !urlData.publicUrl) {
        throw new Error('Failed to get public URL');
      }

      return urlData.publicUrl;
    } catch (error) {
      console.error('Error uploading avatar:', error);
      throw error;
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
    setErrorMessage('');
  };

  const handlePreferenceChange = (name) => {
    setPreferences(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  const handleSaveProfile = async () => {
    try {
      setSaving(true);
      setErrorMessage('');
      setSuccessMessage('');

      let avatarUrl = formData.avatar_url;

      // Upload avatar if a new file was selected
      if (avatarFile) {
        try {
          console.log('Uploading avatar...', avatarFile.name);
          avatarUrl = await uploadAvatar();
          console.log('Avatar uploaded successfully:', avatarUrl);
          
          if (!avatarUrl) {
            throw new Error('Avatar upload failed - no URL returned');
          }
          
          // Update formData with new avatar URL
          setFormData(prev => ({ ...prev, avatar_url: avatarUrl }));
          // Clear file after successful upload
          setAvatarFile(null);
        } catch (uploadError) {
          console.error('Avatar upload error:', uploadError);
          throw new Error(`Failed to upload avatar: ${uploadError.message}`);
        }
      }

      // Update profile in database
      const updateData = {
        full_name: formData.full_name,
        username: formData.username,
        phone: formData.phone,
        updated_at: new Date().toISOString()
      };

      // Only include avatar_url if it exists
      if (avatarUrl) {
        updateData.avatar_url = avatarUrl;
      }

      const { error, data } = await supabase
        .from('profiles')
        .update(updateData)
        .eq('id', user.id)
        .select();

      if (error) {
        console.error('Profile update error:', error);
        throw error;
      }

      console.log('Profile updated:', data);

      // Update email in auth if changed
      if (formData.email !== user.email) {
        const { error: emailError } = await supabase.auth.updateUser({
          email: formData.email
        });
        if (emailError) {
          console.error('Email update error:', emailError);
          throw emailError;
        }
      }

      // Refresh profile data and update context
      if (data && data[0]) {
        const updatedProfile = data[0];
        
        // Update formData with saved data
        setFormData(prev => ({
          ...prev,
          avatar_url: updatedProfile.avatar_url || prev.avatar_url,
          full_name: updatedProfile.full_name || prev.full_name,
          username: updatedProfile.username || prev.username,
          phone: updatedProfile.phone || prev.phone
        }));
        
        // Update avatar preview with the saved URL
        if (updatedProfile.avatar_url) {
          setAvatarPreview(updatedProfile.avatar_url);
        }
        
        // Update auth context profile to refresh UI
        if (updateProfile && typeof updateProfile === 'function') {
          await updateProfile(updatedProfile);
        }
      }

      setSuccessMessage('Profile updated successfully!');
      
      // Scroll to top to show success message
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      // Clear message after 5 seconds
      setTimeout(() => setSuccessMessage(''), 5000);
      
      // Clear avatar file state after successful save
      setAvatarFile(null);
    } catch (error) {
      console.error('Error updating profile:', error);
      setErrorMessage(error.message || 'Failed to update profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async () => {
    try {
      setSaving(true);
      setErrorMessage('');
      setSuccessMessage('');

      // Validate current password is provided
      if (!passwordData.currentPassword) {
        setErrorMessage('Please enter your current password');
        return;
      }

      // Validate passwords match
      if (passwordData.newPassword !== passwordData.confirmPassword) {
        setErrorMessage('New passwords do not match');
        return;
      }

      // Validate password strength
      if (passwordData.newPassword.length < 8) {
        setErrorMessage('Password must be at least 8 characters long');
        return;
      }

      // Check password strength requirements
      const hasUpperCase = /[A-Z]/.test(passwordData.newPassword);
      const hasLowerCase = /[a-z]/.test(passwordData.newPassword);
      const hasNumber = /[0-9]/.test(passwordData.newPassword);
      const hasSpecialChar = /[^A-Za-z0-9]/.test(passwordData.newPassword);

      if (!hasUpperCase || !hasLowerCase || !hasNumber) {
        setErrorMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number');
        return;
      }

      // Check if new password is different from current
      if (passwordData.currentPassword === passwordData.newPassword) {
        setErrorMessage('New password must be different from current password');
        return;
      }

      // Verify current password by attempting to sign in
      const { data: verifyData, error: verifyError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: passwordData.currentPassword
      });

      if (verifyError) {
        if (verifyError.message.includes('Invalid login credentials')) {
          setErrorMessage('Current password is incorrect');
        } else {
          setErrorMessage('Failed to verify current password. Please try again.');
        }
        return;
      }

      // If verification successful, update password
      const { error: updateError } = await supabase.auth.updateUser({
        password: passwordData.newPassword
      });

      if (updateError) throw updateError;

      setSuccessMessage('Password changed successfully!');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error changing password:', error);
      setErrorMessage(error.message || 'Failed to change password');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      return;
    }

    try {
      setSaving(true);
      // Note: Account deletion should be handled server-side for security
      setErrorMessage('Account deletion is not available through the UI. Please contact support.');
    } catch (error) {
      console.error('Error deleting account:', error);
      setErrorMessage('Failed to delete account');
    } finally {
      setSaving(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="settings-page">
        <Header />
        <div className="settings-container">
          <div className="loading-container">
            <img 
              src={SITE_LOGO_SVG} 
              alt="Loading" 
              className="loading-logo"
            />
            <p className="loading-text">Loading settings...</p>
          </div>
        </div>
        <BottomNav />
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to login
  }

  return (
    <div className="settings-page">
      <Header />
      <div className="settings-container">
        {/* Header */}
        <div className="settings-header">
          <Link href="/" className="back-link">
            <ArrowLeft size={18} />
            <span>Back</span>
          </Link>
          <h1 className="settings-title">Account Settings</h1>
          <div style={{ width: '80px' }}></div>
        </div>

        {/* Messages */}
        {successMessage && (
          <div className="message success-message">
            <CheckCircle size={16} />
            <span>{successMessage}</span>
          </div>
        )}
        {errorMessage && (
          <div className="message error-message">
            <XCircle size={16} />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Tabs */}
        <div className="settings-tabs">
          <button
            className={`settings-tab ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <User size={18} />
            <span>Profile</span>
          </button>
          <button
            className={`settings-tab ${activeTab === 'security' ? 'active' : ''}`}
            onClick={() => setActiveTab('security')}
          >
            <Lock size={18} />
            <span>Security</span>
          </button>
          <button
            className={`settings-tab ${activeTab === 'preferences' ? 'active' : ''}`}
            onClick={() => setActiveTab('preferences')}
          >
            <Bell size={18} />
            <span>Preferences</span>
          </button>
          <button
            className={`settings-tab ${activeTab === 'advanced' ? 'active' : ''}`}
            onClick={() => setActiveTab('advanced')}
          >
            <Shield size={18} />
            <span>Advanced</span>
          </button>
        </div>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="settings-section">
            <h2 className="section-title">Profile Information</h2>
            
            {/* Avatar */}
            <div className="form-group">
              <label className="form-label">Profile Picture</label>
              <div className="avatar-upload">
                <div className="avatar-preview">
                  <img 
                    src={avatarPreview || SITE_LOGO_SVG} 
                    alt="Profile"
                    className="avatar-image"
                    onError={(e) => {
                      e.target.src = SITE_LOGO_SVG;
                    }}
                  />
                </div>
                <input
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                  onChange={handleAvatarSelect}
                  className="avatar-file-input"
                  id="avatar-upload"
                  disabled={uploadingAvatar}
                  style={{ display: 'none' }}
                />
                <label htmlFor="avatar-upload" className="change-avatar-button">
                  <Camera size={18} />
                  <span>{uploadingAvatar ? 'Uploading...' : 'Change profile picture'}</span>
                </label>
              </div>
            </div>

            {/* Full Name */}
            <div className="form-group">
              <label className="form-label">
                <User size={16} />
                Full Name
              </label>
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                className="form-input"
              />
            </div>

            {/* Username */}
            <div className="form-group">
              <label className="form-label">
                <User size={16} />
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="Enter username"
                className="form-input"
              />
            </div>

            {/* Email */}
            <div className="form-group">
              <label className="form-label">
                <Mail size={16} />
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter email address"
                className="form-input"
              />
            </div>

            {/* Phone */}
            <div className="form-group">
              <label className="form-label">
                <Phone size={16} />
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter phone number"
                className="form-input"
              />
            </div>

            <button
              className="save-button"
              onClick={handleSaveProfile}
              disabled={saving}
            >
              {saving ? (
                <>
                  <img src={SITE_LOGO_SVG} alt="Loading" className="button-spinner" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save size={18} />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* Security Tab */}
        {activeTab === 'security' && (
          <div className="settings-section">
            <h2 className="section-title">Security Settings</h2>

            {/* Change Password */}
            <div className="form-group">
              <label className="form-label">
                <Lock size={16} />
                Current Password
              </label>
              <div className="password-input-group">
                <input
                  type={showPasswords.current ? 'text' : 'password'}
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  placeholder="Enter current password"
                  className="form-input"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
                >
                  {showPasswords.current ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">
                <Lock size={16} />
                New Password
              </label>
              <div className="password-input-group">
                <input
                  type={showPasswords.new ? 'text' : 'password'}
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  placeholder="Enter new password"
                  className="form-input"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
                >
                  {showPasswords.new ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {passwordData.newPassword && (
                <p className="form-hint">
                  Password must be at least 8 characters long
                </p>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">
                <Lock size={16} />
                Confirm New Password
              </label>
              <div className="password-input-group">
                <input
                  type={showPasswords.confirm ? 'text' : 'password'}
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  placeholder="Confirm new password"
                  className="form-input"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
                >
                  {showPasswords.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              className="save-button"
              onClick={handleChangePassword}
              disabled={saving || !passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword}
            >
              {saving ? (
                <>
                  <img src={SITE_LOGO_SVG} alt="Loading" className="button-spinner" />
                  <span>Changing Password...</span>
                </>
              ) : (
                <>
                  <Lock size={18} />
                  <span>Change Password</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* Preferences Tab */}
        {activeTab === 'preferences' && (
          <div className="settings-section">
            <h2 className="section-title">Notification Preferences</h2>

            <div className="preference-item">
              <div className="preference-info">
                <h3 className="preference-title">Email Notifications</h3>
                <p className="preference-description">Receive email updates about your orders and account</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={preferences.emailNotifications}
                  onChange={() => handlePreferenceChange('emailNotifications')}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="preference-item">
              <div className="preference-info">
                <h3 className="preference-title">SMS Notifications</h3>
                <p className="preference-description">Receive text messages for important updates</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={preferences.smsNotifications}
                  onChange={() => handlePreferenceChange('smsNotifications')}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="preference-item">
              <div className="preference-info">
                <h3 className="preference-title">Marketing Emails</h3>
                <p className="preference-description">Receive promotional emails and special offers</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={preferences.marketingEmails}
                  onChange={() => handlePreferenceChange('marketingEmails')}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>
        )}

        {/* Advanced Tab */}
        {activeTab === 'advanced' && (
          <div className="settings-section">
            <h2 className="section-title">Advanced Settings</h2>

            <div className="advanced-section">
              <h3 className="advanced-title">Account Actions</h3>
              
              <div className="advanced-item">
                <div className="advanced-info">
                  <h4 className="advanced-item-title">Export Data</h4>
                  <p className="advanced-item-description">Download a copy of your account data</p>
                </div>
                <button className="advanced-button">
                  Export Data
                </button>
              </div>

              <div className="advanced-item">
                <div className="advanced-info">
                  <h4 className="advanced-item-title">Delete Account</h4>
                  <p className="advanced-item-description">Permanently delete your account and all data</p>
                </div>
                <button 
                  className="advanced-button danger"
                  onClick={handleDeleteAccount}
                  disabled={saving}
                >
                  <Trash2 size={18} />
                  <span>Delete Account</span>
                </button>
              </div>
            </div>

            <div className="advanced-section">
              <h3 className="advanced-title">Account Information</h3>
              
              <div className="info-item">
                <span className="info-label">Account ID:</span>
                <span className="info-value">{user.id.slice(0, 8)}...</span>
              </div>
              
              <div className="info-item">
                <span className="info-label">Account Type:</span>
                <span className="info-value">{profile?.role || 'user'}</span>
              </div>
              
              <div className="info-item">
                <span className="info-label">Member Since:</span>
                <span className="info-value">
                  {profile?.created_at 
                    ? new Date(profile.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })
                    : 'N/A'}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
      <BottomNav />
    </div>
  );
}


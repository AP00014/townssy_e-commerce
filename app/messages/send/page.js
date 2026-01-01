'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../../lib/supabase';
import Header from '../../components/Header';
import BottomNav from '../../components/BottomNav';
import { 
  ArrowLeft, 
  Send, 
  MessageSquare,
  AlertCircle,
  Star,
  FileText,
  CheckCircle,
  XCircle
} from 'lucide-react';
import Link from 'next/link';
import { SITE_LOGO_SVG } from '../../utils/siteLogo';
import '../../styles/messages-send.css';

export default function SendMessagePage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    subject: '',
    messageType: 'general', // general, review, concern, complaint
    message: '',
    priority: 'normal' // low, normal, high, urgent
  });

  // Check authentication
  if (!authLoading && !user) {
    router.push('/auth/login?redirect=/messages/send');
    return null;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    try {
      setLoading(true);
      setError('');
      setSuccess(false);

      // Validate form
      if (!formData.subject.trim()) {
        setError('Please enter a subject');
        return;
      }
      if (!formData.message.trim()) {
        setError('Please enter your message');
        return;
      }

      // Get or create admin conversation
      // Use database function to get admin ID (bypasses RLS)
      let adminId = null;
      
      const { data: adminIdData, error: adminRpcError } = await supabase
        .rpc('get_admin_for_messaging');

      if (adminRpcError) {
        console.error('Error calling get_admin_for_messaging:', adminRpcError);
        // Fallback: try direct query (might fail due to RLS)
        const { data: fallbackAdmin, error: fallbackError } = await supabase
          .from('profiles')
          .select('id')
          .eq('role', 'super_admin')
          .limit(1)
          .maybeSingle();

        if (fallbackError || !fallbackAdmin?.id) {
          console.error('Fallback query also failed:', fallbackError);
          setError('Unable to find admin support. Please run the SQL function get_admin_for_messaging() in your database. Error: ' + (adminRpcError?.message || 'Unknown error'));
          setLoading(false);
          return;
        }
        adminId = fallbackAdmin.id;
      } else if (!adminIdData) {
        setError('No admin support available. Please ensure at least one super_admin or admin account exists in the system.');
        setLoading(false);
        return;
      } else {
        adminId = adminIdData;
      }

      if (!adminId) {
        setError('No admin support available. Please ensure at least one super_admin or admin account exists in the system.');
        setLoading(false);
        return;
      }

      // Check if conversation already exists
      // Try both possible participant combinations
      let conversationId;
      
      // First try: user as participant1, admin as participant2
      const { data: conv1, error: err1 } = await supabase
        .from('conversations')
        .select('id')
        .eq('participant1_id', user.id)
        .eq('participant2_id', adminId)
        .maybeSingle();

      if (!err1 && conv1?.id) {
        conversationId = conv1.id;
      } else {
        // Second try: admin as participant1, user as participant2
        const { data: conv2, error: err2 } = await supabase
          .from('conversations')
          .select('id')
          .eq('participant1_id', adminId)
          .eq('participant2_id', user.id)
          .maybeSingle();

        if (!err2 && conv2?.id) {
          conversationId = conv2.id;
        }
      }

      if (!conversationId) {
        // Create new conversation
        const { data: newConv, error: convError } = await supabase
          .from('conversations')
          .insert({
            participant1_id: user.id,
            participant2_id: adminId
          })
          .select()
          .single();

        if (convError) throw convError;
        conversationId = newConv.id;
      }

      // Create message with metadata
      const messageContent = `[${formData.messageType.toUpperCase()}] ${formData.subject}\n\n${formData.message}`;
      
      // Encrypt the message (end-to-end encryption)
      const { encryptMessage } = await import('../../utils/messageEncryption');
      const encryptedContent = await encryptMessage(
        messageContent,
        conversationId,
        user.id,
        adminId
      );
      
      const { error: messageError } = await supabase
        .from('messages')
        .insert({
          conversation_id: conversationId,
          sender_id: user.id,
          content: encryptedContent,
          is_read: false,
          is_encrypted: true, // Mark as encrypted
          metadata: {
            messageType: formData.messageType,
            priority: formData.priority,
            subject: formData.subject
          }
        });

      if (messageError) throw messageError;

      setSuccess(true);
      setFormData({
        subject: '',
        messageType: 'general',
        message: '',
        priority: 'normal'
      });

      // Redirect to messages page after 2 seconds
      setTimeout(() => {
        router.push('/messages');
      }, 2000);
    } catch (err) {
      console.error('Error sending message:', err);
      setError(err.message || 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getMessageTypeIcon = (type) => {
    switch (type) {
      case 'review': return <Star size={18} />;
      case 'concern': return <AlertCircle size={18} />;
      case 'complaint': return <AlertCircle size={18} />;
      default: return <MessageSquare size={18} />;
    }
  };

  const getMessageTypeLabel = (type) => {
    switch (type) {
      case 'review': return 'Review';
      case 'concern': return 'Concern';
      case 'complaint': return 'Complaint';
      default: return 'General Message';
    }
  };

  return (
    <div className="send-message-page">
      <Header />
      <div className="send-message-container">
        {/* Header */}
        <div className="send-message-header">
          <Link href="/messages" className="back-link">
            <ArrowLeft size={18} />
            <span>Back</span>
          </Link>
          <h1 className="send-message-title">Contact Support</h1>
          <div style={{ width: '80px' }}></div>
        </div>

        {/* Success Message */}
        {success && (
          <div className="message success-message">
            <CheckCircle size={16} />
            <span>Message sent successfully! Redirecting...</span>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="message error-message">
            <XCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form className="send-message-form" onSubmit={handleSubmit}>
          {/* Message Type */}
          <div className="form-group">
            <label className="form-label">
              Message Type
            </label>
            <div className="message-type-grid">
              {['general', 'review', 'concern', 'complaint'].map((type) => (
                <label
                  key={type}
                  className={`message-type-option ${formData.messageType === type ? 'active' : ''}`}
                >
                  <input
                    type="radio"
                    name="messageType"
                    value={type}
                    checked={formData.messageType === type}
                    onChange={handleInputChange}
                  />
                  <div className="message-type-content">
                    {getMessageTypeIcon(type)}
                    <span>{getMessageTypeLabel(type)}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Subject */}
          <div className="form-group">
            <label className="form-label" htmlFor="subject">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              placeholder="Enter message subject"
              className="form-input"
              required
              disabled={loading}
            />
          </div>

          {/* Priority */}
          <div className="form-group">
            <label className="form-label" htmlFor="priority">
              Priority
            </label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleInputChange}
              className="form-select"
              disabled={loading}
            >
              <option value="low">Low</option>
              <option value="normal">Normal</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>

          {/* Message */}
          <div className="form-group">
            <label className="form-label" htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Enter your message, review, concern, or complaint..."
              className="form-textarea"
              rows={8}
              required
              disabled={loading}
            />
            <p className="form-hint">
              Please provide as much detail as possible to help us assist you better.
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="submit-button"
            disabled={loading || success}
          >
            {loading ? (
              <>
                <img src={SITE_LOGO_SVG} alt="Loading" className="button-spinner" />
                <span>Sending...</span>
              </>
            ) : (
              <>
                <Send size={18} />
                <span>Send Message</span>
              </>
            )}
          </button>
        </form>
      </div>
      <BottomNav />
    </div>
  );
}


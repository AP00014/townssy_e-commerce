'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../context/AuthContext';
import { supabase } from '../../../../lib/supabase';
import { 
  Send, 
  Users, 
  ShoppingBag, 
  Truck,
  MessageSquare,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { SITE_LOGO_SVG } from '../../../utils/siteLogo';
import '../../../styles/admin-broadcast.css';

export default function BroadcastMessagesPage() {
  const router = useRouter();
  const { user, isAdmin, isSuperAdmin, loading: authLoading } = useAuth();
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [recipientCount, setRecipientCount] = useState(0);

  const [formData, setFormData] = useState({
    recipientType: 'all', // all, vendors, agents, sales_agents, delivery_agents
    subject: '',
    message: '',
    priority: 'normal'
  });

  // Check authorization
  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.push('/auth/login?redirect=/admin/messages/broadcast');
        return;
      }
      if (!isAdmin && !isSuperAdmin) {
        router.push('/');
        return;
      }
    }
  }, [user, authLoading, isAdmin, isSuperAdmin, router]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
    setSuccess('');
  };

  const fetchRecipientCount = async (recipientType) => {
    try {
      let query = supabase.from('profiles').select('id', { count: 'exact', head: true });

      switch (recipientType) {
        case 'all':
          query = query.eq('is_active', true);
          break;
        case 'vendors':
          query = query.eq('role', 'vendor').eq('is_active', true);
          break;
        case 'agents':
          // Get all agents (both sales and delivery)
          const { count: agentCount } = await supabase
            .from('agents')
            .select('*', { count: 'exact', head: true });
          return agentCount || 0;
        case 'sales_agents':
          const { count: salesCount } = await supabase
            .from('agents')
            .select('*', { count: 'exact', head: true })
            .eq('agent_type', 'sales');
          return salesCount || 0;
        case 'delivery_agents':
          const { count: deliveryCount } = await supabase
            .from('agents')
            .select('*', { count: 'exact', head: true })
            .eq('agent_type', 'delivery');
          return deliveryCount || 0;
        default:
          return 0;
      }

      const { count } = await query;
      return count || 0;
    } catch (error) {
      console.error('Error fetching recipient count:', error);
      return 0;
    }
  };

  useEffect(() => {
    if (formData.recipientType) {
      fetchRecipientCount(formData.recipientType).then(setRecipientCount);
    }
  }, [formData.recipientType]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    try {
      setSending(true);
      setError('');
      setSuccess('');

      // Validate form
      if (!formData.subject.trim()) {
        setError('Please enter a subject');
        return;
      }
      if (!formData.message.trim()) {
        setError('Please enter a message');
        return;
      }

      // Get recipients based on type
      let recipients = [];

      switch (formData.recipientType) {
        case 'all':
          const { data: allUsers } = await supabase
            .from('profiles')
            .select('id')
            .eq('is_active', true);
          recipients = allUsers || [];
          break;

        case 'vendors':
          const { data: vendors } = await supabase
            .from('profiles')
            .select('id')
            .eq('role', 'vendor')
            .eq('is_active', true);
          recipients = vendors || [];
          break;

        case 'agents':
          // Get all agents (sales and delivery)
          const { data: allAgents } = await supabase
            .from('agents')
            .select('user_id');
          if (allAgents) {
            const agentUserIds = allAgents.map(a => a.user_id);
            const { data: agentProfiles } = await supabase
              .from('profiles')
              .select('id')
              .in('id', agentUserIds)
              .eq('is_active', true);
            recipients = agentProfiles || [];
          }
          break;

        case 'sales_agents':
          const { data: salesAgents } = await supabase
            .from('agents')
            .select('user_id')
            .eq('agent_type', 'sales');
          if (salesAgents) {
            const salesUserIds = salesAgents.map(a => a.user_id);
            const { data: salesProfiles } = await supabase
              .from('profiles')
              .select('id')
              .in('id', salesUserIds)
              .eq('is_active', true);
            recipients = salesProfiles || [];
          }
          break;

        case 'delivery_agents':
          const { data: deliveryAgents } = await supabase
            .from('agents')
            .select('user_id')
            .eq('agent_type', 'delivery');
          if (deliveryAgents) {
            const deliveryUserIds = deliveryAgents.map(a => a.user_id);
            const { data: deliveryProfiles } = await supabase
              .from('profiles')
              .select('id')
              .in('id', deliveryUserIds)
              .eq('is_active', true);
            recipients = deliveryProfiles || [];
          }
          break;
      }

      if (recipients.length === 0) {
        setError('No recipients found for the selected type');
        return;
      }

      // Create broadcast message record
      const { data: broadcast, error: broadcastError } = await supabase
        .from('broadcast_messages')
        .insert({
          sender_id: user.id,
          recipient_type: formData.recipientType,
          subject: formData.subject,
          content: formData.message,
          priority: formData.priority,
          total_recipients: recipients.length
        })
        .select()
        .single();

      if (broadcastError) throw broadcastError;

      // Create conversations and messages for each recipient
      let successCount = 0;
      let errorCount = 0;

      for (const recipient of recipients) {
        try {
          // Check if conversation exists between admin and recipient
          // Try: admin as participant1, recipient as participant2
          const { data: conv1 } = await supabase
            .from('conversations')
            .select('id, participant1_id, participant2_id')
            .eq('participant1_id', user.id)
            .eq('participant2_id', recipient.id)
            .maybeSingle();

          let conversationId = conv1?.id;

          // If not found, try: recipient as participant1, admin as participant2
          if (!conversationId) {
            const { data: conv2 } = await supabase
              .from('conversations')
              .select('id, participant1_id, participant2_id')
              .eq('participant1_id', recipient.id)
              .eq('participant2_id', user.id)
              .maybeSingle();
            
            conversationId = conv2?.id;
          }

          if (!conversationId) {
            // Create new conversation
            const { data: newConv, error: convError } = await supabase
              .from('conversations')
              .insert({
                participant1_id: user.id,
                participant2_id: recipient.id
              })
              .select()
              .single();

            if (convError) {
              errorCount++;
              continue;
            }
            conversationId = newConv.id;
          }

          // Create message (broadcast messages are NOT encrypted)
          const { error: messageError } = await supabase
            .from('messages')
            .insert({
              conversation_id: conversationId,
              sender_id: user.id,
              content: `[BROADCAST] ${formData.subject}\n\n${formData.message}`,
              is_read: false,
              is_encrypted: false, // Broadcast messages are never encrypted
              broadcast_id: broadcast.id, // Direct FK reference
              metadata: {
                broadcast_id: broadcast.id,
                messageType: 'broadcast',
                priority: formData.priority,
                subject: formData.subject
              }
            });

          if (messageError) {
            errorCount++;
          } else {
            successCount++;
          }
        } catch (err) {
          console.error(`Error sending to ${recipient.id}:`, err);
          errorCount++;
        }
      }

      // Update broadcast with sent count
      await supabase
        .from('broadcast_messages')
        .update({
          sent_count: successCount,
          failed_count: errorCount,
          status: 'completed'
        })
        .eq('id', broadcast.id);

      setSuccess(`Message sent successfully to ${successCount} recipient(s)${errorCount > 0 ? ` (${errorCount} failed)` : ''}`);
      setFormData({
        recipientType: 'all',
        subject: '',
        message: '',
        priority: 'normal'
      });
    } catch (err) {
      console.error('Error sending broadcast:', err);
      setError(err.message || 'Failed to send broadcast message. Please try again.');
    } finally {
      setSending(false);
    }
  };

  const getRecipientTypeLabel = (type) => {
    switch (type) {
      case 'all': return 'All Users';
      case 'vendors': return 'Vendors';
      case 'agents': return 'All Agents';
      case 'sales_agents': return 'Sales Agents';
      case 'delivery_agents': return 'Delivery Agents';
      default: return type;
    }
  };

  const getRecipientTypeIcon = (type) => {
    switch (type) {
      case 'all': return <Users size={18} />;
      case 'vendors': return <ShoppingBag size={18} />;
      case 'agents': return <Truck size={18} />;
      case 'sales_agents': return <MessageSquare size={18} />;
      case 'delivery_agents': return <Truck size={18} />;
      default: return <Users size={18} />;
    }
  };

  if (authLoading) {
    return (
      <div className="admin-broadcast-page">
        <div className="loading-container">
          <img src={SITE_LOGO_SVG} alt="Loading" className="loading-logo" />
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!user || (!isAdmin && !isSuperAdmin)) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="admin-broadcast-page">
      <div className="admin-broadcast-container">
        <div className="page-header">
          <h1 className="page-title">Send Broadcast Message</h1>
          <p className="page-subtitle">Send messages to all users or specific user types</p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="message success-message">
            <CheckCircle size={16} />
            <span>{success}</span>
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
        <form className="broadcast-form" onSubmit={handleSubmit}>
          {/* Recipient Type */}
          <div className="form-group">
            <label className="form-label">
              Recipient Type
            </label>
            <div className="recipient-type-grid">
              {['all', 'vendors', 'agents', 'sales_agents', 'delivery_agents'].map((type) => (
                <label
                  key={type}
                  className={`recipient-type-option ${formData.recipientType === type ? 'active' : ''}`}
                >
                  <input
                    type="radio"
                    name="recipientType"
                    value={type}
                    checked={formData.recipientType === type}
                    onChange={handleInputChange}
                  />
                  <div className="recipient-type-content">
                    {getRecipientTypeIcon(type)}
                    <span>{getRecipientTypeLabel(type)}</span>
                  </div>
                </label>
              ))}
            </div>
            {recipientCount > 0 && (
              <p className="form-hint">
                Will be sent to approximately {recipientCount} recipient(s)
              </p>
            )}
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
              disabled={sending}
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
              disabled={sending}
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
              placeholder="Enter your broadcast message..."
              className="form-textarea"
              rows={10}
              required
              disabled={sending}
            />
            <p className="form-hint">
              This message will be sent to all selected recipients in their message inbox.
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="submit-button"
            disabled={sending || recipientCount === 0}
          >
            {sending ? (
              <>
                <img src={SITE_LOGO_SVG} alt="Loading" className="button-spinner" />
                <span>Sending to {recipientCount} recipient(s)...</span>
              </>
            ) : (
              <>
                <Send size={18} />
                <span>Send Broadcast Message</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}


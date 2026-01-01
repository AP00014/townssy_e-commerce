'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../../context/AuthContext';
import { supabase } from '../../../../../lib/supabase';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Send, 
  CheckCircle,
  XCircle,
  Clock,
  Users,
  AlertCircle
} from 'lucide-react';
import { SITE_LOGO_SVG } from '../../../../utils/siteLogo';
import '../../../../styles/admin-broadcast-history.css';

export default function BroadcastHistoryPage() {
  const router = useRouter();
  const { user, isAdmin, isSuperAdmin, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(true);
  const [broadcasts, setBroadcasts] = useState([]);

  // Check authorization
  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.push('/auth/login?redirect=/admin/messages/broadcast/history');
        return;
      }
      if (!isAdmin && !isSuperAdmin) {
        router.push('/');
        return;
      }
    }
  }, [user, authLoading, isAdmin, isSuperAdmin, router]);

  useEffect(() => {
    if (user && (isAdmin || isSuperAdmin)) {
      fetchBroadcasts();
    }
  }, [user, isAdmin, isSuperAdmin]);

  const fetchBroadcasts = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('broadcast_messages')
        .select(`
          *,
          sender:profiles!broadcast_messages_sender_id_fkey(id, full_name, username)
        `)
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;
      setBroadcasts(data || []);
    } catch (error) {
      console.error('Error fetching broadcasts:', error);
    } finally {
      setLoading(false);
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

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle size={18} className="status-icon success" />;
      case 'failed': return <XCircle size={18} className="status-icon error" />;
      case 'sending': return <Clock size={18} className="status-icon sending" />;
      default: return <Clock size={18} className="status-icon pending" />;
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    return new Date(timestamp).toLocaleString();
  };

  if (authLoading || loading) {
    return (
      <div className="broadcast-history-page">
        <div className="loading-container">
          <img src={SITE_LOGO_SVG} alt="Loading" className="loading-logo" />
          <p>Loading broadcast history...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="broadcast-history-page">
      <div className="broadcast-history-container">
        {/* Header */}
        <div className="page-header">
          <Link href="/admin/messages/broadcast" className="back-link">
            <ArrowLeft size={18} />
            <span>Back</span>
          </Link>
          <h1 className="page-title">Broadcast History</h1>
          <Link href="/admin/messages/broadcast" className="new-broadcast-button">
            <Send size={18} />
            <span>New Broadcast</span>
          </Link>
        </div>

        {/* Broadcasts List */}
        {broadcasts.length === 0 ? (
          <div className="empty-state">
            <Send size={48} />
            <h3>No broadcasts yet</h3>
            <p>Broadcast messages you send will appear here</p>
            <Link href="/admin/messages/broadcast" className="empty-state-button">
              Send Your First Broadcast
            </Link>
          </div>
        ) : (
          <div className="broadcasts-list">
            {broadcasts.map((broadcast) => (
              <div key={broadcast.id} className="broadcast-item">
                <div className="broadcast-header">
                  <div className="broadcast-title-section">
                    {getStatusIcon(broadcast.status)}
                    <div>
                      <h3 className="broadcast-subject">{broadcast.subject}</h3>
                      <p className="broadcast-meta">
                        To: {getRecipientTypeLabel(broadcast.recipient_type)} • 
                        {broadcast.sender?.full_name || broadcast.sender?.username || 'Admin'} • 
                        {formatDate(broadcast.created_at)}
                      </p>
                    </div>
                  </div>
                  <span className={`status-badge ${broadcast.status}`}>
                    {broadcast.status}
                  </span>
                </div>
                <div className="broadcast-content">
                  <p>{broadcast.content}</p>
                </div>
                <div className="broadcast-stats">
                  <div className="stat-item">
                    <Users size={16} />
                    <span>Total: {broadcast.total_recipients}</span>
                  </div>
                  <div className="stat-item success">
                    <CheckCircle size={16} />
                    <span>Sent: {broadcast.sent_count || 0}</span>
                  </div>
                  {broadcast.failed_count > 0 && (
                    <div className="stat-item error">
                      <XCircle size={16} />
                      <span>Failed: {broadcast.failed_count}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


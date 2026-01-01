'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../../lib/supabase';
import Link from 'next/link';
import { 
  MessageSquare, 
  Send, 
  Users, 
  Search,
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowRight
} from 'lucide-react';
import { SITE_LOGO_SVG } from '../../utils/siteLogo';
import '../../styles/admin-messages.css';

export default function AdminMessagesPage() {
  const router = useRouter();
  const { user, isAdmin, isSuperAdmin, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(true);
  const [conversations, setConversations] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    unread: 0,
    today: 0
  });
  const [searchQuery, setSearchQuery] = useState('');

  // Check authorization
  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.push('/auth/login?redirect=/admin/messages');
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
      fetchConversations();
      fetchStats();
    }
  }, [user, isAdmin, isSuperAdmin]);

  const fetchConversations = async () => {
    try {
      setLoading(true);
      
      // Fetch all conversations where admin is a participant
      // Use two separate queries to avoid .or() connection issues
      const [result1, result2] = await Promise.all([
        supabase
          .from('conversations')
          .select(`
            *,
            participant1:profiles!conversations_participant1_id_fkey(id, full_name, username, avatar_url, role),
            participant2:profiles!conversations_participant2_id_fkey(id, full_name, username, avatar_url, role)
          `)
          .eq('participant1_id', user.id)
          .order('updated_at', { ascending: false }),
        supabase
          .from('conversations')
          .select(`
            *,
            participant1:profiles!conversations_participant1_id_fkey(id, full_name, username, avatar_url, role),
            participant2:profiles!conversations_participant2_id_fkey(id, full_name, username, avatar_url, role)
          `)
          .eq('participant2_id', user.id)
          .order('updated_at', { ascending: false })
      ]);

      // Combine and deduplicate
      const conversationsData = [
        ...(result1.data || []),
        ...(result2.data || [])
      ].filter((conv, index, self) => 
        index === self.findIndex(c => c.id === conv.id)
      );

      const convError = result1.error || result2.error;

      if (convError) throw convError;

      // Get last message and unread count for each conversation
      const conversationsWithMessages = await Promise.all(
        (conversationsData || []).map(async (conv) => {
          const otherParticipant = conv.participant1_id === user.id 
            ? conv.participant2 
            : conv.participant1;

          // Get last message
          const { data: lastMessageData } = await supabase
            .from('messages')
            .select('*')
            .eq('conversation_id', conv.id)
            .order('created_at', { ascending: false })
            .limit(1)
            .single();

          // Get unread count (messages not from admin)
          const { count: unreadCount } = await supabase
            .from('messages')
            .select('*', { count: 'exact', head: true })
            .eq('conversation_id', conv.id)
            .eq('is_read', false)
            .neq('sender_id', user.id);

          return {
            ...conv,
            otherParticipant,
            lastMessage: lastMessageData || null,
            unreadCount: unreadCount || 0
          };
        })
      );

      setConversations(conversationsWithMessages);
    } catch (error) {
      console.error('Error fetching conversations:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      // Total conversations - use two queries to avoid .or() issues
      const [count1, count2] = await Promise.all([
        supabase
          .from('conversations')
          .select('*', { count: 'exact', head: true })
          .eq('participant1_id', user.id),
        supabase
          .from('conversations')
          .select('*', { count: 'exact', head: true })
          .eq('participant2_id', user.id)
      ]);
      
      // Note: This is an approximation. For exact count, we'd need to deduplicate
      const total = (count1.count || 0) + (count2.count || 0);

      // Unread messages
      const { data: unreadMessages } = await supabase
        .from('messages')
        .select('conversation_id')
        .eq('is_read', false)
        .neq('sender_id', user.id);

      const unreadConversationIds = [...new Set((unreadMessages || []).map(m => m.conversation_id))];
      
      // Today's messages
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const { count: todayCount } = await supabase
        .from('messages')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', today.toISOString())
        .neq('sender_id', user.id);

      setStats({
        total: total || 0,
        unread: unreadConversationIds.length,
        today: todayCount || 0
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  const filteredConversations = conversations.filter(conv => {
    if (!searchQuery) return true;
    const searchLower = searchQuery.toLowerCase();
    const participantName = conv.otherParticipant?.full_name || conv.otherParticipant?.username || '';
    const role = conv.otherParticipant?.role || '';
    return participantName.toLowerCase().includes(searchLower) || 
           role.toLowerCase().includes(searchLower);
  });

  if (authLoading || loading) {
    return (
      <div className="admin-messages-page">
        <div className="loading-container">
          <img src={SITE_LOGO_SVG} alt="Loading" className="loading-logo" />
          <p>Loading messages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-messages-page">
      <div className="admin-messages-container">
        {/* Header */}
        <div className="page-header">
          <div>
            <h1 className="page-title">Messages</h1>
            <p className="page-subtitle">Manage user conversations and support requests</p>
          </div>
          <Link href="/admin/messages/broadcast" className="broadcast-button">
            <Send size={18} />
            <span>Send Broadcast</span>
          </Link>
        </div>

        {/* Stats */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">
              <MessageSquare size={24} />
            </div>
            <div className="stat-content">
              <p className="stat-label">Total Conversations</p>
              <p className="stat-value">{stats.total}</p>
            </div>
          </div>
          <div className="stat-card unread">
            <div className="stat-icon">
              <AlertCircle size={24} />
            </div>
            <div className="stat-content">
              <p className="stat-label">Unread</p>
              <p className="stat-value">{stats.unread}</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <Clock size={24} />
            </div>
            <div className="stat-content">
              <p className="stat-label">Today's Messages</p>
              <p className="stat-value">{stats.today}</p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="messages-search">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search conversations by name or role..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        {/* Conversations List */}
        {filteredConversations.length === 0 ? (
          <div className="empty-state">
            <MessageSquare size={48} />
            <h3>No conversations yet</h3>
            <p>User messages will appear here</p>
          </div>
        ) : (
          <div className="conversations-list">
            {filteredConversations.map((conversation) => (
              <Link
                key={conversation.id}
                href={`/admin/messages/${conversation.id}`}
                className="conversation-item"
              >
                <div className="conversation-avatar">
                  <img
                    src={conversation.otherParticipant?.avatar_url || SITE_LOGO_SVG}
                    alt={conversation.otherParticipant?.full_name || 'User'}
                    onError={(e) => {
                      e.target.src = SITE_LOGO_SVG;
                    }}
                  />
                  {conversation.otherParticipant?.role && (
                    <span className={`role-badge ${conversation.otherParticipant.role}`}>
                      {conversation.otherParticipant.role}
                    </span>
                  )}
                </div>
                <div className="conversation-content">
                  <div className="conversation-header">
                    <h3 className="conversation-name">
                      {conversation.otherParticipant?.full_name || 
                       conversation.otherParticipant?.username || 
                       'Unknown User'}
                    </h3>
                    {conversation.lastMessage && (
                      <span className="conversation-time">
                        {formatTime(conversation.lastMessage.created_at)}
                      </span>
                    )}
                  </div>
                  {conversation.lastMessage && (
                    <p className="conversation-preview">
                      {conversation.lastMessage.content.length > 100
                        ? conversation.lastMessage.content.substring(0, 100) + '...'
                        : conversation.lastMessage.content}
                    </p>
                  )}
                </div>
                {conversation.unreadCount > 0 && (
                  <div className="unread-badge">{conversation.unreadCount}</div>
                )}
                <ArrowRight size={18} className="conversation-arrow" />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


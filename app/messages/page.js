'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../../lib/supabase';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import { 
  ArrowLeft, 
  MessageSquare, 
  Send, 
  Search,
  User,
  Clock,
  Check,
  CheckCheck,
  Inbox,
  Mail
} from 'lucide-react';
import Link from 'next/link';
import { SITE_LOGO_SVG } from '../utils/siteLogo';
import '../styles/messages.css';

export default function MessagesPage() {
  const router = useRouter();
  const { user, profile, loading: authLoading, isAdmin, isSuperAdmin } = useAuth();
  const [loading, setLoading] = useState(true);
  const [conversations, setConversations] = useState([]);
  const [sentConversations, setSentConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('inbox'); // 'inbox' or 'sent'
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  // Check authentication
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth/login?redirect=/messages');
    }
  }, [user, authLoading, router]);

  // Fetch conversations
  useEffect(() => {
    if (user) {
      fetchConversations();
      fetchSentConversations();
    }
  }, [user]);

  // Fetch messages for selected conversation
  useEffect(() => {
    if (selectedConversation && user) {
      fetchMessages(selectedConversation.id);
      // Set up real-time subscription for new messages
      const channel = supabase
        .channel(`messages:${selectedConversation.id}`)
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'messages',
            filter: `conversation_id=eq.${selectedConversation.id}`
          },
          () => {
            fetchMessages(selectedConversation.id);
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [selectedConversation, user]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchConversations = async () => {
    try {
      setLoading(true);
      
      // Fetch conversations where user is a participant
      // Use two separate queries to avoid .or() issues
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

      const conversationsData = [
        ...(result1.data || []),
        ...(result2.data || [])
      ].filter((conv, index, self) => 
        index === self.findIndex(c => c.id === conv.id)
      );

      const convError = result1.error || result2.error;

      if (convError) throw convError;

      // Fetch last message and unread count for each conversation
      const conversationsWithMessages = await Promise.all(
        (conversationsData || []).map(async (conv) => {
          // Get last message
          const { data: lastMessageData } = await supabase
            .from('messages')
            .select('*')
            .eq('conversation_id', conv.id)
            .order('created_at', { ascending: false })
            .limit(1)
            .single();

          // Get unread count
          const { count: unreadCount } = await supabase
            .from('messages')
            .select('*', { count: 'exact', head: true })
            .eq('conversation_id', conv.id)
            .eq('is_read', false)
            .neq('sender_id', user.id);

          const otherParticipant = conv.participant1_id === user.id 
            ? conv.participant2 
            : conv.participant1;

          // For non-admin users, show "Townssy" instead of admin names
          const displayParticipant = (!isAdmin && !isSuperAdmin && 
            (otherParticipant?.role === 'admin' || otherParticipant?.role === 'super_admin'))
            ? { ...otherParticipant, full_name: 'Townssy', username: 'Townssy' }
            : otherParticipant;

          return {
            ...conv,
            otherParticipant: displayParticipant,
            lastMessage: lastMessageData || null,
            unreadCount: unreadCount || 0
          };
        })
      );

      setConversations(conversationsWithMessages);
    } catch (error) {
      console.error('Error fetching conversations:', error);
      if (error.code === 'PGRST205' || error.message?.includes('Could not find the table')) {
        console.error('Messages tables not found. Please run create_messages_schema.sql in Supabase SQL Editor.');
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchSentConversations = async () => {
    try {
      // Fetch conversations where user has sent messages
      // Use two separate queries to avoid .or() issues
      const [sentConvResult1, sentConvResult2] = await Promise.all([
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

      const conversationsData = [
        ...(sentConvResult1.data || []),
        ...(sentConvResult2.data || [])
      ].filter((conv, index, self) => 
        index === self.findIndex(c => c.id === conv.id)
      );

      const convError = sentConvResult1.error || sentConvResult2.error;

      if (convError) throw convError;

      // Filter conversations where user has sent at least one message
      const conversationsWithSentMessages = await Promise.all(
        (conversationsData || []).map(async (conv) => {
          // Check if user has sent any messages in this conversation
          const { data: sentMessages } = await supabase
            .from('messages')
            .select('*')
            .eq('conversation_id', conv.id)
            .eq('sender_id', user.id)
            .order('created_at', { ascending: false })
            .limit(1);

          if (!sentMessages || sentMessages.length === 0) {
            return null; // Skip conversations where user hasn't sent messages
          }

          // Get last sent message
          const lastSentMessage = sentMessages[0];

          // Get last message overall (for timestamp)
          const { data: lastMessageData } = await supabase
            .from('messages')
            .select('*')
            .eq('conversation_id', conv.id)
            .order('created_at', { ascending: false })
            .limit(1)
            .single();

          const otherParticipant = conv.participant1_id === user.id 
            ? conv.participant2 
            : conv.participant1;

          // For non-admin users, show "Townssy" instead of admin names
          const displayParticipant = (!isAdmin && !isSuperAdmin && 
            (otherParticipant?.role === 'admin' || otherParticipant?.role === 'super_admin'))
            ? { ...otherParticipant, full_name: 'Townssy', username: 'Townssy' }
            : otherParticipant;

          return {
            ...conv,
            otherParticipant: displayParticipant,
            lastMessage: lastMessageData || null,
            lastSentMessage: lastSentMessage,
            unreadCount: 0 // Not relevant for sent messages
          };
        })
      );

      // Filter out null values
      const validSentConversations = conversationsWithSentMessages.filter(conv => conv !== null);
      setSentConversations(validSentConversations);
    } catch (error) {
      console.error('Error fetching sent conversations:', error);
      if (error.code === 'PGRST205' || error.message?.includes('Could not find the table')) {
        console.error('Messages tables not found. Please run create_messages_schema.sql in Supabase SQL Editor.');
      }
    }
  };

  const fetchMessages = async (conversationId) => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select(`
          *,
          sender:profiles!messages_sender_id_fkey(id, full_name, username, avatar_url, role)
        `)
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });

      if (error) throw error;

      // Decrypt messages if they are encrypted (but not broadcast messages)
      const { decryptMessage } = await import('../utils/messageEncryption');
      const conversation = selectedConversation || conversations.find(c => c.id === conversationId);
      
      if (conversation) {
        const decryptedMessages = await Promise.all(
          (data || []).map(async (message) => {
            // Broadcast messages are never encrypted
            if (message.broadcast_id || !message.is_encrypted) {
              return message;
            }
            
            // Decrypt encrypted messages
            if (message.is_encrypted && message.content) {
              try {
                const participant1Id = conversation.participant1_id;
                const participant2Id = conversation.participant2_id;
                const decryptedContent = await decryptMessage(
                  message.content,
                  conversationId,
                  participant1Id,
                  participant2Id
                );
                return { ...message, content: decryptedContent };
              } catch (decryptError) {
                console.error('Error decrypting message:', decryptError);
                return { ...message, content: '[Encrypted message - unable to decrypt]' };
              }
            }
            return message;
          })
        );
        setMessages(decryptedMessages);
      } else {
        setMessages(data || []);
      }

      // Mark messages as read
      await supabase
        .from('messages')
        .update({ is_read: true })
        .eq('conversation_id', conversationId)
        .eq('is_read', false)
        .neq('sender_id', user.id);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedConversation || sending) return;

    try {
      setSending(true);
      
      // Encrypt the message (end-to-end encryption)
      const { encryptMessage } = await import('../utils/messageEncryption');
      const participant1Id = selectedConversation.participant1_id;
      const participant2Id = selectedConversation.participant2_id;
      const encryptedContent = await encryptMessage(
        newMessage.trim(),
        selectedConversation.id,
        participant1Id,
        participant2Id
      );
      
      const { data, error } = await supabase
        .from('messages')
        .insert({
          conversation_id: selectedConversation.id,
          sender_id: user.id,
          content: encryptedContent,
          is_read: false,
          is_encrypted: true // Mark as encrypted
        })
        .select()
        .single();

      if (error) throw error;

      // Update conversation's updated_at
      await supabase
        .from('conversations')
        .update({ updated_at: new Date().toISOString() })
        .eq('id', selectedConversation.id);

      setNewMessage('');
      fetchMessages(selectedConversation.id);
      fetchConversations(); // Refresh conversations list
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setSending(false);
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

  const currentConversations = activeTab === 'inbox' ? conversations : sentConversations;
  
  const filteredConversations = currentConversations.filter(conv => {
    if (!searchQuery) return true;
    const searchLower = searchQuery.toLowerCase();
    const participantName = conv.otherParticipant?.full_name || conv.otherParticipant?.username || '';
    return participantName.toLowerCase().includes(searchLower);
  });

  if (authLoading || loading) {
    return (
      <div className="messages-page">
        <Header />
        <div className="messages-container">
          <div className="loading-container">
            <img 
              src={SITE_LOGO_SVG} 
              alt="Loading" 
              className="loading-logo"
            />
            <p className="loading-text">Loading messages...</p>
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
    <div className="messages-page">
      <Header />
      <div className="messages-container">
        {/* Header */}
        <div className="messages-header">
          <Link href="/" className="back-link">
            <ArrowLeft size={18} />
            <span>Back</span>
          </Link>
          <h1 className="messages-title">Messages</h1>
          <div style={{ width: '80px' }}></div>
        </div>

        {!selectedConversation ? (
          /* Conversations List */
          <div className="conversations-view">
            {/* Tabs */}
            <div className="messages-tabs">
              <button
                className={`messages-tab ${activeTab === 'inbox' ? 'active' : ''}`}
                onClick={() => setActiveTab('inbox')}
              >
                <MessageSquare size={18} />
                <span>Inbox</span>
                {activeTab === 'inbox' && conversations.some(c => c.unreadCount > 0) && (
                  <span className="tab-badge">
                    {conversations.reduce((sum, c) => sum + c.unreadCount, 0)}
                  </span>
                )}
              </button>
              <button
                className={`messages-tab ${activeTab === 'sent' ? 'active' : ''}`}
                onClick={() => setActiveTab('sent')}
              >
                <Send size={18} />
                <span>Sent</span>
              </button>
              <Link href="/messages/send" className="messages-tab send-message-tab">
                <Send size={18} />
                <span>Contact Support</span>
              </Link>
            </div>

            {/* Search */}
            <div className="messages-search">
              <Search size={18} />
              <input
                type="text"
                placeholder={`Search ${activeTab === 'inbox' ? 'inbox' : 'sent messages'}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>

            {/* Conversations */}
            {loading ? (
              <div className="empty-state">
                <img 
                  src={SITE_LOGO_SVG} 
                  alt="Loading" 
                  className="loading-logo"
                  style={{ width: '40px', height: '40px' }}
                />
                <p>Loading conversations...</p>
              </div>
            ) : filteredConversations.length === 0 ? (
              <div className="empty-state">
                <MessageSquare size={48} />
                <h3>
                  {activeTab === 'inbox' 
                    ? 'No messages in inbox' 
                    : 'No sent messages'}
                </h3>
                <p>
                  {activeTab === 'inbox'
                    ? 'You haven\'t received any messages yet'
                    : 'You haven\'t sent any messages yet'}
                </p>
              </div>
            ) : (
              <div className="conversations-list">
                {filteredConversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className="conversation-item"
                    onClick={() => setSelectedConversation(conversation)}
                  >
                    <div className="conversation-avatar">
                      <img
                        src={conversation.otherParticipant?.avatar_url || SITE_LOGO_SVG}
                        alt={conversation.otherParticipant?.full_name || 'User'}
                        onError={(e) => {
                          e.target.src = SITE_LOGO_SVG;
                        }}
                      />
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
                          {activeTab === 'sent' ? (
                            <>
                              <span className="message-sender-indicator">To: {conversation.otherParticipant?.full_name || conversation.otherParticipant?.username || 'User'}</span>
                              <br />
                              <span>{conversation.lastSentMessage?.content || conversation.lastMessage.content}</span>
                            </>
                          ) : (
                            <>
                              {conversation.lastMessage.sender_id === user.id && (
                                <span className="message-sender-indicator">You: </span>
                              )}
                              {conversation.lastMessage.content}
                            </>
                          )}
                        </p>
                      )}
                    </div>
                    {activeTab === 'inbox' && conversation.unreadCount > 0 && (
                      <div className="unread-badge">{conversation.unreadCount}</div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Chat View */
          <div className="chat-view">
            {/* Chat Header */}
            <div className="chat-header">
              <button
                className="back-button"
                onClick={() => setSelectedConversation(null)}
              >
                <ArrowLeft size={18} />
              </button>
              <div className="chat-participant">
                <img
                  src={selectedConversation.otherParticipant?.avatar_url || SITE_LOGO_SVG}
                  alt={selectedConversation.otherParticipant?.full_name || 'User'}
                  className="chat-avatar"
                  onError={(e) => {
                    e.target.src = SITE_LOGO_SVG;
                  }}
                />
                <div className="chat-participant-info">
                  <h3 className="chat-participant-name">
                    {selectedConversation.otherParticipant?.full_name || 
                     selectedConversation.otherParticipant?.username || 
                     'Unknown User'}
                  </h3>
                  <p className="chat-participant-status">Online</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="messages-list" ref={messagesContainerRef}>
              {messages.length === 0 ? (
                <div className="empty-messages">
                  <MessageSquare size={48} />
                  <p>No messages yet. Start the conversation!</p>
                </div>
              ) : (
                messages.map((message) => {
                  const isOwn = message.sender_id === user.id;
                  // For non-admin users, show "Townssy" for admin senders
                  const senderName = (!isAdmin && !isSuperAdmin && 
                    (message.sender?.role === 'admin' || message.sender?.role === 'super_admin'))
                    ? 'Townssy'
                    : (message.sender?.full_name || message.sender?.username || 'User');
                  
                  return (
                    <div
                      key={message.id}
                      className={`message-item ${isOwn ? 'own' : 'other'}`}
                    >
                      {!isOwn && (
                        <img
                          src={message.sender?.avatar_url || SITE_LOGO_SVG}
                          alt={senderName}
                          className="message-avatar"
                          onError={(e) => {
                            e.target.src = SITE_LOGO_SVG;
                          }}
                        />
                      )}
                      <div className="message-content">
                        <div className="message-bubble">
                          <p className="message-text">{message.content}</p>
                          <div className="message-meta">
                            <span className="message-time">
                              {new Date(message.created_at).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </span>
                            {isOwn && (
                              <span className="message-status">
                                {message.is_read ? (
                                  <CheckCheck size={14} />
                                ) : (
                                  <Check size={14} />
                                )}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <form className="message-input-form" onSubmit={handleSendMessage}>
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="message-input"
                disabled={sending}
              />
              <button
                type="submit"
                className="send-button"
                disabled={!newMessage.trim() || sending}
              >
                {sending ? (
                  <img src={SITE_LOGO_SVG} alt="Loading" className="button-spinner" />
                ) : (
                  <Send size={20} />
                )}
              </button>
            </form>
          </div>
        )}
      </div>
      <BottomNav />
    </div>
  );
}


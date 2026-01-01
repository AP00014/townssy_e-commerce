'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '../../../context/AuthContext';
import { supabase } from '../../../../lib/supabase';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Send, 
  Check,
  CheckCheck,
  User
} from 'lucide-react';
import { SITE_LOGO_SVG } from '../../../utils/siteLogo';
import '../../../styles/admin-messages-chat.css';

export default function AdminConversationPage() {
  const router = useRouter();
  const params = useParams();
  const conversationId = params.id;
  const { user, isAdmin, isSuperAdmin, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(true);
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef(null);

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
    if (conversationId && user) {
      fetchConversation();
      fetchMessages();
      
      // Set up real-time subscription
      const channel = supabase
        .channel(`admin-messages:${conversationId}`)
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'messages',
            filter: `conversation_id=eq.${conversationId}`
          },
          () => {
            fetchMessages();
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [conversationId, user]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchConversation = async () => {
    try {
      const { data, error } = await supabase
        .from('conversations')
        .select(`
          *,
          participant1:profiles!conversations_participant1_id_fkey(id, full_name, username, avatar_url, role),
          participant2:profiles!conversations_participant2_id_fkey(id, full_name, username, avatar_url, role)
        `)
        .eq('id', conversationId)
        .single();

      if (error) throw error;
      setConversation(data);
    } catch (error) {
      console.error('Error fetching conversation:', error);
    }
  };

  const fetchMessages = async () => {
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
      
      // Decrypt messages if they are encrypted
      const { decryptMessage } = await import('../../../utils/messageEncryption');
      const decryptedMessages = await Promise.all(
        (data || []).map(async (message) => {
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

      // Mark messages as read
      await supabase
        .from('messages')
        .update({ is_read: true })
        .eq('conversation_id', conversationId)
        .eq('is_read', false)
        .neq('sender_id', user.id);

      setLoading(false);
    } catch (error) {
      console.error('Error fetching messages:', error);
      setLoading(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || sending) return;

    try {
      setSending(true);
      
      // Encrypt the message (end-to-end encryption)
      const { encryptMessage } = await import('../../../utils/messageEncryption');
      const participant1Id = conversation.participant1_id;
      const participant2Id = conversation.participant2_id;
      const encryptedContent = await encryptMessage(
        newMessage.trim(),
        conversationId,
        participant1Id,
        participant2Id
      );
      
      const { error } = await supabase
        .from('messages')
        .insert({
          conversation_id: conversationId,
          sender_id: user.id,
          content: encryptedContent,
          is_read: false,
          is_encrypted: true // Mark as encrypted
        });

      if (error) throw error;

      setNewMessage('');
      fetchMessages();
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setSending(false);
    }
  };

  if (!conversation) {
    return (
      <div className="admin-chat-page">
        <div className="loading-container">
          <img src={SITE_LOGO_SVG} alt="Loading" className="loading-logo" />
          <p>Loading conversation...</p>
        </div>
      </div>
    );
  }

  const otherParticipant = conversation.participant1_id === user.id 
    ? conversation.participant2 
    : conversation.participant1;

  return (
    <div className="admin-chat-page">
      <div className="admin-chat-container">
        {/* Header */}
        <div className="chat-header">
          <Link href="/admin/messages" className="back-button">
            <ArrowLeft size={18} />
          </Link>
          <div className="chat-participant">
            <img
              src={otherParticipant?.avatar_url || SITE_LOGO_SVG}
              alt={otherParticipant?.full_name || 'User'}
              className="chat-avatar"
              onError={(e) => {
                e.target.src = SITE_LOGO_SVG;
              }}
            />
            <div className="chat-participant-info">
              <h3 className="chat-participant-name">
                {otherParticipant?.full_name || otherParticipant?.username || 'Unknown User'}
              </h3>
              <p className="chat-participant-role">{otherParticipant?.role || 'user'}</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="messages-list">
          {messages.length === 0 ? (
            <div className="empty-messages">
              <p>No messages yet. Start the conversation!</p>
            </div>
          ) : (
            messages.map((message) => {
              const isOwn = message.sender_id === user.id;
              return (
                <div
                  key={message.id}
                  className={`message-item ${isOwn ? 'own' : 'other'}`}
                >
                  {!isOwn && (
                    <img
                      src={message.sender?.avatar_url || SITE_LOGO_SVG}
                      alt={message.sender?.full_name || 'User'}
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
    </div>
  );
}


'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../../lib/supabase';
import { Clock, CheckCircle, XCircle, Home, Mail } from 'lucide-react';

export default function AgentPendingPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [agent, setAgent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAgent = async () => {
      if (!user) {
        router.push('/');
        return;
      }

      try {
        const { data, error } = await supabase
          .from('agents')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (error || !data) {
          router.push('/agent-application');
          return;
        }

        // If already verified, redirect to appropriate dashboard
        if (data.verification_status === 'verified') {
          if (data.agent_type === 'delivery') {
            router.push('/agent-dashboard/delivery');
          } else if (data.agent_type === 'sales') {
            router.push('/agent-dashboard/sales');
          }
          return;
        }

        setAgent(data);
      } catch (error) {
        console.error('Error:', error);
        router.push('/');
      } finally {
        setLoading(false);
      }
    };

    fetchAgent();
  }, [user, router]);

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f9fafb'
      }}>
        <div className="spinner-large"></div>
      </div>
    );
  }

  if (!agent) {
    return null;
  }

  const getStatusDisplay = () => {
    switch (agent.verification_status) {
      case 'pending':
        return {
          icon: <Clock size={64} color="#f59e0b" />,
          color: '#f59e0b',
          bg: '#fffbeb',
          border: '#fcd34d',
          title: 'Application Under Review',
          message: 'Your agent application is currently being reviewed by our admin team.',
          detail: 'This process typically takes 1-2 business days. You will receive an email notification once your account has been verified.'
        };
      case 'rejected':
        return {
          icon: <XCircle size={64} color="#dc2626" />,
          color: '#dc2626',
          bg: '#fee2e2',
          border: '#fca5a5',
          title: 'Application Not Approved',
          message: 'Unfortunately, your agent application was not approved.',
          detail: agent.rejection_reason || 'Please contact support for more information or reapply with updated information.'
        };
      default:
        return {
          icon: <Clock size={64} color="#6b7280" />,
          color: '#6b7280',
          bg: '#f3f4f6',
          border: '#d1d5db',
          title: 'Status Unknown',
          message: 'Please contact support for assistance.',
          detail: ''
        };
    }
  };

  const status = getStatusDisplay();

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '600px',
        width: '100%',
        background: 'white',
        borderRadius: '16px',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          background: status.bg,
          borderBottom: `2px solid ${status.border}`,
          padding: '40px 32px',
          textAlign: 'center'
        }}>
          <div style={{ marginBottom: '20px' }}>
            {status.icon}
          </div>
          <h1 style={{
            fontSize: '28px',
            fontWeight: '700',
            color: status.color,
            margin: '0 0 12px 0'
          }}>
            {status.title}
          </h1>
          <p style={{
            fontSize: '16px',
            color: '#6b7280',
            margin: 0
          }}>
            {status.message}
          </p>
        </div>

        {/* Content */}
        <div style={{ padding: '32px' }}>
          {/* Application Details */}
          <div style={{
            background: '#f9fafb',
            borderRadius: '12px',
            padding: '20px',
            marginBottom: '24px'
          }}>
            <h3 style={{
              fontSize: '14px',
              fontWeight: '600',
              color: '#6b7280',
              margin: '0 0 16px 0',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Application Details
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#6b7280', fontSize: '14px' }}>Agent Type:</span>
                <span style={{ fontWeight: '600', fontSize: '14px', textTransform: 'capitalize' }}>
                  {agent.agent_type} Agent
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#6b7280', fontSize: '14px' }}>Application ID:</span>
                <span style={{ 
                  fontWeight: '600', 
                  fontSize: '14px',
                  fontFamily: 'monospace',
                  background: 'white',
                  padding: '2px 8px',
                  borderRadius: '4px'
                }}>
                  {agent.agent_code || agent.id.slice(0, 8)}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#6b7280', fontSize: '14px' }}>Submitted:</span>
                <span style={{ fontWeight: '600', fontSize: '14px' }}>
                  {new Date(agent.created_at).toLocaleDateString()}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#6b7280', fontSize: '14px' }}>Status:</span>
                <span style={{
                  fontWeight: '600',
                  fontSize: '12px',
                  textTransform: 'uppercase',
                  background: status.bg,
                  color: status.color,
                  padding: '4px 12px',
                  borderRadius: '12px',
                  border: `1px solid ${status.border}`
                }}>
                  {agent.verification_status}
                </span>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div style={{
            background: '#eff6ff',
            border: '1px solid #bfdbfe',
            borderRadius: '12px',
            padding: '16px',
            marginBottom: '24px'
          }}>
            <p style={{
              fontSize: '14px',
              color: '#1e40af',
              margin: 0,
              lineHeight: '1.6'
            }}>
              <strong>ℹ️ Note:</strong> {status.detail}
            </p>
          </div>

          {/* Action Buttons */}
          <div style={{
            display: 'flex',
            gap: '12px',
            flexDirection: 'column'
          }}>
            <button
              onClick={() => router.push('/')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '14px 24px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'transform 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <Home size={20} />
              Return to Homepage
            </button>

            {agent.verification_status === 'rejected' && (
              <button
                onClick={() => router.push('/agent-application')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '14px 24px',
                  background: 'white',
                  color: '#667eea',
                  border: '2px solid #667eea',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = '#667eea';
                  e.currentTarget.style.color = 'white';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'white';
                  e.currentTarget.style.color = '#667eea';
                }}
              >
                Reapply
              </button>
            )}
          </div>

          {/* Support Contact */}
          <div style={{
            marginTop: '24px',
            padding: '16px',
            background: '#f9fafb',
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <p style={{ fontSize: '13px', color: '#6b7280', margin: '0 0 8px 0' }}>
              Need help? Contact our support team
            </p>
            <a
              href="mailto:support@townssy.com"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                color: '#667eea',
                fontSize: '14px',
                fontWeight: '600',
                textDecoration: 'none'
              }}
            >
              <Mail size={16} />
              support@townssy.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

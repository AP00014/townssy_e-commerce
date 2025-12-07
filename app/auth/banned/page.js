"use client";

import Link from "next/link";
import { Ban } from "lucide-react";
import "../../styles/auth.css";

export default function BannedPage() {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="status-icon danger">
          <Ban size={32} />
        </div>
        
        <div className="auth-header">
          <h1 className="auth-title">Account Suspended</h1>
          <p className="auth-subtitle">
            Your account has been suspended due to a violation of our terms.
          </p>
        </div>

        <div className="auth-form">
          <p style={{ textAlign: 'center', color: '#475569', lineHeight: '1.5' }}>
            To restore access to your account, please contact our support team for assistance.
          </p>
          
          <Link href="mailto:support@townssy.com" className="btn-auth" style={{ textDecoration: 'none', background: '#dc2626' }}>
            Contact Support
          </Link>

          <Link href="/" className="back-home-link">
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}

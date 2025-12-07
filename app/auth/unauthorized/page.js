"use client";

import Link from "next/link";
import { AlertCircle } from "lucide-react";
import "../../styles/auth.css";

export default function UnauthorizedPage() {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="status-icon warning">
          <AlertCircle size={32} />
        </div>
        
        <div className="auth-header">
          <h1 className="auth-title">Access Denied</h1>
          <p className="auth-subtitle">
            You do not have permission to access this page.
          </p>
        </div>

        <div className="auth-form">
          <p style={{ textAlign: 'center', color: '#475569', lineHeight: '1.5' }}>
            If you believe this is a mistake, please contact support or try signing in with a different account.
          </p>
          
          <Link href="/" className="btn-auth" style={{ textDecoration: 'none' }}>
            Return to Homepage
          </Link>

          <Link href="/auth/login" className="back-home-link">
            Sign in with different account
          </Link>
        </div>
      </div>
    </div>
  );
}

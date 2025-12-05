"use client";

import Link from "next/link";
import { 
  Globe, 
  TrendingUp, 
  ShieldCheck, 
  CreditCard, 
  Users, 
  BarChart 
} from "lucide-react";
import Header from "../components/Header";
import BottomNav from "../components/BottomNav";
import "../styles/sell.css";

export default function SellPage() {
  return (
    <div className="sell-page">
      <Header />

      {/* Hero Section */}
      <section className="sell-hero">
        <div className="sell-hero-content">
          <h1 className="sell-title">Start Selling to Millions of Business Buyers Globally</h1>
          <p className="sell-subtitle">
            Join Townssy's multi-vendor marketplace. Connect with buyers, grow your B2B business, and scale globally with our powerful tools.
          </p>
          <div className="sell-cta-group">
            <button className="btn-start-selling">Start Selling</button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-grid">
          <div className="stat-item">
            <h3>20M+</h3>
            <p>Active Buyers</p>
          </div>
          <div className="stat-item">
            <h3>190+</h3>
            <p>Countries & Regions</p>
          </div>
          <div className="stat-item">
            <h3>300K+</h3>
            <p>Daily Inquiries</p>
          </div>
          <div className="stat-item">
            <h3>$50B+</h3>
            <p>Annual GMV</p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section">
        <div className="section-heading">
          <h2>Why Sell on Townssy?</h2>
          <p>We provide the tools and reach you need to succeed in global B2B e-commerce.</p>
        </div>

        <div className="benefits-grid">
          <div className="benefit-card">
            <div className="benefit-icon">
              <Globe size={32} />
            </div>
            <h3>Global Reach</h3>
            <p>Access buyers from over 190 countries. Our platform supports 18 languages and auto-translation to help you communicate effectively.</p>
          </div>

          <div className="benefit-card">
            <div className="benefit-icon">
              <ShieldCheck size={32} />
            </div>
            <h3>Trade Assurance</h3>
            <p>Build trust instantly. Our Trade Assurance program protects orders and payments, giving buyers confidence to purchase from you.</p>
          </div>

          <div className="benefit-card">
            <div className="benefit-icon">
              <BarChart size={32} />
            </div>
            <h3>Smart Analytics</h3>
            <p>Get detailed insights into your store performance, buyer behavior, and market trends to optimize your business strategy.</p>
          </div>

          <div className="benefit-card">
            <div className="benefit-icon">
              <CreditCard size={32} />
            </div>
            <h3>Secure Payments</h3>
            <p>Accept payments globally with our secure infrastructure. We handle currency conversion and ensure you get paid on time.</p>
          </div>

          <div className="benefit-card">
            <div className="benefit-icon">
              <Users size={32} />
            </div>
            <h3>Verified Supplier Badge</h3>
            <p>Stand out from the competition. Get verified to display the prestigious badge and rank higher in search results.</p>
          </div>

          <div className="benefit-card">
            <div className="benefit-icon">
              <TrendingUp size={32} />
            </div>
            <h3>Marketing Tools</h3>
            <p>Boost your visibility with our advertising tools. Run campaigns, feature products, and participate in global expos.</p>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="steps-section">
        <div className="section-heading" style={{ color: 'white' }}>
          <h2 style={{ color: 'white' }}>How to Start Selling</h2>
        </div>
        
        <div className="steps-container">
          <div className="step-item">
            <div className="step-number">1</div>
            <div className="step-content">
              <h3>Register Your Account</h3>
              <p>Sign up with your business email. Provide your company details and verify your identity to get started.</p>
            </div>
          </div>

          <div className="step-item">
            <div className="step-number">2</div>
            <div className="step-content">
              <h3>Set Up Your Storefront</h3>
              <p>Customize your store profile, upload your logo, and showcase your certifications to build trust.</p>
            </div>
          </div>

          <div className="step-item">
            <div className="step-number">3</div>
            <div className="step-content">
              <h3>Post Your Products</h3>
              <p>Upload your product catalog with detailed descriptions, high-quality images, and competitive pricing.</p>
            </div>
          </div>

          <div className="step-item">
            <div className="step-number">4</div>
            <div className="step-content">
              <h3>Start Trading</h3>
              <p>Respond to inquiries, negotiate deals, and manage orders through our integrated dashboard.</p>
            </div>
          </div>
        </div>
      </section>

      <BottomNav />
    </div>
  );
}

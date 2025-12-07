"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { 
  MapPin, 
  Clock, 
  Award, 
  ShieldCheck, 
  MessageCircle, 
  Star,
  CheckCircle,
  Globe,
  Users,
  Building
} from "lucide-react";
import { vendors } from "../../data/vendors";
import { gridProducts } from "../../data/products";
import ProductCard from "../../components/ProductCard";
import Header from "../../components/Header";
import BottomNav from "../../components/BottomNav";
import "../../styles/vendor.css";

export default function VendorProfileClient() {
  const params = useParams();
  const [vendor, setVendor] = useState(null);
  const [activeTab, setActiveTab] = useState("products");
  const [vendorProducts, setVendorProducts] = useState([]);

  useEffect(() => {
    // Find vendor by ID
    const foundVendor = vendors.find(v => v.id === params.id) || vendors[0];
    setVendor(foundVendor);

    // Mock products for this vendor (randomly select from existing products)
    // In a real app, you'd fetch products by vendorId
    const shuffled = [...gridProducts].sort(() => 0.5 - Math.random());
    setVendorProducts(shuffled.slice(0, 8));
  }, [params.id]);

  if (!vendor) return <div className="loading">Loading...</div>;

  return (
    <div className="vendor-page">
      <Header />
      
      {/* Banner Section */}
      <div className="vendor-banner-container">
        <img 
          src={vendor.banner} 
          alt="Vendor Banner" 
          className="vendor-banner-image"
        />
      </div>

      {/* Vendor Info Card */}
      <div className="vendor-info-card">
        <div className="vendor-card-inner">
          <img src={vendor.logo} alt={vendor.name} className="vendor-logo" />
          
          <div className="vendor-details">
            <div className="vendor-name-row">
              <h1 className="vendor-name">{vendor.name}</h1>
              <div className="vendor-badges">
                {vendor.badges.map((badge, index) => (
                  <span key={index} className={`vendor-badge ${
                    badge.includes("Gold") ? "badge-gold" : 
                    badge.includes("Verified") ? "badge-verified" : "badge-assurance"
                  }`}>
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            <div className="vendor-meta">
              <div className="meta-item">
                <MapPin size={16} />
                <span>{vendor.location}</span>
              </div>
              <div className="meta-item">
                <Clock size={16} />
                <span>{vendor.yearsActive} Yrs</span>
              </div>
              <div className="meta-item">
                <Star size={16} fill="#fadb14" color="#fadb14" />
                <span className="meta-value">{vendor.rating}</span>
                <span>(500+ Reviews)</span>
              </div>
            </div>

            <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.5', maxWidth: '600px' }}>
              {vendor.description}
            </p>

            <div className="vendor-stats-grid">
              <div className="stat-box">
                <div className="stat-label">Response Rate</div>
                <div className="stat-value">{vendor.responseRate}</div>
              </div>
              <div className="stat-box">
                <div className="stat-label">Response Time</div>
                <div className="stat-value">{vendor.responseTime}</div>
              </div>
              <div className="stat-box">
                <div className="stat-label">Transactions</div>
                <div className="stat-value">{vendor.transactions}</div>
              </div>
              <div className="stat-box">
                <div className="stat-label">On-time Delivery</div>
                <div className="stat-value">98.5%</div>
              </div>
            </div>
          </div>

          <div className="vendor-actions">
            <button className="action-btn btn-contact">
              Contact Supplier
            </button>
            <button className="action-btn btn-follow">
              Follow
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="vendor-content">
        {/* Sidebar */}
        <aside className="vendor-sidebar">
          <div className="sidebar-card">
            <h3 className="sidebar-title">Company Overview</h3>
            <ul className="company-info-list">
              <li className="info-item">
                <span className="info-label">Business Type</span>
                <span className="info-val">{vendor.type}</span>
              </li>
              <li className="info-item">
                <span className="info-label">Employees</span>
                <span className="info-val">{vendor.totalEmployees}</span>
              </li>
              <li className="info-item">
                <span className="info-label">Floor Space</span>
                <span className="info-val">{vendor.floorSpace}</span>
              </li>
              <li className="info-item">
                <span className="info-label">Main Products</span>
                <span className="info-val" style={{ maxWidth: '120px' }}>
                  {vendor.mainProducts.join(", ")}
                </span>
              </li>
            </ul>
          </div>

          <div className="sidebar-card">
            <h3 className="sidebar-title">Certifications</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {vendor.certificates.map((cert, i) => (
                <span key={i} style={{ 
                  fontSize: '12px', 
                  background: '#f0fdf4', 
                  color: '#16a34a', 
                  padding: '4px 8px', 
                  borderRadius: '4px',
                  border: '1px solid #bbf7d0'
                }}>
                  {cert}
                </span>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Section */}
        <main className="vendor-main">
          <div className="section-tabs">
            <div 
              className={`tab-item ${activeTab === 'products' ? 'active' : ''}`}
              onClick={() => setActiveTab('products')}
            >
              Products
            </div>
            <div 
              className={`tab-item ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              Company Profile
            </div>
            <div 
              className={`tab-item ${activeTab === 'reviews' ? 'active' : ''}`}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews
            </div>
          </div>

          {activeTab === 'products' && (
            <div className="products-grid">
              {vendorProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  image={product.image}
                  title={product.title}
                  currentPrice={product.currentPrice}
                  originalPrice={product.originalPrice}
                  isFavorite={product.isFavorite}
                  badge={product.badge}
                  variant="grid"
                />
              ))}
            </div>
          )}
          
          {activeTab === 'profile' && (
            <div className="sidebar-card">
              <h3>About {vendor.name}</h3>
              <p style={{ lineHeight: '1.6', color: '#444' }}>
                {vendor.description} We are committed to providing high-quality products and excellent customer service. 
                Our factory is equipped with state-of-the-art machinery and we have a dedicated R&D team to ensure innovation.
              </p>
              <div style={{ marginTop: '20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <img 
                  src="https://images.unsplash.com/photo-1565514020176-dbf2277cc120?w=500&h=300&fit=crop" 
                  alt="Factory" 
                  style={{ width: '100%', borderRadius: '8px' }}
                />
                <img 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&h=300&fit=crop" 
                  alt="Production Line" 
                  style={{ width: '100%', borderRadius: '8px' }}
                />
              </div>
            </div>
          )}
        </main>
      </div>

      <BottomNav />
    </div>
  );
}

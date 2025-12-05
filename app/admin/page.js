"use client";

import { useAuth } from "../context/AuthContext";
import {
  Users,
  ShoppingBag,
  DollarSign,
  TrendingUp,
  Package,
  AlertCircle,
  Clock,
  CheckCircle,
  XCircle,
  FileText,
  MapPin,
} from "lucide-react";
import "../styles/admin.css";

export default function AdminDashboard() {
  const { user, profile, loading, isAdmin, isSuperAdmin, isModerator } =
    useAuth();

  if (loading) {
    return <div className="loading-spinner">Loading...</div>;
  }

  // Superadmin Dashboard
  if (isSuperAdmin) {
    return (
      <div className="dashboard-container">
        <div className="dashboard-header">
          <div>
            <h1>Superadmin Dashboard</h1>
            <p>Complete platform overview and control</p>
          </div>
        </div>

        <div className="stats-grid-4">
          <div className="stat-card gradient-blue">
            <div className="stat-content">
              <p className="stat-label">Total Revenue</p>
              <h3 className="stat-value">GH₵154,892</h3>
              <span className="stat-change positive">
                +18.2% from last month
              </span>
            </div>
            <div className="stat-icon">
              <DollarSign size={32} />
            </div>
          </div>

          <div className="stat-card gradient-purple">
            <div className="stat-content">
              <p className="stat-label">Total Vendors</p>
              <h3 className="stat-value">1,234</h3>
              <span className="stat-change positive">+45 new this month</span>
            </div>
            <div className="stat-icon">
              <ShoppingBag size={32} />
            </div>
          </div>

          <div className="stat-card gradient-green">
            <div className="stat-content">
              <p className="stat-label">Total Orders</p>
              <h3 className="stat-value">8,567</h3>
              <span className="stat-change positive">
                +12.5% from last month
              </span>
            </div>
            <div className="stat-icon">
              <FileText size={32} />
            </div>
          </div>

          <div className="stat-card gradient-orange">
            <div className="stat-content">
              <p className="stat-label">Active Users</p>
              <h3 className="stat-value">12,456</h3>
              <span className="stat-change positive">
                +8.3% from last month
              </span>
            </div>
            <div className="stat-icon">
              <Users size={32} />
            </div>
          </div>
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-card wide">
            <div className="card-header">
              <h3>Revenue Overview</h3>
              <select className="time-filter">
                <option>Last 30 days</option>
                <option>Last 3 months</option>
                <option>Last year</option>
              </select>
            </div>
            <div className="card-content">
              <div className="chart-placeholder">
                <TrendingUp size={48} />
                <p>Revenue chart will be displayed here</p>
              </div>
            </div>
          </div>

          <div className="dashboard-card">
            <div className="card-header">
              <h3>Pending Actions</h3>
            </div>
            <div className="card-content">
              <div className="action-list">
                <div className="action-item">
                  <div className="action-icon warning">
                    <Clock size={20} />
                  </div>
                  <div className="action-content">
                    <span className="action-label">Pending Payouts</span>
                    <span className="action-value">23</span>
                  </div>
                </div>
                <div className="action-item">
                  <div className="action-icon info">
                    <AlertCircle size={20} />
                  </div>
                  <div className="action-content">
                    <span className="action-label">Vendor Applications</span>
                    <span className="action-value">12</span>
                  </div>
                </div>
                <div className="action-item">
                  <div className="action-icon danger">
                    <XCircle size={20} />
                  </div>
                  <div className="action-content">
                    <span className="action-label">Disputes Open</span>
                    <span className="action-value">5</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-card">
            <div className="card-header">
              <h3>Recent Transactions</h3>
              <a href="/admin/finances" className="view-all">
                View All
              </a>
            </div>
            <div className="card-content">
              <div className="table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Vendor</th>
                      <th>Amount</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>#TXN-001</td>
                      <td>Fashion Store</td>
                      <td>GH₵1,250.00</td>
                      <td>
                        <span className="badge success">Completed</span>
                      </td>
                    </tr>
                    <tr>
                      <td>#TXN-002</td>
                      <td>Tech Hub</td>
                      <td>GH₵890.00</td>
                      <td>
                        <span className="badge pending">Pending</span>
                      </td>
                    </tr>
                    <tr>
                      <td>#TXN-003</td>
                      <td>Home Decor</td>
                      <td>GH₵2,100.00</td>
                      <td>
                        <span className="badge success">Completed</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="dashboard-card">
            <div className="card-header">
              <h3>System Health</h3>
            </div>
            <div className="card-content">
              <div className="health-list">
                <div className="health-item">
                  <div className="health-label">Database</div>
                  <div className="health-status success">
                    <CheckCircle size={16} />
                    <span>Operational</span>
                  </div>
                </div>
                <div className="health-item">
                  <div className="health-label">API</div>
                  <div className="health-status success">
                    <CheckCircle size={16} />
                    <span>Operational</span>
                  </div>
                </div>
                <div className="health-item">
                  <div className="health-label">Payment Gateway</div>
                  <div className="health-status success">
                    <CheckCircle size={16} />
                    <span>Operational</span>
                  </div>
                </div>
                <div className="health-item">
                  <div className="health-label">Storage</div>
                  <div className="health-status warning">
                    <AlertCircle size={16} />
                    <span>75% Used</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Admin Dashboard
  if (isAdmin) {
    return (
      <div className="dashboard-container">
        <div className="dashboard-header">
          <div>
            <h1>Admin Dashboard</h1>
            <p>Operations and vendor management overview</p>
          </div>
        </div>

        <div className="stats-grid-4">
          <div className="stat-card gradient-purple">
            <div className="stat-content">
              <p className="stat-label">Active Vendors</p>
              <h3 className="stat-value">856</h3>
              <span className="stat-change positive">+32 this week</span>
            </div>
            <div className="stat-icon">
              <ShoppingBag size={32} />
            </div>
          </div>

          <div className="stat-card gradient-green">
            <div className="stat-content">
              <p className="stat-label">Orders Today</p>
              <h3 className="stat-value">234</h3>
              <span className="stat-change positive">+15% from yesterday</span>
            </div>
            <div className="stat-icon">
              <FileText size={32} />
            </div>
          </div>

          <div className="stat-card gradient-blue">
            <div className="stat-content">
              <p className="stat-label">Active Agents</p>
              <h3 className="stat-value">45</h3>
              <span className="stat-change">12 on delivery</span>
            </div>
            <div className="stat-icon">
              <MapPin size={32} />
            </div>
          </div>

          <div className="stat-card gradient-orange">
            <div className="stat-content">
              <p className="stat-label">Pending Reviews</p>
              <h3 className="stat-value">67</h3>
              <span className="stat-change">Requires attention</span>
            </div>
            <div className="stat-icon">
              <AlertCircle size={32} />
            </div>
          </div>
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-card">
            <div className="card-header">
              <h3>Recent Vendor Applications</h3>
              <a href="/admin/vendors/applications" className="view-all">
                View All
              </a>
            </div>
            <div className="card-content">
              <div className="application-list">
                <div className="application-item">
                  <div>
                    <div className="app-name">Luxury Fashion Co.</div>
                    <div className="app-date">Applied 2 hours ago</div>
                  </div>
                  <button className="btn-review">Review</button>
                </div>
                <div className="application-item">
                  <div>
                    <div className="app-name">Electronics Hub</div>
                    <div className="app-date">Applied 5 hours ago</div>
                  </div>
                  <button className="btn-review">Review</button>
                </div>
                <div className="application-item">
                  <div>
                    <div className="app-name">Home Essentials</div>
                    <div className="app-date">Applied 1 day ago</div>
                  </div>
                  <button className="btn-review">Review</button>
                </div>
              </div>
            </div>
          </div>

          <div className="dashboard-card">
            <div className="card-header">
              <h3>Active Disputes</h3>
              <a href="/admin/orders/disputes" className="view-all">
                View All
              </a>
            </div>
            <div className="card-content">
              <div className="dispute-list">
                <div className="dispute-item">
                  <div>
                    <div className="dispute-id">Dispute #D-1234</div>
                    <div className="dispute-reason">Product not received</div>
                  </div>
                  <span className="badge danger">Escalated</span>
                </div>
                <div className="dispute-item">
                  <div>
                    <div className="dispute-id">Dispute #D-1233</div>
                    <div className="dispute-reason">Wrong item delivered</div>
                  </div>
                  <span className="badge warning">Investigating</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Moderator Dashboard
  if (isModerator) {
    return (
      <div className="dashboard-container">
        <div className="dashboard-header">
          <div>
            <h1>Moderator Dashboard</h1>
            <p>Content verification and compliance</p>
          </div>
        </div>

        <div className="stats-grid-3">
          <div className="stat-card gradient-blue">
            <div className="stat-content">
              <p className="stat-label">Pending Verifications</p>
              <h3 className="stat-value">156</h3>
              <span className="stat-change">45 products, 12 vendors</span>
            </div>
            <div className="stat-icon">
              <Package size={32} />
            </div>
          </div>

          <div className="stat-card gradient-orange">
            <div className="stat-content">
              <p className="stat-label">User Reports</p>
              <h3 className="stat-value">23</h3>
              <span className="stat-change">15 new today</span>
            </div>
            <div className="stat-icon">
              <AlertCircle size={32} />
            </div>
          </div>

          <div className="stat-card gradient-green">
            <div className="stat-content">
              <p className="stat-label">Verified Today</p>
              <h3 className="stat-value">89</h3>
              <span className="stat-change positive">Great progress!</span>
            </div>
            <div className="stat-icon">
              <CheckCircle size={32} />
            </div>
          </div>
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-card">
            <div className="card-header">
              <h3>Verification Queue</h3>
              <a href="/admin/products/verify" className="view-all">
                View All
              </a>
            </div>
            <div className="card-content">
              <div className="queue-tabs">
                <button className="tab active">Products (45)</button>
                <button className="tab">Vendors (12)</button>
              </div>
              <div className="verification-list">
                <div className="verification-item">
                  <div className="item-info">
                    <div className="item-name">Wireless Headphones</div>
                    <div className="item-meta">
                      Electronics • Submitted 2h ago
                    </div>
                  </div>
                  <div className="item-actions">
                    <button className="btn-approve">Approve</button>
                    <button className="btn-reject">Reject</button>
                  </div>
                </div>
                <div className="verification-item">
                  <div className="item-info">
                    <div className="item-name">Designer Handbag</div>
                    <div className="item-meta">Fashion • Submitted 3h ago</div>
                  </div>
                  <div className="item-actions">
                    <button className="btn-approve">Approve</button>
                    <button className="btn-reject">Reject</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="dashboard-card">
            <div className="card-header">
              <h3>Recent Reports</h3>
              <a href="/admin/reports" className="view-all">
                View All
              </a>
            </div>
            <div className="card-content">
              <div className="report-list">
                <div className="report-item">
                  <div className="report-info">
                    <div className="report-title">Fake Product Listed</div>
                    <div className="report-meta">Product #P-5678 • 1h ago</div>
                  </div>
                  <span className="badge danger">High Priority</span>
                </div>
                <div className="report-item">
                  <div className="report-info">
                    <div className="report-title">Inappropriate Review</div>
                    <div className="report-meta">Review #R-9012 • 3h ago</div>
                  </div>
                  <span className="badge warning">Medium Priority</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <div>Access Denied</div>;
}

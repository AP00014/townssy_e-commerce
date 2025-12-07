"use client";

import { useAuth } from "../context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  MapPin,
  DollarSign,
  Settings,
  Shield,
  FileText,
  Bell,
  LogOut,
  Menu,
  X,
  ChevronDown,
  AlertCircle,
  Users,
  Home,
} from "lucide-react";
import "../styles/admin-layout.css";

export default function AdminLayout({ children }) {
  const {
    user,
    profile,
    loading,
    isAdmin,
    isSuperAdmin,
    isModerator,
    signOut,
  } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (!loading && (!user || (!isAdmin && !isSuperAdmin && !isModerator))) {
      router.push("/");
    }
  }, [user, loading, isAdmin, isSuperAdmin, isModerator, router]);

  if (loading) {
    return (
      <div className="admin-loading-screen">
        <div className="spinner-large"></div>
        <p>Loading admin panel...</p>
      </div>
    );
  }

  if (!isAdmin && !isSuperAdmin && !isModerator) {
    return null;
  }

  const menuItems = [
    {
      label: "Homepage",
      icon: Home,
      href: "/",
      roles: ["super_admin", "admin", "moderator"],
    },
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/admin",
      roles: ["super_admin", "admin", "moderator"],
    },
    {
      label: "Vendor Management",
      icon: ShoppingBag,
      roles: ["super_admin", "admin", "moderator"],
      submenu: [
        {
          label: "Applications",
          href: "/admin/vendors/applications",
          roles: ["super_admin", "admin", "moderator"],
        },
        {
          label: "All Vendors",
          href: "/admin/vendors",
          roles: ["super_admin", "admin", "moderator"],
        },
        {
          label: "Payouts",
          href: "/admin/vendors/payouts",
          roles: ["super_admin"],
        },
      ],
    },
    {
      label: "Products",
      icon: Package,
      roles: ["super_admin", "admin", "moderator"],
      submenu: [
        {
          label: "Verification Queue",
          href: "/admin/products/verify",
          roles: ["super_admin", "admin", "moderator"],
        },
        {
          label: "All Products",
          href: "/admin/products",
          roles: ["super_admin", "admin", "moderator"],
        },
        {
          label: "Categories",
          href: "/admin/products/categories",
          roles: ["super_admin", "admin"],
        },
      ],
    },
    {
      label: "Orders",
      icon: FileText,
      roles: ["super_admin", "admin", "moderator"],
      submenu: [
        {
          label: "All Orders",
          href: "/admin/orders",
          roles: ["super_admin", "admin", "moderator"],
        },
        {
          label: "Order Verification",
          href: "/admin/orders/verify",
          roles: ["super_admin", "admin", "moderator"],
        },
        {
          label: "Disputes",
          href: "/admin/orders/disputes",
          roles: ["super_admin", "admin"],
        },
      ],
    },
    {
      label: "Agents",
      icon: MapPin,
      href: "/admin/agents",
      roles: ["super_admin", "admin", "moderator"],
    },
    {
      label: "Users",
      icon: Users,
      href: "/admin/users",
      roles: ["super_admin", "admin", "moderator"],
    },
    {
      label: "Reports",
      icon: AlertCircle,
      href: "/admin/reports",
      roles: ["super_admin", "admin", "moderator"],
    },
    {
      label: "Finances",
      icon: DollarSign,
      href: "/admin/finances",
      roles: ["super_admin"],
    },
    {
      label: "Settings",
      icon: Settings,
      roles: ["super_admin", "admin"],
      submenu: [
        {
          label: "Platform Settings",
          href: "/admin/settings",
          roles: ["super_admin"],
        },
        {
          label: "Role Management",
          href: "/admin/settings/roles",
          roles: ["super_admin"],
        },
        {
          label: "Audit Logs",
          href: "/admin/settings/audit",
          roles: ["super_admin"],
        },
      ],
    },
  ];

  const userRole = profile?.role;
  const filteredMenu = menuItems
    .filter((item) => item.roles?.includes(userRole))
    .map((item) => ({
      ...item,
      submenu: item.submenu?.filter((sub) => sub.roles?.includes(userRole)),
    }));

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? "open" : "closed"}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <Shield size={32} />
            <span>Admin Panel</span>
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="sidebar-toggle"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <div className="sidebar-role-badge">
          {isSuperAdmin && (
            <span className="badge super-admin">Super Admin</span>
          )}
          {isAdmin && !isSuperAdmin && (
            <span className="badge admin">Admin</span>
          )}
          {isModerator && !isAdmin && (
            <span className="badge moderator">Moderator</span>
          )}
        </div>

        <nav className="sidebar-nav">
          {filteredMenu.map((item, index) => (
            <div key={index} className="nav-item-group">
              {item.submenu ? (
                <details className="nav-submenu">
                  <summary className="nav-item">
                    <item.icon size={20} />
                    <span>{item.label}</span>
                    <ChevronDown size={16} className="submenu-icon" />
                  </summary>
                  <div className="submenu-items">
                    {item.submenu.map((sub, subIndex) => (
                      <Link
                        key={subIndex}
                        href={sub.href}
                        className={`nav-subitem ${
                          pathname === sub.href ? "active" : ""
                        }`}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                </details>
              ) : (
                <Link
                  href={item.href}
                  className={`nav-item ${
                    (
                      item.href === "/admin"
                        ? pathname === item.href
                        : pathname.startsWith(item.href)
                    )
                      ? "active"
                      : ""
                  }`}
                >
                  <item.icon size={20} />
                  <span>{item.label}</span>
                </Link>
              )}
            </div>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-avatar">
              {profile?.avatar_url ? (
                <img src={profile.avatar_url} alt="User" />
              ) : (
                <div className="avatar-placeholder">
                  {profile?.full_name?.charAt(0) || "A"}
                </div>
              )}
            </div>
            <div className="user-details">
              <span className="user-name">
                {profile?.full_name || user?.email?.split("@")[0]}
              </span>
              <span className="user-email">{user?.email}</span>
            </div>
          </div>
          <button onClick={signOut} className="logout-btn">
            <LogOut size={18} />
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        <header className="admin-header">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="mobile-menu-btn"
          >
            <Menu size={24} />
          </button>

          <div className="header-actions">
            <button className="notification-btn">
              <Bell size={20} />
              {notifications.length > 0 && (
                <span className="notification-badge">
                  {notifications.length}
                </span>
              )}
            </button>
          </div>
        </header>

        <div className="admin-content">{children}</div>
      </main>
    </div>
  );
}

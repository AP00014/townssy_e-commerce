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
  MessageSquare,
  Send,
} from "lucide-react";
import "../styles/admin-layout.css";
import { supabase } from "../../lib/supabase";

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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadMessagesCount, setUnreadMessagesCount] = useState(0);

  useEffect(() => {
    // Set sidebar state based on screen size
    const checkScreenSize = () => {
      if (window.innerWidth > 1024) {
        setSidebarOpen(true); // Open on desktop
      } else {
        setSidebarOpen(false); // Closed on mobile/tablet
      }
    };

    // Check on mount
    checkScreenSize();

    // Listen for resize events
    window.addEventListener('resize', checkScreenSize);

    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  useEffect(() => {
    if (!loading && (!user || (!isAdmin && !isSuperAdmin && !isModerator))) {
      router.push("/");
    }
  }, [user, loading, isAdmin, isSuperAdmin, isModerator, router]);

  // Fetch unread messages count for admins
  useEffect(() => {
    if (!user || (!isAdmin && !isSuperAdmin)) {
      setUnreadMessagesCount(0);
      return;
    }

    const fetchUnreadCount = async () => {
      try {
        // Get all conversations where admin is a participant
        const { data: conversations, error: convError } = await supabase
          .from('conversations')
          .select('id')
          .or(`participant1_id.eq.${user.id},participant2_id.eq.${user.id}`);

        if (convError || !conversations || conversations.length === 0) {
          setUnreadMessagesCount(0);
          return;
        }

        const conversationIds = conversations.map(c => c.id);

        // Count unread messages (messages not sent by the admin)
        const { count, error } = await supabase
          .from('messages')
          .select('*', { count: 'exact', head: true })
          .in('conversation_id', conversationIds)
          .eq('is_read', false)
          .neq('sender_id', user.id);

        if (error) {
          console.error('Error fetching unread messages count:', error);
          setUnreadMessagesCount(0);
          return;
        }

        setUnreadMessagesCount(count || 0);
      } catch (error) {
        console.error('Error fetching unread messages count:', error);
        setUnreadMessagesCount(0);
      }
    };

    fetchUnreadCount();

    // Set up real-time subscription for new messages
    const channel = supabase
      .channel('admin-unread-messages-count')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'messages',
          filter: `is_read=eq.false`
        },
        () => {
          fetchUnreadCount();
        }
      )
      .subscribe();

    // Poll for updates every 30 seconds as fallback
    const pollInterval = setInterval(fetchUnreadCount, 30000);

    return () => {
      supabase.removeChannel(channel);
      clearInterval(pollInterval);
    };
  }, [user, isAdmin, isSuperAdmin]);

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
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/admin",
      roles: ["super_admin", "admin", "moderator"],
    },
    // {
    //   label: "Vendor Management",
    //   icon: ShoppingBag,
    //   roles: ["super_admin", "admin", "moderator"],
    //   submenu: [
    //     {
    //       label: "Applications",
    //       href: "/admin/vendors/applications",
    //       roles: ["super_admin", "admin", "moderator"],
    //     },
    //     {
    //       label: "All Vendors",
    //       href: "/admin/vendors",
    //       roles: ["super_admin", "admin", "moderator"],
    //     },
    //     {
    //       label: "Payouts",
    //       href: "/admin/vendors/payouts",
    //       roles: ["super_admin"],
    //     },
    //   ],
    // },
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
        {
          label: "Homepage Sections",
          href: "/admin/sections",
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
    // {
    //   label: "Agents",
    //   icon: MapPin,
    //   href: "/admin/agents",
    //   roles: ["super_admin", "admin", "moderator"],
    // },
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
      label: "Messages",
      icon: MessageSquare,
      roles: ["super_admin", "admin"],
      submenu: [
        {
          label: "All Conversations",
          href: "/admin/messages",
          roles: ["super_admin", "admin"],
        },
        {
          label: "Send Broadcast",
          href: "/admin/messages/broadcast",
          roles: ["super_admin", "admin"],
        },
        {
          label: "Broadcast History",
          href: "/admin/messages/broadcast/history",
          roles: ["super_admin", "admin"],
        },
      ],
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
    {
      label: "Homepage",
      icon: Home,
      href: "/",
      roles: ["super_admin", "admin", "moderator"],
    },
  ];

  const userRole = profile?.role;
  const filteredMenu = menuItems
    .filter((item) => item.roles?.includes(userRole))
    .map((item) => ({
      ...item,
      submenu: item.submenu?.filter((sub) => sub.roles?.includes(userRole)),
    }));

  // Close sidebar on mobile when menu item is clicked
  const handleMenuClick = () => {
    if (window.innerWidth <= 1024) {
      setSidebarOpen(false);
    }
  };

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
                    <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                      <item.icon size={20} />
                      {item.label === "Messages" && unreadMessagesCount > 0 && (
                        <span className="admin-message-badge">{unreadMessagesCount > 99 ? '99+' : unreadMessagesCount}</span>
                      )}
                    </div>
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
                        onClick={handleMenuClick}
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
                  onClick={handleMenuClick}
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

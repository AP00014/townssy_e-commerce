"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useRouter } from "next/navigation";
import { supabase } from "../../../../lib/supabase";
import {
  FileText,
  Search,
  Filter,
  Calendar,
  User,
  Activity,
  AlertCircle,
  Download,
  RefreshCw,
} from "lucide-react";
import "../../../styles/admin-settings.css";

export default function AuditLogsPage() {
  const router = useRouter();
  const { user, profile, isSuperAdmin } = useAuth();
  const [loading, setLoading] = useState(true);
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [userFilter, setUserFilter] = useState("all");
  const [actionFilter, setActionFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const logsPerPage = 50;

  // Check permissions
  useEffect(() => {
    if (!isSuperAdmin) {
      router.push("/admin");
    }
  }, [isSuperAdmin, router]);

  // Load audit logs
  useEffect(() => {
    if (isSuperAdmin) {
      fetchAuditLogs();
    }
  }, [isSuperAdmin, currentPage]);

  // Apply filters
  useEffect(() => {
    applyFilters();
  }, [logs, searchQuery, userFilter, actionFilter, dateFilter]);

  const fetchAuditLogs = async () => {
    try {
      setLoading(true);
      const from = (currentPage - 1) * logsPerPage;
      const to = from + logsPerPage - 1;

      let query = supabase
        .from("audit_logs")
        .select(
          `
          *,
          profiles:user_id (
            full_name,
            email,
            username
          )
        `
        )
        .order("created_at", { ascending: false })
        .range(from, to);

      const { data, error, count } = await query;

      if (error) throw error;

      setLogs(data || []);
      setTotalPages(Math.ceil((count || 0) / logsPerPage));
    } catch (error) {
      console.error("Error fetching audit logs:", error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...logs];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (log) =>
          log.action?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          log.entity_type?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          log.profiles?.full_name
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          log.profiles?.email?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // User filter
    if (userFilter !== "all") {
      filtered = filtered.filter((log) => log.user_id === userFilter);
    }

    // Action filter
    if (actionFilter !== "all") {
      filtered = filtered.filter((log) => log.action === actionFilter);
    }

    // Date filter
    if (dateFilter !== "all") {
      const now = new Date();
      let dateThreshold;

      switch (dateFilter) {
        case "today":
          dateThreshold = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate()
          );
          break;
        case "week":
          dateThreshold = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          break;
        case "month":
          dateThreshold = new Date(now.getFullYear(), now.getMonth(), 1);
          break;
        default:
          dateThreshold = null;
      }

      if (dateThreshold) {
        filtered = filtered.filter(
          (log) => new Date(log.created_at) >= dateThreshold
        );
      }
    }

    setFilteredLogs(filtered);
  };

  const getActionIcon = (action) => {
    switch (action?.toLowerCase()) {
      case "insert":
        return "➕";
      case "update":
        return "✏️";
      case "delete":
        return "🗑️";
      default:
        return "📝";
    }
  };

  const getActionColor = (action) => {
    switch (action?.toLowerCase()) {
      case "insert":
        return "success";
      case "update":
        return "info";
      case "delete":
        return "danger";
      default:
        return "default";
    }
  };

  const formatChanges = (changes) => {
    if (!changes) return "No changes recorded";

    try {
      const parsed =
        typeof changes === "string" ? JSON.parse(changes) : changes;
      const lines = [];

      if (parsed.old && parsed.new) {
        lines.push("Changes:");
        Object.keys(parsed.new).forEach((key) => {
          if (parsed.old[key] !== parsed.new[key]) {
            lines.push(
              `  ${key}: ${JSON.stringify(parsed.old[key])} → ${JSON.stringify(
                parsed.new[key]
              )}`
            );
          }
        });
      }

      return lines.length > 1 ? lines.join("\n") : "Data modified";
    } catch {
      return "Changes recorded";
    }
  };

  const exportLogs = () => {
    const csvContent = [
      [
        "Date",
        "User",
        "Action",
        "Entity Type",
        "Entity ID",
        "IP Address",
        "User Agent",
      ].join(","),
      ...filteredLogs.map((log) =>
        [
          new Date(log.created_at).toISOString(),
          log.profiles?.full_name || log.profiles?.email || "Unknown",
          log.action,
          log.entity_type,
          log.entity_id,
          log.ip_address,
          `"${log.user_agent}"`,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `audit-logs-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Get unique users for filter
  const uniqueUsers = [
    ...new Set(logs.map((log) => log.user_id).filter(Boolean)),
  ];
  const uniqueActions = [
    ...new Set(logs.map((log) => log.action).filter(Boolean)),
  ];

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner-large"></div>
        <p>Loading audit logs...</p>
      </div>
    );
  }

  return (
    <div className="audit-container">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1>Audit Logs</h1>
          <p>Monitor system activities and user actions</p>
        </div>
        <div className="header-actions">
          <button className="btn-secondary" onClick={fetchAuditLogs}>
            <RefreshCw size={18} />
            Refresh
          </button>
          <button className="btn-primary" onClick={exportLogs}>
            <Download size={18} />
            Export CSV
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="filters-bar">
        <div className="search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search logs by action, entity, or user..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <select
            value={userFilter}
            onChange={(e) => setUserFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Users</option>
            {uniqueUsers.map((userId) => {
              const userLog = logs.find((log) => log.user_id === userId);
              const userName =
                userLog?.profiles?.full_name ||
                userLog?.profiles?.email ||
                "Unknown";
              return (
                <option key={userId} value={userId}>
                  {userName}
                </option>
              );
            })}
          </select>

          <select
            value={actionFilter}
            onChange={(e) => setActionFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Actions</option>
            {uniqueActions.map((action) => (
              <option key={action} value={action}>
                {action}
              </option>
            ))}
          </select>

          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">Last 7 Days</option>
            <option value="month">This Month</option>
          </select>
        </div>
      </div>

      {/* Logs Table */}
      <div className="data-card">
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>User</th>
                <th>Action</th>
                <th>Entity</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan="5" className="empty-state">
                    <FileText size={48} />
                    <p>No audit logs found</p>
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log) => (
                  <tr key={log.id}>
                    <td className="text-mono">
                      {new Date(log.created_at).toLocaleString()}
                    </td>
                    <td>
                      <div className="user-info">
                        <User size={16} />
                        <span>
                          {log.profiles?.full_name ||
                            log.profiles?.email ||
                            "Unknown User"}
                        </span>
                      </div>
                    </td>
                    <td>
                      <span className={`badge ${getActionColor(log.action)}`}>
                        {getActionIcon(log.action)} {log.action}
                      </span>
                    </td>
                    <td>
                      <div className="entity-info">
                        <span className="entity-type">{log.entity_type}</span>
                        {log.entity_id && (
                          <span className="entity-id">#{log.entity_id}</span>
                        )}
                      </div>
                    </td>
                    <td>
                      <div className="log-details">
                        {log.changes && (
                          <details>
                            <summary>View Changes</summary>
                            <pre className="changes-json">
                              {formatChanges(log.changes)}
                            </pre>
                          </details>
                        )}
                        {log.ip_address && (
                          <div className="log-meta">IP: {log.ip_address}</div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            className="btn-secondary"
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="pagination-info">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="btn-secondary"
            onClick={() =>
              setCurrentPage((prev) => Math.min(totalPages, prev + 1))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

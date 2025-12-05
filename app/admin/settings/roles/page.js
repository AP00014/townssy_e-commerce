"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useRouter } from "next/navigation";
import { supabase } from "../../../../lib/supabase";
import {
  Shield,
  Users,
  Edit,
  Save,
  X,
  Check,
  AlertTriangle,
  UserCheck,
  Settings,
  Eye,
  Plus,
  Trash2,
} from "lucide-react";
import "../../../styles/admin-settings.css";

export default function RoleManagementPage() {
  const router = useRouter();
  const { user, profile, isSuperAdmin } = useAuth();
  const [loading, setLoading] = useState(true);
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [editingRole, setEditingRole] = useState(null);
  const [newRole, setNewRole] = useState({
    role: "",
    module: "",
    permissions: {},
  });

  // Check permissions
  useEffect(() => {
    if (!isSuperAdmin) {
      router.push("/admin");
    }
  }, [isSuperAdmin, router]);

  // Load data
  useEffect(() => {
    if (isSuperAdmin) {
      fetchRolesAndPermissions();
    }
  }, [isSuperAdmin]);

  const fetchRolesAndPermissions = async () => {
    try {
      setLoading(true);

      // Fetch role permissions
      const { data: permissionsData, error: permError } = await supabase
        .from("role_permissions")
        .select("*")
        .order("role, module");

      if (permError) throw permError;

      setPermissions(permissionsData || []);

      // Extract unique roles
      const uniqueRoles = [
        ...new Set(permissionsData?.map((p) => p.role) || []),
      ];
      setRoles(uniqueRoles);
    } catch (error) {
      console.error("Error fetching roles:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePermissionChange = async (role, module, permission, value) => {
    try {
      const { error } = await supabase.from("role_permissions").upsert({
        role,
        module,
        [permission]: value,
      });

      if (error) throw error;

      fetchRolesAndPermissions();
    } catch (error) {
      console.error("Error updating permission:", error);
      alert("Failed to update permission: " + error.message);
    }
  };

  const handleAddRole = async () => {
    if (!newRole.role.trim()) {
      alert("Please enter a role name");
      return;
    }

    try {
      const { error } = await supabase.from("role_permissions").insert({
        role: newRole.role,
        module: "users", // Default module
        can_view: false,
        can_create: false,
        can_edit: false,
        can_delete: false,
        can_approve: false,
        can_verify: false,
      });

      if (error) throw error;

      setNewRole({ role: "", module: "", permissions: {} });
      fetchRolesAndPermissions();
      alert("Role added successfully!");
    } catch (error) {
      console.error("Error adding role:", error);
      alert("Failed to add role: " + error.message);
    }
  };

  const handleDeleteRole = async (roleName) => {
    if (
      !confirm(
        `Are you sure you want to delete the "${roleName}" role? This will remove all permissions for this role.`
      )
    ) {
      return;
    }

    try {
      const { error } = await supabase
        .from("role_permissions")
        .delete()
        .eq("role", roleName);

      if (error) throw error;

      fetchRolesAndPermissions();
      alert("Role deleted successfully!");
    } catch (error) {
      console.error("Error deleting role:", error);
      alert("Failed to delete role: " + error.message);
    }
  };

  const getRolePermissions = (roleName) => {
    return permissions.filter((p) => p.role === roleName);
  };

  const modules = [
    { key: "users", label: "Users", icon: Users },
    { key: "vendors", label: "Vendors", icon: Settings },
    { key: "products", label: "Products", icon: Settings },
    { key: "orders", label: "Orders", icon: Settings },
    { key: "agents", label: "Agents", icon: UserCheck },
    { key: "finances", label: "Finances", icon: Settings },
    { key: "reports", label: "Reports", icon: Eye },
    { key: "settings", label: "Settings", icon: Settings },
  ];

  const permissionTypes = [
    { key: "can_view", label: "View" },
    { key: "can_create", label: "Create" },
    { key: "can_edit", label: "Edit" },
    { key: "can_delete", label: "Delete" },
    { key: "can_approve", label: "Approve" },
    { key: "can_verify", label: "Verify" },
  ];

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner-large"></div>
        <p>Loading role management...</p>
      </div>
    );
  }

  return (
    <div className="roles-container">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1>Role Management</h1>
          <p>Configure permissions for different user roles</p>
        </div>
      </div>

      {/* Add New Role */}
      <div className="add-role-card">
        <h3>Add New Role</h3>
        <div className="add-role-form">
          <input
            type="text"
            placeholder="Role name (e.g., moderator, support)"
            value={newRole.role}
            onChange={(e) =>
              setNewRole((prev) => ({ ...prev, role: e.target.value }))
            }
          />
          <button className="btn-primary" onClick={handleAddRole}>
            <Plus size={18} />
            Add Role
          </button>
        </div>
      </div>

      {/* Roles Table */}
      <div className="roles-table-container">
        <table className="roles-table">
          <thead>
            <tr>
              <th>Role</th>
              {modules.map((module) => (
                <th key={module.key} className="module-header">
                  <module.icon size={16} />
                  {module.label}
                </th>
              ))}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((roleName) => {
              const rolePermissions = getRolePermissions(roleName);
              return (
                <tr key={roleName}>
                  <td className="role-name">
                    <Shield size={18} />
                    {roleName}
                  </td>
                  {modules.map((module) => {
                    const modulePerm = rolePermissions.find(
                      (p) => p.module === module.key
                    );
                    return (
                      <td key={module.key} className="permissions-cell">
                        <div className="permissions-grid">
                          {permissionTypes.map((perm) => (
                            <label key={perm.key} className="permission-toggle">
                              <input
                                type="checkbox"
                                checked={modulePerm?.[perm.key] || false}
                                onChange={(e) =>
                                  handlePermissionChange(
                                    roleName,
                                    module.key,
                                    perm.key,
                                    e.target.checked
                                  )
                                }
                              />
                              <span className="toggle-slider small"></span>
                              <span className="perm-label">{perm.label}</span>
                            </label>
                          ))}
                        </div>
                      </td>
                    );
                  })}
                  <td className="actions-cell">
                    {roleName !== "super_admin" && (
                      <button
                        className="btn-danger-sm"
                        onClick={() => handleDeleteRole(roleName)}
                        title="Delete Role"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Permission Legend */}
      <div className="permissions-legend">
        <h4>Permission Types</h4>
        <div className="legend-grid">
          {permissionTypes.map((perm) => (
            <div key={perm.key} className="legend-item">
              <strong>{perm.label}:</strong> Ability to{" "}
              {perm.label.toLowerCase()}{" "}
              {perm.key === "can_approve"
                ? "items"
                : perm.key === "can_verify"
                ? "content"
                : "records"}
            </div>
          ))}
        </div>
      </div>

      {/* Warning */}
      <div className="warning-card">
        <AlertTriangle size={20} />
        <div>
          <h4>Important Notice</h4>
          <p>
            Changes to role permissions take effect immediately. Be careful when
            modifying permissions, especially for the 'super_admin' role which
            should maintain full access.
          </p>
        </div>
      </div>
    </div>
  );
}

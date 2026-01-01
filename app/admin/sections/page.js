'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import { supabase } from '../../../lib/supabase';
import {
  Layout,
  Eye,
  EyeOff,
  GripVertical,
  Settings,
  ArrowUp,
  ArrowDown,
  RefreshCw,
  Plus,
  Edit,
  Trash2,
  X,
  Image as ImageIcon,
  Tag
} from 'lucide-react';
import '../../styles/admin-sections.css';

export default function SectionsPage() {
  const router = useRouter();
  const { user, profile, isAdmin, isSuperAdmin } = useAuth();
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingSection, setEditingSection] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    display_name: '',
    description: '',
    section_type: 'scroll',
    is_active: true,
    sort_order: 0,
    max_products: 10
  });
  const [tailoredItems, setTailoredItems] = useState([]);
  const [promoSlides, setPromoSlides] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    inactive: 0
  });

  // Check permissions
  useEffect(() => {
    if (!isAdmin && !isSuperAdmin) {
      router.push('/admin');
    }
  }, [isAdmin, isSuperAdmin, router]);

  // Fetch sections
  useEffect(() => {
    fetchSections();
  }, []);

  const fetchSections = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('home_sections')
        .select('*')
        .order('sort_order', { ascending: true });

      if (error) throw error;

      setSections(data || []);

      // Calculate stats
      const total = data?.length || 0;
      const active = data?.filter(s => s.is_active).length || 0;
      const inactive = total - active;

      setStats({ total, active, inactive });
    } catch (error) {
      console.error('Error fetching sections:', error);
      alert('Failed to load sections: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleSectionStatus = async (sectionId, currentStatus) => {
    try {
      setSaving(true);
      const { error } = await supabase
        .from('home_sections')
        .update({ is_active: !currentStatus })
        .eq('id', sectionId);

      if (error) throw error;

      // Update local state
      setSections(prev =>
        prev.map(section =>
          section.id === sectionId
            ? { ...section, is_active: !currentStatus }
            : section
        )
      );

      // Update stats
      setStats(prev => ({
        ...prev,
        active: prev.active + (currentStatus ? -1 : 1),
        inactive: prev.inactive + (currentStatus ? 1 : -1)
      }));
    } catch (error) {
      console.error('Error updating section:', error);
      alert('Failed to update section: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  const updateSortOrder = async (sectionId, newOrder) => {
    try {
      setSaving(true);
      const { error } = await supabase
        .from('home_sections')
        .update({ sort_order: newOrder })
        .eq('id', sectionId);

      if (error) throw error;

      // Refresh sections to get updated order
      await fetchSections();
    } catch (error) {
      console.error('Error updating sort order:', error);
      alert('Failed to update sort order: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  const moveSection = async (index, direction) => {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === sections.length - 1)
    ) {
      return;
    }

    const newIndex = direction === 'up' ? index - 1 : index + 1;
    const currentSection = sections[index];
    const targetSection = sections[newIndex];

    // Swap sort orders
    await updateSortOrder(currentSection.id, targetSection.sort_order);
    await updateSortOrder(targetSection.id, currentSection.sort_order);
  };

  const openCreateModal = () => {
    setEditingSection(null);
    setFormData({
      name: '',
      display_name: '',
      description: '',
      section_type: 'scroll',
      is_active: true,
      sort_order: sections.length > 0 ? Math.max(...sections.map(s => s.sort_order)) + 1 : 0,
      max_products: 10
    });
    setShowModal(true);
  };

  const openEditModal = (section) => {
    setEditingSection(section);
    setFormData({
      name: section.name,
      display_name: section.display_name,
      description: section.description || '',
      section_type: section.section_type || 'scroll',
      is_active: section.is_active,
      sort_order: section.sort_order,
      max_products: section.max_products || 10
    });
    
    // Parse layout_config for special sections
    if (section.layout_config) {
      const config = section.layout_config;
      if (config.type === 'tailored_selections' && config.items) {
        setTailoredItems(config.items);
      } else {
        setTailoredItems([]);
      }
      
      if (config.type === 'promo_banner' && config.slides) {
        setPromoSlides(config.slides);
      } else {
        setPromoSlides([]);
      }
    } else {
      setTailoredItems([]);
      setPromoSlides([]);
    }
    
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingSection(null);
    setFormData({
      name: '',
      display_name: '',
      description: '',
      section_type: 'scroll',
      is_active: true,
      sort_order: 0,
      max_products: 10
    });
    setTailoredItems([]);
    setPromoSlides([]);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : (type === 'number' ? parseInt(value) || 0 : value)
    }));
  };

  const generateNameFromDisplay = (displayName) => {
    return displayName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '_')
      .replace(/^_+|_+$/g, '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.display_name.trim()) {
      alert('Display name is required');
      return;
    }

    // Auto-generate name from display_name if not provided
    const sectionName = formData.name.trim() || generateNameFromDisplay(formData.display_name);

    // Build layout_config for special sections
    let layoutConfig = null;
    if (editingSection) {
      if (editingSection.name === 'tailored_selections' && tailoredItems.length > 0) {
        layoutConfig = {
          type: 'tailored_selections',
          items: tailoredItems
        };
      } else if (editingSection.name === 'promo_banner' && promoSlides.length > 0) {
        layoutConfig = {
          type: 'promo_banner',
          slides: promoSlides
        };
      } else if (editingSection.layout_config) {
        // Preserve existing layout_config if not editing special sections
        layoutConfig = editingSection.layout_config;
      }
    }

    try {
      setSaving(true);
      
      const updateData = {
        name: sectionName,
        display_name: formData.display_name.trim(),
        description: formData.description.trim() || null,
        section_type: formData.section_type,
        is_active: formData.is_active,
        sort_order: formData.sort_order,
        max_products: formData.max_products
      };

      if (layoutConfig) {
        updateData.layout_config = layoutConfig;
      }
      
      if (editingSection) {
        // Update existing section
        const { error } = await supabase
          .from('home_sections')
          .update(updateData)
          .eq('id', editingSection.id);

        if (error) throw error;
        alert('Section updated successfully!');
      } else {
        // Create new section
        const { error } = await supabase
          .from('home_sections')
          .insert(updateData);

        if (error) throw error;
        alert('Section created successfully!');
      }

      closeModal();
      await fetchSections();
    } catch (error) {
      console.error('Error saving section:', error);
      alert('Failed to save section: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  // Tailored Selections handlers
  const addTailoredItem = () => {
    setTailoredItems([...tailoredItems, {
      id: Date.now(),
      label: '',
      slug: '',
      category: '',
      image: ''
    }]);
  };

  const updateTailoredItem = (index, field, value) => {
    const updated = [...tailoredItems];
    updated[index] = { ...updated[index], [field]: value };
    // Auto-generate slug from label
    if (field === 'label') {
      updated[index].slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    }
    setTailoredItems(updated);
  };

  const removeTailoredItem = (index) => {
    setTailoredItems(tailoredItems.filter((_, i) => i !== index));
  };

  // Promo Banner handlers
  const addPromoSlide = () => {
    setPromoSlides([...promoSlides, {
      id: Date.now(),
      title: '',
      subtitle: '',
      image: '',
      gradient: 'linear-gradient(135deg, var(--primary-color) 0%, var(--primary-color-dark) 100%)'
    }]);
  };

  const updatePromoSlide = (index, field, value) => {
    const updated = [...promoSlides];
    updated[index] = { ...updated[index], [field]: value };
    setPromoSlides(updated);
  };

  const removePromoSlide = (index) => {
    setPromoSlides(promoSlides.filter((_, i) => i !== index));
  };

  const handleDelete = async (sectionId, sectionName) => {
    if (!confirm(`Are you sure you want to delete the section "${sectionName}"? This action cannot be undone.`)) {
      return;
    }

    try {
      setSaving(true);
      const { error } = await supabase
        .from('home_sections')
        .delete()
        .eq('id', sectionId);

      if (error) throw error;

      alert('Section deleted successfully!');
      await fetchSections();
    } catch (error) {
      console.error('Error deleting section:', error);
      alert('Failed to delete section: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="admin-container">
        <div className="loading-container">
          <div className="spinner-large"></div>
          <p>Loading sections...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1>Homepage Sections</h1>
          <p>Manage which sections appear on the homepage</p>
        </div>
        <div className="header-actions">
          <button
            className="btn-secondary"
            onClick={fetchSections}
            disabled={loading}
          >
            <RefreshCw size={18} />
            Refresh
          </button>
          <button
            className="btn-primary"
            onClick={openCreateModal}
          >
            <Plus size={18} />
            Add Section
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-grid-3">
        <div className="stat-card">
          <div className="stat-content">
            <div className="stat-label">Total Sections</div>
            <div className="stat-value">{stats.total}</div>
          </div>
          <div className="stat-icon">
            <Layout size={24} />
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-content">
            <div className="stat-label">Active</div>
            <div className="stat-value" style={{ color: '#10b981' }}>
              {stats.active}
            </div>
          </div>
          <div className="stat-icon" style={{ color: '#10b981' }}>
            <Eye size={24} />
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-content">
            <div className="stat-label">Inactive</div>
            <div className="stat-value" style={{ color: '#ef4444' }}>
              {stats.inactive}
            </div>
          </div>
          <div className="stat-icon" style={{ color: '#ef4444' }}>
            <EyeOff size={24} />
          </div>
        </div>
      </div>

      {/* Sections List */}
      <div className="data-card">
        <div className="card-header">
          <h3>Sections</h3>
          <p className="card-subtitle">
            Toggle sections on/off to control homepage visibility
          </p>
        </div>

        <div className="sections-list">
          {sections.length === 0 ? (
            <div className="empty-state">
              <Layout size={48} />
              <p>No sections found</p>
            </div>
          ) : (
            sections.map((section, index) => (
              <div
                key={section.id}
                className={`section-item ${!section.is_active ? 'inactive' : ''}`}
              >
                <div className="section-drag-handle">
                  <GripVertical size={20} />
                </div>

                <div className="section-info">
                  <div className="section-header-row">
                    <h4 className="section-name">{section.display_name}</h4>
                    {(section.name === 'tailored_selections' || section.name === 'promo_banner') && (
                      <span className="section-type-badge special" title="Special Section">
                        Special
                      </span>
                    )}
                    <span className={`section-type-badge ${section.section_type}`}>
                      {section.section_type}
                    </span>
                  </div>
                  {section.description && (
                    <p className="section-description">{section.description}</p>
                  )}
                  <div className="section-meta">
                    <span className="section-meta-item">
                      <strong>ID:</strong> {section.name}
                    </span>
                    <span className="section-meta-item">
                      <strong>Order:</strong> {section.sort_order}
                    </span>
                    <span className="section-meta-item">
                      <strong>Max Products:</strong> {section.max_products}
                    </span>
                  </div>
                </div>

                <div className="section-actions">
                  <div className="section-move-buttons">
                    <button
                      type="button"
                      className="icon-btn"
                      onClick={() => moveSection(index, 'up')}
                      disabled={index === 0 || saving}
                      title="Move up"
                    >
                      <ArrowUp size={18} />
                    </button>
                    <button
                      type="button"
                      className="icon-btn"
                      onClick={() => moveSection(index, 'down')}
                      disabled={index === sections.length - 1 || saving}
                      title="Move down"
                    >
                      <ArrowDown size={18} />
                    </button>
                  </div>

                  <div className="section-action-buttons">
                    <button
                      type="button"
                      className="icon-btn edit-btn"
                      onClick={() => openEditModal(section)}
                      disabled={saving}
                      title="Edit section"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      type="button"
                      className="icon-btn delete-btn"
                      onClick={() => handleDelete(section.id, section.display_name)}
                      disabled={saving}
                      title="Delete section"
                    >
                      <Trash2 size={18} />
                    </button>
                    <button
                      type="button"
                      className={`toggle-btn ${section.is_active ? 'active' : 'inactive'}`}
                      onClick={() => toggleSectionStatus(section.id, section.is_active)}
                      disabled={saving}
                      title={section.is_active ? 'Hide section' : 'Show section'}
                    >
                      {section.is_active ? (
                        <>
                          <Eye size={18} />
                          <span>Active</span>
                        </>
                      ) : (
                        <>
                          <EyeOff size={18} />
                          <span>Inactive</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Help Text */}
      <div className="info-card">
        <h4>Section Management Tips</h4>
        <ul>
          <li>
            <strong>Active sections</strong> will appear on the homepage in the order specified
          </li>
          <li>
            <strong>Inactive sections</strong> will be hidden from the homepage but can be reactivated anytime
          </li>
          <li>
            Use the <strong>arrow buttons</strong> to reorder sections on the homepage
          </li>
          <li>
            Changes take effect immediately on the homepage
          </li>
          <li>
            Section types: <code>scroll</code> (horizontal scroll), <code>grid</code> (grid layout), <code>ranking</code> (ranked list), <code>deal</code> (deals section), <code>category</code> (category-based)
          </li>
        </ul>
      </div>

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingSection ? 'Edit Section' : 'Create New Section'}</h2>
              <button
                type="button"
                className="modal-close-btn"
                onClick={closeModal}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="section-form">
              <div className="form-group">
                <label htmlFor="display_name">Display Name *</label>
                <input
                  type="text"
                  id="display_name"
                  name="display_name"
                  value={formData.display_name}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., Featured Products"
                />
                <small>The name shown on the homepage</small>
              </div>

              <div className="form-group">
                <label htmlFor="name">Section ID</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Auto-generated from display name"
                  disabled={editingSection && (editingSection.name === 'tailored_selections' || editingSection.name === 'promo_banner')}
                />
                <small>
                  {editingSection && (editingSection.name === 'tailored_selections' || editingSection.name === 'promo_banner')
                    ? 'Section ID is fixed for special sections'
                    : 'Unique identifier (auto-generated if left empty)'}
                </small>
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="3"
                  placeholder="Optional description for this section"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="section_type">Section Type *</label>
                  <select
                    id="section_type"
                    name="section_type"
                    value={formData.section_type}
                    onChange={handleInputChange}
                    required
                    disabled={editingSection && (editingSection.name === 'tailored_selections' || editingSection.name === 'promo_banner')}
                  >
                    <option value="scroll">Scroll (Horizontal)</option>
                    <option value="grid">Grid</option>
                    <option value="ranking">Ranking</option>
                    <option value="deal">Deal</option>
                    <option value="category">Category</option>
                  </select>
                  {editingSection && (editingSection.name === 'tailored_selections' || editingSection.name === 'promo_banner') && (
                    <small style={{ color: '#6b7280' }}>Section type is fixed for special sections</small>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="sort_order">Sort Order</label>
                  <input
                    type="number"
                    id="sort_order"
                    name="sort_order"
                    value={formData.sort_order}
                    onChange={handleInputChange}
                    min="0"
                  />
                  <small>Lower numbers appear first</small>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="max_products">Max Products</label>
                  <input
                    type="number"
                    id="max_products"
                    name="max_products"
                    value={formData.max_products}
                    onChange={handleInputChange}
                    min="1"
                    required
                  />
                  <small>Maximum products to display</small>
                </div>

                <div className="form-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="is_active"
                      checked={formData.is_active}
                      onChange={handleInputChange}
                    />
                    <span>Active (visible on homepage)</span>
                  </label>
                </div>
              </div>

              {/* Tailored Selections Editor */}
              {editingSection?.name === 'tailored_selections' && (
                <div className="special-section-editor">
                  <div className="form-group">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                      <label style={{ margin: 0 }}>Tailored Selection Items</label>
                      <button
                        type="button"
                        className="btn-secondary"
                        onClick={addTailoredItem}
                        style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
                      >
                        <Plus size={16} />
                        Add Item
                      </button>
                    </div>
                    {tailoredItems.length === 0 ? (
                      <p style={{ color: '#6b7280', fontSize: '0.875rem', textAlign: 'center', padding: '1rem' }}>
                        No items added. Click "Add Item" to get started.
                      </p>
                    ) : (
                      <div className="items-list">
                        {tailoredItems.map((item, index) => (
                          <div key={item.id || index} className="item-card">
                            <div className="form-row">
                              <div className="form-group">
                                <label>Label *</label>
                                <input
                                  type="text"
                                  value={item.label}
                                  onChange={(e) => updateTailoredItem(index, 'label', e.target.value)}
                                  placeholder="e.g., Women's Clothes"
                                  required
                                />
                              </div>
                              <div className="form-group">
                                <label>Slug</label>
                                <input
                                  type="text"
                                  value={item.slug}
                                  onChange={(e) => updateTailoredItem(index, 'slug', e.target.value)}
                                  placeholder="Auto-generated from label"
                                />
                              </div>
                            </div>
                            <div className="form-row">
                              <div className="form-group">
                                <label>Category</label>
                                <input
                                  type="text"
                                  value={item.category}
                                  onChange={(e) => updateTailoredItem(index, 'category', e.target.value)}
                                  placeholder="e.g., Fashion"
                                />
                              </div>
                              <div className="form-group">
                                <label>Image URL *</label>
                                <input
                                  type="url"
                                  value={item.image}
                                  onChange={(e) => updateTailoredItem(index, 'image', e.target.value)}
                                  placeholder="https://..."
                                  required
                                />
                              </div>
                            </div>
                            <button
                              type="button"
                              className="icon-btn delete-btn"
                              onClick={() => removeTailoredItem(index)}
                              style={{ marginTop: '0.5rem' }}
                            >
                              <Trash2 size={16} />
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Promo Banner Editor */}
              {editingSection?.name === 'promo_banner' && (
                <div className="special-section-editor">
                  <div className="form-group">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                      <label style={{ margin: 0 }}>Promo Banner Slides</label>
                      <button
                        type="button"
                        className="btn-secondary"
                        onClick={addPromoSlide}
                        style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
                      >
                        <Plus size={16} />
                        Add Slide
                      </button>
                    </div>
                    {promoSlides.length === 0 ? (
                      <p style={{ color: '#6b7280', fontSize: '0.875rem', textAlign: 'center', padding: '1rem' }}>
                        No slides added. Click "Add Slide" to get started.
                      </p>
                    ) : (
                      <div className="items-list">
                        {promoSlides.map((slide, index) => (
                          <div key={slide.id || index} className="item-card">
                            <div className="form-row">
                              <div className="form-group">
                                <label>Title *</label>
                                <input
                                  type="text"
                                  value={slide.title}
                                  onChange={(e) => updatePromoSlide(index, 'title', e.target.value)}
                                  placeholder="e.g., Big Sale"
                                  required
                                />
                              </div>
                              <div className="form-group">
                                <label>Subtitle *</label>
                                <input
                                  type="text"
                                  value={slide.subtitle}
                                  onChange={(e) => updatePromoSlide(index, 'subtitle', e.target.value)}
                                  placeholder="e.g., Up to 50% Discount"
                                  required
                                />
                              </div>
                            </div>
                            <div className="form-row">
                              <div className="form-group">
                                <label>Image URL *</label>
                                <input
                                  type="url"
                                  value={slide.image}
                                  onChange={(e) => updatePromoSlide(index, 'image', e.target.value)}
                                  placeholder="https://..."
                                  required
                                />
                              </div>
                              <div className="form-group">
                                <label>Gradient CSS *</label>
                                <input
                                  type="text"
                                  value={slide.gradient}
                                  onChange={(e) => updatePromoSlide(index, 'gradient', e.target.value)}
                                  placeholder="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                                  required
                                />
                                <small>CSS gradient string</small>
                              </div>
                            </div>
                            <button
                              type="button"
                              className="icon-btn delete-btn"
                              onClick={() => removePromoSlide(index)}
                              style={{ marginTop: '0.5rem' }}
                            >
                              <Trash2 size={16} />
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="form-actions">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={closeModal}
                  disabled={saving}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={saving}
                >
                  {saving ? 'Saving...' : editingSection ? 'Update Section' : 'Create Section'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}


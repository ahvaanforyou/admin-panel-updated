// =============================================================================
// src/pages/invitations/InvitationsPage.jsx — Exact match for media_1791196807155.png
// =============================================================================
import React, { useState, useRef, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  ExternalLink, 
  FileText, 
  MoreVertical, 
  Pencil, 
  Trash2, 
  Eye, 
  RotateCcw,
  Heart,
  Home,
  Cake,
  Baby,
  Layers,
  ChevronDown
} from 'lucide-react';
import EmptyState from '../../components/common/EmptyState';
import { useData } from '../../context/DataContext';
import { formatCurrency, CUSTOMIZATION } from '../../config/customization';

export default function InvitationsPage({ onOpenAddTemplate, onEditTemplate }) {
  const { templates, deleteTemplate } = useData();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSubCategory, setSelectedSubCategory] = useState('All');
  const [selectedPriceRange, setSelectedPriceRange] = useState('All');
  const [selectedSort, setSelectedSort] = useState('latest');
  const [selectedTemplateIds, setSelectedTemplateIds] = useState(() => new Set());

  // 3-dots action dropdown state
  const [activeMenuId, setActiveMenuId] = useState(null);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setActiveMenuId(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Format date helper
  const formatDate = (dateStr) => {
    if (!dateStr) return 'Oct 02, 2026';
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      return d.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  // 5 Category KPI Cards matching media_1791196807155.png
  const categoriesList = [
    { id: 'Wedding', label: 'Wedding', icon: Heart, iconBg: 'bg-rose-50 text-rose-600', borderHover: 'hover:border-rose-300' },
    { id: 'House Warming', label: 'House Warming', icon: Home, iconBg: 'bg-amber-50 text-amber-600', borderHover: 'hover:border-amber-300' },
    { id: 'Birthday', label: 'Birthday', icon: Cake, iconBg: 'bg-purple-50 text-purple-600', borderHover: 'hover:border-purple-300' },
    { id: 'Baby Shower', label: 'Baby Shower', icon: Baby, iconBg: 'bg-emerald-50 text-emerald-600', borderHover: 'hover:border-emerald-300' },
    { id: 'Other', label: 'Other', icon: Layers, iconBg: 'bg-blue-50 text-blue-600', borderHover: 'hover:border-blue-300' },
  ];

  const getCategoryCount = (catId) => {
    return (templates || []).filter(t => {
      const cat = (t.category || '').toLowerCase();
      if (catId === 'Other') {
        return !['wedding', 'house warming', 'birthday', 'baby shower'].includes(cat);
      }
      return cat === catId.toLowerCase();
    }).length;
  };

  // Filter & Sort Logic
  const filteredTemplates = (templates || []).filter((t) => {
    const q = searchTerm.toLowerCase();
    const matchesSearch = !q || 
      (t.name || '').toLowerCase().includes(q) || 
      (t.category || '').toLowerCase().includes(q) || 
      (t.sub_category || '').toLowerCase().includes(q) || 
      (t.description || '').toLowerCase().includes(q);

    let matchesCategory = true;
    if (selectedCategory !== 'All') {
      const cat = (t.category || '').toLowerCase();
      if (selectedCategory === 'Other') {
        matchesCategory = !['wedding', 'house warming', 'birthday', 'baby shower'].includes(cat);
      } else {
        matchesCategory = cat === selectedCategory.toLowerCase();
      }
    }

    let matchesSubCategory = true;
    if (selectedSubCategory !== 'All') {
      matchesSubCategory = (t.sub_category || '').toLowerCase() === selectedSubCategory.toLowerCase();
    }

    let matchesPrice = true;
    const price = Number(t.price) || 0;
    if (selectedPriceRange === 'under3k') matchesPrice = price < 3000;
    else if (selectedPriceRange === '3k-5k') matchesPrice = price >= 3000 && price <= 5000;
    else if (selectedPriceRange === '5k-8k') matchesPrice = price > 5000 && price <= 8000;
    else if (selectedPriceRange === 'above8k') matchesPrice = price > 8000;

    return matchesSearch && matchesCategory && matchesSubCategory && matchesPrice;
  }).sort((a, b) => {
    if (selectedSort === 'latest') return new Date(b.created_at || 0) - new Date(a.created_at || 0);
    if (selectedSort === 'oldest') return new Date(a.created_at || 0) - new Date(b.created_at || 0);
    if (selectedSort === 'price_asc') return (Number(a.price) || 0) - (Number(b.price) || 0);
    if (selectedSort === 'price_desc') return (Number(b.price) || 0) - (Number(a.price) || 0);
    if (selectedSort === 'name_asc') return (a.name || '').localeCompare(b.name || '');
    return 0;
  });

  // Checkbox Selection
  const isAllSelected = filteredTemplates.length > 0 && filteredTemplates.every(t => selectedTemplateIds.has(t.template_id));

  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedTemplateIds(new Set());
    } else {
      setSelectedTemplateIds(new Set(filteredTemplates.map(t => t.template_id)));
    }
  };

  const toggleSelectOne = (id) => {
    setSelectedTemplateIds(prev => {
      const copy = new Set(prev);
      if (copy.has(id)) copy.delete(id);
      else copy.add(id);
      return copy;
    });
  };

  // Reset Filters
  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSelectedSubCategory('All');
    setSelectedPriceRange('All');
    setSelectedSort('latest');
  };

  // Delete Action
  const handleDelete = async (templateId, name) => {
    setActiveMenuId(null);
    if (!window.confirm(`Are you sure you want to delete template "${name}"?`)) return;
    try {
      await deleteTemplate(templateId);
    } catch (err) {
      alert(err.response?.data?.message || err.message || 'Failed to delete template');
    }
  };

  // View / Preview Link Action
  const handleViewPreview = (t) => {
    setActiveMenuId(null);
    const url = t.preview_url || t.link;
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      alert(`No preview link configured for ${t.name}. Click 'Edit' to set a preview link.`);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* ── Top Header matching media_1791196807155.png ───────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Invitation Templates</h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage your master catalogue of wedding invitation cards, packages and live preview links.
          </p>
        </div>

        <button
          type="button"
          onClick={onOpenAddTemplate}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4 text-white" />
          <span>Add Template</span>
        </button>
      </div>

      {/* ── 5 Category KPI Cards matching media_1791196807155.png ─────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        {categoriesList.map((cat) => {
          const Icon = cat.icon;
          const count = getCategoryCount(cat.id);
          const isSelected = selectedCategory === cat.id;

          return (
            <div
              key={cat.id}
              onClick={() => setSelectedCategory(selectedCategory === cat.id ? 'All' : cat.id)}
              className={`bg-white rounded-2xl p-4 border transition-all cursor-pointer shadow-xs flex flex-col justify-between space-y-3 ${
                isSelected 
                  ? 'border-blue-600 ring-2 ring-blue-500/20 shadow-sm' 
                  : `border-slate-200/80 ${cat.borderHover}`
              }`}
            >
              <div className="flex items-center justify-between">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${cat.iconBg}`}>
                  <Icon className="w-4.5 h-4.5" />
                </div>
                {isSelected && (
                  <span className="w-2 h-2 rounded-full bg-blue-600" />
                )}
              </div>

              <div>
                <p className="text-xs font-semibold text-slate-600">{cat.label}</p>
                <p className="text-xl font-bold text-slate-900 mt-0.5">
                  {count} <span className="text-xs font-normal text-slate-400">Templates</span>
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Filter Bar Matching media_1791196807155.png (Status Removed) ───── */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 items-center">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search template..."
              className="w-full text-xs pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-800 placeholder:text-slate-400"
            />
          </div>

          {/* All Categories Dropdown */}
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
            >
              <option value="All">All Categories</option>
              {CUSTOMIZATION.templateCategories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* All Sub Categories Dropdown */}
          <div className="relative">
            <select
              value={selectedSubCategory}
              onChange={(e) => setSelectedSubCategory(e.target.value)}
              className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
            >
              <option value="All">All Sub Categories</option>
              {(CUSTOMIZATION.templateSubCategories || [
                'Traditional', 'Modern', 'Minimal', 'Gold Foil', 'Floral', 'Royal', 'Animated Video', 'Other'
              ]).map((sub) => (
                <option key={sub} value={sub}>{sub}</option>
              ))}
            </select>
          </div>

          {/* All Prices Dropdown */}
          <div className="relative">
            <select
              value={selectedPriceRange}
              onChange={(e) => setSelectedPriceRange(e.target.value)}
              className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
            >
              <option value="All">All Prices</option>
              <option value="under3k">Under ₹3,000</option>
              <option value="3k-5k">₹3,000 – ₹5,000</option>
              <option value="5k-8k">₹5,000 – ₹8,000</option>
              <option value="above8k">Above ₹8,000</option>
            </select>
          </div>

          {/* Latest First / Sort Dropdown & Reset */}
          <div className="flex items-center gap-2">
            <select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
              className="flex-1 text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
            >
              <option value="latest">Latest First</option>
              <option value="oldest">Oldest First</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="name_asc">Name: A to Z</option>
            </select>

            <button
              type="button"
              onClick={handleResetFilters}
              title="Reset all filters"
              className="p-2.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors cursor-pointer shrink-0"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ── Templates Catalog Table matching media_1791196807155.png ──────── */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-visible">
        {filteredTemplates.length === 0 ? (
          <EmptyState
            title="No invitation templates found"
            description="Add your first wedding or event invitation template to make it available for client orders."
            actionLabel="+ Add New Template"
            onAction={onOpenAddTemplate}
          />
        ) : (
          <div className="overflow-x-auto min-h-[380px] pb-28">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-50/70 border-b border-slate-200/80 text-slate-500 uppercase text-[10px] tracking-wider">
                  <th className="py-3.5 px-4 w-10 text-center">
                    <input
                      type="checkbox"
                      checked={isAllSelected}
                      onChange={toggleSelectAll}
                      className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                    />
                  </th>
                  <th className="py-3.5 px-4 font-bold">Template Name</th>
                  <th className="py-3.5 px-4 font-bold">Category</th>
                  <th className="py-3.5 px-4 font-bold">Sub Category</th>
                  <th className="py-3.5 px-4 font-bold">Price (₹)</th>
                  <th className="py-3.5 px-4 font-bold">Created On</th>
                  <th className="py-3.5 px-4 font-bold text-right sticky right-0 bg-slate-50/95 backdrop-blur-xs z-10 shadow-[-6px_0_10px_-4px_rgba(0,0,0,0.06)]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredTemplates.map((tpl, index) => {
                  const isChecked = selectedTemplateIds.has(tpl.template_id);
                  const isMenuOpen = activeMenuId === tpl.template_id;
                  // If row is in bottom half or last 2 rows, open upwards so Delete Template is always visible without scrolling
                  const openUpwards = index >= Math.max(1, filteredTemplates.length - 2);

                  return (
                    <tr 
                      key={tpl.template_id} 
                      className={`hover:bg-slate-50/80 transition-colors ${isChecked ? 'bg-blue-50/30' : ''}`}
                    >
                      {/* Checkbox */}
                      <td className="py-4 px-4 text-center">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleSelectOne(tpl.template_id)}
                          className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                        />
                      </td>

                      {/* Template Name with icon and description */}
                      <td className="py-4 px-4 font-bold text-slate-900">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200/60 flex items-center justify-center text-blue-600 shrink-0">
                            <FileText className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="font-bold text-slate-900">{tpl.name}</p>
                            {tpl.description && (
                              <p className="text-[11px] text-slate-400 font-normal line-clamp-1 mt-0.5">
                                {tpl.description}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Category Badge */}
                      <td className="py-4 px-4">
                        <span className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg text-[11px] font-semibold">
                          {tpl.category || 'Wedding'}
                        </span>
                      </td>

                      {/* Sub Category */}
                      <td className="py-4 px-4 text-slate-600 font-medium">
                        {tpl.sub_category || '—'}
                      </td>

                      {/* Price */}
                      <td className="py-4 px-4 font-bold text-slate-900">
                        {formatCurrency(tpl.price)}
                      </td>

                      {/* Created On Date (Visible per prompt requirement) */}
                      <td className="py-4 px-4 text-slate-600 font-medium whitespace-nowrap">
                        {formatDate(tpl.created_at)}
                      </td>

                      {/* Actions: View (preview URL) and Edit, 3-dots (Sticky right so always visible) */}
                      <td className={`py-4 px-4 text-right sticky right-0 backdrop-blur-xs shadow-[-6px_0_10px_-4px_rgba(0,0,0,0.06)] transition-colors ${
                        isChecked ? 'bg-blue-50/95' : 'bg-white/95 group-hover:bg-slate-50/95'
                      } ${isMenuOpen ? 'z-40' : 'z-20'}`}>
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Direct Quick View button */}
                          {(tpl.preview_url || tpl.link) && (
                            <button
                              type="button"
                              onClick={() => handleViewPreview(tpl)}
                              title="Open live preview link"
                              className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </button>
                          )}

                          {/* 3-dots Menu Button */}
                          <div className="relative">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveMenuId(isMenuOpen ? null : tpl.template_id);
                              }}
                              className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                            >
                              <MoreVertical className="w-4 h-4" />
                            </button>

                            {isMenuOpen && (
                              <div
                                ref={menuRef}
                                className={`absolute right-0 w-44 bg-white rounded-xl shadow-xl border border-slate-200/90 py-1.5 z-50 text-xs text-left animate-in fade-in-50 zoom-in-95 duration-100 ${
                                  openUpwards ? 'bottom-full mb-1.5' : 'top-full mt-1.5'
                                }`}
                              >
                                <button
                                  type="button"
                                  onClick={() => handleViewPreview(tpl)}
                                  className="w-full flex items-center gap-2 px-3.5 py-2 text-slate-700 hover:bg-slate-50 transition-colors font-medium cursor-pointer"
                                >
                                  <Eye className="w-3.5 h-3.5 text-slate-400" />
                                  <span>View Preview</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setActiveMenuId(null);
                                    if (onEditTemplate) onEditTemplate(tpl);
                                  }}
                                  className="w-full flex items-center gap-2 px-3.5 py-2 text-slate-700 hover:bg-slate-50 transition-colors font-medium cursor-pointer"
                                >
                                  <Pencil className="w-3.5 h-3.5 text-slate-400" />
                                  <span>Edit Template</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDelete(tpl.template_id, tpl.name)}
                                  className="w-full flex items-center gap-2 px-3.5 py-2 text-rose-600 hover:bg-rose-50 transition-colors font-medium border-t border-slate-100 cursor-pointer"
                                >
                                  <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                                  <span>Delete Template</span>
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

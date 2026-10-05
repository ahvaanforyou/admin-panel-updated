// =============================================================================
// src/pages/invitations/EditTemplateModal.jsx — Edit Template Modal
// =============================================================================
import React, { useState, useEffect } from 'react';
import ModalDrawer from '../../components/common/ModalDrawer';
import { useData } from '../../context/DataContext';
import { CUSTOMIZATION } from '../../config/customization';

export default function EditTemplateModal({ isOpen, onClose, template }) {
  const { updateTemplate } = useData();

  const [name, setName] = useState('');
  const [category, setCategory] = useState('Wedding');
  const [subCategory, setSubCategory] = useState('Traditional');
  const [price, setPrice] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (template) {
      setName(template.name || '');
      setCategory(template.category || 'Wedding');
      setSubCategory(template.sub_category || 'Traditional');
      setPrice(template.price !== undefined ? String(template.price) : '');
      setPreviewUrl(template.preview_url || template.link || '');
      setDescription(template.description || '');
      setError('');
    }
  }, [template]);

  if (!isOpen || !template) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Template Name is required.');
      return;
    }
    if (!price || Number(price) <= 0) {
      setError('Please provide a valid template price.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      await updateTemplate(template.template_id, {
        name: name.trim(),
        category,
        sub_category: subCategory || null,
        price: Number(price),
        preview_url: previewUrl.trim(),
        description: description.trim(),
      });

      onClose();
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to update template.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalDrawer
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Invitation Template"
      subtitle={`Update details and preview link for ${template.name}.`}
      maxWidth="max-w-md"
      drawer={false}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-medium">
            {error}
          </div>
        )}

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Template Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Royal Rajputana Foil Suite"
            required
            className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-800"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              {CUSTOMIZATION.templateCategories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Sub Category
            </label>
            <select
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
              className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              {(CUSTOMIZATION.templateSubCategories || [
                'Traditional', 'Modern', 'Minimal', 'Gold Foil', 'Floral', 'Royal', 'Animated Video', 'Other'
              ]).map((sub) => (
                <option key={sub} value={sub}>{sub}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Price (₹) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="e.g. 8500"
            min="0"
            required
            className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-800"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Preview Link URL
          </label>
          <input
            type="url"
            value={previewUrl}
            onChange={(e) => setPreviewUrl(e.target.value)}
            placeholder="https://www.ahvaanforyou.com/nikhil-sreeja"
            className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-800"
          />
          <p className="text-[11px] text-slate-400 mt-1">
            Clients and visitors can click 'View' to see the live invitation preview.
          </p>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the card design, materials, or features..."
            rows={3}
            className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-800 resize-none"
          />
        </div>

        <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors disabled:opacity-50 cursor-pointer"
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </ModalDrawer>
  );
}

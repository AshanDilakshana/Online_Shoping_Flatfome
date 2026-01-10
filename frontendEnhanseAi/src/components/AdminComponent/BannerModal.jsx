import React, { useEffect, useState } from 'react';
import { Modal } from './ui/Modal';

export function BannerModal({
  isOpen,
  onClose,
  onSave,
  banner
}) {
  const [formData, setFormData] = useState({
    image: '',
    title: '',
    subtitle: ''
  });
  useEffect(() => {
    if (banner) {
      setFormData({
        image: banner.image,
        title: banner.title,
        subtitle: banner.subtitle
      });
    } else {
      setFormData({
        image: '',
        title: '',
        subtitle: ''
      });
    }
  }, [banner, isOpen]);
  const handleChange = (e) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (banner) {
      onSave({
        ...formData,
        id: banner.id
      });
    } else {
      onSave(formData);
    }
    onClose();
  };
  return <Modal isOpen={isOpen} onClose={onClose} title={banner ? 'Edit Banner' : 'Add New Banner'}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Banner Title
          </label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} required className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--blush-pink)]" placeholder="e.g. SUMMER COLLECTION" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Subtitle
          </label>
          <input type="text" name="subtitle" value={formData.subtitle} onChange={handleChange} required className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--blush-pink)]" placeholder="e.g. Discover our latest arrivals" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Image URL
          </label>
          <input type="text" name="image" value={formData.image} onChange={handleChange} required className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--blush-pink)]" placeholder="https://example.com/banner.jpg" />
        </div>

        {/* Preview */}
        {formData.image && <div className="mt-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Preview</p>
            <div className="relative w-full h-48 rounded-lg overflow-hidden shadow-md group">
              <img src={formData.image} alt="Preview" className="w-full h-full object-cover" onError={e => e.currentTarget.src = 'https://placehold.co/600x400?text=Invalid+Image+URL'} />
              <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-white p-4 text-center">
                <h3 className="font-playfair text-2xl font-bold tracking-wider">
                  {formData.title}
                </h3>
                <p className="text-sm mt-2 font-light tracking-wide">
                  {formData.subtitle}
                </p>
              </div>
            </div>
          </div>}

        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
          <button type="button" onClick={onClose} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors font-medium">
            Cancel
          </button>
          <button type="submit" className="px-6 py-2 bg-[var(--blush-pink)] text-rose-900 rounded-lg hover:bg-rose-300 transition-colors font-medium shadow-sm">
            {banner ? 'Update Banner' : 'Save Banner'}
          </button>
        </div>
      </form>
    </Modal>;
}

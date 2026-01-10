import React, { useEffect, useState } from 'react';
import { Modal } from './ui/Modal';
import { Plus, Trash2 } from 'lucide-react';

// const CATEGORIES = ['Skirts', 'Celira', 'Trousers', 'Shorts', 'Tops', 'Dresses'];
// const FABRICS = ['100% Silk', 'Cotton Blend', 'Polyester', 'Viscose', 'Linen'];
// const CARE_INSTRUCTIONS = ['Dry clean only', 'Machine wash cold', 'Hand wash', 'Dry clean recommended'];
// const SIZES = ['UK04', 'UK06', 'UK08', 'UK10', 'UK12', 'UK14', 'One Size'];

export function ProductModal({
  isOpen,
  onClose,
  onSave,
  product
}) {
  const [formData, setFormData] = useState({
    title: '',
    price: 0,
    category: CATEGORIES[0],
    images: [''],
    colors: '',
    sizes: [],
    description: '',
    fabric: FABRICS[0],
    care: CARE_INSTRUCTIONS[0],
    badge: ''
  });
  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title,
        price: product.price,
        category: product.category,
        images: product.images.length > 0 ? product.images : [''],
        colors: product.colors,
        sizes: product.sizes,
        description: product.description,
        fabric: product.fabric,
        care: product.care,
        badge: product.badge || ''
      });
    } else {
      setFormData({
        title: '',
        price: 0,
        category: CATEGORIES[0],
        images: [''],
        colors: '',
        sizes: [],
        description: '',
        fabric: FABRICS[0],
        care: CARE_INSTRUCTIONS[0],
        badge: ''
      });
    }
  }, [product, isOpen]);
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
  const handleImageChange = (index, value) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData(prev => ({
      ...prev,
      images: newImages
    }));
  };
  const addImageField = () => {
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, '']
    }));
  };
  const removeImageField = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      images: newImages.length ? newImages : ['']
    }));
  };
  const handleSizeToggle = (size) => {
    setFormData(prev => {
      const newSizes = prev.sizes.includes(size) ? prev.sizes.filter(s => s !== size) : [...prev.sizes, size];
      return {
        ...prev,
        sizes: newSizes
      };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (product) {
      onSave({
        ...formData,
        id: product.id
      });
    } else {
      onSave(formData);
    }
    onClose();
  };
  return <Modal isOpen={isOpen} onClose={onClose} title={product ? 'Edit Product' : 'Add New Product'} maxWidth="max-w-4xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Title
              </label>
              <input type="text" name="title" value={formData.title} onChange={handleChange} required className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--blush-pink)]" placeholder="e.g. Floral Silk Dress" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price (LKR)
                </label>
                <input type="number" name="price" value={formData.price} onChange={handleChange} required min="0" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--blush-pink)]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select name="category" value={formData.category} onChange={handleChange} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--blush-pink)]">
                  {CATEGORIES.map(cat => <option key={cat} value={cat}>
                      {cat}
                    </option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Colors (comma separated)
              </label>
              <input type="text" name="colors" value={formData.colors} onChange={handleChange} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--blush-pink)]" placeholder="e.g. Pink, Blue, White" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Badge (Optional)
              </label>
              <input type="text" name="badge" value={formData.badge} onChange={handleChange} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--blush-pink)]" placeholder="e.g. New Arrival, Sale" />
            </div>
          </div>

          {/* Details */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea name="description" value={formData.description} onChange={handleChange} rows={4} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--blush-pink)]" placeholder="Product description..." />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fabric
                </label>
                <select name="fabric" value={formData.fabric} onChange={handleChange} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--blush-pink)]">
                  {FABRICS.map(f => <option key={f} value={f}>
                      {f}
                    </option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Care
                </label>
                <select name="care" value={formData.care} onChange={handleChange} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--blush-pink)]">
                  {CARE_INSTRUCTIONS.map(c => <option key={c} value={c}>
                      {c}
                    </option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Available Sizes
              </label>
              <div className="flex flex-wrap gap-2">
                {SIZES.map(size => <label key={size} className="inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={formData.sizes.includes(size)} onChange={() => handleSizeToggle(size)} className="hidden peer" />
                    <span className="px-3 py-1 text-sm border border-gray-200 rounded-full peer-checked:bg-[var(--blush-pink)] peer-checked:text-rose-900 peer-checked:border-[var(--blush-pink)] transition-colors">
                      {size}
                    </span>
                  </label>)}
              </div>
            </div>
          </div>
        </div>

        {/* Images Section */}
        <div className="border-t border-gray-100 pt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Product Images (URLs)
          </label>
          <div className="space-y-3">
            {formData.images.map((url, index) => <div key={index} className="flex gap-2">
                <input type="text" value={url} onChange={e => handleImageChange(index, e.target.value)} className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--blush-pink)]" placeholder="https://example.com/image.jpg" />
                {formData.images.length > 1 && <button type="button" onClick={() => removeImageField(index)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 size={20} />
                  </button>}
              </div>)}
            <button type="button" onClick={addImageField} className="flex items-center gap-2 text-sm text-rose-600 font-medium hover:text-rose-700">
              <Plus size={16} /> Add Another Image
            </button>
          </div>

          {/* Image Preview */}
          <div className="mt-4 flex gap-4 overflow-x-auto pb-2">
            {formData.images.filter(url => url).map((url, i) => <div key={i} className="relative w-24 h-32 flex-shrink-0 border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
                  <img src={url} alt={`Preview ${i}`} className="w-full h-full object-cover" onError={e => e.currentTarget.src = 'https://placehold.co/100x150?text=No+Image'} />
                </div>)}
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
          <button type="button" onClick={onClose} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors font-medium">
            Cancel
          </button>
          <button type="submit" className="px-6 py-2 bg-[var(--blush-pink)] text-rose-900 rounded-lg hover:bg-rose-300 transition-colors font-medium shadow-sm">
            {product ? 'Update Product' : 'Save Product'}
          </button>
        </div>
      </form>
    </Modal>;
}

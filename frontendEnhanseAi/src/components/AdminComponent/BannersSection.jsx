import React, { useState } from 'react';
import { useAdmin } from './AdminContext';
import { BannerModal } from './BannerModal';
import { Plus, Edit2, Trash2 } from 'lucide-react';
export function BannersSection() {
  const {
    banners,
    addBanner,
    updateBanner,
    deleteBanner
  } = useAdmin();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);
  const handleAdd = () => {
    setEditingBanner(null);
    setIsModalOpen(true);
  };
  const handleEdit = (banner) => {
    setEditingBanner(banner);
    setIsModalOpen(true);
  };
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this banner?')) {
      deleteBanner(id);
    }
  };
  const handleSave = (bannerData) => {
    if ('id' in bannerData) {
      updateBanner(bannerData.id, bannerData);
    } else {
      addBanner(bannerData);
    }
  };
  return <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-playfair text-2xl font-bold text-gray-900">
            Banners
          </h2>
          <p className="text-gray-500 text-sm">
            Manage homepage banners and promotions
          </p>
        </div>
        <button onClick={handleAdd} className="flex items-center gap-2 px-4 py-2 bg-[var(--blush-pink)] text-rose-900 rounded-lg hover:bg-rose-300 transition-colors shadow-sm font-medium">
          <Plus size={18} /> Add New Banner
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {banners.map(banner => <div key={banner.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-md transition-shadow">
            <div className="relative h-48 overflow-hidden">
              <img src={banner.image} alt={banner.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" onError={e => e.currentTarget.src = 'https://placehold.co/600x400?text=No+Image'} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4 text-white">
                <h3 className="font-playfair font-bold text-lg">
                  {banner.title}
                </h3>
                <p className="text-sm opacity-90">{banner.subtitle}</p>
              </div>
            </div>
            <div className="p-4 flex justify-between items-center bg-white">
              <span className="text-xs text-gray-400 font-medium">
                ID: {banner.id}
              </span>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(banner)} className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors" title="Edit">
                  <Edit2 size={18} />
                </button>
                <button onClick={() => handleDelete(banner.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>)}
      </div>

      <BannerModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSave} banner={editingBanner} />
    </div>;
}

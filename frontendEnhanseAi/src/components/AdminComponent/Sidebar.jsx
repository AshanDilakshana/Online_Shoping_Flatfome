import React from 'react';
import { LayoutDashboard, ShoppingBag, ShoppingCart, Image as ImageIcon, LogOut } from 'lucide-react';

export function Sidebar({
  activeTab,
  setActiveTab,
  isOpen,
  onClose
}) {
  const menuItems = [{
    id: 'Overview',
    label: 'Overview',
    icon: LayoutDashboard
  }, {
    id: 'Products',
    label: 'Products',
    icon: ShoppingBag
  }, {
    id: 'Orders',
    label: 'Orders',
    icon: ShoppingCart
  }, {
    id: 'Banners',
    label: 'Banners',
    icon: ImageIcon
  }];
  return <>
      {/* Mobile Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={onClose} />}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-[var(--mimosa-pink)] shadow-lg transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
      `}>
        <div className="p-8 flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-rose-400 shadow-sm"></div>
          <h1 className="font-playfair text-xl font-bold text-rose-950 tracking-wide">
            MIMOSA ADMIN
          </h1>
        </div>

        <nav className="flex-1 py-4 space-y-1">
          {menuItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return <button key={item.id} onClick={() => {
            setActiveTab(item.id);
            onClose();
          }} className={`
                  w-full flex items-center gap-4 px-8 py-4 transition-all duration-200 group relative
                  ${isActive ? 'bg-[var(--blush-pink)] text-rose-900 font-medium' : 'text-gray-600 hover:bg-[var(--blush-pink)]/50 hover:text-rose-900'}
                `}>
                {isActive && <div className="absolute left-0 top-0 bottom-0 w-1 bg-rose-400"></div>}
                <Icon size={20} className={`transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
                <span className="font-playfair text-lg tracking-wide">
                  {item.label}
                </span>
              </button>;
        })}
        </nav>

        <div className="p-8 border-t border-rose-900/5">
          <button className="flex items-center gap-3 text-gray-500 hover:text-rose-800 transition-colors w-full">
            <LogOut size={20} />
            <span className="font-medium text-sm">Sign Out</span>
          </button>
        </div>
      </aside>
    </>;
}

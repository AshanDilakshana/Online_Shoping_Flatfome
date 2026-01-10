import React, { useState } from 'react';
import { useAdmin } from '../components/AdminComponent/AdminContext';
import { Sidebar } from '../components/AdminComponent/Sidebar';
import { ProductsSection } from '../components/AdminComponent/ProductsSection';
import { OrdersSection } from '../components/AdminComponent/OrdersSection';
import { BannersSection } from '../components/AdminComponent/BannersSection';
import { Toast } from '../components/AdminComponent/ui/Toast';
import { Menu, Bell, Search, TrendingUp, Users, DollarSign, ShoppingBag } from 'lucide-react';

export function AdminPage() {
  const {
    toast,
    showToast,
    products,
    orders
  } = useAdmin();
  const [activeTab, setActiveTab] = useState('Products');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // Calculate simple stats
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = orders.length;
  const totalProducts = products.length;
  const pendingOrders = orders.filter(o => o.status === 'Pending').length;
  const renderContent = () => {
    switch (activeTab) {
      case 'Overview':
        return <div className="space-y-8 animate-fade-in">
            <h2 className="font-playfair text-2xl font-bold text-gray-900">
              Dashboard Overview
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border-t-4 border-[var(--beige-accent)]">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider">
                    Total Revenue
                  </h3>
                  <div className="p-2 bg-green-50 text-green-600 rounded-full">
                    <DollarSign size={16} />
                  </div>
                </div>
                <p className="text-3xl font-playfair font-bold text-gray-900">
                  LKR {(totalRevenue / 1000).toFixed(1)}k
                </p>
                <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                  <TrendingUp size={12} /> +12.5% from last month
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border-t-4 border-[var(--beige-accent)]">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider">
                    Total Orders
                  </h3>
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-full">
                    <ShoppingBag size={16} />
                  </div>
                </div>
                <p className="text-3xl font-playfair font-bold text-gray-900">
                  {totalOrders}
                </p>
                <p className="text-xs text-blue-600 mt-2 flex items-center gap-1">
                  {pendingOrders} pending orders
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border-t-4 border-[var(--beige-accent)]">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider">
                    Products
                  </h3>
                  <div className="p-2 bg-purple-50 text-purple-600 rounded-full">
                    <ShoppingBag size={16} />
                  </div>
                </div>
                <p className="text-3xl font-playfair font-bold text-gray-900">
                  {totalProducts}
                </p>
                <p className="text-xs text-gray-500 mt-2">Active in catalog</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border-t-4 border-[var(--beige-accent)]">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider">
                    Customers
                  </h3>
                  <div className="p-2 bg-rose-50 text-rose-600 rounded-full">
                    <Users size={16} />
                  </div>
                </div>
                <p className="text-3xl font-playfair font-bold text-gray-900">
                  1,245
                </p>
                <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                  <TrendingUp size={12} /> +5.2% new this week
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="font-playfair text-lg font-bold text-gray-900 mb-4">
                  Recent Orders
                </h3>
                <div className="space-y-4">
                  {orders.slice(0, 5).map(order => <div key={order.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[var(--mimosa-pink)] flex items-center justify-center text-rose-800 font-bold text-xs">
                          {order.customerName.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {order.customerName}
                          </p>
                          <p className="text-xs text-gray-500">{order.id}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">
                          LKR {order.total.toLocaleString()}
                        </p>
                        <p className={`text-xs ${order.status === 'Pending' ? 'text-yellow-600' : order.status === 'Delivered' ? 'text-green-600' : 'text-blue-600'}`}>
                          {order.status}
                        </p>
                      </div>
                    </div>)}
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="font-playfair text-lg font-bold text-gray-900 mb-4">
                  Top Products
                </h3>
                <div className="space-y-4">
                  {products.slice(0, 5).map(product => <div key={product.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                      <div className="flex items-center gap-3">
                        <img src={product.images[0]} alt={product.title} className="w-10 h-10 rounded object-cover bg-gray-100" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {product.title}
                          </p>
                          <p className="text-xs text-gray-500">
                            {product.category}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm font-medium text-gray-900">
                        LKR {product.price.toLocaleString()}
                      </p>
                    </div>)}
                </div>
              </div>
            </div>
          </div>;
      case 'Products':
        return <ProductsSection />;
      case 'Orders':
        return <OrdersSection />;
      case 'Banners':
        return <BannersSection />;
      default:
        return <ProductsSection />;
    }
  };
  return <div className="flex min-h-screen bg-[var(--cream-bg)] font-sans text-[var(--text-primary)]">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <main className="flex-1 md:ml-64 transition-all duration-300">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-[var(--cream-bg)]/80 backdrop-blur-md border-b border-rose-900/5 px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(true)} className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
              <Menu size={24} />
            </button>
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input type="text" placeholder="Search..." className="pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[var(--blush-pink)] w-64 transition-all" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 text-gray-500 hover:text-rose-600 transition-colors">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-[var(--cream-bg)]"></span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-gray-900">Admin User</p>
                <p className="text-xs text-gray-500">Super Admin</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-[var(--beige-accent)] border-2 border-white shadow-sm overflow-hidden">
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80" alt="Profile" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </header>

        <div className="p-6 md:p-8 max-w-7xl mx-auto">{renderContent()}</div>
      </main>

      {toast && toast.visible && <Toast message={toast.message} type={toast.type} onClose={() => showToast('', 'success')} // Close logic handled by timeout mostly
    />}
    </div>;
}

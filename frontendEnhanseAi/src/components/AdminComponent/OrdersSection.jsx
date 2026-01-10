import React, { useState } from 'react';
import { useAdmin } from './AdminContext';
import { OrderDetailsModal } from './OrderDetailsModal';
import { Eye, Search, Filter, ChevronDown } from 'lucide-react';

export function OrdersSection() {
  const {
    orders,
    updateOrderStatus
  } = useAdmin();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) || order.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };
  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Processing':
        return 'bg-blue-100 text-blue-800';
      case 'Shipped':
        return 'bg-purple-100 text-purple-800';
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  const statuses = ['Pending', 'Processing', 'Shipped', 'Delivered'];
  return <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="font-playfair text-2xl font-bold text-gray-900">
          Orders
        </h2>
        <p className="text-gray-500 text-sm">
          Manage customer orders and shipments
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input type="text" placeholder="Search by Order ID or Customer Name..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--blush-pink)]" />
        </div>
        <div className="relative w-full md:w-64">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--blush-pink)] appearance-none bg-white">
            <option value="All">All Statuses</option>
            {statuses.map(s => <option key={s} value={s}>
                {s}
              </option>)}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 font-medium text-gray-500">
                  Order ID
                </th>
                <th className="px-6 py-4 font-medium text-gray-500">
                  Customer
                </th>
                <th className="px-6 py-4 font-medium text-gray-500">Date</th>
                <th className="px-6 py-4 font-medium text-gray-500">Total</th>
                <th className="px-6 py-4 font-medium text-gray-500">Status</th>
                <th className="px-6 py-4 font-medium text-gray-500 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredOrders.map(order => <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {order.id}
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-gray-900">
                        {order.customerName}
                      </p>
                      <p className="text-xs text-gray-500">{order.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{order.date}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">
                    LKR {order.total.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="relative group inline-block">
                      <select value={order.status} onChange={e => updateOrderStatus(order.id, e.target.value)} className={`appearance-none pl-3 pr-8 py-1 rounded-full text-xs font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[var(--blush-pink)] ${getStatusColor(order.status)}`}>
                        {statuses.map(s => <option key={s} value={s}>
                            {s}
                          </option>)}
                      </select>
                      <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none opacity-50" />
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => handleViewDetails(order)} className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:text-rose-600 transition-colors">
                      <Eye size={14} /> View Details
                    </button>
                  </td>
                </tr>)}
              {filteredOrders.length === 0 && <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    No orders found matching your criteria.
                  </td>
                </tr>}
            </tbody>
          </table>
        </div>
      </div>

      <OrderDetailsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} order={selectedOrder} />
    </div>;
}

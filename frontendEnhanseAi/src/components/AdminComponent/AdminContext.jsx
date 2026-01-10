import React, { useState, createContext, useContext } from 'react';
import { products as initialProducts, initialOrders, initialBanners } from '../../data/products';

const AdminContext = createContext(undefined);

export function AdminProvider({children
  
}) {
  const [products, setProducts] = useState(initialProducts);
  const [orders, setOrders] = useState(initialOrders);
  const [banners, setBanners] = useState(initialBanners);
  const [toast, setToast] = useState(null);
  const showToast = (message, type) => {
    setToast({
      message,
      type,
      visible: true
    });
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };
  const addProduct = (product) => {
    const newId = Math.max(...products.map(p => p.id), 0) + 1;
    setProducts([...products, {
      ...product,
      id: newId
    }]);
    showToast('Product added successfully', 'success');
  };
  
  const updateProduct = (id, updatedProduct) => {
    setProducts(products.map(p => p.id === id ? {
      ...p,
      ...updatedProduct
    } : p));
    showToast('Product updated successfully', 'success');
  };
  const deleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
    showToast('Product deleted successfully', 'success');
  };
  const updateOrderStatus = (id, status) => {
    setOrders(orders.map(o => o.id === id ? {
      ...o,
      status
    } : o));
    showToast(`Order status updated to ${status}`, 'success');
  };
  const addBanner = (banner) => {
    const newId = Math.max(...banners.map(b => b.id), 0) + 1;
    setBanners([...banners, {
      ...banner,
      id: newId
    }]);
    showToast('Banner added successfully', 'success');
  };
  const updateBanner = (id, updatedBanner) => {
    setBanners(banners.map(b => b.id === id ? {
      ...b,
      ...updatedBanner
    } : b));
    showToast('Banner updated successfully', 'success');
  };
  const deleteBanner = (id) => {
    setBanners(banners.filter(b => b.id !== id));
    showToast('Banner deleted successfully', 'success');
  };
  return <AdminContext.Provider value={{
    products,
    orders,
    banners,
    addProduct,
    updateProduct,
    deleteProduct,
    updateOrderStatus,
    addBanner,
    updateBanner,
    deleteBanner,
    showToast,
    toast
  }}>
      {children}
    </AdminContext.Provider>;
}
export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}

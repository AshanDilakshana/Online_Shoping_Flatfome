import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AdminProvider } from './components/AdminComponent/AdminContext';
import { HomePage } from './pages/HomePage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { AllProductsPage } from './pages/AllProductsPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { AdminPage } from './pages/Adminpage';
import { LoginPage } from './pages/loginPage';
import { RegisterPage } from './pages/RgistationPage';
export function App() {
  return (
    <AdminProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/home" element={<HomePage />} />
            <Route path="/collections" element={<AllProductsPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </Router>
      </CartProvider>
    </AdminProvider>
  );
}
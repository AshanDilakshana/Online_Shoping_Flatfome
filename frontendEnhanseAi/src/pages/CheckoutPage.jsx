import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Info, Tag } from 'lucide-react';
import { Header } from '../components/Header';
import { useCart } from '../context/CartContext';
export function CheckoutPage() {
  const {
    cart,
    getCartTotal,
    updateQuantity,
    removeFromCart
  } = useCart();
  const [deliveryMethod, setDeliveryMethod] = useState('ship');
  const [discountCode, setDiscountCode] = useState('');
  const subtotal = getCartTotal();
  const shipping = deliveryMethod === 'ship' ? 200 : 0;
  const total = subtotal + shipping;
  const formatPrice = price => {
    return `LKR Rs ${price.toLocaleString()}.00`;
  };
  if (cart.length === 0) {
    return <div className="min-h-screen flex flex-col bg-[var(--mimosa-cream)]">
        <Header />
        <main className="flex-grow pt-[72px] flex items-center justify-center">
          <div className="text-center py-20">
            <h2 className="text-3xl font-serif mb-4 text-gray-900">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Add some beautiful pieces to get started</p>
            <Link to="/collections" className="inline-block bg-black text-white px-8 py-3 text-sm font-medium tracking-widest uppercase hover:bg-gray-800 transition-colors">
              Shop Now
            </Link>
          </div>
        </main>
      </div>;
  }
  return <div className="min-h-screen flex flex-col bg-[var(--mimosa-cream)]">
      <Header />

      <main className="flex-grow pt-[72px]">
        <div className="container mx-auto px-4 py-8 md:py-12 max-w-7xl">
          {/* Breadcrumb */}
          <div className="mb-8 text-sm text-gray-600">
            <Link to="/" className="hover:text-black">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-black">Checkout</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Left Column: Form (60%) */}
            <div className="lg:col-span-3 space-y-8">
              {/* Contact Section */}
              <div className="bg-white p-6 md:p-8 rounded-lg shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-medium">Contact</h2>
                  <Link to="/login" className="text-sm text-blue-600 hover:underline">
                    Sign in
                  </Link>
                </div>
                
                <div className="space-y-4">
                  <input type="email" placeholder="Email" className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
                  <label className="flex items-center gap-2 text-sm text-gray-700">
                    <input type="checkbox" className="rounded" />
                    Email me with news and offers
                  </label>
                </div>
              </div>

              {/* Delivery Section */}
              <div className="bg-white p-6 md:p-8 rounded-lg shadow-sm">
                <h2 className="text-lg font-medium mb-6">Delivery</h2>
                
                <div className="space-y-6">
                  {/* Delivery Method Toggle */}
                  <div className="flex gap-4">
                    <button onClick={() => setDeliveryMethod('ship')} className={`flex-1 py-3 px-4 border-2 rounded-md text-sm font-medium transition-all ${deliveryMethod === 'ship' ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-gray-300 hover:border-gray-400'}`}>
                      Ship
                    </button>
                    <button onClick={() => setDeliveryMethod('pickup')} className={`flex-1 py-3 px-4 border-2 rounded-md text-sm font-medium transition-all ${deliveryMethod === 'pickup' ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-gray-300 hover:border-gray-400'}`}>
                      Pick up
                    </button>
                  </div>

                  {/* Country/Region */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Country/Region
                    </label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option>Sri Lanka</option>
                      <option>India</option>
                      <option>United States</option>
                    </select>
                  </div>

                  {/* Name Fields */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First name (optional)
                      </label>
                      <input type="text" className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last name
                      </label>
                      <input type="text" className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                    </div>
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address
                    </label>
                    <input type="text" className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>

                  {/* Apartment */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Apartment, suite, etc. (optional)
                    </label>
                    <input type="text" className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>

                  {/* City & Postal Code */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City
                      </label>
                      <input type="text" className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Postal code (optional)
                      </label>
                      <input type="text" className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone
                    </label>
                    <input type="tel" className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Order Summary (40%) */}
            <div className="lg:col-span-2">
              <div className="bg-white p-6 md:p-8 rounded-lg shadow-sm lg:sticky lg:top-24">
                <h2 className="text-lg font-medium mb-6">Order Summary</h2>

                {/* Cart Items */}
                <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto">
                  {cart.map((item, index) => <div key={`${item.id}-${item.size}-${item.color}`} className="flex gap-4">
                      <div className="relative w-20 h-20 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                        <span className="absolute -top-2 -right-2 bg-gray-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
                          {item.title}
                        </h3>
                        <p className="text-xs text-gray-600 mt-1">
                          {item.size} / {item.color}
                        </p>
                        <p className="text-sm font-medium text-gray-900 mt-2">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>)}
                </div>

                {/* Discount Code */}
                <div className="mb-6 pb-6 border-b border-gray-200">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input type="text" placeholder="Discount code or gift card" value={discountCode} onChange={e => setDiscountCode(e.target.value)} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm" />
                    </div>
                    <button className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium rounded-md transition-colors">
                      Apply
                    </button>
                  </div>
                </div>

                {/* Totals */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-700">Subtotal</span>
                    <span className="font-medium">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm items-center">
                    <span className="text-gray-700 flex items-center gap-1">
                      Shipping
                      <Info className="w-3 h-3 text-gray-400" />
                    </span>
                    <span className="font-medium">
                      {deliveryMethod === 'ship' ? formatPrice(shipping) : 'Free'}
                    </span>
                  </div>
                  <div className="flex justify-between text-lg font-medium pt-3 border-t border-gray-200">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>

                {/* Continue Button */}
                <button className="w-full bg-black text-white py-4 text-sm font-medium tracking-widest uppercase hover:bg-gray-800 transition-colors rounded-md">
                  Continue to Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>;
}
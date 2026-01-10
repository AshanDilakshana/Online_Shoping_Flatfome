import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Search, User, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MenuSlider } from './MenuSlider';
import { useCart } from '../context/CartContext';
export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {getCartCount} = useCart();
  const cartCount = getCartCount();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);
  return <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm py-3' : 'bg-white py-5'}`}>
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between">
            {/* Left: Menu */}
            <div className="flex items-center gap-2 cursor-pointer group" onClick={() => setIsMenuOpen(true)}>
              <Menu className="w-5 h-5 text-gray-800 group-hover:text-gray-600 transition-colors" />
              <span className="hidden md:block text-xs tracking-widest font-medium text-gray-800 group-hover:text-gray-600 transition-colors">
                MENU
              </span>
            </div>

            {/* Center: Logo */}
            <Link to="/" className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <h1 className="text-2xl md:text-3xl font-serif tracking-wide text-gray-900">
                MIMOSA
              </h1>
            </Link>

            {/* Right: Icons */}
            <div className="flex items-center gap-4 md:gap-6">
              <button aria-label="Search" className="text-gray-800 hover:text-gray-600 transition-colors">
                <Search className="w-5 h-5" />
              </button>
              <button aria-label="Account" className="hidden md:block text-gray-800 hover:text-gray-600 transition-colors">
                <User className="w-5 h-5" />
              </button>
              <Link to="/checkout" aria-label="Cart" className="relative text-gray-800 hover:text-gray-600 transition-colors">
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && <motion.span initial={{
                scale: 0
              }} animate={{
                scale: 1
              }} className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[9px] text-white font-medium">
                    {cartCount}
                  </motion.span>}
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Menu Slider */}
      <MenuSlider isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>;
}
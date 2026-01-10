import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, Facebook, Instagram } from 'lucide-react';
const menuCategories = [{
  name: 'NEW ARRIVALS',
  path: '/collections'
}, {
  name: 'DRESSES',
  path: '/collections'
}, {
  name: 'TOPS',
  path: '/collections'
}, {
  name: 'SKIRTS',
  path: '/collections'
}, {
  name: 'SHORTS',
  path: '/collections'
}, {
  name: 'TROUSERS',
  path: '/collections'
}, {
  name: 'DENIM',
  path: '/collections'
}, {
  name: 'COLLECTIONS',
  path: '/collections'
}, {
  name: 'THE VANTA STUDIOS',
  path: '/collections'
}, {
  name: 'BASICS',
  path: '/collections'
}, {
  name: 'GIFT CARDS',
  path: '/collections'
}, {
  name: 'SALE',
  path: '/collections'
}];
const footerLinks = [{
  name: 'ABOUT US',
  path: '#'
}, {
  name: 'CONTACT US',
  path: '#'
}, {
  name: 'TERMS & CONDITIONS',
  path: '#'
}, {
  name: 'FAQS',
  path: '#'
}];
export function MenuSlider({
  isOpen,
  onClose
}) {
  return <AnimatePresence>
      {isOpen && <>
          {/* Backdrop */}
          <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} transition={{
        duration: 0.3
      }} className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />

          {/* Menu Panel */}
          <motion.div initial={{
        x: '-100%'
      }} animate={{
        x: 0
      }} exit={{
        x: '-100%'
      }} transition={{
        type: 'spring',
        damping: 30,
        stiffness: 300
      }} className="fixed left-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 z-10">
              <div className="flex items-center justify-between px-6 py-5">
                <button onClick={onClose} className="text-gray-800 hover:text-gray-600 transition-colors" aria-label="Close menu">
                  <X className="w-6 h-6" />
                </button>

                <Link to="/" onClick={onClose}>
                  <h2 className="text-2xl font-serif tracking-wide text-gray-900">
                    MIMOSA
                  </h2>
                </Link>

                <button className="text-gray-800 hover:text-gray-600 transition-colors" aria-label="Search">
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Main Navigation */}
            <nav className="px-6 py-8">
              <ul className="space-y-5">
                {menuCategories.map((category, index) => <motion.li key={category.name} initial={{
              opacity: 0,
              x: -20
            }} animate={{
              opacity: 1,
              x: 0
            }} transition={{
              delay: index * 0.03,
              duration: 0.3
            }}>
                    <Link to={category.path} onClick={onClose} className="block text-base font-medium text-gray-900 hover:text-gray-600 transition-colors tracking-wide">
                      {category.name}
                    </Link>
                  </motion.li>)}
              </ul>
            </nav>

            {/* Divider */}
            <div className="mx-6 border-t border-gray-200" />

            {/* Footer Links */}
            <div className="px-6 py-8">
              <ul className="space-y-4">
                {footerLinks.map((link, index) => <motion.li key={link.name} initial={{
              opacity: 0,
              x: -20
            }} animate={{
              opacity: 1,
              x: 0
            }} transition={{
              delay: (menuCategories.length + index) * 0.03,
              duration: 0.3
            }}>
                    <a href={link.path} onClick={onClose} className="block text-sm text-gray-700 hover:text-gray-900 transition-colors tracking-wide">
                      {link.name}
                    </a>
                  </motion.li>)}
              </ul>
            </div>

            {/* Social Icons */}
            <div className="px-6 py-6 flex items-center gap-8">
              <a href="#" className="text-gray-800 hover:text-gray-600 transition-colors" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-800 hover:text-gray-600 transition-colors" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-800 hover:text-gray-600 transition-colors" aria-label="TikTok">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </a>
            </div>

            {/* Account Link */}
            <div className="px-6 py-6 border-t border-gray-200">
              <a href="#" onClick={onClose} className="flex items-center gap-2 text-sm text-gray-900 hover:text-gray-600 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                ACCOUNT
              </a>
            </div>
          </motion.div>
        </>}
    </AnimatePresence>;
}
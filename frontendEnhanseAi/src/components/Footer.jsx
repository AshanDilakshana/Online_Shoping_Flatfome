import React from 'react';
import { Instagram, Facebook, Twitter } from 'lucide-react';
export function Footer() {
  return <footer className="bg-[var(--mimosa-beige)] pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Newsletter */}
          <div className="md:col-span-2 pr-0 md:pr-12">
            <h3 className="text-xl font-serif mb-4">Stay in touch</h3>
            <p className="text-sm text-gray-600 mb-6 leading-relaxed">
              Subscribe to our newsletter to receive updates on new arrivals,
              special offers and other discount information.
            </p>
            <form className="flex flex-col sm:flex-row gap-3">
              <input type="email" placeholder="Your email address" className="flex-1 bg-white border border-transparent px-4 py-3 text-sm focus:outline-none focus:border-gray-400 transition-colors" />
              <button type="button" className="bg-black text-white px-8 py-3 text-xs font-medium tracking-widest uppercase hover:bg-gray-800 transition-colors">
                Subscribe
              </button>
            </form>
          </div>

          {/* Links 1 */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-6 text-gray-900">
              Information
            </h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li>
                <a href="#" className="hover:text-black transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black transition-colors">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black transition-colors">
                  Returns & Exchanges
                </a>
              </li>
            </ul>
          </div>

          {/* Links 2 */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-6 text-gray-900">
              Collections
            </h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li>
                <a href="#" className="hover:text-black transition-colors">
                  New Arrivals
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black transition-colors">
                  Dresses
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black transition-colors">
                  Tops
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black transition-colors">
                  Bottoms
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black transition-colors">
                  Sale
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-300 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Mimosa Forever. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <a href="#" className="text-gray-600 hover:text-black transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-600 hover:text-black transition-colors">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-600 hover:text-black transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>;
}
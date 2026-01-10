import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ProductCard } from './ProductCard';
import axios from 'axios';
import { products } from '../data/products';
export function ProductGrid({
  title,
  featured = false
}) {
  const scrollContainerRef = useRef(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_API_URL + '/api/products');
        if (response.data && Array.isArray(response.data)) {
          // Transform backend data to match frontend format
          const transformedProducts = response.data.map(p => ({
            id: p.productID,
            title: p.title || p.productName,
            price: p.price || p.productPrice,
            category: p.category,
            images: p.productImage || [],
            colors: Array.isArray(p.colors) ? p.colors : [],
            sizes: p.sizes || [],
            description: p.description || p.productDescription,
            fabric: p.fabric,
            care: Array.isArray(p.care) ? p.care : [p.care],
            badge: p.badge || ''
          }));
          setProducts(transformedProducts);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Use first 4 products for featured, next 4 for non-featured
  const displayProducts = featured ? products.slice(0, 4) : products.slice(4, 8);
  const scroll = direction => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.offsetWidth * 0.8;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };
  return <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        {title && <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-serif text-gray-900 mb-4">
              {title}
            </h2>
            <div className="w-16 h-0.5 bg-gray-200 mx-auto" />
          </div>}

        {loading ? (
          // Loading skeleton
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 aspect-[3/4] rounded-lg mb-3" />
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="relative group">
          {/* Left Arrow */}
          <button onClick={() => scroll('left')} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg p-3 rounded-full text-gray-800 transition-all opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 hidden md:block" aria-label="Scroll left">
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Scrollable Container */}
          <div ref={scrollContainerRef} className="overflow-x-auto scrollbar-hide scroll-smooth" style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}>
            <div className="flex gap-4 md:gap-8 pb-4">
              {displayProducts.map(product => <div key={product.id} className="flex-none w-[45%] md:w-[calc(25%-24px)]">
                  <ProductCard {...product} />
                </div>)}
            </div>
          </div>

          {/* Right Arrow */}
          <button onClick={() => scroll('right')} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg p-3 rounded-full text-gray-800 transition-all opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 hidden md:block" aria-label="Scroll right">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        )}
      </div>
    </section>;
}
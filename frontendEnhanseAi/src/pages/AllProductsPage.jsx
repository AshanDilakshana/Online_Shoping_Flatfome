import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ProductCard } from '../components/ProductCard';
import { products, categories, getProductsByCategory } from '../data/products';
export function AllProductsPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const categoryRefs = useRef({});
  const scrollToCategory = categorySlug => {
    setActiveCategory(categorySlug);
    if (categorySlug === 'all') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      categoryRefs.current[categorySlug]?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };
  return <div className="min-h-screen flex flex-col bg-[var(--mimosa-cream)]">
      <Header />

      <main className="flex-grow pt-[72px]">
        {/* Hero Section */}
        <div className="bg-[var(--mimosa-pink)]/30 py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-gray-900 mb-4">
              Shop the Collection
            </h1>
            <p className="text-gray-700 text-lg max-w-2xl mx-auto">
              Discover our curated selection of elegant, feminine pieces designed to celebrate your unique style.
            </p>
          </div>
        </div>

        {/* Category Navigation */}
        <div className="sticky top-[72px] bg-white border-b border-gray-200 z-40 shadow-sm">
          <div className="container mx-auto px-4">
            <div className="flex gap-6 overflow-x-auto scrollbar-hide py-4">
              <button onClick={() => scrollToCategory('all')} className={`text-sm font-medium uppercase tracking-wider whitespace-nowrap transition-colors ${activeCategory === 'all' ? 'text-black border-b-2 border-black pb-1' : 'text-gray-600 hover:text-black'}`}>
                All Products
              </button>
              {categories.map(category => <button key={category.slug} onClick={() => scrollToCategory(category.slug)} className={`text-sm font-medium uppercase tracking-wider whitespace-nowrap transition-colors ${activeCategory === category.slug ? 'text-black border-b-2 border-black pb-1' : 'text-gray-600 hover:text-black'}`}>
                  {category.name}
                </button>)}
            </div>
          </div>
        </div>

        {/* All Products Section */}
        {activeCategory === 'all' && <section className="py-16 md:py-24">
            <div className="container mx-auto px-4 md:px-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                {products.map(product => <motion.div key={product.id} initial={{
              opacity: 0,
              y: 20
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.5
            }}>
                    <ProductCard {...product} />
                  </motion.div>)}
              </div>
            </div>
          </section>}

        {/* Category Sections */}
        {categories.map(category => {
        const categoryProducts = getProductsByCategory(category.name === 'Celira Collection' ? 'Celira' : category.name);
        return <section key={category.slug} ref={el => categoryRefs.current[category.slug] = el} className="py-16 md:py-24 border-t border-gray-200">
              <div className="container mx-auto px-4 md:px-8">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-serif text-gray-900 mb-4">
                    {category.name}
                  </h2>
                  <div className="w-16 h-0.5 bg-gray-200 mx-auto" />
                </div>

                {categoryProducts.length > 0 ? <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                    {categoryProducts.map(product => <motion.div key={product.id} initial={{
                opacity: 0,
                y: 20
              }} whileInView={{
                opacity: 1,
                y: 0
              }} viewport={{
                once: true
              }} transition={{
                duration: 0.5
              }}>
                        <ProductCard {...product} />
                      </motion.div>)}
                  </div> : <p className="text-center text-gray-600">No products in this category yet.</p>}
              </div>
            </section>;
      })}

        {/* Brand Philosophy Section */}
        <section className="py-20 bg-[var(--mimosa-pink)]/30">
          <div className="container mx-auto px-4 text-center max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-serif mb-6 text-gray-900">
              Crafted with Care
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg font-light">
              Each piece in our collection is thoughtfully designed to bring out your natural elegance. 
              We believe in quality, sustainability, and timeless style that transcends seasons.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>;
}
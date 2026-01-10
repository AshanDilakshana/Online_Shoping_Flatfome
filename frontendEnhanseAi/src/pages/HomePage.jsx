import React from 'react';
import { Header } from '../components/Header';
import { HeroCarousel } from '../components/HeroCarousel';
import { ProductGrid } from '../components/ProductGrid';
import { FeaturedHero } from '../components/FeaturedHero';
import { Footer } from '../components/Footer';
export function HomePage() {
  return <div className="min-h-screen flex flex-col bg-[var(--mimosa-cream)]">
      <Header />

      <main className="flex-grow pt-[72px]">
        <HeroCarousel />

        <ProductGrid featured={true} />

        <FeaturedHero />

        <ProductGrid title="Shop the Collection" featured={false} />

        {/* Additional Brand Section */}
        <section className="py-20 bg-[var(--mimosa-pink)]/30">
          <div className="container mx-auto px-4 text-center max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-serif mb-6 text-gray-900">
              The Mimosa Philosophy
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg font-light">
              We believe in the power of femininity and the confidence it
              brings. Our collections are designed to celebrate the modern woman
              with elegant silhouettes, delicate details, and timeless style.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>;
}
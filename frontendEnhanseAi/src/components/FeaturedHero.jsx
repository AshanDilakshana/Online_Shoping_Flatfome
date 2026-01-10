import React from 'react';
import { motion } from 'framer-motion';
export function FeaturedHero() {
  return <section className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden">
      <div className="absolute inset-0">
        <img src="/Screenshot_2026-01-08_232835.png" alt="Celira Collection" className="w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-black/10" />
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
        <motion.div initial={{
        opacity: 0,
        y: 30
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.8
      }}>
          <h2 className="text-6xl md:text-8xl lg:text-9xl font-serif italic text-gray-900 mb-8 drop-shadow-sm opacity-90">
            Celira
          </h2>

          <button className="bg-white text-black px-10 py-4 text-sm font-medium tracking-widest uppercase hover:bg-black hover:text-white transition-colors duration-300 shadow-lg">
            Shop Now
          </button>
        </motion.div>
      </div>
    </section>;
}
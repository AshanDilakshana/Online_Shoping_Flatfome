import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
const slides = [{
  id: 1,
  image: "/im2.jpg",
  title: 'NEW ARRIVAL',
  subtitle: 'Discover the latest collection'
}, {
  id: 2,
  image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop',
  title: 'SUMMER BLOOMS',
  subtitle: 'Elegant floral prints for the season'
}, {
  id: 3,
  image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=2046&auto=format&fit=crop',
  title: 'EVENING ELEGANCE',
  subtitle: 'Sophisticated styles for special moments'
}, {
  id: 4,
  image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=2083&auto=format&fit=crop',
  title: 'MODERN CLASSICS',
  subtitle: 'Timeless pieces for your wardrobe'
}];
export function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const slideVariants = {
    enter: direction => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: direction => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };
  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };
  const paginate = newDirection => {
    setDirection(newDirection);
    setCurrent(prev => (prev + newDirection + slides.length) % slides.length);
  };
  // Auto-play
  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, 6000);
    return () => clearInterval(timer);
  }, []);
  return <div className="relative h-[70vh] md:h-[85vh] w-full overflow-hidden bg-gray-100">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div key={current} custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{
        x: {
          type: 'spring',
          stiffness: 300,
          damping: 30
        },
        opacity: {
          duration: 0.2
        }
      }} drag="x" dragConstraints={{
        left: 0,
        right: 0
      }} dragElastic={1} onDragEnd={(e, {
        offset,
        velocity
      }) => {
        const swipe = swipePower(offset.x, velocity.x);
        if (swipe < -swipeConfidenceThreshold) {
          paginate(1);
        } else if (swipe > swipeConfidenceThreshold) {
          paginate(-1);
        }
      }} className="absolute w-full h-full">
          <div className="relative w-full h-full">
            <img src={slides[current].image} alt={slides[current].title} className="w-full h-full object-cover object-center" />

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-black/10" />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
              <motion.div initial={{
              y: 20,
              opacity: 0
            }} animate={{
              y: 0,
              opacity: 1
            }} transition={{
              delay: 0.3,
              duration: 0.8
            }}>
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 drop-shadow-md tracking-tight">
                  {slides[current].title}
                </h2>
                <p className="text-white/90 text-lg md:text-xl mb-8 font-light tracking-wide">
                  {slides[current].subtitle}
                </p>
                <button className="bg-white text-black px-8 py-3 text-sm font-medium tracking-widest uppercase hover:bg-black hover:text-white transition-colors duration-300">
                  View All
                </button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 hover:bg-white/40 backdrop-blur-sm p-3 rounded-full text-white transition-colors hidden md:block" onClick={() => paginate(-1)}>
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 hover:bg-white/40 backdrop-blur-sm p-3 rounded-full text-white transition-colors hidden md:block" onClick={() => paginate(1)}>
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex gap-3">
        {slides.map((_, index) => <button key={index} onClick={() => {
        setDirection(index > current ? 1 : -1);
        setCurrent(index);
      }} className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${index === current ? 'bg-white scale-110' : 'bg-white/50 hover:bg-white/80'}`} />)}
      </div>
    </div>;
}
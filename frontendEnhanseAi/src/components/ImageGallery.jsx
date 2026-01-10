import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
export function ImageGallery({
  images,
  alt
}) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const nextImage = () => {
    setSelectedImage(prev => (prev + 1) % images.length);
  };
  const prevImage = () => {
    setSelectedImage(prev => (prev - 1 + images.length) % images.length);
  };
  return <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden group">
        <AnimatePresence mode="wait">
          <motion.img key={selectedImage} src={images[selectedImage]} alt={`${alt} - Image ${selectedImage + 1}`} className={`w-full h-full object-cover object-center transition-transform duration-300 ${isZoomed ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in'}`} initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} exit={{
          opacity: 0
        }} transition={{
          duration: 0.3
        }} onClick={() => setIsZoomed(!isZoomed)} />
        </AnimatePresence>

        {/* Navigation Arrows */}
        {images.length > 1 && <>
            <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" aria-label="Previous image">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" aria-label="Next image">
              <ChevronRight className="w-5 h-5" />
            </button>
          </>}
      </div>

      {/* Thumbnail Gallery */}
      {images.length > 1 && <div className="grid grid-cols-4 gap-3">
          {images.map((image, index) => <button key={index} onClick={() => setSelectedImage(index)} className={`aspect-square bg-gray-100 overflow-hidden rounded transition-all ${selectedImage === index ? 'ring-2 ring-black' : 'opacity-60 hover:opacity-100'}`}>
              <img src={image} alt={`${alt} thumbnail ${index + 1}`} className="w-full h-full object-cover object-center" />
            </button>)}
        </div>}
    </div>;
}
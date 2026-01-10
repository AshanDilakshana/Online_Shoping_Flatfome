import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
export function ProductCard({
  id,
  image,
  images,
  title,
  price,
  installmentText,
  badge
}) {
  const productImage = image || images && images[0] || '';
  const formatPrice = price => {
    if (typeof price === 'number') {
      return `LKR ${price.toLocaleString()}.00`;
    }
    return price;
  };
  // const installment = installmentText || (typeof price === 'number' ? `OR 3 X LKR ${(price / 3).toFixed(2)} OR 2.5% CASHBACK WITH` : '');
  return <Link to={`/product/${id}`} className="group cursor-pointer block">
      <div className="relative overflow-hidden bg-gray-100 aspect-[3/4] mb-4">
        {badge && <div className="absolute top-2 left-2 z-10 bg-white/90 backdrop-blur px-2 py-1 text-[10px] uppercase tracking-wider font-medium">
            {badge}
          </div>}

        <motion.img src={productImage} alt={title} className="w-full h-full object-cover object-center" whileHover={{
        scale: 1.05
      }} transition={{
        duration: 0.6,
        ease: [0.33, 1, 0.68, 1]
      }} />

        <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center pb-6">
          <button className="bg-white text-black text-xs font-medium tracking-widest px-6 py-3 uppercase hover:bg-black hover:text-white transition-colors duration-300 w-full max-w-[200px]">
            Choose Options
          </button>
        </div>
      </div>

      <div className="text-center space-y-1 px-2">
        <h3 className="text-xs md:text-sm font-medium text-gray-900 uppercase tracking-wide leading-relaxed line-clamp-2">
          {title}
        </h3>
        <p className="text-sm text-gray-900 font-medium">
          {formatPrice(price)}
        </p>
{/* 
        {installment && <div className="mt-2 space-y-1">
            <p className="text-[10px] text-gray-500 uppercase tracking-wide leading-tight">
              {installment}
            </p>
            <div className="flex justify-center items-center gap-1">
              <span className="bg-[#1a1a1a] text-white text-[9px] px-1.5 py-0.5 rounded-sm font-bold tracking-tight">
                mintpay
              </span>
            </div>
          </div>} */}
      </div>
    </Link>;
}
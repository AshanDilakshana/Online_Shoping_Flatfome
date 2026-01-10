import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronDown, Minus, Plus } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ImageGallery } from '../components/ImageGallery';
import { ProductCard } from '../components/ProductCard';
import axios from 'axios';
import { useCart } from '../context/CartContext';

export function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [showDetails, setShowDetails] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // Fetch product details from backend
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/products/${id}`);
        
        if (response.data) {
          // Transform backend data to match frontend format
          const transformedProduct = {
            id: response.data.productID,
            title: response.data.title || response.data.productName,
            price: response.data.price || response.data.productPrice,
            category: response.data.category,
            images: response.data.productImage || [],
            colors: Array.isArray(response.data.colors) ? response.data.colors : [],
            sizes: response.data.sizes || [],
            description: response.data.description || response.data.productDescription,
            fabric: response.data.fabric,
            care: Array.isArray(response.data.care) ? response.data.care.join(', ') : response.data.care,
            badge: response.data.badge || ''
          };
          setProduct(transformedProduct);

          // Fetch related products (same category)
          const allProductsResponse = await axios.get(`${import.meta.env.VITE_API_URL}/api/products`);
          if (allProductsResponse.data && Array.isArray(allProductsResponse.data)) {
            const related = allProductsResponse.data
              .filter(p => p.category === response.data.category && p.productID !== id)
              .slice(0, 4)
              .map(p => ({
                id: p.productID,
                title: p.title || p.productName,
                price: p.price || p.productPrice,
                category: p.category,
                images: p.productImage || [],
                badge: p.badge || ''
              }));
            setRelatedProducts(related);
          }
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);
  
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-[var(--mimosa-cream)]">
        <Header />
        <main className="flex-grow pt-[72px] flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading product...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  if (!product) {
    return <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-serif mb-4">Product not found</h2>
          <Link to="/collections" className="text-sm underline">
            Browse all products
          </Link>
        </div>
      </div>;
  }
  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert('Please select size and color');
      return;
    }
    addToCart(product, selectedSize, selectedColor, quantity);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };
  const handleBuyNow = () => {
    if (!selectedSize || !selectedColor) {
      alert('Please select size and color');
      return;
    }
    addToCart(product, selectedSize, selectedColor, quantity);
    navigate('/checkout');
  };
  const formatPrice = price => {
    return `LKR ${price.toLocaleString()}.00`;
  };
  const installmentPrice = (product.price / 3).toFixed(2);
  return <div className="min-h-screen flex flex-col bg-[var(--mimosa-cream)]">
      <Header />

      <main className="flex-grow pt-[72px]">
        <div className="container mx-auto px-4 md:px-8 py-8 md:py-16">
          {/* Breadcrumb */}
          <div className="mb-8 text-sm text-gray-600">
            <Link to="/" className="hover:text-black">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/collections" className="hover:text-black">Collections</Link>
            <span className="mx-2">/</span>
            <span className="text-black">{product.title}</span>
          </div>

          {/* Product Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-20">
            {/* Left: Image Gallery */}
            <div>
              <ImageGallery images={product.images} alt={product.title} />
            </div>

            {/* Right: Product Details */}
            <div className="space-y-6">
              {/* Badge */}
              {product.badge && <div className="inline-block bg-black text-white text-xs px-3 py-1 uppercase tracking-wider">
                  {product.badge}
                </div>}

              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-serif text-gray-900 leading-tight">
                {product.title}
              </h1>

              {/* Price */}
              <div className="space-y-2">
                <p className="text-3xl font-medium text-gray-900">
                  {formatPrice(product.price)}
                </p>
                <p className="text-xs text-gray-600 uppercase tracking-wide">
                  OR 3 X LKR {installmentPrice} OR 2.5% CASHBACK WITH{' '}
                  <span className="inline-block bg-[#1a1a1a] text-white text-[9px] px-1.5 py-0.5 rounded-sm font-bold ml-1">
                    mintpay
                  </span>
                </p>
              </div>

              {/* Color Selector */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium uppercase tracking-wider text-gray-900">
                    Color: {selectedColor && <span className="font-normal">{selectedColor}</span>}
                  </label>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map(color => <button key={color} onClick={() => setSelectedColor(color)} className={`px-4 py-2 text-sm border transition-all ${selectedColor === color ? 'border-black bg-black text-white' : 'border-gray-300 hover:border-gray-400'}`}>
                      {color}
                    </button>)}
                </div>
              </div>

              {/* Size Selector */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium uppercase tracking-wider text-gray-900">
                    Size: {selectedSize && <span className="font-normal">{selectedSize}</span>}
                  </label>
                  <button className="text-xs underline text-gray-600 hover:text-black">
                    SIZE CHART
                  </button>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {product.sizes.map(size => <button key={size} onClick={() => setSelectedSize(size)} className={`py-3 text-sm border transition-all ${selectedSize === size ? 'border-black bg-black text-white' : 'border-gray-300 hover:border-gray-400'}`}>
                      {size}
                    </button>)}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="space-y-3">
                <label className="text-sm font-medium uppercase tracking-wider text-gray-900">
                  Quantity
                </label>
                <div className="flex items-center gap-4">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 border border-gray-300 hover:border-gray-400 flex items-center justify-center transition-colors">
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-lg font-medium w-12 text-center">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 border border-gray-300 hover:border-gray-400 flex items-center justify-center transition-colors">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-4">
                <button onClick={handleAddToCart} className="w-full bg-white border-2 border-black text-black py-4 text-sm font-medium tracking-widest uppercase hover:bg-gray-50 transition-colors">
                  Add to Cart
                </button>
                <button onClick={handleBuyNow} className="w-full bg-black text-white py-4 text-sm font-medium tracking-widest uppercase hover:bg-gray-800 transition-colors">
                  Buy It Now
                </button>
              </div>

              {/* Product Details Accordion */}
              <div className="border-t border-gray-200 pt-6">
                <button onClick={() => setShowDetails(!showDetails)} className="w-full flex items-center justify-between text-left">
                  <span className="text-sm font-medium uppercase tracking-wider">View Details</span>
                  <ChevronDown className={`w-5 h-5 transition-transform ${showDetails ? 'rotate-180' : ''}`} />
                </button>
                
                {showDetails && <motion.div initial={{
                height: 0,
                opacity: 0
              }} animate={{
                height: 'auto',
                opacity: 1
              }} exit={{
                height: 0,
                opacity: 0
              }} className="mt-4 space-y-4 text-sm text-gray-700 leading-relaxed">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Description</h4>
                      <p>{product.description}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Fabric</h4>
                      <p>{product.fabric}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Care Instructions</h4>
                      <p>{product.care}</p>
                    </div>
                  </motion.div>}
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && <div className="border-t border-gray-200 pt-16">
              <h2 className="text-2xl md:text-3xl font-serif text-center mb-12">
                You May Also Like
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                {relatedProducts.map(relatedProduct => <ProductCard key={relatedProduct.id} {...relatedProduct} />)}
              </div>
            </div>}
        </div>
      </main>

      <Footer />

      {/* Toast Notification */}
      {showToast && <motion.div initial={{
      opacity: 0,
      y: 50
    }} animate={{
      opacity: 1,
      y: 0
    }} exit={{
      opacity: 0,
      y: 50
    }} className="fixed bottom-8 right-8 bg-black text-white px-6 py-4 rounded shadow-lg z-50">
          <p className="text-sm">Added to cart!</p>
        </motion.div>}
    </div>;
}
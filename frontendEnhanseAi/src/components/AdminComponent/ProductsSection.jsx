import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Edit2, Trash2, Plus } from 'lucide-react';
import { Modal } from './ui/Modal';
import { useToast } from './ui/useToast';
import { ImageUploadPreview } from './ImageUploadPreview';
import { SizeStockInput } from './SizeStockInput';
import { adminMockProducts, PRODUCT_CATEGORIES, FABRIC_OPTIONS, CARE_OPTIONS } from '../../data/products';
import axios from 'axios';
import mediaUplode from '../../context/mediaUplode';

export function ProductsSection() {
  const [products, setProducts] = useState(adminMockProducts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: {
      errors
    }
  } = useForm();
  const {
    showToast,
    ToastContainer
  } = useToast();
  const [formImages, setFormImages] = useState([]);
  const [formSizes, setFormSizes] = useState([]);
  const [formStock, setFormStock] = useState({});

  // Fetch products from database on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_API_URL + '/api/products');
      if (response.data && Array.isArray(response.data)) {
        // Transform backend data to match frontend format
        const transformedProducts = response.data.map(p => {
          // Handle stock - if it's a number, convert to object distributed across sizes
          let stockObj = {};
          if (typeof p.stock === 'number' && p.sizes && p.sizes.length > 0) {
            // Distribute total stock evenly across sizes
            const stockPerSize = Math.floor(p.stock / p.sizes.length);
            p.sizes.forEach(size => {
              stockObj[size] = stockPerSize;
            });
          } else if (typeof p.stock === 'object' && p.stock !== null) {
            // Already an object, use as-is
            stockObj = p.stock;
          }

          return {
            id: p._id,
            productID: p.productID, // Keep productID for editing
            title: p.title || p.productName,
            price: p.price || p.productPrice,
            category: p.category,
            images: p.productImage || [],
            colors: Array.isArray(p.colors) ? p.colors : [],
            sizes: p.sizes || [],
            stock: stockObj,
            description: p.description || p.productDescription,
            fabric: p.fabric,
            care: Array.isArray(p.care) ? p.care.join(', ') : p.care,
            badge: p.badge || ''
          };
        });
        setProducts(transformedProducts);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      showToast('Failed to load products from database', 'error');
    }
  };
  const openAddModal = () => {
    setEditingProduct(null);
    setFormImages([]);
    setFormSizes([]);
    setFormStock({});
    reset({
      title: '',
      price: 0,
      category: 'Skirts',
      colors: '',
      description: '',
      fabric: '100% Silk',
      care: 'Dry clean only',
      badge: ''
    });
    setIsModalOpen(true);
  };
  const openEditModal = (product) => {
    setEditingProduct(product);
    setFormImages(product.images || []);
    setFormSizes(product.sizes || []);
    setFormStock(product.stock || {});
    
    // Transform product data to match form field expectations
    reset({
      title: product.title || '',
      price: product.price || 0,
      category: product.category || 'Skirts',
      colors: Array.isArray(product.colors) ? product.colors.join(', ') : (product.colors || ''),
      description: product.description || '',
      fabric: product.fabric || '100% Silk',
      care: product.care || 'Dry clean only',
      badge: product.badge || ''
    });
    
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
    setFormImages([]);
    setFormSizes([]);
    setFormStock({});
    reset();
  };
  const onSubmit = async (data) => {
    // Validation
    if (formImages.length === 0) {
      showToast('Please upload at least one product image', 'error');
      return;
    }
    if (formSizes.length === 0) {
      showToast('Please select at least one size', 'error');
      return;
    }
    const totalStock = Object.values(formStock).reduce((sum, val) => sum + val, 0);
    if (totalStock === 0) {
      showToast('Please add stock for at least one size', 'error');
      return;
    }

    setIsLoading(true);

    try {
      // Get authentication token
      const token = localStorage.getItem('token');
      if (!token) {
        showToast('Please login to add products', 'error');
        setIsLoading(false);
        return;
      }

      // Upload images to Supabase
      let imageUrls = [];
      if (typeof formImages[0] === 'string') {
        // Images are already URLs (editing existing product)
        imageUrls = formImages;
      } else {
        // Upload new images
        showToast('Uploading images...', 'info');
        const uploadPromises = Array.from(formImages).map(file => mediaUplode(file));
        imageUrls = await Promise.all(uploadPromises);
      }

      // Transform data for backend
      const productData = {
        productID: editingProduct ? editingProduct.productID : `PROD-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        title: data.title,
        price: parseFloat(data.price),
        LabledPrice: parseFloat(data.price) * 1.2, // 20% markup
        description: data.description,
        category: data.category,
        colors: data.colors ? data.colors.split(',').map(c => c.trim()) : [],
        sizes: formSizes,
        stock: formStock, // Send stock object with quantities per size
        productImage: imageUrls,
        fabric: data.fabric,
        care: [data.care]
      };

      if (editingProduct) {
        // Update existing product
        await axios.put(
          `${import.meta.env.VITE_API_URL}/api/products/${editingProduct.productID}`,
          productData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        showToast('Product updated successfully', 'success');
      } else {
        // Create new product
        await axios.post(
          `${import.meta.env.VITE_API_URL}/api/products/createProduct`,
          productData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        showToast('Product added successfully', 'success');
      }

      // Refresh product list from database
      await fetchProducts();
      closeModal();
    } catch (error) {
      console.error('Error saving product:', error);
      const errorMessage = error.response?.data?.message || 'Failed to save product. Please try again.';
      showToast(errorMessage, 'error');
    } finally {
      setIsLoading(false);
    }
  };
  
  const deleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
    setDeleteConfirm(null);
    showToast('Product deleted successfully', 'success');
  };
  const getTotalStock = (stock) => {
    return Object.values(stock).reduce((sum, val) => sum + val, 0);
  };
  return <div className="space-y-6">
      {ToastContainer}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Products</h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage your product catalog
          </p>
        </div>
        <button onClick={openAddModal} className="flex items-center space-x-2 px-4 py-2 bg-rose-400 text-white rounded-lg hover:bg-rose-500 transition-colors">
          <Plus className="w-5 h-5" />
          <span>Add New Product</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Stock
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map(product => {
              const totalStock = getTotalStock(product.stock);
              return <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      #{product.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <img src={product.images[0]} alt={product.title} className="w-10 h-10 rounded object-cover" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {product.title}
                          </div>
                          {product.badge && <span className="text-xs text-rose-400">
                              {product.badge}
                            </span>}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {product.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      LKR {product.price.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {totalStock === 0 ? <span className="px-2 py-1 text-xs font-medium text-red-600 bg-red-50 rounded">
                          Out of stock
                        </span> : <span className="text-sm text-gray-900">
                          {totalStock} units
                        </span>}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button onClick={() => openEditModal(product)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        {deleteConfirm === product.id ? <div className="flex items-center space-x-2">
                            <button onClick={() => deleteProduct(product.id)} className="px-3 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700">
                              Confirm
                            </button>
                            <button onClick={() => setDeleteConfirm(null)} className="px-3 py-1 text-xs bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
                              Cancel
                            </button>
                          </div> : <button onClick={() => setDeleteConfirm(product.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>}
                      </div>
                    </td>
                  </tr>;
            })}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} title={editingProduct ? 'Edit Product' : 'Add New Product'} maxWidth="max-w-4xl">
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b pb-4">
            <h3 className="text-xl font-semibold text-gray-900">
              {editingProduct ? 'Edit Product' : 'Add New Product'}
            </h3>
            <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 transition-colors">
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Title *
                </label>
                <input {...register('title', {
                required: 'Title is required'
              })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-transparent" placeholder="Enter product title" />
                {errors.title && <p className="mt-1 text-sm text-red-600">
                    {errors.title.message}
                  </p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price (LKR) *
                </label>
                <input type="number" {...register('price', {
                required: 'Price is required',
                min: 0
              })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-transparent" placeholder="0" />
                {errors.price && <p className="mt-1 text-sm text-red-600">
                    {errors.price.message}
                  </p>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select {...register('category', {
                required: 'Category is required'
              })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-transparent">
                  {PRODUCT_CATEGORIES.map(cat => <option key={cat} value={cat}>
                      {cat}
                    </option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Colors (comma-separated)
                </label>
                <input {...register('colors')} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-transparent" placeholder="e.g., Pink Floral, Peach Floral" />
              </div>
            </div>

            <ImageUploadPreview images={formImages} onChange={setFormImages} />

            <SizeStockInput selectedSizes={formSizes} stock={formStock} onSizesChange={setFormSizes} onStockChange={setFormStock} />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea {...register('description')} rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-transparent" placeholder="Enter product description" />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fabric
                </label>
                <select {...register('fabric')} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-transparent">
                  {FABRIC_OPTIONS.map(fabric => <option key={fabric} value={fabric}>
                      {fabric}
                    </option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Care Instructions
                </label>
                <select {...register('care')} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-transparent">
                  {CARE_OPTIONS.map(care => <option key={care} value={care}>
                      {care}
                    </option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Badge (optional)
              </label>
              <input {...register('badge')} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-transparent" placeholder="e.g., New Arrival, Bestseller" />
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t">
              <button type="button" onClick={closeModal} className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                Cancel
              </button>
              <button type="submit" disabled={isLoading} className="px-6 py-2 bg-rose-400 text-white rounded-lg hover:bg-rose-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    {editingProduct ? 'Updating...' : 'Saving...'}
                  </>
                ) : (
                  editingProduct ? 'Update Product' : 'Save Product'
                )}
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>;
}

import React, { createContext, useContext, useState, useEffect } from 'react';
const CartContext = createContext();
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}
export function CartProvider({
  children
}) {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('mimosa-cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('mimosa-cart', JSON.stringify(cart));
  }, [cart]);
  const addToCart = (product, selectedSize, selectedColor, quantity = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id && item.size === selectedSize && item.color === selectedColor);
      if (existingItem) {
        return prevCart.map(item => item.id === product.id && item.size === selectedSize && item.color === selectedColor ? {
          ...item,
          quantity: item.quantity + quantity
        } : item);
      }
      return [...prevCart, {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.images[0],
        size: selectedSize,
        color: selectedColor,
        quantity
      }];
    });
  };
  const removeFromCart = (id, size, color) => {
    setCart(prevCart => prevCart.filter(item => !(item.id === id && item.size === size && item.color === color)));
  };
  const updateQuantity = (id, size, color, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id, size, color);
      return;
    }
    setCart(prevCart => prevCart.map(item => item.id === id && item.size === size && item.color === color ? {
      ...item,
      quantity
    } : item));
  };
  const clearCart = () => {
    setCart([]);
  };
  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };
  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };
  return <CartContext.Provider value={{
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount
  }}>
      {children}
    </CartContext.Provider>;
}
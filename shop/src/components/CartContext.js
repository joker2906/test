import React, { createContext, useContext, useState, useEffect } from 'react';
const CartContext = createContext();
export const useCart = () => useContext(CartContext);
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });
  const [buyNowItem, setBuyNowItem] = useState(null);
  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem('orders');
    return savedOrders ? JSON.parse(savedOrders) : [];
  });
  const [searchQuery, setSearchQuery] = useState('');
  const filteredCart = cart.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredWishlist = wishlist.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);
  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);
  const addToCart = (item, quantity = 1) => {
    setCart((prev) => {
      const existingItem = prev.find(cartItem => cartItem.name === item.name && cartItem.size === item.size);
      if (existingItem) {
        return prev.map(cartItem =>
          cartItem.name === item.name && cartItem.size === item.size
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        );
      } else {
        return [...prev, { ...item, quantity }];
      }
    });
  };
  const updateCartQuantity = (item, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(item);
      return;
    }
    setCart((prev) => prev.map(cartItem =>
      cartItem.name === item.name && cartItem.size === item.size
        ? { ...cartItem, quantity: newQuantity }
        : cartItem
    ));
  };
  const addToWishlist = (item) => {
    setWishlist((prev) => {
      const exists = prev.some(wishItem => wishItem.name === item.name && wishItem.size === item.size);
      if (!exists) {
        return [...prev, item];
      }
      return prev;
    });
  };

  const setBuyNow = (item) => {
    setBuyNowItem(item);
  };

  const removeFromCart = (item) => {
    setCart((prev) => prev.filter(cartItem => !(cartItem.name === item.name && cartItem.size === item.size)));
  };
  const removeFromWishlist = (item) => {
    setWishlist((prev) => prev.filter(wishItem => !(wishItem.name === item.name && wishItem.size === item.size)));
  };
  const clearCart = () => {
    setCart([]);
  };
  const addOrder = (order) => {
    setOrders((prev) => [...prev, { ...order, id: Date.now(), date: new Date().toISOString() }]);
  };
  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      const price = parseFloat(item.price.replace('₹', ''));
      return total + (price * item.quantity);
    }, 0);
  };

  return (
    <CartContext.Provider value={{
      cart,
      wishlist,
      filteredCart,
      filteredWishlist,
      buyNowItem,
      orders,
      searchQuery,
      addToCart,
      updateCartQuantity,
      addToWishlist,
      setBuyNow,
      removeFromCart,
      removeFromWishlist,
      clearCart,
      addOrder,
      getCartTotal,
      setSearchQuery
    }}>
      {children}
    </CartContext.Provider>
  );
};

// src/context/ShopContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  // Save to localStorage whenever cart or wishlist changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const addToCart = (artwork) => {
    setCart((prev) => {
      const existingItem = prev.find((item) => item._id === artwork._id);
      if (existingItem) {
        return prev.map((item) =>
          item._id === artwork._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...artwork, quantity: 1 }];
    });
  };

  const removeFromCart = (artworkId) => {
    setCart((prev) => prev.filter((item) => item._id !== artworkId));
  };

  const updateCartQuantity = (artworkId, quantity) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === artworkId
          ? { ...item, quantity: Math.max(0, quantity) }
          : item
      )
    );
  };

  const addToWishlist = (artwork) => {
    setWishlist((prev) => {
      if (prev.find((item) => item._id === artwork._id)) return prev;
      return [...prev, artwork];
    });
  };

  const removeFromWishlist = (artworkId) => {
    setWishlist((prev) => prev.filter((item) => item._id !== artworkId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <ShopContext.Provider
      value={{
        cart,
        wishlist,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        addToWishlist,
        removeFromWishlist,
        clearCart,
        getCartTotal,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => useContext(ShopContext);

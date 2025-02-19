// src/context/ShopContext.jsx
import React, { createContext, useState, useContext, useEffect } from "react";
import { useAuth } from "./AuthContext";

const ShopContext = createContext(null);

export const ShopProvider = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  // Load cart and wishlist from localStorage on mount
  useEffect(() => {
    const loadGuestData = () => {
      try {
        const storedCart = localStorage.getItem("guestCart");
        const storedWishlist = localStorage.getItem("guestWishlist");

        if (storedCart) {
          setCart(JSON.parse(storedCart));
        }

        if (storedWishlist) {
          setWishlist(JSON.parse(storedWishlist));
        }
      } catch (error) {
        console.error("Error loading guest data:", error);
      }
    };

    const loadUserData = async () => {
      // Load data from server if user is logged in
      // This is where you'd make API calls to get user-specific cart/wishlist
      // For now, we'll just use localStorage for both guests and logged-in users
      loadGuestData();
    };

    if (user) {
      loadUserData();
    } else {
      loadGuestData();
    }
  }, [user]);

  // Save to localStorage whenever cart or wishlist changes
  useEffect(() => {
    try {
      localStorage.setItem("guestCart", JSON.stringify(cart));
    } catch (error) {
      console.error("Error saving cart to localStorage:", error);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem("guestWishlist", JSON.stringify(wishlist));
    } catch (error) {
      console.error("Error saving wishlist to localStorage:", error);
    }
  }, [wishlist]);

  const addToCart = (artwork) => {
    setCart((prevCart) => {
      // Check if item already exists in cart
      const itemExists = prevCart.some((item) => item._id === artwork._id);

      if (itemExists) {
        // Update quantity if item exists
        return prevCart.map((item) =>
          item._id === artwork._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Add new item with quantity 1
        return [...prevCart, { ...artwork, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (artworkId) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== artworkId));
  };

  const updateCartQuantity = (artworkId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(artworkId);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === artworkId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const addToWishlist = (artwork) => {
    setWishlist((prevWishlist) => {
      // Check if item already exists in wishlist
      const itemExists = prevWishlist.some((item) => item._id === artwork._id);

      if (itemExists) {
        return prevWishlist;
      } else {
        return [...prevWishlist, artwork];
      }
    });
  };

  const removeFromWishlist = (artworkId) => {
    setWishlist((prevWishlist) =>
      prevWishlist.filter((item) => item._id !== artworkId)
    );
  };

  const moveToCart = (artworkId) => {
    const item = wishlist.find((item) => item._id === artworkId);
    if (item) {
      addToCart(item);
      removeFromWishlist(artworkId);
    }
  };

  return (
    <ShopContext.Provider
      value={{
        cart,
        wishlist,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        getCartTotal,
        addToWishlist,
        removeFromWishlist,
        moveToCart,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => useContext(ShopContext);

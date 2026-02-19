import React, { createContext, useState, useEffect, useContext } from "react";

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Failed to load cart from localStorage:", error);
        localStorage.removeItem("cart");
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Add item to cart
  const addToCart = (product, quantity = 1, options = {}) => {
    const { color, size } = options;
    
    // Check if item already exists in cart
    const existingItemIndex = cartItems.findIndex(
      (item) =>
        item.id === product.id &&
        item.color === color &&
        item.size === size
    );

    if (existingItemIndex > -1) {
      // Item exists, update quantity
      const updatedCart = [...cartItems];
      updatedCart[existingItemIndex].quantity += quantity;
      setCartItems(updatedCart);
    } else {
      // New item, add to cart
      const newItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        color: color || "Default",
        size: size || "M",
        quantity: quantity,
      };
      setCartItems([...cartItems, newItem]);
    }
  };

  // Update item quantity
  const updateQuantity = (itemId, action) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) => {
          if (item.id === itemId) {
            const newQuantity =
              action === "increase" ? item.quantity + 1 : item.quantity - 1;
            return { ...item, quantity: Math.max(0, newQuantity) };
          }
          return item;
        })
        .filter((item) => item.quantity > 0) // Remove items with 0 quantity
    );
  };

  // Remove item from cart
  const removeItem = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  // Clear entire cart
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cart");
  };

  // Get cart count
  const getCartCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // Get cart summary
  const getCartSummary = () => {
    const subtotal = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    const tax = subtotal * 0.1; // 10% tax
    const total = subtotal + tax;

    return {
      subtotal,
      tax,
      shipping: 0,
      total,
    };
  };

  // Merge cart (used when user logs in)
  const mergeCart = (serverCart) => {
    if (!serverCart || serverCart.length === 0) {
      return; // No server cart to merge
    }

    const mergedCart = [...cartItems];
    
    serverCart.forEach((serverItem) => {
      const existingItemIndex = mergedCart.findIndex(
        (item) =>
          item.id === serverItem.id &&
          item.color === serverItem.color &&
          item.size === serverItem.size
      );

      if (existingItemIndex > -1) {
        // Item exists, add quantities
        mergedCart[existingItemIndex].quantity += serverItem.quantity;
      } else {
        // New item from server
        mergedCart.push(serverItem);
      }
    });

    setCartItems(mergedCart);
  };

  // Replace cart (used when user logs in and we want to use server cart only)
  const replaceCart = (newCart) => {
    setCartItems(newCart || []);
  };

  const value = {
    cartItems,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
    getCartCount,
    getCartSummary,
    mergeCart,
    replaceCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

import { createContext, useContext, useState, useEffect } from "react";

// Step 1: Create the Context (the "global storage")
const CartContext = createContext();

// Step 2: Create a custom hook for easy access
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};

// Step 3: Create the Provider component
export const CartProvider = ({ children }) => {
  // State to hold all cart items
  const [cartItems, setCartItems] = useState([]);

  // Load cart from browser storage when app starts
  useEffect(() => {
    const savedCart = localStorage.getItem("samplify-cart");
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Error loading cart:", error);
      }
    }
  }, []);

  // Save cart to browser storage whenever it changes
  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem("samplify-cart", JSON.stringify(cartItems));
    } else {
      localStorage.removeItem("samplify-cart");
    }
  }, [cartItems]);

  // Function to add item to cart
  const addToCart = (
    product,
    selectedSize = "M",
    selectedColor = "Default",
  ) => {
    // Check if item already exists (same product, size, color)
    const existingItemIndex = cartItems.findIndex(
      (item) =>
        item.productId === product._id &&
        item.size === selectedSize &&
        item.color === selectedColor,
    );

    if (existingItemIndex > -1) {
      // Item exists - increase quantity
      const updatedCart = [...cartItems];
      updatedCart[existingItemIndex].quantity += 1;
      setCartItems(updatedCart);
    } else {
      // New item - add to cart
      const newItem = {
        productId: product._id,
        name: product.name,
        price: product.salePrice || product.price,
        image: product.images[0],
        size: selectedSize,
        color: selectedColor,
        quantity: 1,
        brand: product.brand,
        stock: product.stock,
      };
      setCartItems([...cartItems, newItem]);
    }
  };

  // Function to get total number of items
  const getCartCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // Function to get total price
  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  };

  // Everything we want to share with other components
  const value = {
    cartItems,
    addToCart,
    getCartCount,
    getCartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

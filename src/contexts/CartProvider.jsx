import React, { useState, useEffect, useCallback } from "react";
import API from "../components/services/api";
import { CartContext } from "./CartContext.js";

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    // Load cart from backend on mount
    useEffect(() => {
        const initCart = async () => {
            try {
                const serverCart = await API.getCart();
                setCartItems(serverCart);
            } catch (error) {
                console.error("Failed to load cart from server:", error);
                // Fallback to localStorage if server fails
                const savedCart = localStorage.getItem("cart");
                if (savedCart) setCartItems(JSON.parse(savedCart));
            }
        };
        initCart();
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cartItems));
    }, [cartItems]);

    // Add item to cart
    const addToCart = async (product, quantity = 1, options = {}) => {
        const { color, size } = options;

        try {
            const response = await API.addToCart(product.id, quantity, "default_user", { color, size });
            if (response && response.cart) {
                setCartItems(response.cart);
            } else {
                console.warn("Using local cart fallback");
                updateLocalCart(product, quantity, options);
            }
        } catch (error) {
            console.error("Add to cart error:", error);
            updateLocalCart(product, quantity, options);
        }
    };

    const updateLocalCart = (product, quantity, options) => {
        const { color, size } = options;
        const existingItemIndex = cartItems.findIndex(
            (item) =>
                item.id === product.id &&
                item.color === (color || "Default") &&
                item.size === (size || "M")
        );

        if (existingItemIndex > -1) {
            const updatedCart = [...cartItems];
            updatedCart[existingItemIndex].quantity += quantity;
            setCartItems(updatedCart);
        } else {
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
    const updateQuantity = async (itemId, action) => {
        try {
            const response = await API.updateCartQuantity(itemId, action);
            if (response && response.cart) {
                setCartItems(response.cart);
            } else {
                updateLocalQuantity(itemId, action);
            }
        } catch (error) {
            console.error("Update quantity error:", error);
            updateLocalQuantity(itemId, action);
        }
    };

    const updateLocalQuantity = (itemId, action) => {
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
                .filter((item) => item.quantity > 0)
        );
    };

    // Remove item from cart
    const removeItem = async (itemId) => {
        try {
            const response = await API.removeFromCart(itemId);
            if (response && response.cart) {
                setCartItems(response.cart);
            } else {
                setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
            }
        } catch (error) {
            console.error("Remove item error:", error);
            setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
        }
    };

    const clearCart = useCallback(() => {
        setCartItems([]);
        localStorage.removeItem("cart");
    }, []);

    const getCartCount = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };

    const getCartSummary = () => {
        const subtotal = cartItems.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        );
        const tax = subtotal * 0.1;
        const total = subtotal + tax;

        return {
            subtotal,
            tax,
            shipping: 0,
            total,
        };
    };

    const mergeCart = (serverCart) => {
        if (!serverCart || serverCart.length === 0) return;
        const mergedCart = [...cartItems];
        serverCart.forEach((serverItem) => {
            const existingItemIndex = mergedCart.findIndex(
                (item) =>
                    item.id === serverItem.id &&
                    item.color === serverItem.color &&
                    item.size === serverItem.size
            );
            if (existingItemIndex > -1) {
                mergedCart[existingItemIndex].quantity += serverItem.quantity;
            } else {
                mergedCart.push(serverItem);
            }
        });
        setCartItems(mergedCart);
    };

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

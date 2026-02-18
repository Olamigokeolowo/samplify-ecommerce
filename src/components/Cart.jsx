import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "./services/api";
import "./Cart.css";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [summary, setSummary] = useState({
    subtotal: 0,
    tax: 0,
    total: 0,
  });

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const [items, summaryData] = await Promise.all([
        API.getCart(),
        API.getCartSummary(),
      ]);
      setCartItems(items);
      setSummary({
        subtotal: summaryData.subtotal,
        tax: summaryData.tax,
        total: summaryData.total,
      });
      setError(null);
    } catch (err) {
      setError("Failed to load cart. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (id, action) => {
    try {
      await API.updateCartQuantity(id, action);
      await fetchCart(); // Refresh cart
    } catch (err) {
      console.error("Failed to update quantity:", err);
      alert("Failed to update quantity. Please try again.");
    }
  };

  const removeItem = async (id) => {
    try {
      await API.removeFromCart(id);
      await fetchCart(); // Refresh cart
    } catch (err) {
      console.error("Failed to remove item:", err);
      alert("Failed to remove item. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="cart-page">
        <div className="cart-container">
          <div className="loading">Loading cart...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="cart-page">
        <div className="cart-container">
          <div className="error-message">{error}</div>
          <button onClick={fetchCart} className="retry-btn">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        <h1 className="cart-title">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              width="80"
              height="80"
            >
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <h2>Your cart is empty</h2>
            <p>Add some items to get started!</p>
            <Link to="/shop" className="continue-shopping-btn">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="cart-content">
            {/* Cart Items */}
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="item-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="item-details">
                    <h3 className="item-name">{item.name}</h3>
                    <p className="item-specs">
                      Color: {item.color} | Size: {item.size}
                    </p>
                    <p className="item-price">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="item-quantity">
                    <button onClick={() => updateQuantity(item.id, "decrease")}>
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, "increase")}>
                      +
                    </button>
                  </div>
                  <div className="item-total">
                    <p>${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                  <button
                    className="remove-btn"
                    onClick={() => removeItem(item.id)}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      width="20"
                      height="20"
                    >
                      <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="order-summary">
              <h2>Order Summary</h2>
              <div className="summary-row">
                <span>Subtotal</span>
                <span>${summary.subtotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Tax (10%)</span>
                <span>${summary.tax.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="summary-divider"></div>
              <div className="summary-row total">
                <span>Total</span>
                <span>${summary.total.toFixed(2)}</span>
              </div>
              <button className="checkout-btn">Proceed to Checkout</button>
              <Link to="/shop" className="continue-link">
                Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

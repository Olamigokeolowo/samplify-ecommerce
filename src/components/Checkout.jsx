import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import useCheckout from "../hooks/useCheckout";
import "./Checkout.css";

export default function Checkout() {
  const { cartItems, getCartSummary } = useCart();
  const { isAuthenticated } = useAuth();
  const summary = getCartSummary();
  const {
    email,
    setEmail,
    currency,
    setCurrency,
    loading,
    error,
    supportedCurrencies,
    startPayment,
  } = useCheckout();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    try {
      const response = await startPayment();
      if (response?.authorization_url) {
        window.location.href = response.authorization_url;
      }
    } catch {
      // Error state is handled by hook.
    }
  };

  if (!isAuthenticated()) {
    return (
      <div className="checkout-page">
        <div className="checkout-card">
          <h1>Sign In Required</h1>
          <p>Please sign in before proceeding to checkout.</p>
          <Link
            to="/signin"
            state={{ from: { pathname: "/checkout" } }}
            className="checkout-link-btn"
          >
            Go to Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout-layout">
        <section className="checkout-card">
          <h1>Checkout</h1>
          <p className="checkout-subtitle">
            Complete payment securely with Paystack.
          </p>

          {error && <div className="checkout-error">{error}</div>}

          <form onSubmit={handleSubmit} className="checkout-form">
            <label>
              Email Address
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="customer@example.com"
                required
              />
            </label>

            <label>
              Currency
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              >
                {supportedCurrencies.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>

            <button
              type="submit"
              className="pay-now-btn"
              disabled={loading || cartItems.length === 0}
            >
              {loading ? "Initializing Payment..." : "Pay Now"}
            </button>
          </form>
        </section>

        <aside className="checkout-summary">
          <h2>Order Summary</h2>
          <div className="summary-row">
            <span>Items</span>
            <span>{cartItems.length}</span>
          </div>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>${summary.subtotal.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Tax</span>
            <span>${summary.tax.toFixed(2)}</span>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <span>${summary.total.toFixed(2)}</span>
          </div>
          <Link to="/cart" className="back-link">
            Back to Cart
          </Link>
        </aside>
      </div>
    </div>
  );
}

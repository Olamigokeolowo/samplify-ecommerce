import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext.js";
import { useAuth } from "../contexts/AuthContext";
import "./Header.css";

import SearchBar from "./SearchBar";

export default function Header() {
  const [showSearch, setShowSearch] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { getCartCount } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const cartCount = getCartCount();
  const [isBumped, setIsBumped] = useState(false);
  const firstName = user?.name ? user.name.split(" ")[0] : "there";

  const handleSearchIconClick = () => setShowSearch((v) => !v);

  // Trigger bump animation when cartCount changes
  useEffect(() => {
    // if (cartCount === 0) return;
    // setIsBumped(true);

    const timer = setTimeout(() => {
      setIsBumped(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [cartCount]);
  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <Link to="/" className="logo">
          <div className="logo-icon">
            <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
              <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
            </svg>
          </div>
          <span className="logo-text">Samplify</span>
        </Link>

        {/* Navigation */}

        <nav className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/CategoryListing" className="nav-link">Shop</Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
        </nav>

        {/* Right Side Icons */}
        <div className="header-actions">
          {/* Search Icon */}
          <button className="icon-button" aria-label="Search" onClick={handleSearchIconClick}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              width="20"
              height="20"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
          </button>

          {/* Inline SearchBar */}
          {showSearch && (
            <div style={{ position: "absolute", top: "60px", right: "120px", zIndex: 10 }}>
              <SearchBar onSearch={() => { }} />
            </div>
          )}

          {/* Cart Icon */}
          <Link to="/cart" className={`icon-button cart-button ${isBumped ? "bump" : ""}`}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              width="20"
              height="20"
            >
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>

          {/* Sign In Button */}
          {isAuthenticated() ? (
            <div className="user-menu">
              <button
                className="user-button"
                onClick={() => setShowUserMenu((prev) => !prev)}
              >
                <span className="user-name">Hi, {firstName}</span>
              </button>

              {showUserMenu && (
                <div className="user-dropdown">
                  <div className="user-dropdown-header">
                    <strong>{user?.name || "User"}</strong>
                    <span>{user?.email}</span>
                  </div>
                  <div className="user-dropdown-divider"></div>
                  <button
                    className="logout-button"
                    onClick={() => {
                      logout();
                      setShowUserMenu(false);
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/signin" className="signin-button">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

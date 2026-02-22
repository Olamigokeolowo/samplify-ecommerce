import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import API from "./services/api";
import "./Homepage.css";

export default function Homepage() {
  const { addToCart } = useCart();
  const [categories, setCategories] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      // Fetch all data in parallel
      const [categoriesData, newArrivalsData, bestSellersData] =
        await Promise.all([
          API.getCategories(),
          API.getNewArrivals(),
          API.getBestsellers(),
        ]);

      setCategories(categoriesData);
      setNewArrivals(newArrivalsData);
      setBestSellers(bestSellersData);
    } catch (error) {
      console.error("Error fetching homepage data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    addToCart(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      },
      1
    );
    alert(`Added ${product.name} to cart!`);
  };

  if (loading) {
    return (
      <div className="homepage">
        <div style={{ textAlign: "center", padding: "50px" }}>Loading...</div>
      </div>
    );
  }

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Elevate Your Style,
              <br />
              Effortlessly
            </h1>
            <p className="hero-description">
              Discover apparel and accessories designed for comfort and
              elegance. Shop the latest trends and timeless classics.
            </p>
            <Link to="/shop" className="cta-button">
              Shop Latest Collections
            </Link>
          </div>
          <div className="hero-image">
            <img
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=800&fit=crop"
              alt="Fashion model in elegant attire"
              className="model-image"
            />
          </div>
        </div>
      </section>

      {/* Shop by Category Section */}
      <section className="category-section">
        <h2 className="section-title">Shop by Category</h2>
        <div className="category-grid">
          {categories.map((category) => (
            <Link
              to={category.link}
              key={category.id}
              className="category-card"
            >
              <div className="category-image-wrapper">
                <img
                  src={category.image}
                  alt={category.name}
                  className="category-image"
                />
                <div className="category-overlay">
                  <span className="category-name">{category.name}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Summer Styles Banner */}
      <section className="banner-section summer-banner">
        <div className="banner-content">
          <h2 className="banner-title">Summer Styles Are Here!</h2>
          <p className="banner-description">
            Refresh your wardrobe with our latest collection, perfect for sunny
            days and cool evenings.
          </p>
          <Link to="/shop/summer" className="banner-button">
            Explore Now
          </Link>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="products-section">
        <h2 className="section-title">New Arrivals</h2>
        <div className="products-grid">
          {newArrivals.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image-wrapper">
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                />
                <button
                  className="quick-view-btn"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-price">${product.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sustainable Fashion Banner */}
      <section className="banner-section sustainable-banner">
        <div className="banner-content">
          <h2 className="banner-title">Sustainable Fashion, Smart Choices.</h2>
          <p className="banner-description">
            Shop our eco-friendly line and make a positive impact with every
            purchase.
          </p>
          <Link to="/sustainability" className="banner-button secondary">
            Learn More
          </Link>
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="products-section best-sellers">
        <h2 className="section-title">Best Sellers</h2>
        <div className="products-grid">
          {bestSellers.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image-wrapper">
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                />
                <button
                  className="quick-view-btn"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-price">${product.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="newsletter-content">
          <h2 className="newsletter-title">Join Our Community</h2>
          <p className="newsletter-description">
            Sign up for our newsletter to get exclusive offers, style tips, and
            updates on new collections.
          </p>
          <Link to="/shop" className="newsletter-button">
            Browse All Products
          </Link>
        </div>
      </section>
    </div>
  );
}

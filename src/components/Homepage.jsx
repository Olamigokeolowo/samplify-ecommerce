import React from "react";
import { Link } from "react-router-dom";
import "./Homepage.css";

export default function Homepage() {
  // New Arrivals Data
  const newArrivals = [
    {
      id: 1,
      name: "Elegance Flow Dress",
      price: 89.99,
      image: "/images/dress.jpg",
      category: "Dresses",
    },
    {
      id: 2,
      name: "Urban Explorer Backpack",
      price: 59.99,
      image: "/images/backpack.jpg",
      category: "Accessories",
    },
    {
      id: 3,
      name: "Dynamic Fit Sneakers",
      price: 74.99,
      image: "/images/sneakers.jpg",
      category: "Shoes",
    },
    {
      id: 4,
      name: "Serene Knit Sweater",
      price: 65.0,
      image: "/images/sweater.jpg",
      category: "Tops",
    },
  ];

  // Best Sellers Data
  const bestSellers = [
    {
      id: 5,
      name: "Classic Denim Jacket",
      price: 99.99,
      image: "/images/denim-jacket.jpg",
      category: "Jackets",
    },
    {
      id: 6,
      name: "Minimalist Leather Wallet",
      price: 34.99,
      image: "/images/wallet.jpg",
      category: "Accessories",
    },
    {
      id: 7,
      name: "Comfort Stretch Jeans",
      price: 79.99,
      image: "/images/jeans.jpg",
      category: "Bottoms",
    },
    {
      id: 8,
      name: "Timeless Watch Collection",
      price: 120.0,
      image: "/images/watch.jpg",
      category: "Accessories",
    },
  ];

  // Categories Data
  const categories = [
    {
      id: 1,
      name: "Handbags",
      image: "/images/handbags.jpg",
      link: "/shop/handbags",
    },
    {
      id: 2,
      name: "Apparel",
      image: "/images/apparel.jpg",
      link: "/shop/apparel",
    },
    {
      id: 3,
      name: "Accessories",
      image: "/images/accessories.jpg",
      link: "/shop/accessories",
    },
    {
      id: 4,
      name: "Footwear",
      image: "/images/footwear.jpg",
      link: "/shop/footwear",
    },
  ];

  return (
    <div className="homepage">
      <div
        style={{ padding: "1rem", background: "#ffdede", textAlign: "center" }}
      >
        DEBUG: Homepage component rendered
      </div>
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
              src="/images/hero-model.jpg"
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
                <button className="quick-view-btn">Quick View</button>
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
                <button className="quick-view-btn">Quick View</button>
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

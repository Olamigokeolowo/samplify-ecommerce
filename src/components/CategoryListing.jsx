import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./CategoryListing.css";

export default function CategoryListing() {
  const [sortBy, setSortBy] = useState("featured");
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 3;

  // Sample products data
  const products = [
    {
      id: 1,
      name: "Smart Speaker Echo X",
      price: 129.99,
      originalPrice: null,
      image:
        "https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&h=400&fit=crop",
      category: "Electronics",
      brand: "TechCo",
      rating: 4.5,
      reviews: 128,
    },
    {
      id: 2,
      name: "Wireless Headphones Pro",
      price: 99.0,
      originalPrice: 149.0,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
      category: "Electronics",
      brand: "SoundWave",
      rating: 4.8,
      reviews: 342,
    },
    {
      id: 3,
      name: "Gaming Mouse RGB",
      price: 59.99,
      originalPrice: null,
      image:
        "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop",
      category: "Electronics",
      brand: "GadgetZone",
      rating: 4.3,
      reviews: 89,
    },
    {
      id: 4,
      name: "Smart Watch Series 5",
      price: 199.99,
      originalPrice: 249.0,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
      category: "Electronics",
      brand: "TechCo",
      rating: 4.7,
      reviews: 256,
    },
    {
      id: 5,
      name: "Portable Power Bank 20000mAh",
      price: 35.0,
      originalPrice: null,
      image:
        "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&h=400&fit=crop",
      category: "Electronics",
      brand: "PowerUp",
      rating: 4.6,
      reviews: 178,
    },
    {
      id: 6,
      name: "Bluetooth Speaker Mini",
      price: 49.99,
      originalPrice: null,
      image:
        "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop",
      category: "Electronics",
      brand: "SoundWave",
      rating: 4.4,
      reviews: 92,
    },
    {
      id: 7,
      name: "Drone with 4K Camera",
      price: 349.99,
      originalPrice: 449.0,
      image:
        "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400&h=400&fit=crop",
      category: "Electronics",
      brand: "SkyView",
      rating: 4.5,
      reviews: 76,
    },
    {
      id: 8,
      name: "Ergonomic Mechanical Keyboard",
      price: 89.99,
      originalPrice: null,
      image:
        "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop",
      category: "Electronics",
      brand: "TypeMaster",
      rating: 4.7,
      reviews: 203,
    },
    {
      id: 9,
      name: "HD Webcam 1080p",
      price: 29.99,
      originalPrice: null,
      image:
        "https://images.unsplash.com/photo-1626668893632-6f3a4466d22f?w=400&h=400&fit=crop",
      category: "Electronics",
      brand: "CamTech",
      rating: 4.2,
      reviews: 67,
    },
    {
      id: 10,
      name: "Laptop Backpack Stylish",
      price: 45.0,
      originalPrice: null,
      image:
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
      category: "Accessories",
      brand: "TravelPro",
      rating: 4.6,
      reviews: 145,
    },
    {
      id: 11,
      name: "Fast Wireless Charger Pad",
      price: 24.99,
      originalPrice: null,
      image:
        "https://images.unsplash.com/photo-1591290619762-c588f5768a50?w=400&h=400&fit=crop",
      category: "Electronics",
      brand: "ChargeFast",
      rating: 4.5,
      reviews: 112,
    },
    {
      id: 12,
      name: "Smart Home Hub",
      price: 79.99,
      originalPrice: null,
      image:
        "https://images.unsplash.com/photo-1558089687-6ec4c0a934d5?w=400&h=400&fit=crop",
      category: "Electronics",
      brand: "HomeList",
      rating: 4.4,
      reviews: 98,
    },
  ];

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= rating ? "star filled" : "star"}>
          ★
        </span>,
      );
    }
    return stars;
  };

  return (
    <div className="category-list-page">
      <div className="page-container">
        {/* Sidebar Filters */}
        <aside className="filters-sidebar">
          <h3 className="filters-title">Filters</h3>

          {/* Category Filter */}
          <div className="filter-section">
            <h4 className="filter-heading">Category</h4>
            <div className="filter-options">
              <label className="filter-checkbox">
                <input type="checkbox" />
                <span>Electronics</span>
              </label>
              <label className="filter-checkbox">
                <input type="checkbox" />
                <span>Apparel</span>
              </label>
              <label className="filter-checkbox">
                <input type="checkbox" />
                <span>Home & Kitchen</span>
              </label>
              <label className="filter-checkbox">
                <input type="checkbox" />
                <span>Books</span>
              </label>
              <label className="filter-checkbox">
                <input type="checkbox" />
                <span>Sports</span>
              </label>
              <label className="filter-checkbox">
                <input type="checkbox" />
                <span>Beauty</span>
              </label>
              <label className="filter-checkbox">
                <input type="checkbox" />
                <span>Automotive</span>
              </label>
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="filter-section">
            <h4 className="filter-heading">Price Range</h4>
            <div className="price-range">
              <input type="number" placeholder="$20" className="price-input" />
              <span>-</span>
              <input type="number" placeholder="$350" className="price-input" />
            </div>
            <input type="range" min="20" max="350" className="price-slider" />
          </div>

          {/* Brand Filter */}
          <div className="filter-section">
            <h4 className="filter-heading">Brand</h4>
            <div className="filter-options">
              <label className="filter-checkbox">
                <input type="checkbox" />
                <span>TechCo</span>
              </label>
              <label className="filter-checkbox">
                <input type="checkbox" />
                <span>SoundWave</span>
              </label>
              <label className="filter-checkbox">
                <input type="checkbox" />
                <span>HomeList</span>
              </label>
              <label className="filter-checkbox">
                <input type="checkbox" />
                <span>PageTurner</span>
              </label>
              <label className="filter-checkbox">
                <input type="checkbox" />
                <span>FitGear</span>
              </label>
              <label className="filter-checkbox">
                <input type="checkbox" />
                <span>GadgetZone</span>
              </label>
            </div>
          </div>

          {/* Size Filter */}
          <div className="filter-section">
            <h4 className="filter-heading">Size</h4>
            <div className="size-options">
              <button className="size-btn">XS</button>
              <button className="size-btn">S</button>
              <button className="size-btn">M</button>
              <button className="size-btn">L</button>
              <button className="size-btn">XL</button>
              <button className="size-btn">XXL</button>
            </div>
          </div>

          {/* Color Filter */}
          <div className="filter-section">
            <h4 className="filter-heading">Color</h4>
            <div className="color-options">
              <button
                className="color-btn"
                style={{ backgroundColor: "#FF0000" }}
              ></button>
              <button
                className="color-btn"
                style={{ backgroundColor: "#0000FF" }}
              ></button>
              <button
                className="color-btn"
                style={{ backgroundColor: "#00FF00" }}
              ></button>
              <button
                className="color-btn"
                style={{ backgroundColor: "#000000" }}
              ></button>
              <button
                className="color-btn"
                style={{ backgroundColor: "#808080" }}
              ></button>
              <button
                className="color-btn"
                style={{ backgroundColor: "#FFFF00" }}
              ></button>
            </div>
          </div>

          <button className="apply-filters-btn">Apply Filters</button>
        </aside>

        {/* Main Content */}
        <main className="products-main">
          {/* Header */}
          <div className="products-header">
            <h2 className="products-title">Electronics (12 Products)</h2>
            <div className="sort-dropdown">
              <label>Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          <div className="products-grid">
            {products.map((product) => (
              <Link
                to={`/product/${product.id}`}
                key={product.id}
                className="product-card"
              >
                <div className="product-image-wrapper">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                  />
                </div>
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <div className="product-rating">
                    <div className="stars">{renderStars(product.rating)}</div>
                    <span className="reviews-count">({product.reviews})</span>
                  </div>
                  <div className="product-pricing">
                    <span className="product-price">
                      ${product.price.toFixed(2)}
                    </span>
                    {product.originalPrice && (
                      <span className="original-price">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                  <button
                    className="add-to-cart-btn"
                    onClick={(e) => {
                      e.preventDefault();
                      alert("Added to cart!");
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          <div className="pagination">
            <button
              className="pagination-btn prev-btn"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                width="16"
                height="16"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
              Previous
            </button>

            {[...Array(totalPages)].map((_, index) => {
              const page = index + 1;
              return (
                <button
                  key={page}
                  className={
                    currentPage === page
                      ? "pagination-btn active"
                      : "pagination-btn"
                  }
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </button>
              );
            })}

            <button
              className="pagination-btn next-btn"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                width="16"
                height="16"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}

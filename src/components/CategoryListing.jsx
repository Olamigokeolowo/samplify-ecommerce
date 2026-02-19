import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import API from "./services/api";
import "./CategoryListing.css";

export default function CategoryListing() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("featured");
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 3;

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      // You can add filters here, e.g., { category: "Electronics" }
      const data = await API.getAllProducts({ category: "Electronics" });
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (e, product) => {
    e.preventDefault();
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

  if (loading) {
    return (
      <div className="category-list-page">
        <div style={{ textAlign: "center", padding: "50px" }}>
          Loading products...
        </div>
      </div>
    );
  }

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
            <h2 className="products-title">
              Electronics ({products.length} Products)
            </h2>
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
                    {product.original_price && (
                      <span className="original-price">
                        ${product.original_price.toFixed(2)}
                      </span>
                    )}
                  </div>
                  <button
                    className="add-to-cart-btn"
                    onClick={(e) => handleAddToCart(e, product)}
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

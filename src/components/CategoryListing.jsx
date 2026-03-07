import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext.js";
import {
  Search,
  Filter,
  ChevronRight,
  ChevronLeft,
  Star,
  Eye,
  Heart,
  ShoppingCart,
  LayoutGrid,
  List,
  SlidersHorizontal,
  X
} from "lucide-react";
import API from "./services/api";
import "./CategoryListing.css";

const ProductSkeleton = () => (
  <div className="product-skeleton">
    <div className="skeleton-image"></div>
    <div className="skeleton-info">
      <div className="skeleton-line title"></div>
      <div className="skeleton-line rating"></div>
      <div className="skeleton-line price"></div>
      <div className="skeleton-line button"></div>
    </div>
  </div>
);

export default function CategoryListing() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(true);
  const [sortBy, setSortBy] = useState("featured");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Filter State
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [tempPriceMax, setTempPriceMax] = useState(1000);

  const productsPerPage = 9;

  useEffect(() => {
    const init = async () => {
      try {
        const [allProducts, allCategories] = await Promise.all([
          API.getAllProducts(),
          API.getCategories()
        ]);
        setProducts(allProducts);
        setCategories(allCategories);
      } catch (error) {
        console.error("Initialization error:", error);
      } finally {
        setLoading(false);
        setPageLoading(false);
      }
    };
    init();
  }, []);

  const categoryOptions = useMemo(() => {
    return categories
      .map((category) => {
        if (typeof category === "string") {
          return { key: category, name: category };
        }

        const name = category?.name;
        const key = category?.id ?? name;
        return name ? { key, name } : null;
      })
      .filter(Boolean);
  }, [categories]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category Filter
    if (selectedCategories.length > 0) {
      result = result.filter(p => selectedCategories.includes(p.category));
    }

    // Price Filter
    result = result.filter(p => p.price >= priceRange.min && p.price <= priceRange.max);

    // Sorting
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case "newest":
        result.sort((a, b) => b.id - a.id);
        break;
      default:
        break;
    }

    return result;
  }, [products, selectedCategories, priceRange, sortBy]);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const handleCategoryToggle = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
    setCurrentPage(1);
  };

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    // Toast notification could go here
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange({ min: 0, max: 1000 });
    setTempPriceMax(1000);
    setSortBy("featured");
    setCurrentPage(1);
  };

  if (pageLoading) {
    return (
      <div className="category-list-page">
        <div className="page-container">
          <aside className="filters-sidebar">
            <div className="skeleton-filters"></div>
          </aside>
          <main className="products-main">
            <div className="products-grid">
              {[...Array(6)].map((_, i) => <ProductSkeleton key={i} />)}
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="category-list-page">
      <div className="page-container">
        {/* Mobile Filter Toggle */}
        <button
          className="mobile-filter-toggle"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
          <SlidersHorizontal size={20} />
          Filters
        </button>

        {/* Sidebar Filters */}
        <aside className={`filters-sidebar ${isFilterOpen ? 'active' : ''}`}>
          <div className="sidebar-header">
            <h3 className="filters-title">Filters</h3>
            <button className="close-filters" onClick={() => setIsFilterOpen(false)}>
              <X size={20} />
            </button>
          </div>

          {/* Category Filter */}
          <div className="filter-section">
            <h4 className="filter-heading">Categories</h4>
            <div className="filter-options">
              {categoryOptions.map((category) => (
                <label key={category.key} className="filter-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category.name)}
                    onChange={() => handleCategoryToggle(category.name)}
                  />
                  <span className="checkbox-custom"></span>
                  <span>{category.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="filter-section">
            <h4 className="filter-heading">Price Range</h4>
            <div className="price-display">
              <span>$0</span>
              <span>${tempPriceMax}</span>
            </div>
            <input
              type="range"
              min="0"
              max="1000"
              value={tempPriceMax}
              onChange={(e) => setTempPriceMax(parseInt(e.target.value))}
              onMouseUp={() => setPriceRange(prev => ({ ...prev, max: tempPriceMax }))}
              onTouchEnd={() => setPriceRange(prev => ({ ...prev, max: tempPriceMax }))}
              className="price-slider-premium"
            />
            <div className="price-inputs">
              <div className="price-box">
                <span>Min</span>
                <input type="number" value={priceRange.min} readOnly />
              </div>
              <div className="price-box">
                <span>Max</span>
                <input type="number" value={priceRange.max} readOnly />
              </div>
            </div>
          </div>

          {(selectedCategories.length > 0 || priceRange.max < 1000) && (
            <button className="clear-filters-btn" onClick={clearFilters}>
              Reset Filters
            </button>
          )}
        </aside>

        {/* Main Content */}
        <main className="products-main">
          {/* Header Controls */}
          <div className="products-header">
            <div className="header-left">
              <h2 className="products-title">
                {selectedCategories.length === 1 ? selectedCategories[0] : "All Products"}
                <span className="results-count">({filteredProducts.length} items)</span>
              </h2>
            </div>

            <div className="header-right">
              <div className="view-switcher">
                <button
                  className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => setViewMode('grid')}
                >
                  <LayoutGrid size={18} />
                </button>
                <button
                  className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                  onClick={() => setViewMode('list')}
                >
                  <List size={18} />
                </button>
              </div>

              <div className="sort-wrapper">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="sort-select-premium"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest</option>
                </select>
              </div>
            </div>
          </div>

          {/* Products Content */}
          {loading ? (
            <div className="products-grid">
              {[...Array(6)].map((_, i) => <ProductSkeleton key={i} />)}
            </div>
          ) : paginatedProducts.length > 0 ? (
            <div className={`products-${viewMode}`}>
              {paginatedProducts.map((product) => (
                <Link
                  to={`/product/${product.id}`}
                  key={product.id}
                  className="product-card-premium"
                >
                  <div className="card-image-container">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="card-image"
                    />
                    <div className="card-overlays">
                      <button className="overlay-btn" title="Add to Wishlist">
                        <Heart size={18} />
                      </button>
                      <button className="overlay-btn" title="Quick View">
                        <Eye size={18} />
                      </button>
                    </div>
                    {product.original_price && (
                      <span className="sale-badge">SALE</span>
                    )}
                  </div>

                  <div className="card-content">
                    <div className="card-category">{product.category}</div>
                    <h3 className="card-title">{product.name}</h3>

                    <div className="card-rating">
                      <div className="stars-row">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            fill={i < Math.floor(product.rating || 0) ? "#ffc107" : "none"}
                            color={i < Math.floor(product.rating || 0) ? "#ffc107" : "#ddd"}
                          />
                        ))}
                      </div>
                      <span className="reviews">({product.reviews || 0})</span>
                    </div>

                    <div className="card-footer">
                      <div className="price-container">
                        <span className="current-price">${product.price.toFixed(2)}</span>
                        {product.original_price && (
                          <span className="old-price">${product.original_price.toFixed(2)}</span>
                        )}
                      </div>
                      <button
                        className="add-cart-icon-btn"
                        onClick={(e) => handleAddToCart(e, product)}
                      >
                        <ShoppingCart size={18} />
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="no-results">
              <div className="no-results-icon">
                <Filter size={48} />
              </div>
              <h3>No products found</h3>
              <p>Try adjusting your search or filters to find what you're looking for.</p>
              <button className="clear-filters-btn" onClick={clearFilters}>
                Clear All Filters
              </button>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination-premium">
              <button
                className="pag-btn"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft size={20} />
              </button>

              <div className="page-numbers">
                {[...Array(totalPages)].map((_, index) => {
                  const page = index + 1;
                  return (
                    <button
                      key={page}
                      className={`page-num ${currentPage === page ? "active" : ""}`}
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </button>
                  );
                })}
              </div>

              <button
                className="pag-btn"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

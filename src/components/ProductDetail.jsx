import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./ProductDetail.css";

export default function ProductDetail() {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("Black");
  const [selectedSize, setSelectedSize] = useState("One Size");
  const [mainImage, setMainImage] = useState(0);

  // Product images
  const productImages = [
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=600&h=600&fit=crop",
  ];

  // Related products
  const relatedProducts = [
    {
      id: 1,
      name: "Aura ANC Earbuds",
      price: 149.99,
      image:
        "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop",
    },
    {
      id: 2,
      name: "Harmony Pro Speaker",
      price: 199.99,
      image:
        "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop",
    },
    {
      id: 3,
      name: "Zenith Sport Earbuds",
      price: 89.99,
      image:
        "https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=400&h=400&fit=crop",
    },
    {
      id: 4,
      name: "Echo Mini Soundbar",
      price: 249.99,
      image:
        "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=400&h=400&fit=crop",
    },
  ];

  const handleQuantityChange = (action) => {
    if (action === "increase") {
      setQuantity(quantity + 1);
    } else if (action === "decrease" && quantity > 1) {
      setQuantity(quantity - 1);
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
    <div className="product-detail-page">
      {/* Product Detail Section */}
      <div className="product-detail-container">
        <div className="product-detail-content">
          {/* Product Images */}
          <div className="product-images">
            <div className="main-image">
              <img src={productImages[mainImage]} alt="Product" />
            </div>
            <div className="thumbnail-images">
              {productImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className={mainImage === index ? "active" : ""}
                  onClick={() => setMainImage(index)}
                />
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="product-info-section">
            <h1 className="product-title">
              Voyager Xtreme Wireless Headphones
            </h1>

            {/* Rating */}
            <div className="product-rating">
              <div className="stars">{renderStars(4)}</div>
              <span className="rating-text">4.8 (128 reviews)</span>
            </div>

            {/* Price */}
            <div className="product-price">$299.99</div>

            {/* Description */}
            <p className="product-description">
              Experience unparalleled sound quality and comfort with the Voyager
              Xtreme Wireless Headphones. Featuring advanced noise-cancellation,
              long-lasting battery life, and ergonomic design for extended
              listening sessions. Perfect for audiophiles and travelers alike.
            </p>

            {/* Color Selection */}
            <div className="product-option">
              <h4>
                Color: <span>{selectedColor}</span>
              </h4>
              <div className="color-options">
                <button
                  className={
                    selectedColor === "Black" ? "color-btn active" : "color-btn"
                  }
                  onClick={() => setSelectedColor("Black")}
                >
                  Black
                </button>
                <button
                  className={
                    selectedColor === "Space Gray"
                      ? "color-btn active"
                      : "color-btn"
                  }
                  onClick={() => setSelectedColor("Space Gray")}
                >
                  Space Gray
                </button>
                <button
                  className={
                    selectedColor === "Navy Blue"
                      ? "color-btn active"
                      : "color-btn"
                  }
                  onClick={() => setSelectedColor("Navy Blue")}
                >
                  Navy Blue
                </button>
              </div>
            </div>

            {/* Size Selection */}
            <div className="product-option">
              <h4>
                Size: <span>{selectedSize}</span>
              </h4>
              <div className="size-options">
                <button
                  className={
                    selectedSize === "One Size" ? "size-btn active" : "size-btn"
                  }
                  onClick={() => setSelectedSize("One Size")}
                >
                  One Size
                </button>
              </div>
            </div>

            {/* Quantity */}
            <div className="product-option">
              <h4>Quantity:</h4>
              <div className="quantity-selector">
                <button onClick={() => handleQuantityChange("decrease")}>
                  −
                </button>
                <input type="number" value={quantity} readOnly />
                <button onClick={() => handleQuantityChange("increase")}>
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart & Wishlist */}
            <div className="product-actions">
              <button className="add-to-cart-btn">Add to Cart</button>
              <button className="wishlist-btn" aria-label="Add to Wishlist">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  width="24"
                  height="24"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="related-products-section">
        <div className="related-products-container">
          <h2 className="section-title">Related Products</h2>
          <div className="related-products-grid">
            {relatedProducts.map((product) => (
              <div key={product.id} className="related-product-card">
                <div className="related-product-image">
                  <img src={product.image} alt={product.name} />
                </div>
                <div className="related-product-info">
                  <h3>{product.name}</h3>
                  <p className="related-product-price">
                    ${product.price.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import API from "./services/api";
import "./ProductDetail.css";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [mainImage, setMainImage] = useState(0);

  // Product images (you can make this dynamic later)
  const productImages = [
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=600&h=600&fit=crop",
  ];

  useEffect(() => {
    fetchProductData();
  }, [id]);

  const fetchProductData = async () => {
    try {
      setLoading(true);
      const [productData, relatedData] = await Promise.all([
        API.getProductById(id),
        API.getAllProducts({ limit: 4 }),
      ]);

      setProduct(productData);
      setSelectedColor(productData.color);
      setSelectedSize(productData.size);
      setRelatedProducts(relatedData.filter((p) => p.id !== parseInt(id)));
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = (action) => {
    if (action === "increase") {
      setQuantity(quantity + 1);
    } else if (action === "decrease" && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;
    
    addToCart(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image: productImages[0],
      },
      quantity,
      {
        color: selectedColor,
        size: selectedSize,
      }
    );
    
    // Show success message and option to go to cart
    const goToCart = window.confirm(
      `Added ${quantity} ${product.name} to cart!\n\nGo to cart now?`
    );
    if (goToCart) {
      navigate("/cart");
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
      <div className="product-detail-page">
        <div style={{ textAlign: "center", padding: "50px" }}>
          Loading product...
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-detail-page">
        <div style={{ textAlign: "center", padding: "50px" }}>
          Product not found
        </div>
      </div>
    );
  }

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
            <h1 className="product-title">{product.name}</h1>

            {/* Rating */}
            <div className="product-rating">
              <div className="stars">{renderStars(product.rating)}</div>
              <span className="rating-text">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="product-price">${product.price.toFixed(2)}</div>

            {/* Description */}
            <p className="product-description">
              {product.description ||
                "Premium quality product with excellent features."}
            </p>

            {/* Color Selection */}
            <div className="product-option">
              <h4>
                Color: <span>{selectedColor}</span>
              </h4>
              <div className="color-options">
                <button
                  className={
                    selectedColor === product.color
                      ? "color-btn active"
                      : "color-btn"
                  }
                  onClick={() => setSelectedColor(product.color)}
                >
                  {product.color}
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
                    selectedSize === product.size
                      ? "size-btn active"
                      : "size-btn"
                  }
                  onClick={() => setSelectedSize(product.size)}
                >
                  {product.size}
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
              <button className="add-to-cart-btn" onClick={handleAddToCart}>
                Add to Cart
              </button>
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
            {relatedProducts.slice(0, 4).map((relatedProduct) => (
              <Link
                to={`/product/${relatedProduct.id}`}
                key={relatedProduct.id}
                className="related-product-card"
              >
                <div className="related-product-image">
                  <img src={relatedProduct.image} alt={relatedProduct.name} />
                </div>
                <div className="related-product-info">
                  <h3>{relatedProduct.name}</h3>
                  <p className="related-product-price">
                    ${relatedProduct.price.toFixed(2)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

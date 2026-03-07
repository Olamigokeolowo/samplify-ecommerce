// API service for Samplify E-commerce

  const API_BASE_URL = "http://127.0.0.1:8000";

/**
 * @typedef {Object} ApiErrorShape
 * @property {string} message
 * @property {number} [statusCode]
 * @property {unknown} [details]
 */

/**
 * @typedef {Object} PaymentInitializeRequest
 * @property {string} email
 * @property {string} user_id
 * @property {string} currency
 * @property {string} callback_url
 */

/**
 * @typedef {Object} PaymentInitializeResponse
 * @property {number} order_id
 * @property {string} reference
 * @property {string} currency
 * @property {number} amount_minor
 * @property {string} authorization_url
 * @property {string} access_code
 * @property {string} status
 */

/**
 * @typedef {Object} PaymentVerifyResponse
 * @property {string} reference
 * @property {number} order_id
 * @property {string} payment_status
 * @property {string} order_status
 * @property {string} currency
 * @property {number} amount_minor
 * @property {string} [paid_at]
 */

/**
 * @template T
 * @param {string} path
 * @param {RequestInit} [options]
 * @returns {Promise<T>}
 */
async function request(path, options = {}) {
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  let response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers,
    });
  } catch {
    /** @type {ApiErrorShape} */
    const error = { message: "Network error. Please check your connection." };
    throw error;
  }

  let data = null;
  const contentType = response.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    try {
      data = await response.json();
    } catch {
      /** @type {ApiErrorShape} */
      const error = {
        message: "Invalid server response format.",
        statusCode: response.status,
      };
      throw error;
    }
  }

  if (!response.ok) {
    /** @type {ApiErrorShape} */
    const error = {
      message:
        (data && (data.detail || data.message || data.error)) ||
        "Request failed.",
      statusCode: response.status,
      details: data,
    };
    throw error;
  }

  return /** @type {T} */ (data);
}

// ============================================
// MOCK DATA FALLBACK
// ============================================

const MOCK_CATEGORIES = [
  {
    id: 1,
    name: "Electronics",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500&q=80",
    link: "/shop?category=Electronics",
  },
  {
    id: 2,
    name: "Apparel",
    image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=500&q=80",
    link: "/shop?category=Apparel",
  },
  {
    id: 3,
    name: "Home & Kitchen",
    image: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=500&q=80",
    link: "/shop?category=Home%20&%20Kitchen",
  },
  {
    id: 4,
    name: "Books",
    image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=500&q=80",
    link: "/shop?category=Books",
  },
  {
    id: 5,
    name: "Sports",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500&q=80",
    link: "/shop?category=Sports",
  },
  {
    id: 6,
    name: "Beauty",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500&q=80",
    link: "/shop?category=Beauty",
  },
  {
    id: 7,
    name: "Automotive",
    image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=500&q=80",
    link: "/shop?category=Automotive",
  },
];

const MOCK_PRODUCTS = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 299.99,
    original_price: 349.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
    rating: 4.8,
    reviews: 128,
    featured: true,
    bestseller: true
  },
  {
    id: 2,
    name: "Minimalist Leather Watch",
    price: 159.00,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
    rating: 4.5,
    reviews: 85,
    featured: true
  },
  {
    id: 3,
    name: "Eco-Friendly Yoga Mat",
    price: 45.00,
    category: "Sports",
    image: "https://images.unsplash.com/photo-1592419044706-39796d40f98c?w=500&q=80",
    rating: 4.9,
    reviews: 210,
    bestseller: true
  },
  {
    id: 4,
    name: "Ceramic Coffee Set",
    price: 85.00,
    original_price: 110.00,
    category: "Home & Kitchen",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500&q=80",
    rating: 4.7,
    reviews: 56
  },
  {
    id: 5,
    name: "Smart Fitness Tracker",
    price: 129.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500&q=80",
    rating: 4.4,
    reviews: 320,
    featured: true
  },
  {
    id: 6,
    name: "Luxe Silk Infinity Scarf",
    price: 35.00,
    category: "Apparel",
    image: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=500&q=80",
    rating: 4.6,
    reviews: 42
  },
  {
    id: 7,
    name: "Mountain Adventure Pack",
    price: 180.00,
    category: "Sports",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80",
    rating: 4.8,
    reviews: 89,
    bestseller: true
  },
  {
    id: 8,
    name: "Organic Glow Facial Serum",
    price: 55.00,
    category: "Beauty",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&q=80",
    rating: 4.9,
    reviews: 154,
    featured: true
  }
];

class API {
  // ============================================
  // CATEGORIES
  // ============================================

  static async getCategories() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/categories`);
      if (!response.ok) throw new Error("Failed to fetch categories");
      return await response.json();
    } catch {
      console.warn("Backend unavailable, using mock categories.");
      return MOCK_CATEGORIES;
    }
  }

  // ============================================
  // PRODUCTS
  // ============================================

  static async getAllProducts(filters = {}) {
    try {
      const params = new URLSearchParams();
      if (filters.category) params.append("category", filters.category);
      if (filters.featured !== undefined)
        params.append("featured", filters.featured);
      if (filters.bestseller !== undefined)
        params.append("bestseller", filters.bestseller);
      if (filters.limit) params.append("limit", filters.limit);

      const url = `${API_BASE_URL}/api/products${params.toString() ? `?${params.toString()}` : ""}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch products");
      return await response.json();
    } catch {
      console.warn("Backend unavailable, using mock products.");
      let result = [...MOCK_PRODUCTS];
      if (filters.category) {
        result = result.filter(p => p.category === filters.category);
      }
      if (filters.featured) {
        result = result.filter(p => p.featured);
      }
      if (filters.bestseller) {
        result = result.filter(p => p.bestseller);
      }
      if (filters.limit) {
        result = result.slice(0, filters.limit);
      }
      return result;
    }
  }

  static async getProductById(productId) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/products/${productId}`);
      if (!response.ok) throw new Error("Product not found");
      return await response.json();
    } catch {
      console.warn("Backend unavailable, searching mock products.");
      const product = MOCK_PRODUCTS.find(p => p.id === parseInt(productId));
      if (product) return product;
      throw new Error("Product not found in mock data");
    }
  }

  static async getNewArrivals() {
    return this.getAllProducts({ featured: true });
  }

  static async getBestsellers() {
    return this.getAllProducts({ bestseller: true });
  }

  // ============================================
  // CART (Local Fallback)
  // ============================================

  static async getCart(userId = "default_user") {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/cart?user_id=${userId}`,
      );
      if (!response.ok) throw new Error("Failed to fetch cart");
      return await response.json();
    } catch {
      console.warn("Backend unavailable, returning empty local cart.");
      return [];
    }
  }

  static async addToCart(productId, quantity = 1, userId = "default_user", variants = {}) {
    try {
      const { color, size } = variants;
      const response = await fetch(
        `${API_BASE_URL}/api/cart/add?user_id=${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            product_id: productId,
            quantity: quantity,
            color: color || "Default",
            size: size || "M",
          }),
        },
      );
      if (!response.ok) throw new Error("Failed to add to cart");
      return await response.json();
    } catch (error) {
      console.error("API addToCart error:", error);
      return { success: false, message: "Failed to add to cart" };
    }
  }

  static async updateCartQuantity(itemId, action, userId = "default_user") {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/cart/${itemId}/quantity?user_id=${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ action }),
        },
      );
      if (!response.ok) throw new Error("Failed to update quantity");
      return await response.json();
    } catch {
      return { success: true };
    }
  }

  static async removeFromCart(itemId, userId = "default_user") {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/cart/${itemId}?user_id=${userId}`,
        {
          method: "DELETE",
        },
      );
      if (!response.ok) throw new Error("Failed to remove item");
      return await response.json();
    } catch {
      return { success: true };
    }
  }

  static async clearCart(userId = "default_user") {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/cart?user_id=${userId}`,
        {
          method: "DELETE",
        },
      );
      if (!response.ok) throw new Error("Failed to clear cart");
      return await response.json();
    } catch {
      return { success: true };
    }
  }

  static async getCartSummary(userId = "default_user") {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/cart/summary?user_id=${userId}`,
      );
      if (!response.ok) throw new Error("Failed to fetch cart summary");
      return await response.json();
    } catch {
      return { subtotal: 0, tax: 0, total: 0 };
    }
  }

  // ============================================
  // PAYMENTS
  // ============================================

  /**
   * @param {PaymentInitializeRequest} payload
   * @returns {Promise<PaymentInitializeResponse>}
   */
  static async initializePayment(payload) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/payments/initialize`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
      );
      if (!response.ok) throw new Error("Failed to initialize payment");
      return await response.json();
    } catch {
      return { subtotal: 0, tax: 0, total: 0 };
    };
  }

  /**
   * @param {string} reference
   * @returns {Promise<PaymentVerifyResponse>}
   */
  static async verifyPayment(reference) {
    return request(`/api/payments/verify/${encodeURIComponent(reference)}`, {
      method: "GET",
    });
  }
}

export default API;

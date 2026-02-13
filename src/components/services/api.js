// API service for Samplify E-commerce

const API_BASE_URL = "http://localhost:8000";

class API {
  // ============================================
  // CATEGORIES
  // ============================================

  static async getCategories() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/categories`);
      if (!response.ok) throw new Error("Failed to fetch categories");
      return await response.json();
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
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
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  }

  static async getProductById(productId) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/products/${productId}`);
      if (!response.ok) throw new Error("Product not found");
      return await response.json();
    } catch (error) {
      console.error("Error fetching product:", error);
      throw error;
    }
  }

  static async getNewArrivals() {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/products?featured=true`,
      );
      if (!response.ok) throw new Error("Failed to fetch new arrivals");
      return await response.json();
    } catch (error) {
      console.error("Error fetching new arrivals:", error);
      throw error;
    }
  }

  static async getBestsellers() {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/products?bestseller=true`,
      );
      if (!response.ok) throw new Error("Failed to fetch bestsellers");
      return await response.json();
    } catch (error) {
      console.error("Error fetching bestsellers:", error);
      throw error;
    }
  }

  // ============================================
  // CART
  // ============================================

  static async getCart(userId = "default_user") {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/cart?user_id=${userId}`,
      );
      if (!response.ok) throw new Error("Failed to fetch cart");
      return await response.json();
    } catch (error) {
      console.error("Error fetching cart:", error);
      throw error;
    }
  }

  static async addToCart(productId, quantity = 1, userId = "default_user") {
    try {
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
          }),
        },
      );
      if (!response.ok) throw new Error("Failed to add to cart");
      return await response.json();
    } catch (error) {
      console.error("Error adding to cart:", error);
      throw error;
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
    } catch (error) {
      console.error("Error updating quantity:", error);
      throw error;
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
    } catch (error) {
      console.error("Error removing item:", error);
      throw error;
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
    } catch (error) {
      console.error("Error clearing cart:", error);
      throw error;
    }
  }

  static async getCartSummary(userId = "default_user") {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/cart/summary?user_id=${userId}`,
      );
      if (!response.ok) throw new Error("Failed to fetch cart summary");
      return await response.json();
    } catch (error) {
      console.error("Error fetching cart summary:", error);
      throw error;
    }
  }
}

export default API;

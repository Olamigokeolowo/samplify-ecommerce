import React, { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();
const AUTH_API_BASE_URL = import.meta.env.DEV
  ? ""
  : (import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000");

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Failed to load user from localStorage:", error);
        localStorage.removeItem("user");
      }
    }
    setLoading(false);
  }, []);

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  // Email validation helper
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const parseErrorMessage = (data, fallback) => {
    return (
      data?.detail ||
      data?.message ||
      data?.error ||
      fallback ||
      "Request failed"
    );
  };

  const buildUserFromResponse = (rawData, fallbackEmail = "") => {
    const payload = rawData?.user || rawData?.data || rawData || {};
    const email = payload.email || fallbackEmail;
    const name =
      payload.name ||
      payload.full_name ||
      payload.username ||
      (email ? email.split("@")[0] : "User");

    return {
      id: String(payload.id || payload.user_id || Date.now()),
      name,
      email,
      createdAt: payload.created_at || new Date().toISOString(),
      token: rawData?.access_token || rawData?.token || payload?.token,
    };
  };

  const authRequest = async (path, body, fallbackError) => {
    let response;
    try {
      response = await fetch(`${AUTH_API_BASE_URL}${path}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
    } catch {
      throw new Error("Network error. Please try again.");
    }

    let data = null;
    const contentType = response.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      data = await response.json();
    }

    if (!response.ok) {
      throw new Error(parseErrorMessage(data, fallbackError));
    }

    return data;
  };

  // Signup function
  const signup = async (name, email, password) => {
    // Validation
    if (!name || !email || !password) {
      throw new Error("All fields are required");
    }

    if (!isValidEmail(email)) {
      throw new Error("Please enter a valid email address");
    }

    if (password.length < 6) {
      throw new Error("Password must be at least 6 characters long");
    }

    const data = await authRequest(
      "/signup",
      { name, email, password },
      "Signup failed",
    );

    const signedUpUser = buildUserFromResponse(data, email);
    setUser(signedUpUser);
    return signedUpUser;
  };

  // Login function
  const login = async (email, password) => {
    // Validation
    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    if (!isValidEmail(email)) {
      throw new Error("Please enter a valid email address");
    }

    const data = await authRequest(
      "/login",
      { email, password },
      "Invalid email or password",
    );

    const loggedInUser = buildUserFromResponse(data, email);
    setUser(loggedInUser);
    return loggedInUser;
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    // Optionally clear cart on logout
    // localStorage.removeItem("cart");
  };

  // Check if user is authenticated
  const isAuthenticated = () => {
    return user !== null;
  };

  // Update user profile
  const updateProfile = (updates) => {
    if (!user) {
      throw new Error("No user logged in");
    }

    const updatedUser = {
      ...user,
      ...updates,
    };

    setUser(updatedUser);

  };

  const value = {
    user,
    loading,
    signup,
    login,
    logout,
    isAuthenticated,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

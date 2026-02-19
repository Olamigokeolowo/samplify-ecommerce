import React, { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

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

    // Check if user already exists (in localStorage)
    const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
    if (existingUsers.find((u) => u.email === email)) {
      throw new Error("An account with this email already exists");
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      createdAt: new Date().toISOString(),
    };

    // Save to users list (for login validation)
    existingUsers.push({
      ...newUser,
      password, // In production, this would be hashed on the backend
    });
    localStorage.setItem("users", JSON.stringify(existingUsers));

    // Set current user (without password)
    setUser(newUser);

    return newUser;
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

    // Check credentials
    const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
    const foundUser = existingUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (!foundUser) {
      throw new Error("Invalid email or password");
    }

    // Set current user (without password)
    const { password: _, ...userWithoutPassword } = foundUser;
    setUser(userWithoutPassword);

    return userWithoutPassword;
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

    // Update in users list
    const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
    const userIndex = existingUsers.findIndex((u) => u.id === user.id);
    if (userIndex > -1) {
      existingUsers[userIndex] = { ...existingUsers[userIndex], ...updates };
      localStorage.setItem("users", JSON.stringify(existingUsers));
    }
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

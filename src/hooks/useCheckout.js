import { useEffect, useMemo, useState } from "react";
import API from "../components/services/api";
import { useAuth } from "../contexts/AuthContext";

const CURRENCY_STORAGE_KEY = "checkout_currency";
const CURRENCIES = ["USD", "NGN"];

/**
 * @typedef {Object} UseCheckoutReturn
 * @property {string} email
 * @property {(value: string) => void} setEmail
 * @property {string} currency
 * @property {(value: string) => void} setCurrency
 * @property {boolean} loading
 * @property {string} error
 * @property {string[]} supportedCurrencies
 * @property {() => Promise<import("../components/services/api").PaymentInitializeResponse>} startPayment
 */

/**
 * @returns {UseCheckoutReturn}
 */
export default function useCheckout() {
  const { user } = useAuth();
  const [email, setEmail] = useState(user?.email || "");
  const [currency, setCurrency] = useState(
    localStorage.getItem(CURRENCY_STORAGE_KEY) || "USD",
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!email && user?.email) {
      setEmail(user.email);
    }
  }, [user, email]);

  useEffect(() => {
    if (CURRENCIES.includes(currency)) {
      localStorage.setItem(CURRENCY_STORAGE_KEY, currency);
    }
  }, [currency]);

  const supportedCurrencies = useMemo(() => CURRENCIES, []);

  const startPayment = async () => {
    const sanitizedEmail = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(sanitizedEmail)) {
      setError("Please enter a valid email address.");
      throw new Error("Invalid email");
    }

    if (!CURRENCIES.includes(currency)) {
      setError("Please select a valid currency.");
      throw new Error("Invalid currency");
    }

    setLoading(true);
    setError("");

    try {
      const payload = {
        email: sanitizedEmail,
        user_id: "default_user",
        currency,
        callback_url: `${window.location.origin}/payment/callback`,
      };

      return await API.initializePayment(payload);
    } catch (apiError) {
      setError(apiError?.message || "Failed to initialize payment.");
      throw apiError;
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    setEmail,
    currency,
    setCurrency,
    loading,
    error,
    supportedCurrencies,
    startPayment,
  };
}

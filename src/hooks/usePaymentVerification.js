import { useCallback, useState } from "react";
import API from "../components/services/api";

/**
 * @typedef {"idle" | "loading" | "success" | "pending" | "failed" | "error"} VerificationStatus
 */

/**
 * @typedef {Object} UsePaymentVerificationReturn
 * @property {VerificationStatus} status
 * @property {boolean} loading
 * @property {string} error
 * @property {any} data
 * @property {(reference: string) => Promise<any>} verify
 */

/**
 * @returns {UsePaymentVerificationReturn}
 */
export default function usePaymentVerification() {
  const [status, setStatus] = useState("idle");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState(null);

  const verify = useCallback(async (reference) => {
    if (!reference) {
      setStatus("error");
      setError("Missing payment reference.");
      throw new Error("Missing payment reference");
    }

    setLoading(true);
    setError("");
    setStatus("loading");

    try {
      const response = await API.verifyPayment(reference);
      setData(response);

      const payment = (response.payment_status || "").toLowerCase();
      const order = (response.order_status || "").toLowerCase();

      if (payment === "paid" && order === "paid") {
        setStatus("success");
      } else if (
        payment === "pending" ||
        payment === "processing" ||
        order === "pending" ||
        order === "processing"
      ) {
        setStatus("pending");
      } else {
        setStatus("failed");
      }

      return response;
    } catch (apiError) {
      setStatus("error");
      setError(apiError?.message || "Failed to verify payment.");
      throw apiError;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    status,
    loading,
    error,
    data,
    verify,
  };
}

import React, { useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import usePaymentVerification from "../hooks/usePaymentVerification";
import "./PaymentCallback.css";

export default function PaymentCallback() {
  const [searchParams] = useSearchParams();
  const reference = searchParams.get("reference") || searchParams.get("trxref");
  const { clearCart } = useCart();
  const { status, loading, error, data, verify } = usePaymentVerification();
  const autoVerifiedRef = useRef(false);
  const cartClearedRef = useRef(false);

  const clearCartIfPaid = (response) => {
    const payment = (response?.payment_status || "").toLowerCase();
    const order = (response?.order_status || "").toLowerCase();
    if (payment === "paid" && order === "paid" && !cartClearedRef.current) {
      clearCart();
      cartClearedRef.current = true;
    }
  };

  useEffect(() => {
    autoVerifiedRef.current = false;
    cartClearedRef.current = false;
  }, [reference]);

  useEffect(() => {
    if (!reference || autoVerifiedRef.current) return;
    autoVerifiedRef.current = true;

    const runVerify = async () => {
      try {
        const response = await verify(reference);
        clearCartIfPaid(response);
      } catch {
        // Error state already handled by hook.
      }
    };

    runVerify();
  }, [reference, verify, clearCart]);

  const handleRetry = async () => {
    if (!reference) return;
    try {
      const response = await verify(reference);
      clearCartIfPaid(response);
    } catch {
      // Error state already handled by hook.
    }
  };

  if (!reference) {
    return (
      <div className="payment-callback-page">
        <div className="payment-card error">
          <h1>Invalid Callback</h1>
          <p>Missing payment reference. Please try checkout again.</p>
          <Link to="/checkout" className="action-btn">
            Go to Checkout
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-callback-page">
      <div className={`payment-card ${status}`}>
        {loading && <h1>Verifying Payment...</h1>}

        {!loading && status === "success" && (
          <>
            <h1>Payment Successful</h1>
            <p>Your order has been paid successfully.</p>
            <div className="payment-meta">
              <p>
                <strong>Reference:</strong> {data?.reference}
              </p>
              <p>
                <strong>Order ID:</strong> {data?.order_id}
              </p>
              <p>
                <strong>Amount:</strong> {data?.amount_minor} {data?.currency}
              </p>
            </div>
            <Link to="/" className="action-btn">
              Back to Shop
            </Link>
          </>
        )}

        {!loading && status === "pending" && (
          <>
            <h1>Payment Pending</h1>
            <p>Your payment is still processing. You can retry verification.</p>
            <div className="button-row">
              <button onClick={handleRetry} className="action-btn secondary">
                Retry Verification
              </button>
              <Link to="/checkout" className="action-btn">
                Try Checkout Again
              </Link>
            </div>
          </>
        )}

        {!loading && status === "failed" && (
          <>
            <h1>Payment Failed</h1>
            <p>Payment was not completed. Please try again.</p>
            <div className="button-row">
              <button onClick={handleRetry} className="action-btn secondary">
                Retry Verification
              </button>
              <Link to="/checkout" className="action-btn">
                Try Checkout Again
              </Link>
            </div>
          </>
        )}

        {!loading && status === "error" && (
          <>
            <h1>Verification Error</h1>
            <p>{error || "We could not verify your payment."}</p>
            <div className="button-row">
              <button onClick={handleRetry} className="action-btn secondary">
                Retry Verification
              </button>
              <Link to="/checkout" className="action-btn">
                Go to Checkout
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

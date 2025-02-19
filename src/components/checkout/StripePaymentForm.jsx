// src/components/checkout/StripePaymentForm.jsx
import React, { useState, useEffect } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { AlertCircle } from "lucide-react";

const StripePaymentForm = ({ onSuccess, onError, amount }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't loaded yet
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment-confirmation`,
        },
        redirect: "if_required",
      });

      if (error) {
        setErrorMessage(error.message);
        onError(error.message);
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        onSuccess(paymentIntent);
      } else {
        setErrorMessage("An unexpected error occurred.");
        onError("An unexpected error occurred with the payment.");
      }
    } catch (err) {
      setErrorMessage(err.message || "An unexpected error occurred");
      onError(err.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-stone-50 rounded-md p-4 mb-4">
        <PaymentElement />
      </div>

      {errorMessage && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md flex items-start gap-3">
          <AlertCircle className="flex-shrink-0 h-5 w-5 text-red-500 mt-0.5" />
          <p>{errorMessage}</p>
        </div>
      )}

      <button
        disabled={!stripe || isLoading}
        className={`w-full py-3 px-4 rounded-md flex justify-center items-center ${
          isLoading || !stripe
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-[#C5B073] hover:bg-[#4A3F35] text-white"
        } transition-colors`}
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Processing...
          </>
        ) : (
          `Pay €${amount.toFixed(2)}`
        )}
      </button>
    </form>
  );
};

export default StripePaymentForm;

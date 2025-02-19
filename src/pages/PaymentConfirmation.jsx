// src/pages/PaymentConfirmation.jsx
import React, { useEffect, useState } from "react";
import { Link, useSearchParams, Navigate } from "react-router-dom";
import { useStripe } from "@stripe/react-stripe-js";
import { CheckCircle, AlertCircle } from "lucide-react";
import { useShop } from "../context/ShopContext";

const PaymentConfirmation = () => {
  const [searchParams] = useSearchParams();
  const stripe = useStripe();
  const { clearCart } = useShop();

  const [status, setStatus] = useState("processing");
  const [paymentIntent, setPaymentIntent] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = searchParams.get("payment_intent_client_secret");

    if (!clientSecret) {
      setStatus("error");
      setErrorMessage("No payment information found.");
      return;
    }

    stripe
      .retrievePaymentIntent(clientSecret)
      .then(({ paymentIntent, error }) => {
        if (error) {
          setStatus("error");
          setErrorMessage(error.message);
        } else {
          setPaymentIntent(paymentIntent);

          switch (paymentIntent.status) {
            case "succeeded":
              setStatus("success");
              // Clear the cart on successful payment
              clearCart();
              break;
            case "processing":
              setStatus("processing");
              break;
            case "requires_payment_method":
              setStatus("error");
              setErrorMessage(
                "Your payment was not successful, please try again."
              );
              break;
            default:
              setStatus("error");
              setErrorMessage("Something went wrong with your payment.");
              break;
          }
        }
      });
  }, [stripe, searchParams, clearCart]);

  // Redirect if no payment_intent_client_secret
  if (!searchParams.get("payment_intent_client_secret") && stripe) {
    return <Navigate to="/checkout" />;
  }

  if (status === "processing") {
    return (
      <div className="max-w-4xl mx-auto mt-12 px-4 text-center">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="animate-spin w-16 h-16 border-4 border-[#C5B073] border-t-transparent rounded-full mx-auto mb-6"></div>
          <h1 className="text-3xl font-light text-[#4A3F35] mb-4">
            Processing Your Payment
          </h1>
          <p className="text-gray-600 mb-8">
            Please wait while we confirm your payment. This may take a moment.
          </p>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="max-w-4xl mx-auto mt-12 px-4 text-center">
        <div className="bg-white rounded-lg shadow-md p-8">
          <AlertCircle className="mx-auto text-red-500 w-16 h-16 mb-6" />
          <h1 className="text-3xl font-light text-[#4A3F35] mb-4">
            Payment Failed
          </h1>
          <p className="text-red-600 mb-8">{errorMessage}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/checkout"
              className="px-6 py-3 bg-[#4A3F35] text-white rounded-md hover:bg-[#3A2F25] transition-colors"
            >
              Try Again
            </Link>
            <Link
              to="/cart"
              className="px-6 py-3 bg-white text-[#4A3F35] border border-[#4A3F35] rounded-md hover:bg-stone-50 transition-colors"
            >
              Return to Cart
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-12 px-4 text-center">
      <div className="bg-white rounded-lg shadow-md p-8">
        <CheckCircle className="mx-auto text-[#C5B073] w-16 h-16 mb-6" />
        <h1 className="text-3xl font-light text-[#4A3F35] mb-4">
          Payment Successful!
        </h1>
        <p className="text-xl mb-6">Thank you for your purchase.</p>
        <div className="bg-stone-50 rounded-md p-6 mb-8 inline-block">
          <p className="text-gray-600 mb-2">Payment ID:</p>
          <p className="text-lg font-medium text-[#4A3F35]">
            {paymentIntent?.id.replace("pi_", "ORDER-")}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Amount: €{(paymentIntent?.amount / 100).toFixed(2)}
          </p>
        </div>
        <p className="mb-8 text-gray-600">
          A confirmation email has been sent to your email address. We'll notify
          you when your items have shipped.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="px-6 py-3 bg-[#C5B073] text-white rounded-md hover:bg-[#4A3F35] transition-colors"
          >
            Continue Shopping
          </Link>
          <Link
            to="/profile"
            className="px-6 py-3 bg-white text-[#4A3F35] border border-[#4A3F35] rounded-md hover:bg-stone-50 transition-colors"
          >
            View Your Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentConfirmation;

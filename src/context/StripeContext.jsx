// src/context/StripeContext.jsx
import React, { createContext, useContext } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

// Use a direct string for the publishable key
// Replace this with your actual publishable key from Stripe dashboard
const STRIPE_PUBLISHABLE_KEY =
  "pk_test_51QkQtSP6vn9NgMG8rAw5z2EXVZAzxUflpGKwM5qt62Y5xTNazXtvMudPOAEj58VN4UvVBuJdGZlCcDiXgRGVxFi700RDakDAS7";
const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

const StripeContext = createContext();

export const useStripe = () => useContext(StripeContext);

export const StripeProvider = ({ children }) => {
  const options = {
    // Pass appearance options here if needed
    appearance: {
      theme: "stripe",
      variables: {
        colorPrimary: "#C5B073",
        colorBackground: "#ffffff",
        colorText: "#4A3F35",
        colorDanger: "#ff5252",
        fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
        borderRadius: "4px",
      },
    },
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      {children}
    </Elements>
  );
};

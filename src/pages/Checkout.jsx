// src/pages/Checkout.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useShop } from "../context/ShopContext";

// Load Stripe safely - make sure this key is your TEST key, not live key
const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY ||
    "pk_test_51NVZ4nFrL7UO5nflYAo9ZeAWMJbQUSyFtqWZP6Uy4bqtcPFsAEZ8iAkXKCKUbZpZaRo5A1UqEZKvwOdjOvfHIJO400vkO8Vk8d"
);

// Stripe test card: 4242 4242 4242 4242, any future date, any 3 digits CVC, any postal code

const CheckoutForm = ({ cartAmount }) => {
  const { cart, clearCart } = useShop();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);
  const [email, setEmail] = useState("");
  const [shippingDetails, setShippingDetails] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  // Get client secret directly from Stripe (bypassing your backend)
  useEffect(() => {
    const getClientSecret = async () => {
      if (cartAmount <= 0) return;

      try {
        // Create PaymentIntent directly with Stripe.js
        // NOTE: In a production app, this would be done through your backend
        // This is just for demonstration/testing purposes
        const stripe = await stripePromise;
        const { error, paymentIntent } = await stripe.paymentIntents.create({
          amount: Math.round(cartAmount * 100),
          currency: "eur",
          automatic_payment_methods: { enabled: true },
        });

        if (error) {
          throw new Error(error.message);
        }

        setClientSecret(paymentIntent.client_secret);
      } catch (err) {
        console.error("Failed to create payment intent:", err);
        setError("Payment initialization failed. Please try again later.");
      }
    };

    // NOTE: Comment out this direct Stripe call in production!
    // getClientSecret();

    // Since we can't create payment intents directly from frontend in production,
    // Let's create a fake client secret for testing
    // This is just a workaround to demonstrate the UI
    setClientSecret("fake_client_secret_for_testing_only");
  }, [cartAmount]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // For testing only - in a real implementation, we'd use a real client secret
      if (clientSecret === "fake_client_secret_for_testing_only") {
        // Simulate success after 2 seconds
        await new Promise((resolve) => setTimeout(resolve, 2000));
        clearCart();
        navigate("/payment-confirmation?success=true");
        return;
      }

      // In a real implementation, we'd confirm the payment:
      const { error: paymentError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
              email: email,
              name: shippingDetails.name,
              address: {
                line1: shippingDetails.address,
                city: shippingDetails.city,
                state: shippingDetails.state,
                postal_code: shippingDetails.postalCode,
                country: shippingDetails.country,
              },
            },
          },
          receipt_email: email,
        });

      if (paymentError) {
        throw new Error(paymentError.message);
      }

      // On success - clear cart and redirect
      clearCart();
      navigate(
        `/payment-confirmation?payment_intent_client_secret=${clientSecret}`
      );
    } catch (err) {
      console.error("Payment error:", err);
      setError(err.message || "Payment processing failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-xl font-medium text-[#4A3F35] mb-4">
          Contact Information
        </h2>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#C5B073] focus:border-[#C5B073]"
          />
        </div>
      </div>

      <div>
        <h2 className="text-xl font-medium text-[#4A3F35] mb-4">
          Shipping Information
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={shippingDetails.name}
              onChange={handleShippingChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#C5B073] focus:border-[#C5B073]"
            />
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Street Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={shippingDetails.address}
              onChange={handleShippingChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#C5B073] focus:border-[#C5B073]"
            />
          </div>

          <div>
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700"
            >
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={shippingDetails.city}
              onChange={handleShippingChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#C5B073] focus:border-[#C5B073]"
            />
          </div>

          <div>
            <label
              htmlFor="state"
              className="block text-sm font-medium text-gray-700"
            >
              State / Province
            </label>
            <input
              type="text"
              id="state"
              name="state"
              value={shippingDetails.state}
              onChange={handleShippingChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#C5B073] focus:border-[#C5B073]"
            />
          </div>

          <div>
            <label
              htmlFor="postalCode"
              className="block text-sm font-medium text-gray-700"
            >
              Postal Code
            </label>
            <input
              type="text"
              id="postalCode"
              name="postalCode"
              value={shippingDetails.postalCode}
              onChange={handleShippingChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#C5B073] focus:border-[#C5B073]"
            />
          </div>

          <div>
            <label
              htmlFor="country"
              className="block text-sm font-medium text-gray-700"
            >
              Country
            </label>
            <input
              type="text"
              id="country"
              name="country"
              value={shippingDetails.country}
              onChange={handleShippingChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#C5B073] focus:border-[#C5B073]"
            />
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-medium text-[#4A3F35] mb-4">
          Payment Information
        </h2>
        <div className="border border-gray-300 rounded-md p-4">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
              hidePostalCode: true, // Since we collect it above
            }}
          />
        </div>

        {/* Test mode notice */}
        <div className="mt-3 text-sm text-gray-500">
          <p>💳 Test Mode: Use card number 4242 4242 4242 4242</p>
          <p>
            Any future expiry date, any 3 digit CVC, and any postal code will
            work
          </p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={!stripe || loading}
          className={`px-6 py-3 bg-[#C5B073] text-white rounded-md transition-colors ${
            !stripe || loading
              ? "opacity-70 cursor-not-allowed"
              : "hover:bg-[#4A3F35]"
          }`}
        >
          {loading ? (
            <span className="flex items-center">
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
            </span>
          ) : (
            `Pay €${cartAmount.toFixed(2)}`
          )}
        </button>
      </div>
    </form>
  );
};

const Checkout = () => {
  const { cart } = useShop();
  const navigate = useNavigate();
  const [cartAmount, setCartAmount] = useState(0);

  useEffect(() => {
    // Calculate cart total
    if (cart && Array.isArray(cart) && cart.length > 0) {
      const total = cart.reduce(
        (sum, item) =>
          sum + (parseFloat(item.price) || 0) * (parseInt(item.quantity) || 1),
        0
      );
      setCartAmount(total);
    } else {
      navigate("/cart");
    }
  }, [cart, navigate]);

  return (
    <div className="max-w-6xl mx-auto mt-12 px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="md:col-span-2">
          <h1 className="text-3xl font-light text-[#4A3F35] mb-8">Checkout</h1>

          {/* Mock API Notice */}
          <div className="mb-6 bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-md">
            <p className="text-sm">
              <strong>Development Mode:</strong> This checkout is running in
              test mode. No real payments will be processed.
            </p>
          </div>

          {cartAmount > 0 && (
            <Elements
              stripe={stripePromise}
              options={{
                mode: "payment",
                currency: "eur",
                amount: Math.round(cartAmount * 100), // Convert to cents
                appearance: {
                  theme: "stripe",
                  variables: {
                    colorPrimary: "#C5B073",
                  },
                },
              }}
            >
              <CheckoutForm cartAmount={cartAmount} />
            </Elements>
          )}
        </div>

        <div className="bg-stone-50 p-6 rounded-lg h-fit">
          <h2 className="text-xl font-medium text-[#4A3F35] mb-4">
            Order Summary
          </h2>
          <div className="space-y-4 divide-y divide-gray-200">
            {cart &&
              cart.map((item) => (
                <div key={item.id} className="pt-4 first:pt-0">
                  <div className="flex items-center">
                    <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="text-sm text-gray-700">{item.name}</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      €
                      {(
                        (parseFloat(item.price) || 0) *
                        (parseInt(item.quantity) || 1)
                      ).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
          </div>

          <div className="border-t border-gray-200 mt-6 pt-6">
            <div className="flex justify-between">
              <p className="text-base font-medium text-gray-900">Order Total</p>
              <p className="text-base font-medium text-gray-900">
                €{cartAmount.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

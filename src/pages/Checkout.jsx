// src/pages/Checkout.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CheckCircle, AlertCircle } from "lucide-react";
import { useShop } from "../context/ShopContext";
import { useAuth } from "../context/AuthContext";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import StripePaymentForm from "../components/checkout/StripePaymentForm";

// Replace with your actual publishable key
const stripePromise = loadStripe(
  "pk_test_51O5g7DJNRPQAuTKVhN7xDzMckfRidGBvPjNcTKL2hYd9TQo8Y7c9RW9HvXp52HbKlwUzKZjE8vTNSrGwl1hIjjsX00GUY2f9Cd"
);

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, getCartTotal, clearCart } = useShop();
  const { user } = useAuth();

  const [clientSecret, setClientSecret] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
  });

  const [errors, setErrors] = useState({});
  const [orderProcessing, setOrderProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [currentStep, setCurrentStep] = useState("shipping");

  // Calculate totals
  const subtotal = getCartTotal();
  const tax = subtotal * 0.08;
  const totalAmount = subtotal + tax;

  // Redirect to cart if empty
  useEffect(() => {
    if (cart.length === 0 && !orderComplete) {
      navigate("/cart");
    }
  }, [cart, navigate, orderComplete]);

  // Pre-fill form with user data if available
  useEffect(() => {
    if (user) {
      setFormData((prevData) => ({
        ...prevData,
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
        city: user.city || "",
        state: user.state || "",
        zipCode: user.zipCode || "",
        country: user.country || "United States",
      }));
    }
  }, [user]);

  // Create payment intent when moving to payment step
  useEffect(() => {
    if (currentStep === "payment" && !clientSecret) {
      const createIntent = async () => {
        try {
          // For authenticated users, get the token
          let headers = { "Content-Type": "application/json" };
          const token = localStorage.getItem("token");
          if (token) {
            headers["Authorization"] = `Bearer ${token}`;
          }

          const response = await fetch(
            "https://diamantakis-server.onrender.com/api/v1/payments/create-payment-intent",
            {
              method: "POST",
              headers,
              body: JSON.stringify({
                amount: totalAmount,
                currency: "eur",
                metadata: {
                  customer_id: user?.id || "guest",
                  customer_email: formData.email,
                  customer_name: `${formData.firstName} ${formData.lastName}`,
                  shipping_address: `${formData.address}, ${formData.city}, ${formData.state}, ${formData.zipCode}, ${formData.country}`,
                  items: JSON.stringify(
                    cart.map((item) => ({
                      id: item._id,
                      title: item.title,
                      quantity: item.quantity,
                      price: item.price,
                    }))
                  ),
                },
              }),
            }
          );

          const data = await response.json();

          if (data.status === "success" && data.clientSecret) {
            setClientSecret(data.clientSecret);
          } else {
            throw new Error(data.message || "Failed to create payment intent");
          }
        } catch (error) {
          console.error("Payment intent error:", error);
          setErrors((prev) => ({
            ...prev,
            payment:
              error.message ||
              "Failed to initialize payment. Please try again.",
          }));
          setCurrentStep("shipping");
        }
      };

      createIntent();
    }
  }, [currentStep, clientSecret, cart, totalAmount, formData, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when field is updated
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateShippingInfo = () => {
    const newErrors = {};

    // Required fields
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "address",
      "city",
      "state",
      "zipCode",
      "country",
    ];

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = "This field is required";
      }
    });

    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Phone validation
    if (
      formData.phone &&
      !/^\d{10,15}$/.test(formData.phone.replace(/[()-\s]/g, ""))
    ) {
      newErrors.phone = "Please enter a valid phone number";
    }

    // Zip code validation
    if (formData.zipCode && !/^\d{5}(-\d{4})?$/.test(formData.zipCode)) {
      newErrors.zipCode = "Please enter a valid zip code";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinueToPayment = (e) => {
    e.preventDefault();

    if (validateShippingInfo()) {
      setCurrentStep("payment");
    } else {
      // Scroll to first error
      const firstError = document.querySelector(".error-message");
      if (firstError) {
        firstError.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  };

  const handlePaymentSuccess = (paymentIntent) => {
    setOrderProcessing(false);
    setOrderComplete(true);
    setOrderNumber(paymentIntent.id.replace("pi_", "ORD-"));
    clearCart();
  };

  const handlePaymentError = (errorMessage) => {
    setErrors((prev) => ({
      ...prev,
      payment: errorMessage,
    }));
    setOrderProcessing(false);

    // Scroll to error
    const paymentError = document.querySelector(".payment-error");
    if (paymentError) {
      paymentError.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  if (orderComplete) {
    return (
      <div className="max-w-4xl mx-auto mt-8 px-4">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <CheckCircle className="mx-auto text-[#C5B073] w-16 h-16 mb-6" />
          <h1 className="text-3xl font-light text-[#4A3F35] mb-4">
            Thank You for Your Order!
          </h1>
          <p className="text-xl mb-6">
            Your order has been successfully placed.
          </p>
          <div className="bg-stone-50 rounded-md p-6 mb-8 inline-block">
            <p className="text-gray-600 mb-2">Order Number:</p>
            <p className="text-2xl font-medium text-[#4A3F35]">{orderNumber}</p>
          </div>
          <p className="mb-8 text-gray-600">
            A confirmation email has been sent to{" "}
            <strong>{formData.email}</strong>. We'll notify you when your items
            have shipped.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="px-6 py-3 bg-[#4A3F35] text-white rounded-md hover:bg-[#3A2F25] transition-colors"
            >
              Continue Shopping
            </Link>
            {user ? (
              <Link
                to="/profile"
                className="px-6 py-3 bg-white text-[#4A3F35] border border-[#4A3F35] rounded-md hover:bg-stone-50 transition-colors"
              >
                View Your Account
              </Link>
            ) : (
              <Link
                to="/register"
                className="px-6 py-3 bg-white text-[#4A3F35] border border-[#4A3F35] rounded-md hover:bg-stone-50 transition-colors"
              >
                Create an Account
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-light text-[#4A3F35] mb-8">Checkout</h1>

      {/* Progress steps */}
      <div className="flex mb-8 border-b border-gray-200 pb-4">
        <div
          className={`flex-1 text-center ${
            currentStep === "shipping"
              ? "text-[#C5B073] font-medium"
              : "text-gray-500"
          }`}
        >
          <span className="inline-block w-8 h-8 rounded-full bg-white border-2 border-current text-center leading-6 mr-2">
            1
          </span>
          Shipping Information
        </div>
        <div
          className={`flex-1 text-center ${
            currentStep === "payment"
              ? "text-[#C5B073] font-medium"
              : "text-gray-500"
          }`}
        >
          <span className="inline-block w-8 h-8 rounded-full bg-white border-2 border-current text-center leading-6 mr-2">
            2
          </span>
          Payment
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Order Summary */}
        <div className="lg:col-span-1 order-2 lg:order-2">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
            <h2 className="text-xl font-medium text-[#4A3F35] mb-4 pb-4 border-b border-gray-200">
              Order Summary
            </h2>

            <div className="max-h-80 overflow-y-auto mb-4">
              {cart.map((item) => (
                <div
                  key={item._id}
                  className="flex gap-4 py-3 border-b border-gray-100"
                >
                  <div className="w-16 h-16 flex-shrink-0 bg-gray-100 rounded overflow-hidden">
                    {item.images && item.images[0] && (
                      <img
                        src={`data:${item.images[0].contentType};base64,${item.images[0].data}`}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="flex-grow">
                    <p className="font-medium text-[#4A3F35]">{item.title}</p>
                    <p className="text-sm text-gray-500">{item.artist}</p>
                    <div className="flex justify-between mt-1">
                      <span className="text-sm">Qty: {item.quantity}</span>
                      <span className="font-medium">€{item.price}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-2 py-4 border-b border-gray-200">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>€{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax (8%)</span>
                <span>€{tax.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex justify-between py-4 font-medium text-lg">
              <span>Total</span>
              <span>€{totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Checkout Form */}
        <div className="lg:col-span-2 order-1 lg:order-1">
          {currentStep === "shipping" && (
            <form
              onSubmit={handleContinueToPayment}
              className="bg-white rounded-lg shadow-md p-6"
            >
              {!user && (
                <div className="mb-6 p-4 bg-stone-100 rounded-md">
                  <p className="text-sm mb-2">
                    Already have an account?
                    <Link
                      to="/login"
                      className="text-[#C5B073] ml-1 hover:underline"
                    >
                      Log in
                    </Link>
                  </p>
                  <p className="text-sm text-gray-600">
                    Or continue as a guest below
                  </p>
                </div>
              )}

              <h2 className="text-xl font-medium text-[#4A3F35] mb-6 pb-4 border-b border-gray-200">
                Contact Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    First Name*
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border ${
                      errors.firstName ? "border-red-500" : "border-gray-300"
                    } rounded-md focus:outline-none focus:ring-2 focus:ring-[#C5B073]`}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm mt-1 error-message">
                      {errors.firstName}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Last Name*
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border ${
                      errors.lastName ? "border-red-500" : "border-gray-300"
                    } rounded-md focus:outline-none focus:ring-2 focus:ring-[#C5B073]`}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm mt-1 error-message">
                      {errors.lastName}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email Address*
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    } rounded-md focus:outline-none focus:ring-2 focus:ring-[#C5B073]`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1 error-message">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Phone Number*
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border ${
                      errors.phone ? "border-red-500" : "border-gray-300"
                    } rounded-md focus:outline-none focus:ring-2 focus:ring-[#C5B073]`}
                    placeholder="(123) 456-7890"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1 error-message">
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              <h2 className="text-xl font-medium text-[#4A3F35] mb-6 pb-4 border-b border-gray-200">
                Shipping Address
              </h2>

              <div className="grid grid-cols-1 gap-6 mb-8">
                <div>
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Street Address*
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border ${
                      errors.address ? "border-red-500" : "border-gray-300"
                    } rounded-md focus:outline-none focus:ring-2 focus:ring-[#C5B073]`}
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm mt-1 error-message">
                      {errors.address}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      City*
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border ${
                        errors.city ? "border-red-500" : "border-gray-300"
                      } rounded-md focus:outline-none focus:ring-2 focus:ring-[#C5B073]`}
                    />
                    {errors.city && (
                      <p className="text-red-500 text-sm mt-1 error-message">
                        {errors.city}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="state"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      State/Province*
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border ${
                        errors.state ? "border-red-500" : "border-gray-300"
                      } rounded-md focus:outline-none focus:ring-2 focus:ring-[#C5B073]`}
                    />
                    {errors.state && (
                      <p className="text-red-500 text-sm mt-1 error-message">
                        {errors.state}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="zipCode"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      ZIP/Postal Code*
                    </label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border ${
                        errors.zipCode ? "border-red-500" : "border-gray-300"
                      } rounded-md focus:outline-none focus:ring-2 focus:ring-[#C5B073]`}
                    />
                    {errors.zipCode && (
                      <p className="text-red-500 text-sm mt-1 error-message">
                        {errors.zipCode}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="country"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Country*
                    </label>
                    <select
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border ${
                        errors.country ? "border-red-500" : "border-gray-300"
                      } rounded-md focus:outline-none focus:ring-2 focus:ring-[#C5B073] bg-white`}
                    >
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Australia">Australia</option>
                      <option value="France">France</option>
                      <option value="Germany">Germany</option>
                      <option value="Italy">Italy</option>
                      <option value="Spain">Spain</option>
                      <option value="Netherlands">Netherlands</option>
                      <option value="Japan">Japan</option>
                    </select>
                    {errors.country && (
                      <p className="text-red-500 text-sm mt-1 error-message">
                        {errors.country}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-[#C5B073] hover:bg-[#4A3F35] text-white font-medium rounded-md transition-colors"
              >
                Continue to Payment
              </button>
            </form>
          )}

          {currentStep === "payment" && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-medium text-[#4A3F35] mb-6 pb-4 border-b border-gray-200">
                Payment Method
              </h2>

              {errors.payment && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md text-red-700 payment-error">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="flex-shrink-0 h-5 w-5 text-red-500 mt-0.5" />
                    <p>{errors.payment}</p>
                  </div>
                </div>
              )}

              {!clientSecret ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin h-8 w-8 border-4 border-[#C5B073] border-t-transparent rounded-full"></div>
                  <span className="ml-3 text-gray-600">
                    Preparing payment method...
                  </span>
                </div>
              ) : (
                <div className="mb-6">
                  <Elements
                    stripe={stripePromise}
                    options={{
                      clientSecret,
                      appearance: {
                        theme: "stripe",
                        variables: {
                          colorPrimary: "#C5B073",
                          colorBackground: "#ffffff",
                          colorText: "#4A3F35",
                          fontFamily: "Roboto, system-ui, sans-serif",
                        },
                      },
                    }}
                  >
                    <StripePaymentForm
                      onSuccess={handlePaymentSuccess}
                      onError={handlePaymentError}
                      amount={totalAmount}
                    />
                  </Elements>
                </div>
              )}

              <button
                type="button"
                onClick={() => setCurrentStep("shipping")}
                className="w-full mt-6 py-2 px-4 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                Return to Shipping Information
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;

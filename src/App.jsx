// src/App.js with Stripe integration
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ShopProvider } from "./context/ShopContext";
import { StripeProvider } from "./context/StripeContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Gallery from "./pages/Gallery";
import Sculptures from "./pages/Sculptures";
import Jewelry from "./pages/Jewelry";
import Paintings from "./pages/Paintings";
import Contact from "./pages/Contact";
import ArtworkDetail from "./pages/ArtworkDetail";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Profile from "./pages/Profile";
import ShoppingCart from "./pages/ShoppingCart";
import Checkout from "./pages/Checkout";
import PaymentConfirmation from "./pages/PaymentConfirmation";
import Wishlist from "./pages/Wishlist";
import About from "./pages/About";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ShopProvider>
          <StripeProvider>
            <div className="min-h-screen bg-stone-50">
              <Navbar />
              <main className="container mx-auto px-4 py-8">
                <Routes>
                  <Route path="/" element={<Gallery />} />
                  <Route path="/gallery" element={<Gallery />} />
                  <Route path="/sculptures" element={<Sculptures />} />
                  <Route path="/jewelry" element={<Jewelry />} />
                  <Route path="/paintings" element={<Paintings />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/artwork/:id" element={<ArtworkDetail />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/cart" element={<ShoppingCart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route
                    path="/payment-confirmation"
                    element={<PaymentConfirmation />}
                  />
                  <Route path="/wishlist" element={<Wishlist />} />
                  <Route path="/about" element={<About />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </StripeProvider>
        </ShopProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

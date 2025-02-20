// src/App.js with responsive container fixes
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
            <div className="min-h-screen bg-stone-50 flex flex-col overflow-x-hidden">
              <Navbar />
              {/* Adjusted main container with proper padding for mobile */}
              <main className="flex-1 w-full px-4 sm:px-6 py-4 sm:py-6 md:py-8">
                <Routes>
                  {/* Gallery is full-width to accommodate the design */}
                  <Route
                    path="/"
                    element={
                      <div className="w-full">
                        <Gallery />
                      </div>
                    }
                  />
                  <Route
                    path="/gallery"
                    element={
                      <div className="w-full">
                        <Gallery />
                      </div>
                    }
                  />

                  {/* Other pages get the container class for consistent sizing */}
                  <Route
                    path="/sculptures"
                    element={
                      <div className="container mx-auto">
                        <Sculptures />
                      </div>
                    }
                  />
                  <Route
                    path="/jewelry"
                    element={
                      <div className="container mx-auto">
                        <Jewelry />
                      </div>
                    }
                  />
                  <Route
                    path="/paintings"
                    element={
                      <div className="container mx-auto">
                        <Paintings />
                      </div>
                    }
                  />
                  <Route
                    path="/contact"
                    element={
                      <div className="container mx-auto max-w-4xl">
                        <Contact />
                      </div>
                    }
                  />
                  <Route
                    path="/artwork/:id"
                    element={
                      <div className="container mx-auto">
                        <ArtworkDetail />
                      </div>
                    }
                  />
                  <Route
                    path="/login"
                    element={
                      <div className="container mx-auto max-w-md">
                        <Login />
                      </div>
                    }
                  />
                  <Route
                    path="/register"
                    element={
                      <div className="container mx-auto max-w-md">
                        <Register />
                      </div>
                    }
                  />
                  <Route
                    path="/profile"
                    element={
                      <div className="container mx-auto">
                        <Profile />
                      </div>
                    }
                  />
                  <Route
                    path="/cart"
                    element={
                      <div className="container mx-auto">
                        <ShoppingCart />
                      </div>
                    }
                  />
                  <Route
                    path="/checkout"
                    element={
                      <div className="container mx-auto max-w-4xl">
                        <Checkout />
                      </div>
                    }
                  />
                  <Route
                    path="/payment-confirmation"
                    element={
                      <div className="container mx-auto max-w-lg">
                        <PaymentConfirmation />
                      </div>
                    }
                  />
                  <Route
                    path="/wishlist"
                    element={
                      <div className="container mx-auto">
                        <Wishlist />
                      </div>
                    }
                  />
                  <Route
                    path="/about"
                    element={
                      <div className="container mx-auto">
                        <About />
                      </div>
                    }
                  />
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

// src/components/Navbar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, User, Heart, ShoppingBag } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useShop } from "../context/ShopContext";
import SearchComponent from "./Search";
import logoImage from "../assets/d.jpeg";

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { user } = useAuth();
  const { wishlist, cart } = useShop();

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      <div className="bg-[#C5B073] py-2">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Left side */}
            <div className="flex items-center space-x-6">
              {/* <span className="text-white cursor-pointer">Boutiques</span> */}
              <Link to="/contact" className="text-white hover:text-[#4A3F35]">
                Contact Us
              </Link>
              <button
                onClick={() => setIsSearchOpen(true)}
                className="text-white hover:text-[#4A3F35]"
              >
                <Search size={20} />
              </button>
            </div>

            {/* Right side */}
            <div className="flex items-center space-x-6">
              <Link
                to={user ? "/profile" : "/login"}
                className="flex items-center text-white hover:text-[#4A3F35]"
              >
                <User size={20} className="mr-1" />
                <span>{user ? user.name : "My Account"}</span>
              </Link>
              <Link
                to="/wishlist"
                className="flex items-center text-white hover:text-[#4A3F35]"
              >
                <Heart size={20} className="mr-1" />
                <span>
                  My Wishlist {wishlist.length > 0 && `(${wishlist.length})`}
                </span>
              </Link>
              <Link
                to="/cart"
                className="flex items-center text-white hover:text-[#4A3F35]"
              >
                <ShoppingBag size={20} className="mr-1" />
                <span>
                  Shopping Bag {cartItemsCount > 0 && `(${cartItemsCount})`}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Logo */}
      <div className="flex justify-center py-6">
        <Link to="/" className="w-24">
          <img
            src={logoImage}
            alt="Diamantakis Art Gallery"
            className="w-full"
          />
        </Link>
      </div>

      {/* Main Navigation */}
      <nav className="border-t border-b border-[#E5DED5]">
        <div className="container mx-auto">
          <div className="flex justify-center items-center h-16 space-x-12">
            <Link
              to="/gallery"
              className="text-[#4A3F35] hover:text-[#C5B073] transition-colors"
            >
              Gallery
            </Link>
            <Link
              to="/jewelry"
              className="text-[#4A3F35] hover:text-[#C5B073] transition-colors"
            >
              Jewelry
            </Link>
            <Link
              to="/sculptures"
              className="text-[#4A3F35] hover:text-[#C5B073] transition-colors"
            >
              Sculptures
            </Link>
            <Link
              to="/paintings"
              className="text-[#4A3F35] hover:text-[#C5B073] transition-colors"
            >
              Paintings
            </Link>
            <Link
              to="/about"
              className="text-[#4A3F35] hover:text-[#C5B073] transition-colors"
            >
              About
            </Link>
          </div>
        </div>
      </nav>

      {/* Search Component */}
      {isSearchOpen && (
        <SearchComponent
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;

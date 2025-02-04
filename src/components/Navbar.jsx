import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Search, User, Heart, ShoppingBag } from "lucide-react";
import logoImage from "../assets/d.jpeg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Top Bar */}
      <div className="bg-[#C5B073] text-white">
        <div className="container mx-auto px-4 h-8 sm:h-10 flex justify-between items-center text-sm"></div>
      </div>

      <div className="container mx-auto px-4">
        {/* Secondary Navigation - Hidden on mobile, visible on desktop */}
        <div className="hidden sm:flex justify-between items-center py-4 text-sm">
          <div className="flex items-center space-x-6">
            <span className="text-[#4A3F35]">Boutiques</span>
            <span className="text-[#4A3F35]">Contact Us</span>
            <Search size={16} className="cursor-pointer text-[#4A3F35]" />
          </div>
          <div className="flex items-center space-x-6">
            <Link
              to="/login"
              className="flex items-center text-[#4A3F35] hover:text-[#C5B073]"
            >
              <User size={16} className="mr-1" />
              <span>My Account</span>
            </Link>
            <div className="flex items-center text-[#4A3F35]">
              <Heart size={16} className="mr-1" />
              <span>My Wishlist</span>
            </div>
            <div className="flex items-center text-[#4A3F35]">
              <ShoppingBag size={16} className="mr-1" />
              <span>Shopping Bag (0)</span>
            </div>
          </div>
        </div>

        {/* Mobile Header */}
        <div className="flex sm:hidden justify-between items-center py-4">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-[#4A3F35] p-1"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className="flex items-center space-x-4">
            <Search size={20} className="text-[#4A3F35]" />
            <Link to="/login" className="text-[#4A3F35]">
              <User size={20} />
            </Link>
            <ShoppingBag size={20} className="text-[#4A3F35]" />
          </div>
        </div>

        {/* Logo - Centered on all screens */}
        <div className="flex justify-center py-4 sm:py-6">
          <Link to="/" className="w-24 sm:w-32">
            <img
              src={logoImage}
              alt="Diamantakis Art Gallery"
              className="w-full"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="border-t border-b border-[#E5DED5] hidden sm:block">
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
          </div>
        </nav>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="fixed inset-0 bg-white z-50 overflow-y-auto sm:hidden">
            <div className="p-4">
              {/* Mobile Menu Header */}
              <div className="flex justify-between items-center mb-8">
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-[#4A3F35] p-1"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Mobile Menu Links */}
              <div className="flex flex-col space-y-4">
                <Link
                  to="/gallery"
                  className="text-[#4A3F35] py-2 border-b border-[#E5DED5]"
                  onClick={() => setIsOpen(false)}
                >
                  Gallery
                </Link>
                <Link
                  to="/jewelry"
                  className="text-[#4A3F35] py-2 border-b border-[#E5DED5]"
                  onClick={() => setIsOpen(false)}
                >
                  Jewelry
                </Link>
                <Link
                  to="/sculptures"
                  className="text-[#4A3F35] py-2 border-b border-[#E5DED5]"
                  onClick={() => setIsOpen(false)}
                >
                  Sculptures
                </Link>
                <Link
                  to="/paintings"
                  className="text-[#4A3F35] py-2 border-b border-[#E5DED5]"
                  onClick={() => setIsOpen(false)}
                >
                  Paintings
                </Link>
                <Link
                  to="/login"
                  className="text-[#4A3F35] py-2 border-b border-[#E5DED5]"
                  onClick={() => setIsOpen(false)}
                >
                  My Account
                </Link>
                <div className="text-[#4A3F35] py-2 border-b border-[#E5DED5]">
                  My Wishlist
                </div>
                <Link
                  to="/contact"
                  className="text-[#4A3F35] py-2 border-b border-[#E5DED5]"
                  onClick={() => setIsOpen(false)}
                >
                  Contact us
                </Link>
                <div className="text-[#4A3F35] py-2 border-b border-[#E5DED5]">
                  Boutiques
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

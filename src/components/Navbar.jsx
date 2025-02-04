import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Search, User, Heart, ShoppingBag } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* Top Bar */}
      <div className="bg-[#C5B073] text-white">
        <div className="container mx-auto px-4 h-10 flex justify-between items-center text-sm"></div>
      </div>

      <div className="container mx-auto px-4">
        {/* Secondary Navigation */}
        <div className="flex justify-between items-center py-4 text-sm">
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

        {/* Logo */}
        <div className="flex justify-center py-6">
          <Link to="/" className="w-32">
            <img
              src="/src/assets/d.jpeg"
              alt="Diamantakis Art Gallery"
              className="w-full"
            />
          </Link>
        </div>

        {/* Main Navigation */}
        <nav className="border-t border-b border-[#E5DED5]">
          <div className="hidden md:flex justify-center items-center h-16 space-x-12">
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

          {/* Mobile Menu Button */}
          <div className="md:hidden py-4">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#4A3F35]"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="md:hidden py-4">
              <div className="flex flex-col space-y-4">
                <Link
                  to="/gallery"
                  className="text-[#4A3F35] hover:text-[#C5B073]"
                >
                  Gallery
                </Link>
                <Link
                  to="/jewelry"
                  className="text-[#4A3F35] hover:text-[#C5B073]"
                >
                  Jewelry
                </Link>
                <Link
                  to="/sculptures"
                  className="text-[#4A3F35] hover:text-[#C5B073]"
                >
                  Sculptures
                </Link>
                <Link
                  to="/paintings"
                  className="text-[#4A3F35] hover:text-[#C5B073]"
                >
                  Paintings
                </Link>
              </div>
            </div>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Navbar;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Search, User, Heart, ShoppingBag } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* Top Bar */}
      <div className="bg-[#C5B073] text-white">
        <div className="container mx-auto px-4 h-10 flex justify-between items-center text-sm">
          <div className="flex items-center space-x-4">
            <span>Boutiques</span>
            <span>Contact Us</span>
            <Search size={16} className="cursor-pointer" />
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <User size={16} className="mr-1" />
              <span>My Account</span>
            </div>
            <div className="flex items-center">
              <Heart size={16} className="mr-1" />
              <span>My Wishlist</span>
            </div>
            <div className="flex items-center">
              <ShoppingBag size={16} className="mr-1" />
              <span>Shopping Bag (0)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-white border-b border-[#E5DED5]">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="text-2xl font-semibold text-[#4A3F35]">
              ART GALLERY
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
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
                to="/contact"
                className="text-[#4A3F35] hover:text-[#C5B073] transition-colors"
              >
                Contact
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-[#4A3F35]"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
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
                <Link
                  to="/contact"
                  className="text-[#4A3F35] hover:text-[#C5B073]"
                >
                  Contact
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

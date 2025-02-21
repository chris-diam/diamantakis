// src/components/Navbar.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, User, Heart, ShoppingBag, Menu, X, Globe } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useShop } from "../context/ShopContext";
import { useTranslation } from "react-i18next";
import SearchComponent from "./Search";
import logoImage from "../assets/logo.png";

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { user } = useAuth();
  const { wishlist, cart } = useShop();
  const { t, i18n } = useTranslation();

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  // Toggle language function
  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "el" : "en";
    i18n.changeLanguage(newLang);
  };

  // Check if the device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      // Auto-close mobile menu when resizing to desktop
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    // Check on initial load
    checkMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Top bar - responsive with condensed layout on mobile */}
      <div className="bg-[#C5B073] py-2">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Left side */}
            <div className="flex items-center space-x-3 md:space-x-6">
              <Link
                to="/contact"
                className="hidden sm:block text-white hover:text-[#4A3F35]"
              >
                {t("navigation.contact")}
              </Link>
              <button
                onClick={() => setIsSearchOpen(true)}
                className="text-white hover:text-[#4A3F35]"
              >
                <Search size={isMobile ? 18 : 20} />
              </button>
              {/* Language switcher */}
              <button
                onClick={toggleLanguage}
                className="flex items-center text-white hover:text-[#4A3F35]"
                aria-label="Switch language"
              >
                <Globe size={isMobile ? 18 : 20} className="mr-1" />
                <span className="hidden sm:inline">
                  {i18n.language === "en" ? "ΕΛ" : "EN"}
                </span>
              </button>
            </div>

            {/* Right side */}
            <div className="flex items-center space-x-3 md:space-x-6">
              <Link
                to={user ? "/profile" : "/login"}
                className="flex items-center text-white hover:text-[#4A3F35]"
              >
                <User size={isMobile ? 18 : 20} className="mr-1" />
                <span className="hidden sm:inline">
                  {user ? user.name : t("navigation.myAccount")}
                </span>
              </Link>
              <Link
                to="/wishlist"
                className="flex items-center text-white hover:text-[#4A3F35]"
              >
                <Heart size={isMobile ? 18 : 20} className="mr-1" />
                <span className="hidden sm:inline">
                  {t("navigation.wishlist")}{" "}
                  {wishlist.length > 0 && `(${wishlist.length})`}
                </span>
                {isMobile && wishlist.length > 0 && (
                  <span className="ml-1 text-xs bg-white text-[#C5B073] rounded-full w-4 h-4 flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </Link>
              <Link
                to="/cart"
                className="flex items-center text-white hover:text-[#4A3F35]"
              >
                <ShoppingBag size={isMobile ? 18 : 20} className="mr-1" />
                <span className="hidden sm:inline">
                  {t("navigation.cart")}{" "}
                  {cartItemsCount > 0 && `(${cartItemsCount})`}
                </span>
                {isMobile && cartItemsCount > 0 && (
                  <span className="ml-1 text-xs bg-white text-[#C5B073] rounded-full w-4 h-4 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Logo */}
      <div className="flex justify-center py-4 md:py-6">
        <Link to="/" className="w-48 sm:w-56 md:w-72">
          <img
            src={logoImage}
            alt="Diamantakis Art Gallery"
            className="w-full"
          />
        </Link>
      </div>

      {/* Mobile menu button */}
      <div className="md:hidden border-t border-b border-[#E5DED5] py-3 px-4">
        <button
          onClick={toggleMobileMenu}
          className="flex items-center justify-between w-full text-[#4A3F35]"
        >
          <span className="font-medium">{t("navigation.menu")}</span>
          <Menu size={24} />
        </button>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:block border-t border-b border-[#E5DED5]">
        <div className="container mx-auto">
          <div className="flex justify-center items-center h-16 space-x-6 lg:space-x-12">
            <Link
              to="/gallery"
              className="text-[#4A3F35] hover:text-[#C5B073] transition-colors"
            >
              {t("navigation.gallery")}
            </Link>
            <Link
              to="/jewelry"
              className="text-[#4A3F35] hover:text-[#C5B073] transition-colors"
            >
              {t("navigation.jewelry")}
            </Link>
            <Link
              to="/sculptures"
              className="text-[#4A3F35] hover:text-[#C5B073] transition-colors"
            >
              {t("navigation.sculptures")}
            </Link>
            <Link
              to="/paintings"
              className="text-[#4A3F35] hover:text-[#C5B073] transition-colors"
            >
              {t("navigation.paintings")}
            </Link>
            <Link
              to="/about"
              className="text-[#4A3F35] hover:text-[#C5B073] transition-colors"
            >
              {t("navigation.about")}
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeMobileMenu}
        >
          <div
            className="absolute right-0 top-0 h-full w-4/5 max-w-sm bg-white z-50"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile menu header */}
            <div className="flex justify-between items-center p-4 border-b border-[#E5DED5]">
              <h3 className="text-lg font-medium text-[#4A3F35]">
                {t("navigation.menu")}
              </h3>
              <button onClick={closeMobileMenu} className="text-[#4A3F35]">
                <X size={24} />
              </button>
            </div>

            {/* Mobile menu links */}
            <div className="py-4">
              <Link
                to="/gallery"
                className="block px-6 py-3 text-[#4A3F35] hover:bg-[#E5DED5] transition-colors"
                onClick={closeMobileMenu}
              >
                {t("navigation.gallery")}
              </Link>
              <Link
                to="/jewelry"
                className="block px-6 py-3 text-[#4A3F35] hover:bg-[#E5DED5] transition-colors"
                onClick={closeMobileMenu}
              >
                {t("navigation.jewelry")}
              </Link>
              <Link
                to="/sculptures"
                className="block px-6 py-3 text-[#4A3F35] hover:bg-[#E5DED5] transition-colors"
                onClick={closeMobileMenu}
              >
                {t("navigation.sculptures")}
              </Link>
              <Link
                to="/paintings"
                className="block px-6 py-3 text-[#4A3F35] hover:bg-[#E5DED5] transition-colors"
                onClick={closeMobileMenu}
              >
                {t("navigation.paintings")}
              </Link>
              <Link
                to="/about"
                className="block px-6 py-3 text-[#4A3F35] hover:bg-[#E5DED5] transition-colors"
                onClick={closeMobileMenu}
              >
                {t("navigation.about")}
              </Link>
              <Link
                to="/contact"
                className="block px-6 py-3 text-[#4A3F35] hover:bg-[#E5DED5] transition-colors"
                onClick={closeMobileMenu}
              >
                {t("navigation.contact")}
              </Link>

              {/* Language switcher in mobile menu */}
              <button
                onClick={() => {
                  toggleLanguage();
                  closeMobileMenu();
                }}
                className="flex items-center w-full px-6 py-3 text-[#4A3F35] hover:bg-[#E5DED5] transition-colors"
              >
                <Globe size={20} className="mr-3" />
                <span>{i18n.language === "en" ? "Ελληνικά" : "English"}</span>
              </button>
            </div>

            {/* Additional mobile menu items */}
            <div className="border-t border-[#E5DED5] py-4">
              <Link
                to={user ? "/profile" : "/login"}
                className="flex items-center px-6 py-3 text-[#4A3F35] hover:bg-[#E5DED5] transition-colors"
                onClick={closeMobileMenu}
              >
                <User size={20} className="mr-3" />
                <span>{user ? user.name : t("navigation.myAccount")}</span>
              </Link>
              <Link
                to="/wishlist"
                className="flex items-center px-6 py-3 text-[#4A3F35] hover:bg-[#E5DED5] transition-colors"
                onClick={closeMobileMenu}
              >
                <Heart size={20} className="mr-3" />
                <span>
                  {t("navigation.wishlist")}{" "}
                  {wishlist.length > 0 && `(${wishlist.length})`}
                </span>
              </Link>
              <Link
                to="/cart"
                className="flex items-center px-6 py-3 text-[#4A3F35] hover:bg-[#E5DED5] transition-colors"
                onClick={closeMobileMenu}
              >
                <ShoppingBag size={20} className="mr-3" />
                <span>
                  {t("navigation.cart")}{" "}
                  {cartItemsCount > 0 && `(${cartItemsCount})`}
                </span>
              </Link>
            </div>
          </div>
        </div>
      )}

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

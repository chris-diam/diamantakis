import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Instagram, Facebook, Twitter } from "lucide-react";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log("Subscribed:", email);
    setEmail("");
  };

  return (
    <footer className="bg-stone-800 text-stone-200 mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">About Our Gallery</h3>
            <p className="text-stone-300">
              Discover unique artworks from talented artists around the world.
              We curate the finest pieces of sculptures, jewelry, and paintings.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/gallery"
                  className="hover:text-white transition-colors"
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  to="/sculptures"
                  className="hover:text-white transition-colors"
                >
                  Sculptures
                </Link>
              </li>
              <li>
                <Link
                  to="/jewelry"
                  className="hover:text-white transition-colors"
                >
                  Jewelry
                </Link>
              </li>
              <li>
                <Link
                  to="/paintings"
                  className="hover:text-white transition-colors"
                >
                  Paintings
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Newsletter</h3>
            <p className="text-stone-300">
              Subscribe to receive updates about new artworks and exhibitions.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="px-4 py-2 rounded-l bg-stone-700 text-white w-full focus:outline-none focus:ring-2 focus:ring-stone-400"
                  required
                />
                <button
                  type="submit"
                  className="bg-stone-600 px-4 py-2 rounded-r hover:bg-stone-500 transition-colors"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>

          {/* Social & Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white transition-colors">
                <Instagram size={24} />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Facebook size={24} />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Twitter size={24} />
              </a>
              <a
                href="mailto:contact@artgallery.com"
                className="hover:text-white transition-colors"
              >
                <Mail size={24} />
              </a>
            </div>
            <div className="text-stone-300">
              <p>123 Art Street</p>
              <p>Art City, AC 12345</p>
              <p>Tel: (555) 123-4567</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-stone-700 mt-8 pt-8 text-center text-stone-400">
          <p>
            &copy; {new Date().getFullYear()} Art Gallery. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

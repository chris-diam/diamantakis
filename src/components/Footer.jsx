// src/components/Footer.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Instagram, Facebook, Twitter } from "lucide-react";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
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
            <h3 className="text-lg font-semibold">{t("footer.aboutTitle")}</h3>
            <p className="text-stone-300">{t("footer.aboutText")}</p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t("footer.quickLinks")}</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/gallery"
                  className="hover:text-white transition-colors"
                >
                  {t("navigation.gallery")}
                </Link>
              </li>
              <li>
                <Link
                  to="/sculptures"
                  className="hover:text-white transition-colors"
                >
                  {t("navigation.sculptures")}
                </Link>
              </li>
              <li>
                <Link
                  to="/jewelry"
                  className="hover:text-white transition-colors"
                >
                  {t("navigation.jewelry")}
                </Link>
              </li>
              <li>
                <Link
                  to="/paintings"
                  className="hover:text-white transition-colors"
                >
                  {t("navigation.paintings")}
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-white transition-colors"
                >
                  {t("navigation.contact")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t("footer.newsletter")}</h3>
            <p className="text-stone-300">{t("footer.newsletterText")}</p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("footer.enterEmail")}
                  className="px-4 py-2 rounded-l bg-stone-700 text-white w-full focus:outline-none focus:ring-2 focus:ring-stone-400"
                  required
                />
                <button
                  type="submit"
                  className="bg-stone-600 px-4 py-2 rounded-r hover:bg-stone-500 transition-colors"
                >
                  {t("footer.subscribeButton")}
                </button>
              </div>
            </form>
          </div>

          {/* Social & Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">
              {t("footer.connectWithUs")}
            </h3>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={24} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={24} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={24} />
              </a>
              <a
                href="mailto:contact@artgallery.com"
                className="hover:text-white transition-colors"
                aria-label="Email"
              >
                <Mail size={24} />
              </a>
            </div>
            <div className="text-stone-300">
              <p>{t("footer.address")}</p>
              <p>{t("footer.city")}</p>
              <p>{t("footer.phone")}</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-stone-700 mt-8 pt-8 text-center text-stone-400">
          <p>{t("footer.rights", { year: new Date().getFullYear() })}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

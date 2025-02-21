// src/pages/Contact.jsx
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Mail, Phone, Clock, MapPin } from "lucide-react";

const Contact = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-light text-[#4A3F35] mb-4">
          {t("contact.title")}
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {t("contact.description")}
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Contact Information */}
        <div className="md:col-span-1 space-y-8">
          {/* Address */}
          <div className="bg-stone-50 p-6 rounded-lg">
            <div className="flex items-center mb-4">
              <MapPin className="text-[#C5B073] mr-3" size={24} />
              <h3 className="text-lg font-medium text-[#4A3F35]">
                {t("contact.address")}
              </h3>
            </div>
            <p className="text-gray-600 pl-9">
              {t("footer.address")}
              <br />
              {t("footer.city")}
            </p>
          </div>

          {/* Phone */}
          <div className="bg-stone-50 p-6 rounded-lg">
            <div className="flex items-center mb-4">
              <Phone className="text-[#C5B073] mr-3" size={24} />
              <h3 className="text-lg font-medium text-[#4A3F35]">
                {t("contact.phone")}
              </h3>
            </div>
            <p className="text-gray-600 pl-9">{t("footer.phone")}</p>
          </div>

          {/* Hours */}
          <div className="bg-stone-50 p-6 rounded-lg">
            <div className="flex items-center mb-4">
              <Clock className="text-[#C5B073] mr-3" size={24} />
              <h3 className="text-lg font-medium text-[#4A3F35]">
                {t("contact.hours")}
              </h3>
            </div>
            <p className="text-gray-600 pl-9">{t("contact.hoursDetail")}</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-[#4A3F35] mb-2"
                  >
                    {t("contact.name")}
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder={t("contact.namePlaceholder")}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#C5B073] focus:border-transparent transition-colors"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-[#4A3F35] mb-2"
                  >
                    {t("contact.email")}
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder={t("contact.emailPlaceholder")}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#C5B073] focus:border-transparent transition-colors"
                    required
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-[#4A3F35] mb-2"
                >
                  {t("contact.message")}
                </label>
                <textarea
                  id="message"
                  rows="6"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder={t("contact.messagePlaceholder")}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#C5B073] focus:border-transparent transition-colors"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-[#C5B073] text-white py-3 px-6 rounded-lg hover:bg-[#4A3F35] transition-colors duration-300"
              >
                {t("contact.sendMessage")}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

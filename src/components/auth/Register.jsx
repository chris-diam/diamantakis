// src/components/auth/Register.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { register } from "../../services/authService";

const Register = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    displayName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    gdprConsent: false,
  });

  const validateForm = () => {
    if (!formData.username || formData.username.trim() === "") {
      setError(t("auth.validation.required"));
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError(t("auth.validation.passwordMatch"));
      return false;
    }

    if (formData.password.length < 8) {
      setError(t("auth.validation.passwordLength"));
      return false;
    }

    if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      setError(t("auth.validation.usernameFormat"));
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError(t("auth.validation.emailFormat"));
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      const userData = {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        password: formData.password,
        username: formData.username,
        displayName:
          formData.displayName || `${formData.firstName} ${formData.lastName}`,
      };

      const response = await register(userData);

      if (response.token) {
        localStorage.setItem("token", response.token);
        navigate("/");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-center text-[#4A3F35] mb-6">
          {t("auth.register.title")}
        </h1>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#4A3F35]">
                {t("auth.register.firstName")}
              </label>
              <input
                type="text"
                required
                className="mt-1 block w-full px-3 py-2 border border-[#E5DED5] rounded-md shadow-sm focus:outline-none focus:ring-[#C5B073] focus:border-[#C5B073]"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#4A3F35]">
                {t("auth.register.lastName")}
              </label>
              <input
                type="text"
                required
                className="mt-1 block w-full px-3 py-2 border border-[#E5DED5] rounded-md shadow-sm focus:outline-none focus:ring-[#C5B073] focus:border-[#C5B073]"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#4A3F35]">
              {t("auth.register.username")}
            </label>
            <input
              type="text"
              required
              className="mt-1 block w-full px-3 py-2 border border-[#E5DED5] rounded-md shadow-sm focus:outline-none focus:ring-[#C5B073] focus:border-[#C5B073]"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value.trim() })
              }
              pattern="^[a-zA-Z0-9_]+$"
              title={t("auth.validation.usernameFormat")}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#4A3F35]">
              {t("auth.register.displayName")}
            </label>
            <input
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-[#E5DED5] rounded-md shadow-sm focus:outline-none focus:ring-[#C5B073] focus:border-[#C5B073]"
              value={formData.displayName}
              onChange={(e) =>
                setFormData({ ...formData, displayName: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#4A3F35]">
              {t("auth.register.email")}
            </label>
            <input
              type="email"
              required
              className="mt-1 block w-full px-3 py-2 border border-[#E5DED5] rounded-md shadow-sm focus:outline-none focus:ring-[#C5B073] focus:border-[#C5B073]"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value.trim() })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#4A3F35]">
              {t("auth.register.password")}
            </label>
            <input
              type="password"
              required
              minLength={8}
              className="mt-1 block w-full px-3 py-2 border border-[#E5DED5] rounded-md shadow-sm focus:outline-none focus:ring-[#C5B073] focus:border-[#C5B073]"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#4A3F35]">
              {t("auth.register.confirmPassword")}
            </label>
            <input
              type="password"
              required
              className="mt-1 block w-full px-3 py-2 border border-[#E5DED5] rounded-md shadow-sm focus:outline-none focus:ring-[#C5B073] focus:border-[#C5B073]"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              required
              className="h-4 w-4 text-[#C5B073] focus:ring-[#C5B073] border-[#E5DED5] rounded"
              checked={formData.gdprConsent}
              onChange={(e) =>
                setFormData({ ...formData, gdprConsent: e.target.checked })
              }
            />
            <label className="ml-2 block text-sm text-[#4A3F35]">
              {t("auth.register.gdprConsent")}
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-[#C5B073] text-white py-2 px-4 rounded-md hover:bg-[#4A3F35] transition-colors ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading
              ? t("auth.register.creatingAccount")
              : t("auth.register.createAccount")}
          </button>

          <div className="text-center mt-4">
            <span className="text-sm text-[#4A3F35]">
              {t("auth.register.haveAccount")}{" "}
            </span>
            <Link
              to="/login"
              className="text-sm text-[#C5B073] hover:text-[#4A3F35]"
            >
              {t("auth.register.loginHere")}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;

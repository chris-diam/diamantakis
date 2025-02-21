// src/components/auth/Login.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { login } from "../../services/authService";

const Login = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await login({
        email: formData.email,
        password: formData.password,
      });

      if (response.token) {
        localStorage.setItem("token", response.token);
        if (formData.remember) {
          localStorage.setItem("rememberedEmail", formData.email);
        } else {
          localStorage.removeItem("rememberedEmail");
        }
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
          {t("auth.login.title")}
        </h1>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#4A3F35]">
              {t("auth.login.email")}
            </label>
            <input
              type="email"
              required
              className="mt-1 block w-full px-3 py-2 border border-[#E5DED5] rounded-md shadow-sm focus:outline-none focus:ring-[#C5B073] focus:border-[#C5B073]"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#4A3F35]">
              {t("auth.login.password")}
            </label>
            <input
              type="password"
              required
              className="mt-1 block w-full px-3 py-2 border border-[#E5DED5] rounded-md shadow-sm focus:outline-none focus:ring-[#C5B073] focus:border-[#C5B073]"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-[#C5B073] focus:ring-[#C5B073] border-[#E5DED5] rounded"
                checked={formData.remember}
                onChange={(e) =>
                  setFormData({ ...formData, remember: e.target.checked })
                }
              />
              <label className="ml-2 block text-sm text-[#4A3F35]">
                {t("auth.login.rememberMe")}
              </label>
            </div>
            <Link
              to="/forgot-password"
              className="text-sm text-[#C5B073] hover:text-[#4A3F35]"
            >
              {t("auth.login.forgotPassword")}
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-[#C5B073] text-white py-2 px-4 rounded-md hover:bg-[#4A3F35] transition-colors ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? t("auth.login.signingIn") : t("auth.login.signIn")}
          </button>

          <div className="text-center mt-4">
            <span className="text-sm text-[#4A3F35]">
              {t("auth.login.noAccount")}{" "}
            </span>
            <Link
              to="/register"
              className="text-sm text-[#C5B073] hover:text-[#4A3F35]"
            >
              {t("auth.login.registerHere")}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

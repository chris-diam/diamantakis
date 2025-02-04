import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Login data:", formData);
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-center text-[#4A3F35] mb-6">
          Login
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#4A3F35]">
              Email address
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
              Password
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
                Remember me
              </label>
            </div>
            <Link
              to="/forgot-password"
              className="text-sm text-[#C5B073] hover:text-[#4A3F35]"
            >
              Forgot your password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-[#C5B073] text-white py-2 px-4 rounded-md hover:bg-[#4A3F35] transition-colors"
          >
            Sign in
          </button>

          <div className="text-center mt-4">
            <span className="text-sm text-[#4A3F35]">
              Don't have an account?{" "}
            </span>
            <Link
              to="/register"
              className="text-sm text-[#C5B073] hover:text-[#4A3F35]"
            >
              Register here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

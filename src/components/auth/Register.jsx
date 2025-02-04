import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle registration logic here
    console.log("Registration data:", formData);
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-center text-[#4A3F35] mb-6">
          Register
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#4A3F35]">
                First Name
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
                Last Name
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
              Display Name
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
              Username
            </label>
            <input
              type="text"
              required
              className="mt-1 block w-full px-3 py-2 border border-[#E5DED5] rounded-md shadow-sm focus:outline-none focus:ring-[#C5B073] focus:border-[#C5B073]"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#4A3F35]">
              Email
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

          <div>
            <label className="block text-sm font-medium text-[#4A3F35]">
              Confirm Password
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
              I agree to the collection and processing of my personal data in
              accordance with the GDPR.
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-[#C5B073] text-white py-2 px-4 rounded-md hover:bg-[#4A3F35] transition-colors"
          >
            Create Account
          </button>

          <div className="text-center mt-4">
            <span className="text-sm text-[#4A3F35]">
              Already have an account?{" "}
            </span>
            <Link
              to="/login"
              className="text-sm text-[#C5B073] hover:text-[#4A3F35]"
            >
              Login here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;

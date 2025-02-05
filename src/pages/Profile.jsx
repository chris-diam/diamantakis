// src/pages/Profile.jsx
import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const Profile = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-[#4A3F35] mb-6">
          My Profile
        </h1>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-[#4A3F35]">Name</label>
            <p className="mt-1 text-gray-900">{user.name}</p>
          </div>

          <div>
            <label className="text-sm font-medium text-[#4A3F35]">Email</label>
            <p className="mt-1 text-gray-900">{user.email}</p>
          </div>

          <div>
            <label className="text-sm font-medium text-[#4A3F35]">
              Username
            </label>
            <p className="mt-1 text-gray-900">{user.username}</p>
          </div>

          {user.displayName && (
            <div>
              <label className="text-sm font-medium text-[#4A3F35]">
                Display Name
              </label>
              <p className="mt-1 text-gray-900">{user.displayName}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;

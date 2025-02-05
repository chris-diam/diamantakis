// src/services/authService.js
const API_URL = "https://diamantakis-server.onrender.com/api/v1/users";

export const register = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      // Extract the specific error message
      const errorMessage = data.error?.message || data.message;

      // Check for duplicate key errors
      if (
        errorMessage.includes("E11000") ||
        errorMessage.includes("duplicate")
      ) {
        if (errorMessage.includes("username")) {
          throw new Error("Username already taken. Please choose another one.");
        } else if (errorMessage.includes("email")) {
          throw new Error(
            "Email already registered. Please use a different email."
          );
        }
      }

      throw new Error(errorMessage || "Registration failed");
    }

    return data;
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};

export const login = async (credentials) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Invalid email or password");
    }

    return data;
  } catch (error) {
    throw new Error(error.message || "Login failed. Please try again.");
  }
};

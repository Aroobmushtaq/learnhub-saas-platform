// src/utils/token.js

/**
 * Get JWT token from localStorage
 * This assumes you stored token with key = "token"
 */
export const getToken = () => {
  try {
    const token = localStorage.getItem("token");
    return token ? token : null;
  } catch (error) {
    console.error("Error getting token:", error);
    return null;
  }
};

/**
 * Get headers for authenticated requests
 */
export const getAuthHeaders = () => {
  const token = getToken();
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

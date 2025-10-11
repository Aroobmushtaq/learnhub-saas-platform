import axios from "axios";

// Create axios instance
const API = axios.create({
  baseURL: "https://backend-ten-black-50.vercel.app", // backend base URL
});

// Attach token to every request
API.interceptors.request.use(
  (config) => {
    // Get user object from localStorage
    const user = JSON.parse(localStorage.getItem("user"));

    if (user?.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default API;

// src/features/auth/authService.js
import axios from "axios";
import { BASE_URL } from "../../config";
const API_URL = `${BASE_URL}/api/auth/`;

const register = async (userData) => {
  const res = await axios.post(API_URL + "register", userData);
  if (res.data) localStorage.setItem("user", JSON.stringify(res.data));
  return res.data;
};

const login = async (userData) => {
  const res = await axios.post(API_URL + "login", userData);
  if (res.data) localStorage.setItem("user", JSON.stringify(res.data));
  return res.data;
};

const logout = async () => {
  localStorage.removeItem("user");
};

const authService = { register, login, logout };
export default authService;

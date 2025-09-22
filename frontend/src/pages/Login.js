// src/pages/Login.jsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, resetState } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading, isError, isSuccess, message } = useSelector(s => s.auth);

  useEffect(() => {
    if (user) navigate("/");
    if (isSuccess) navigate("/");
    dispatch(resetState());
  }, [user, isSuccess, navigate, dispatch]);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const onSubmit = (e) => { e.preventDefault(); dispatch(login(form)); };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={onSubmit} className="bg-white p-6 rounded shadow w-96">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        {isError && <p className="text-red-500 mb-2">{message}</p>}
        <input name="email" onChange={onChange} value={form.email} placeholder="Email" className="w-full p-2 border rounded mb-2"/>
        <input name="password" onChange={onChange} type="password" value={form.password} placeholder="Password" className="w-full p-2 border rounded mb-4"/>
        <button className="w-full bg-blue-600 text-white p-2 rounded">{isLoading ? "Loading..." : "Login"}</button>
      </form>
    </div>
  );
}

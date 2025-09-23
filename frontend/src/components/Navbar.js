import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, resetState } from "../features/auth/authSlice";

export default function Navbar() {
  const { user } = useSelector((s) => s.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(resetState());
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-3 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">LearnHub</Link>
      <div className="flex space-x-4">
        <Link to="/courses" className="hover:underline">Courses</Link>

        {user ? (
          <>
            <Link to="/my-courses" className="hover:underline">My Courses</Link>
            <button onClick={handleLogout} className="hover:underline">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/register" className="hover:underline">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

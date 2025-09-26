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
      {/* Logo */}
      <Link to="/" className="text-xl font-bold">
        LearnHub
      </Link>

      {/* Links */}
      <div className="flex space-x-4">
        <Link to="/courses" className="hover:underline">
          Courses
        </Link>

        {!user ? (
          // Guest Links
          <>
            <Link to="/login" className="hover:underline">
              Login
            </Link>
            <Link to="/register" className="hover:underline">
              Register
            </Link>
          </>
        ) : user.role === "student" ? (
          // Student Links
          <>
            <Link to="/my-courses" className="hover:underline">
              My Courses
            </Link>
            {/* <Link to="/profile" className="hover:underline">
              Profile
            </Link> */}
            <button onClick={handleLogout} className="hover:underline">
              Logout
            </button>
          </>
        ) : user.role === "instructor" ? (
          // Instructor Links
          <>
            <Link to="/instructor/add-course" className="hover:underline">
              Add Course
            </Link>
            <Link to="/instructor/courses" className="hover:underline">
              My Courses
            </Link>
            <Link to="/profile" className="hover:underline">
              Profile
            </Link>
            <button onClick={handleLogout} className="hover:underline">
              Logout
            </button>
          </>
        ) : null}
      </div>
    </nav>
  );
}

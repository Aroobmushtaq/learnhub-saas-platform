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
     <p className="text-xl font-bold"> LearnHub</p>
 
      {/* Links */}
      <div className="flex space-x-4">
        {!user ? (
          // Guest Links
          <>
           <Link to="/" className="hover:underline">
              Home
            </Link>
          <Link to="/courses" className="hover:underline">
              Courses
            </Link>
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
          <Link to="/" className="hover:underline">
              Home
            </Link>
            <Link to="/courses" className="hover:underline">
              Courses
            </Link>
            <Link to="/my-courses" className="hover:underline">
              My Courses
            </Link>
            <button onClick={handleLogout} className="hover:underline">
              Logout
            </button>
          </>
        ) : user.role === "instructor" ? (
          // Instructor Links
          <>
          <Link to="/" className="hover:underline">
              Home
            </Link>
            <Link to="/instructor/add-course" className="hover:underline">
              Add Course
            </Link>
            <Link to="/instructor/my-courses" className="hover:underline">
              My Courses
            </Link>
            
            <button onClick={handleLogout} className="hover:underline">
              Logout
            </button>
          </>
        ) : user.role === "admin" ? (
          // Admin Links
          <>
          <Link to="/" className="hover:underline">
              Home
            </Link>
            <Link to="/admin/dashboard" className="hover:underline">
              Admin Dashboard
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

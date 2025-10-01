import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register, resetState } from "../features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { GraduationCap, Mail, Lock, User } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });

  const { name, email, password, role } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (user) {
      if (user.role === "instructor") navigate("/instructor/my-courses");
      else if (user.role === "student") navigate("/my-courses");
      else if (user.role === "admin") navigate("/admin/dashboard");
      else navigate("/");
    }
    return () => dispatch(resetState());
  }, [user, navigate, dispatch]);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(register({ name, email, password, role }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/20 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
        <div className="hidden md:block space-y-6">
          <div className="flex items-center space-x-3">
            <GraduationCap className="h-12 w-12 text-primary" />
            <span className="text-4xl font-bold">LearnHub</span>
          </div>
          <h1 className="text-4xl font-bold leading-tight">
            Start Your Learning Journey Today
          </h1>
          <p className="text-xl text-muted-foreground">
            Join thousands of learners advancing their careers and achieving their goals with LearnHub.
          </p>
          <div className="space-y-4">
            {["Free to start", "Expert-led courses", "Lifetime access"].map(
              (item, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-semibold">✓</span>
                  </div>
                  <span>{item}</span>
                </div>
              )
            )}
          </div>
        </div>

        {/* Right Side - Register Form */}
        <div className="card-elevated max-w-md w-full mx-auto p-8">
          <div className="md:hidden flex items-center justify-center space-x-2 mb-6">
            <GraduationCap className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">LearnHub</span>
          </div>

          <h2 className="text-3xl font-bold mb-2">Create Account</h2>
          <p className="text-muted-foreground mb-6">Sign up to start learning</p>

          {isError && <p className="text-red-500 mb-4">{message}</p>}

          <form onSubmit={onSubmit} className="space-y-4">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={onChange}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={onChange}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={onChange}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {/* Role Selection */}
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <select
                id="role"
                name="role"
                value={role}
                onChange={onChange}
                className="border p-2 w-full rounded"
              >
                <option value="student">Student</option>
                <option value="instructor">Instructor</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full btn-hero py-3">
              {isLoading ? "Registering..." : "Create Account"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary font-semibold hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;

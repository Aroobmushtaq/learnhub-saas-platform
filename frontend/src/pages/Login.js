import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, resetState } from "../features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { GraduationCap, Mail, Lock } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { email, password } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, message } = useSelector(
    (state) => state.auth
  );

  // Navigate immediately when login is successful
  useEffect(() => {
    if (user) {
      if (user.role === "instructor") {
        navigate("/instructor/my-courses");
      } else if (user.role === "student") {
        navigate("/my-courses");
      } else if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    }

    return () => {
      dispatch(resetState());
    };
  }, [user, navigate, dispatch]);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
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
            Welcome Back to Your Learning Journey
          </h1>
          <p className="text-xl text-muted-foreground">
            Continue exploring thousands of courses and expanding your knowledge with expert instructors.
          </p>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary font-semibold">✓</span>
              </div>
              <span>Access to 10,000+ courses</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary font-semibold">✓</span>
              </div>
              <span>Learn at your own pace</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary font-semibold">✓</span>
              </div>
              <span>Lifetime access</span>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="card-elevated max-w-md w-full mx-auto">
          <div className="md:hidden flex items-center justify-center space-x-2 mb-6">
            <GraduationCap className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">LearnHub</span>
          </div>

          <h2 className="text-3xl font-bold mb-2">Sign In</h2>
          <p className="text-muted-foreground mb-6">
            Enter your credentials to access your account
          </p>

          {isError && <p className="text-red-500 mb-2">{message}</p>}

          <form onSubmit={onSubmit} className="space-y-4">
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

            <Button type="submit" className="w-full btn-hero">
              {isLoading ? "Logging in..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-primary font-semibold hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

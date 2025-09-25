// src/pages/PaymentSuccess.jsx
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function PaymentSuccess() {
  const query = new URLSearchParams(useLocation().search);
  const sessionId = query.get("session_id");
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionId) {
      console.log("✅ Payment success. Stripe session ID:", sessionId);
      // Optional: you could call backend to verify session here
    }

    // ⏳ Redirect to My Courses after 3 seconds
    const timer = setTimeout(() => {
      navigate("/my-courses");
    }, 3000);

    return () => clearTimeout(timer);
  }, [sessionId, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50">
      <h1 className="text-3xl font-bold text-green-600 mb-4">✅ Payment Successful!</h1>
      <p className="text-gray-700">You are now enrolled in the course.</p>
      <p className="text-sm text-gray-500 mt-2">Redirecting to My Courses...</p>
    </div>
  );
}

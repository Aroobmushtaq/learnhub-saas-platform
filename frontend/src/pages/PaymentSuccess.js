import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState("Verifying payment...");
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const verifyPayment = async () => {
      const sessionId = searchParams.get("session_id");
      if (!sessionId) return;

      try {
        const res = await fetch(
          `http://localhost:5000/api/payments/verify/${sessionId}`,
          { credentials: "include" }
        );
        const data = await res.json();
        if (res.ok) {
          setMessage(data.message);
          setCourse(data.course);
        } else {
          setMessage(data.message || "Payment verification failed.");
        }
      } catch (err) {
        setMessage("Error verifying payment.");
      }
    };

    verifyPayment();
  }, [searchParams]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">🎉 Success</h1>
        <p className="text-gray-700 mb-4">{message}</p>
        {course && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold">{course.title}</h2>
            <p>{course.description}</p>
          </div>
        )}
        <Link
          to="/my-courses"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow-md"
        >
          Go to My Courses
        </Link>
      </div>
    </div>
  );
}

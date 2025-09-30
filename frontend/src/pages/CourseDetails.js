import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

export default function CourseDetails() {
  const { id } = useParams();
  const { courses } = useSelector((state) => state.courses);
  const { user } = useSelector((state) => state.auth);

  const course = courses.find((c) => c._id === id);

  const handleCheckout = async () => {
    try {
      if (!user?.token) {
        alert("Please login first!");
        return;
      }

      // Call your payment session API
      const res = await axios.post(
        `http://localhost:5000/api/payments/create-checkout-session/${course._id}`,
        {},
        { headers: { Authorization: `Bearer ${user.token}` } }
      );

      if (res.data.url) {
        // Redirect to Stripe Checkout
        window.location.href = res.data.url;
      } else {
        alert("Failed to create checkout session");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong while starting payment");
    }
  };

  if (!course) return <p className="text-red-500">Course not found</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">{course.title}</h2>
      <p>{course.description}</p>
      <p className="mt-2 font-semibold">Price: ${course.price}</p>

      <button
        onClick={handleCheckout}
        className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Buy & Enroll
      </button>
    </div>
  );
}

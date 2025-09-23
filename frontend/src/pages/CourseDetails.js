// CourseDetails.js
import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function CourseDetails() {
  const { id } = useParams();
  const { courses } = useSelector((state) => state.courses);

  const course = courses.find((c) => c._id === id);

  if (!course) return <p className="text-red-500">Course not found</p>;

  // ✅ Enroll handler (currently just alert, you can later integrate Stripe/Backend)
  const handleEnroll = () => {
    alert(`You have enrolled in: ${course.title}`);
  };

  return (
    <div className="p-6 border rounded shadow">
      <h2 className="text-2xl font-bold">{course.title}</h2>
      <p className="mt-2 text-gray-700">{course.description}</p>
      <p className="mt-4 font-semibold text-blue-600">
        Price: ${course.price}
      </p>

      <button
        onClick={handleEnroll}
        className="bg-green-600 text-white px-4 py-2 rounded mt-4 hover:bg-green-700"
      >
        Enroll Now
      </button>
    </div>
  );
}

// src/pages/CourseDetails.jsx
import React from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { enrollCourse } from "../features/courses/courseSlice";

export default function CourseDetails() {
  const { id } = useParams();
  const { courses } = useSelector((state) => state.courses);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const course = courses.find((c) => c._id === id);

  const handleEnroll = () => {
    if (!user) {
      alert("Please login first!");
      return;
    }
    try {
      dispatch(enrollCourse(course._id));
      alert("Enrollment successful!");
    } catch (error) {
      alert("Enrollment failed: " + error.message);

    }
  };

  if (!course) return <p className="text-red-500">Course not found</p>;


  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">{course.title}</h2>
      <p>{course.description}</p>
      <p className="mt-2 font-semibold">Price: ${course.price}</p>
      <button
        onClick={handleEnroll}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Enroll Now
      </button>
    </div>
  );
}

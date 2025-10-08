
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

export default function CourseCard({ course }) {
  const user = JSON.parse(localStorage.getItem("user"));

  // Convert role to lowercase to avoid mismatch
  const role = user?.role?.toLowerCase();
  const showEnrollButton = !user || role === "student";
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-5">
      {course.image && (
        <img
          src={`http://localhost:5000/${course.image}`}
          alt={course.title}
          className="w-full h-40 object-cover"
        />
      )}

      <h3 className="text-2xl font-bold mb-2">{course.title}</h3>
      <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>

      <div className="flex justify-between items-center">
        <span className="text-lg font-semibold text-primary">
          ${course.price}
        </span>

        {/*  Only show enroll button for students */}
        {showEnrollButton && (
          <Link to={`/course/${course._id}`}>
            <Button size="sm" className="rounded-lg">
              Enroll Now
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}

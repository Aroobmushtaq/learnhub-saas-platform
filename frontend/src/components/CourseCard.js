import React from "react";
import { Link } from "react-router-dom";

const CourseCard = ({ course }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Course Image */}
      {course.image && (
        <img
          src={`http://localhost:5000/${course.image}`}
          alt={course.title}
          className="w-full h-40 object-cover"
        />
      )}

      {/* Course Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {course.description}
        </p>
        <p className="mt-2 font-semibold text-blue-600">
          Price: ${course.price}
        </p>

        {/* View Course Button */}
        <div className="flex justify-center mt-3">
          <Link
            to={`/courses/${course._id}`}
            className="px-4 py-2 rounded-md bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition w-full text-center"
          >
            View Course
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;

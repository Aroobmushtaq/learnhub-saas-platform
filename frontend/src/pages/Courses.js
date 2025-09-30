import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses } from "../features/courses/courseSlice"; // ✅ only this
import { Link } from "react-router-dom";

const Courses = () => {
  const dispatch = useDispatch();
  const { courses, isLoading, isError, message } = useSelector(
    (state) => state.courses
  );

  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchCourses()); // ✅ load courses when page opens
  }, [dispatch]);

  const handleSearch = (e) => {
    e.preventDefault();
    // ✅ Instead of getCourses, reuse fetchCourses
    dispatch(fetchCourses(search ? `?search=${search}` : ""));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Courses</h1>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Search courses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-80"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Search
        </button>
      </form>

      {isLoading && <p>Loading courses...</p>}
      {isError && <p className="text-red-500">{message}</p>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {courses.length > 0 ? (
          courses.map((course) => (
            <div key={course._id} className="p-4 border rounded shadow">
              <h2 className="font-bold text-lg">{course.title}</h2>
              <p className="text-gray-600">{course.description}</p>
              <p className="mt-2 font-semibold text-blue-600">
                Price: ${course.price}
              </p>
              <Link
                to={`/courses/${course._id}`}
                className="mt-2 inline-block text-white bg-green-500 px-3 py-1 rounded hover:bg-green-600"
              >
                View Details
              </Link>
            </div>
          ))
        ) : (
          <p>No courses found</p>
        )}
      </div>
    </div>
  );
};

export default Courses;

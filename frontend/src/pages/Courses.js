import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses } from "../features/courses/courseSlice";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { BASE_URL } from "../config";
const Courses = () => {
  const dispatch = useDispatch();
  const { courses, isLoading, isError, message } = useSelector(
    (state) => state.courses
  );

  const [search, setSearch] = useState("");
  const [filteredCourses, setFilteredCourses] = useState([]);

  // Load all courses on mount
  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  // Update filtered list when courses or search changes
  useEffect(() => {
    if (search.trim() === "") {
      setFilteredCourses(courses);
    } else {
      setFilteredCourses(
        courses.filter((course) =>
          course.title.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [search, courses]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <section className="section-padding bg-gradient-to-br from-primary/5 via-background to-accent/20">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">Explore Courses</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Discover your next learning adventure from our extensive catalog
          </p>

          {/* Search Bar (no button needed) */}
          <div className="max-w-2xl relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search courses, topics..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-12 h-14 w-full text-lg rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-2">
              {filteredCourses.length}{" "}
              {filteredCourses.length === 1 ? "Course" : "Courses"} Found
            </h2>
          </div>

          {isLoading && <p>Loading courses...</p>}
          {isError && <p className="text-red-500">{message}</p>}

          <div className="grid md:grid-cols-3 gap-8">
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course) => (
                <div
                  key={course._id}
                  className="p-4 border rounded-xl shadow hover:shadow-lg transition bg-white"
                >
                  {/* Course Image */}
                  {course.image && (
                    <img
                      src={
                        course.image.startsWith("http")
                          ? course.image // if image is a full URL (like placeholder)
                          : `${BASE_URL}/${course.image.replace(/\\/g, "/")}` // if image is local
                      }
                      alt={course.title}
                      className="w-full h-40 object-cover rounded mb-3"
                    />
                  )}

                  <h2 className="font-bold text-lg">{course.title}</h2>
                  <p className="text-gray-600 line-clamp-2">
                    {course.description}
                  </p>
                  <p className="mt-2 font-semibold text-blue-600">
                    Price: ${course.price}
                  </p>

                  <Link
                    to={`/courses/${course._id}`}
                    className="block text-center mt-3 w-full rounded-lg bg-primary text-white py-2 font-medium hover:bg-primary/90 transition"
                  >
                    View Course
                  </Link>
                </div>
              ))
            ) : (
              <div className="text-center py-16">
                <p className="text-xl text-muted-foreground">
                  No courses found matching your search.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Courses;

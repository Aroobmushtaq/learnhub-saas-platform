import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEnrolledCourses } from "../features/courses/enrolledSlice";

export default function MyCourses() {
  const dispatch = useDispatch();
  const { courses, isLoading, isError, message } = useSelector((s) => s.enrolled);

  useEffect(() => {
    dispatch(fetchEnrolledCourses());
  }, [dispatch]);

  if (isLoading) return <p className="p-6">Loading...</p>;
  if (isError) return <p className="p-6 text-red-500">{message}</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Enrolled Courses</h2>
      {courses.length === 0 ? (
        <p>You are not enrolled in any courses yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((c) => (
            <div key={c._id} className="border rounded-lg p-4 shadow bg-white">
              <h3 className="text-lg font-semibold">{c.title}</h3>
              <p className="text-sm text-gray-600">{c.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

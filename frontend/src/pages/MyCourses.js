import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyCourses } from "../features/courses/courseSlice";

export default function MyCourses() {
  const dispatch = useDispatch();
  const { myCourses, isLoading, isError, message } = useSelector(
    (state) => state.courses
  );

  useEffect(() => {
    dispatch(fetchMyCourses());
  }, [dispatch]);

  if (isLoading) return <p>Loading your courses...</p>;
  if (isError) return <p className="text-red-500">{message}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Enrolled Courses</h1>

      {myCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {myCourses.map((enroll) => (
            <div
              key={enroll._id}
              className="bg-white border rounded-2xl shadow hover:shadow-lg transition p-5"
            >
              <h2 className="font-bold text-lg mb-2">
                {enroll.course?.title || "Untitled Course"}
              </h2>
              <p className="text-gray-600">
                {enroll.course?.description || "No description available"}
              </p>
              <p className="mt-3 font-semibold text-blue-600">
                Price: ${enroll.course?.price ?? 0}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p>You have not enrolled in any courses yet.</p>
      )}
    </div>
  );
}

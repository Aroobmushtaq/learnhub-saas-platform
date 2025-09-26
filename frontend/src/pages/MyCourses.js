import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyCourses } from "../features/courses/courseSlice";
import { Link } from "react-router-dom";

const MyCourses = () => {
  const dispatch = useDispatch();
  const { myCourses } = useSelector((state) => state.courses);

  useEffect(() => {
    dispatch(fetchMyCourses());
  }, [dispatch]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">My Enrolled Courses</h2>
      {myCourses.length === 0 ? (
        <p>No courses enrolled yet.</p>
      ) : (
        <ul className="space-y-4">
          {myCourses.map((enrollment) => (
            <li
              key={enrollment._id}
              className="p-4 border rounded-lg shadow bg-white"
            >
              <h3 className="text-lg font-semibold">
                {enrollment.course?.title || "Untitled Course"}
              </h3>
              <p className="text-gray-600">
                Price: ${enrollment.course?.price || 0}
              </p>
              <p className="text-sm text-gray-500">
                {enrollment.course?.description || "No description"}
              </p>

              {/* View Lessons button */}
              <Link
                to={`/courses/${enrollment.course?._id}/lessons`}
                className="mt-2 inline-block bg-blue-600 text-white px-4 py-2 rounded"
              >
                View Lessons
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyCourses;

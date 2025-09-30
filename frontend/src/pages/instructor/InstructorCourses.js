import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getMyCourses,
  updateCourse,
  deleteCourse,
} from "../../features/courses/instructorCourseSlice.js";
import { Link } from "react-router-dom";

export default function InstructorCourses() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { myCourses, isLoading, isError, message } = useSelector(
    (s) => s.instructorCourses
  );

  const [editCourse, setEditCourse] = useState(null);

  useEffect(() => {
    dispatch(getMyCourses());
  }, [dispatch]);

  const handleUpdate = (id) => {
    dispatch(updateCourse({ id, courseData: editCourse }));
    setEditCourse(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      dispatch(deleteCourse(id));
    }
  };

  const handleViewLessons = (courseId) => {
    navigate(`/instructor/courses/${courseId}/lessons`);
  };

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (isError) return <p className="text-red-600 text-center">{message}</p>;

  return (
    <div className="max-w-4xl mx-auto mt-6">
      <h2 className="text-2xl font-bold mb-4">My Courses</h2>

      {myCourses.length === 0 ? (
        <p>No courses created yet.</p>
      ) : (
        <ul className="space-y-4">
          {myCourses.map((course) => (
            <li
              key={course._id}
              className="p-4 bg-white shadow rounded space-y-3"
            >
              {editCourse && editCourse._id === course._id ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={editCourse.title}
                    onChange={(e) =>
                      setEditCourse({ ...editCourse, title: e.target.value })
                    }
                    className="border px-2 py-1 w-full"
                  />
                  <textarea
                    value={editCourse.description}
                    onChange={(e) =>
                      setEditCourse({
                        ...editCourse,
                        description: e.target.value,
                      })
                    }
                    className="border px-2 py-1 w-full"
                  />
                  <input
                    type="number"
                    value={editCourse.price}
                    onChange={(e) =>
                      setEditCourse({ ...editCourse, price: e.target.value })
                    }
                    className="border px-2 py-1 w-full"
                  />
                  <input
                    type="text"
                    value={editCourse.category}
                    onChange={(e) =>
                      setEditCourse({ ...editCourse, category: e.target.value })
                    }
                    className="border px-2 py-1 w-full"
                  />
                  <button
                    onClick={() => handleUpdate(course._id)}
                    className="bg-green-600 text-white px-3 py-1 rounded mr-2"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditCourse(null)}
                    className="bg-gray-600 text-white px-3 py-1 rounded"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <>
                  <div>
                    <h3 className="font-bold">{course.title}</h3>
                    <p>{course.description}</p>
                    <p className="text-sm text-gray-600">
                      ${course.price} - {course.category}
                    </p>
                  </div>
                  <div className="space-x-2">
                    <Link
                      to={`/instructor/course/${course._id}`}
                      className="bg-indigo-600 text-white px-3 py-1 rounded"
                    >
                      View Users
                    </Link>
                    <button
                      onClick={() => handleViewLessons(course._id)}
                      className="bg-blue-600 text-white px-3 py-1 rounded"
                    >
                      Manage Lessons
                    </button>
                    <button
                      onClick={() => setEditCourse(course)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(course._id)}
                      className="bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

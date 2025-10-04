// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   getMyCourses,
//   updateCourse,
//   deleteCourse,
// } from "../../features/courses/instructorCourseSlice.js";
// import { Link } from "react-router-dom";

// export default function InstructorCourses() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { myCourses, isLoading, isError, message } = useSelector(
//     (s) => s.instructorCourses
//   );

//   const [editCourse, setEditCourse] = useState(null);

//   useEffect(() => {
//     dispatch(getMyCourses());
//   }, [dispatch]);

//   const handleUpdate = (id) => {
//     dispatch(updateCourse({ id, courseData: editCourse }));
//     setEditCourse(null);
//   };

//   const handleDelete = (id) => {
//     if (window.confirm("Are you sure you want to delete this course?")) {
//       dispatch(deleteCourse(id));
//     }
//   };

//   const handleViewLessons = (courseId) => {
//     navigate(`/instructor/courses/${courseId}/lessons`);
//   };

//   if (isLoading) return <p className="text-center">Loading...</p>;
//   if (isError) return <p className="text-red-600 text-center">{message}</p>;

//   return (
//     <div className="max-w-4xl mx-auto mt-6">
//       <h2 className="text-2xl font-bold mb-4">My Courses</h2>

//       {myCourses.length === 0 ? (
//         <p>No courses created yet.</p>
//       ) : (
//         <ul className="space-y-4">
//           {myCourses.map((course) => (
//             <li
//               key={course._id}
//               className="p-4 bg-white shadow rounded space-y-3"
//             >
//               {editCourse && editCourse._id === course._id ? (
//                 <div className="space-y-2">
//                   <input
//                     type="text"
//                     value={editCourse.title}
//                     onChange={(e) =>
//                       setEditCourse({ ...editCourse, title: e.target.value })
//                     }
//                     className="border px-2 py-1 w-full"
//                   />
//                   <textarea
//                     value={editCourse.description}
//                     onChange={(e) =>
//                       setEditCourse({
//                         ...editCourse,
//                         description: e.target.value,
//                       })
//                     }
//                     className="border px-2 py-1 w-full"
//                   />
//                   <input
//                     type="number"
//                     value={editCourse.price}
//                     onChange={(e) =>
//                       setEditCourse({ ...editCourse, price: e.target.value })
//                     }
//                     className="border px-2 py-1 w-full"
//                   />
//                   <input
//                     type="text"
//                     value={editCourse.category}
//                     onChange={(e) =>
//                       setEditCourse({ ...editCourse, category: e.target.value })
//                     }
//                     className="border px-2 py-1 w-full"
//                   />
//                   <button
//                     onClick={() => handleUpdate(course._id)}
//                     className="bg-green-600 text-white px-3 py-1 rounded mr-2"
//                   >
//                     Save
//                   </button>
//                   <button
//                     onClick={() => setEditCourse(null)}
//                     className="bg-gray-600 text-white px-3 py-1 rounded"
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               ) : (
//                 <>
//                   <div>
//                     <h3 className="font-bold">{course.title}</h3>
//                     <p>{course.description}</p>
//                     <p className="text-sm text-gray-600">
//                       ${course.price} - {course.category}
//                     </p>
//                   </div>
//                   <div className="space-x-2">
//                     <Link
//                       to={`/instructor/course/${course._id}`}
//                       className="bg-indigo-600 text-white px-3 py-1 rounded"
//                     >
//                       View Users
//                     </Link>
//                     <button
//                       onClick={() => handleViewLessons(course._id)}
//                       className="bg-blue-600 text-white px-3 py-1 rounded"
//                     >
//                       Manage Lessons
//                     </button>
//                     <button
//                       onClick={() => setEditCourse(course)}
//                       className="bg-yellow-500 text-white px-3 py-1 rounded"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => handleDelete(course._id)}
//                       className="bg-red-600 text-white px-3 py-1 rounded"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </>
//               )}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getMyCourses,
  updateCourse,
  deleteCourse,
} from "../../features/courses/instructorCourseSlice.js";

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

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (isError) return <p className="text-red-600 text-center mt-10">{message}</p>;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-extrabold text-blue-700 mb-6 text-center">
          My Courses
        </h2>

        {myCourses.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">
            You haven't created any courses yet.
          </p>
        ) : (
          <ul className="space-y-6">
            {myCourses.map((course) => (
              <li
                key={course._id}
                className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition-shadow duration-200"
              >
                {editCourse && editCourse._id === course._id ? (
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={editCourse.title}
                      onChange={(e) =>
                        setEditCourse({ ...editCourse, title: e.target.value })
                      }
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <textarea
                      value={editCourse.description}
                      onChange={(e) =>
                        setEditCourse({
                          ...editCourse,
                          description: e.target.value,
                        })
                      }
                      rows="3"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="number"
                        value={editCourse.price}
                        onChange={(e) =>
                          setEditCourse({ ...editCourse, price: e.target.value })
                        }
                        className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <input
                        type="text"
                        value={editCourse.category}
                        onChange={(e) =>
                          setEditCourse({ ...editCourse, category: e.target.value })
                        }
                        className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleUpdate(course._id)}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:opacity-90 transition"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditCourse(null)}
                        className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:opacity-90 transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Course info */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0">
                      <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4">
                        {/* Optional image */}
                        {course.image && (
                          <img
                            src={`http://localhost:5000/${course.image}`}
                            alt={course.title}
                            className="w-36 h-24 object-cover rounded-lg shadow-sm"
                          />
                        )}
                        <div>
                          <h3 className="text-xl font-semibold">{course.title}</h3>
                          <p className="text-gray-600 mt-1">{course.description}</p>
                          <p className="text-sm text-gray-500 mt-1">
                            ${course.price} - {course.category}
                          </p>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex flex-wrap gap-2 mt-3 md:mt-0">
                        <Link
                          to={`/instructor/course/${course._id}`}
                          className="bg-indigo-600 text-white px-3 py-1 rounded-lg hover:opacity-90 transition"
                        >
                          View Users
                        </Link>
                        <button
                          onClick={() => handleViewLessons(course._id)}
                          className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:opacity-90 transition"
                        >
                          Manage Lessons
                        </button>
                        <button
                          onClick={() => setEditCourse(course)}
                          className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:opacity-90 transition"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(course._id)}
                          className="bg-red-600 text-white px-3 py-1 rounded-lg hover:opacity-90 transition"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

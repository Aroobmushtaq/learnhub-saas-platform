// import React from "react";
// import { Link } from "react-router-dom";

// const CourseCard = ({ course }) => {
//   return (
//     <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
//       {/* Course Image */}
//       {course.image && (
//         <img
//           src={`http://localhost:5000/${course.image}`}
//           alt={course.title}
//           className="w-full h-40 object-cover"
//         />
//       )}

//       {/* Course Content */}
//       <div className="p-4">
//         <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
//         <p className="text-gray-600 text-sm mb-3 line-clamp-2">
//           {course.description}
//         </p>
//         <p className="mt-2 font-semibold text-blue-600">
//           Price: ${course.price}
//         </p>

//         {/* View Course Button */}
//         <div className="flex justify-center mt-3">
//           <Link
//             to={`/courses/${course._id}`}
//             className="px-4 py-2 rounded-md bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition w-full text-center"
//           >
//             View Course
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CourseCard;


import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

export default function CourseCard({ course }) {
  const user = JSON.parse(localStorage.getItem("user"));

  // Convert role to lowercase to avoid mismatch
  const role = user?.role?.toLowerCase();
  const showEnrollButton = !user || role === "student";

  // Debug logs
  console.log("🧠 Current user:", user);
  console.log("📘 Detected role:", role);
  console.log("🎯 Show Enroll Button:", showEnrollButton);

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-5">
      <div className="rounded-xl overflow-hidden mb-4">
        <img
          src={course.image || "/placeholder.jpg"}
          alt={course.title}
          className="w-full h-48 object-cover"
        />
      </div>

      <h3 className="text-2xl font-bold mb-2">{course.title}</h3>
      <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>

      <div className="flex justify-between items-center">
        <span className="text-lg font-semibold text-primary">
          Rs {course.price}
        </span>

        {/* ✅ Only show enroll button for students */}
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

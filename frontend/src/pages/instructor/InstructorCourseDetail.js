// // src/pages/instructor/InstructorCourseDetail.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCourseEnrollments } from "../../features/enrolment/enrollmentService";

export default function InstructorCourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [course, setCourse] = useState(null);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user?.token) {
      navigate("/login");
      return;
    }

    const fetchDetails = async () => {
      try {
        // ✅ Get course detail
        const res = await fetch(`http://localhost:5000/api/instructor/course/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        });
        if (!res.ok) throw new Error("Failed to fetch course");
        const data = await res.json();
        setCourse(data);

        // ✅ Get enrolled students
        const enrolled = await getCourseEnrollments(id, user.token);
        setStudents(enrolled);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id, user, navigate]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto mt-6 p-4 shadow rounded bg-white">
      {/* Course Info */}
      <h2 className="text-2xl font-bold mb-4">{course?.title}</h2>
      <p>{course?.description}</p>
      <p className="text-gray-600 mt-2">
        {course?.price ? `Price: $${course.price}` : ""}{" "}
        {course?.category ? `| Category: ${course.category}` : ""}
      </p>

      {/* Enrolled Students */}
      <h3 className="text-xl font-bold mt-6 mb-2">Enrolled Students</h3>
      {students.length > 0 ? (
        <ul className="list-disc pl-6">
          {students.map((e) => (
            <li key={e._id}>
              {e.student?.name} ({e.student?.email}) – <span className="italic">{e.status}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No students enrolled yet.</p>
      )}
    </div>
  );
}

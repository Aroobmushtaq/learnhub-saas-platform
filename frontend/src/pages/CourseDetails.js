import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = React.useState(null);
  const [lessons, setLessons] = React.useState([]);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/courses/${id}`);
        setCourse(res.data);
      } catch (err) {
        console.error("Error fetching course", err);
      }
    };

    const fetchLessons = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/lessons/${id}`);
        setLessons(res.data);
      } catch (err) {
        console.error("Error fetching lessons", err);
      }
    };

    fetchCourse();
    fetchLessons();
  }, [id]);

  if (!course) return <p className="p-6">Loading course details...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{course.title}</h1>
      <p className="mt-2 text-gray-700">{course.description}</p>
      <p className="mt-2 font-semibold text-blue-600">Price: ${course.price}</p>

      <h2 className="mt-6 text-xl font-bold">Lessons</h2>
      {lessons.length > 0 ? (
        <ul className="list-disc ml-6 mt-2">
          {lessons.map((lesson) => (
            <li key={lesson._id}>
              <h3 className="font-semibold">{lesson.title}</h3>
              <p>{lesson.content}</p>
              <a
                href={lesson.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                Watch Video
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No lessons available.</p>
      )}
    </div>
  );
};

export default CourseDetails;

// src/pages/LessonPage.js
import React, { useEffect, useState } from "react";
import { fetchLessons } from "../features/lessons/lessonService";
import { useParams } from "react-router-dom";

const LessonPage = () => {
  const { courseId } = useParams(); // gets courseId from URL
  const [lessons, setLessons] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadLessons = async () => {
      try {
        const data = await fetchLessons(courseId);
        setLessons(data);
      } catch (err) {
        setError(err.message || "Failed to load lessons");
      }
    };

    if (courseId) {
      loadLessons();
    }
  }, [courseId]);

  return (
    <div>
      <h2>Lessons</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {lessons.length > 0 ? (
        <ul>
          {lessons.map((lesson) => (
            <li key={lesson._id}>{lesson.title}</li>
          ))}
        </ul>
      ) : (
        !error && <p>No lessons found.</p>
      )}
    </div>
  );
};

export default LessonPage;

// src/pages/LessonsPage.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchLessons } from "../features/lessons/lessonService";

export default function LessonsPage() {
  const { courseId } = useParams();
  const [lessons, setLessons] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadLessons = async () => {
      try {
        const data = await fetchLessons(courseId);
        setLessons(data);
      } catch (err) {
        setError("Failed to load lessons");
      }
    };
    loadLessons();
  }, [courseId]);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!lessons.length) return <p>No lessons available for this course.</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Lessons</h1>
      <ul className="space-y-4">
        {lessons.map((lesson) => (
          <li key={lesson._id} className="p-4 border rounded shadow">
            <h2 className="font-semibold text-lg">{lesson.title}</h2>
            <p className="text-gray-700 mb-2">{lesson.content}</p>

            {lesson.videoUrl && (
              <a
                href={lesson.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                Watch Video
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

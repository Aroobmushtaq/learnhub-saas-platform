import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

export default function LessonsPage() {
  const { courseId } = useParams();
  const { user } = useSelector((state) => state.auth);
  const [lessons, setLessons] = useState([]);
  const [newLesson, setNewLesson] = useState({ title: "", content: "", videoUrl: "" });

  // Fetch lessons
  const fetchLessons = async () => {
    if (!courseId || !user?.token) return;
    try {
      const res = await axios.get(
        `http://localhost:5000/api/lessons/${courseId}`,
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setLessons(res.data.map((l) => ({ ...l, isEditing: false })));
    } catch (err) {
      console.error("Error fetching lessons:", err.response?.data || err);
    }
  };

  useEffect(() => {
    fetchLessons();
  }, [courseId, user?.token]);

  const addLesson = async () => {
    if (!newLesson.title || !newLesson.content) return;
    try {
      const res = await axios.post(
        `http://localhost:5000/api/lessons/${courseId}`,
        newLesson,
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setLessons((prev) => [...prev, { ...res.data, isEditing: false }]);
      setNewLesson({ title: "", content: "", videoUrl: "" });
    } catch (err) {
      console.error("Error adding lesson:", err.response?.data || err);
    }
  };

  const updateLesson = async (lessonId, updatedData) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/lessons/${lessonId}`,
        updatedData,
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setLessons((prev) =>
        prev.map((l) => (l._id === lessonId ? { ...res.data, isEditing: false } : l))
      );
    } catch (err) {
      console.error("Error updating lesson:", err.response?.data || err);
    }
  };

  const deleteLesson = async (lessonId) => {
    try {
      await axios.delete(`http://localhost:5000/api/lessons/${lessonId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setLessons((prev) => prev.filter((l) => l._id !== lessonId));
    } catch (err) {
      console.error("Error deleting lesson:", err.response?.data || err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 px-4">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Lessons</h2>

      {/* Add Lesson Form */}
      <div className="bg-white shadow-md rounded-xl p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">Add a New Lesson</h3>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Lesson Title"
            value={newLesson.title}
            onChange={(e) => setNewLesson({ ...newLesson, title: e.target.value })}
            className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <textarea
            placeholder="Lesson Content"
            value={newLesson.content}
            onChange={(e) => setNewLesson({ ...newLesson, content: e.target.value })}
            className="border border-gray-300 rounded-lg px-4 py-2 w-full h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            placeholder="Video URL (Optional)"
            value={newLesson.videoUrl}
            onChange={(e) => setNewLesson({ ...newLesson, videoUrl: e.target.value })}
            className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={addLesson}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition-all"
          >
            Add Lesson
          </button>
        </div>
      </div>

      {/* Lessons List */}
      {lessons.length === 0 ? (
        <p className="text-gray-500">No lessons yet.</p>
      ) : (
        <ul className="space-y-5">
          {lessons.map((lesson) => (
            <li key={lesson._id} className="bg-white shadow-md rounded-xl p-5 flex flex-col md:flex-row justify-between items-start md:items-center transition hover:shadow-lg">
              {lesson.isEditing ? (
                <div className="w-full space-y-3">
                  <input
                    type="text"
                    value={lesson.title}
                    onChange={(e) =>
                      setLessons((prev) =>
                        prev.map((l) => (l._id === lesson._id ? { ...l, title: e.target.value } : l))
                      )
                    }
                    className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                  <textarea
                    value={lesson.content}
                    onChange={(e) =>
                      setLessons((prev) =>
                        prev.map((l) => (l._id === lesson._id ? { ...l, content: e.target.value } : l))
                      )
                    }
                    className="border border-gray-300 rounded-lg px-4 py-2 w-full h-20 resize-none focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                  <input
                    type="text"
                    value={lesson.videoUrl}
                    onChange={(e) =>
                      setLessons((prev) =>
                        prev.map((l) => (l._id === lesson._id ? { ...l, videoUrl: e.target.value } : l))
                      )
                    }
                    className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                  <div className="flex space-x-3 mt-2">
                    <button
                      onClick={() => updateLesson(lesson._id, lesson)}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded-lg transition"
                    >
                      Save
                    </button>
                    <button
                      onClick={() =>
                        setLessons((prev) =>
                          prev.map((l) => (l._id === lesson._id ? { ...l, isEditing: false } : l))
                        )
                      }
                      className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-1 rounded-lg transition"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col md:flex-row justify-between w-full items-start md:items-center">
                  <div className="space-y-1 md:w-3/4">
                    <h4 className="text-lg font-semibold text-gray-800">{lesson.title}</h4>
                    <p className="text-gray-600">{lesson.content}</p>
                    {lesson.videoUrl && (
                      <a
                        href={lesson.videoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 hover:underline text-sm"
                      >
                        Watch Video
                      </a>
                    )}
                  </div>
                  <div className="flex space-x-3 mt-3 md:mt-0">
                    <button
                      onClick={() =>
                        setLessons((prev) =>
                          prev.map((l) => (l._id === lesson._id ? { ...l, isEditing: true } : l))
                        )
                      }
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteLesson(lesson._id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

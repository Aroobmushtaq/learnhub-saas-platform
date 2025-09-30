import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

export default function LessonsPage() {
  const { courseId } = useParams();
  const { user } = useSelector((state) => state.auth);
  const [lessons, setLessons] = useState([]);
  const [newLesson, setNewLesson] = useState({
    title: "",
    content: "",
    videoUrl: "",
  });

  // ✅ Fetch lessons
  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/lessons/${courseId}`,
          { headers: { Authorization: `Bearer ${user?.token}` } }
        );
        setLessons(res.data);
      } catch (error) {
        console.error("Error fetching lessons:", error.response?.data || error);
      }
    };
    if (courseId && user?.token) fetchLessons();
  }, [courseId, user?.token]);

  // ✅ Add lesson
  const addLesson = async () => {
    try {
      const res = await axios.post(
        `http://localhost:5000/api/lessons/${courseId}`,
        newLesson,
        { headers: { Authorization: `Bearer ${user?.token}` } }
      );
      setLessons((prev) => [...prev, res.data]);
      setNewLesson({ title: "", content: "", videoUrl: "" });
    } catch (error) {
      console.error("Error adding lesson:", error.response?.data || error);
    }
  };

  // ✅ Update lesson
  const updateLesson = async (lessonId, updatedData) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/lessons/${lessonId}`,
        updatedData,
        { headers: { Authorization: `Bearer ${user?.token}` } }
      );
      setLessons((prev) =>
        prev.map((l) =>
          l._id === lessonId ? { ...res.data, isEditing: false } : l
        )
      );
    } catch (error) {
      console.error("Error updating lesson:", error.response?.data || error);
    }
  };

  // ✅ Delete lesson
  const deleteLesson = async (lessonId) => {
    try {
      await axios.delete(`http://localhost:5000/api/lessons/${lessonId}`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      setLessons((prev) => prev.filter((l) => l._id !== lessonId));
    } catch (error) {
      console.error("Error deleting lesson:", error.response?.data || error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-6">
      <h2 className="text-2xl font-bold mb-4">Lessons</h2>

      {/* Add Lesson Form */}
      <div className="mb-6 space-y-2 border p-4 rounded">
        <h3 className="font-semibold">Add a New Lesson</h3>
        <input
          type="text"
          placeholder="Lesson Title"
          value={newLesson.title}
          onChange={(e) =>
            setNewLesson({ ...newLesson, title: e.target.value })
          }
          className="border px-2 py-1 w-full"
        />
        <textarea
          placeholder="Lesson Content"
          value={newLesson.content}
          onChange={(e) =>
            setNewLesson({ ...newLesson, content: e.target.value })
          }
          className="border px-2 py-1 w-full"
        />
        <input
          type="text"
          placeholder="Video URL"
          value={newLesson.videoUrl}
          onChange={(e) =>
            setNewLesson({ ...newLesson, videoUrl: e.target.value })
          }
          className="border px-2 py-1 w-full"
        />
        <button
          onClick={addLesson}
          className="bg-green-600 text-white px-3 py-1 rounded"
        >
          Add Lesson
        </button>
      </div>

      {/* Lessons List */}
      {lessons.length === 0 ? (
        <p>No lessons yet.</p>
      ) : (
        <ul className="space-y-3">
          {lessons.map((lesson) => (
            <li key={lesson._id} className="p-3 border rounded">
              {lesson.isEditing ? (
                // ✅ Edit Mode
                <div className="space-y-2">
                  <input
                    type="text"
                    value={lesson.title}
                    onChange={(e) =>
                      setLessons((prev) =>
                        prev.map((l) =>
                          l._id === lesson._id
                            ? { ...l, title: e.target.value }
                            : l
                        )
                      )
                    }
                    className="border px-2 py-1 w-full"
                  />
                  <textarea
                    value={lesson.content}
                    onChange={(e) =>
                      setLessons((prev) =>
                        prev.map((l) =>
                          l._id === lesson._id
                            ? { ...l, content: e.target.value }
                            : l
                        )
                      )
                    }
                    className="border px-2 py-1 w-full"
                  />
                  <input
                    type="text"
                    value={lesson.videoUrl}
                    onChange={(e) =>
                      setLessons((prev) =>
                        prev.map((l) =>
                          l._id === lesson._id
                            ? { ...l, videoUrl: e.target.value }
                            : l
                        )
                      )
                    }
                    className="border px-2 py-1 w-full"
                  />
                  <button
                    onClick={() => updateLesson(lesson._id, lesson)}
                    className="bg-green-600 text-white px-2 py-1 rounded"
                  >
                    Save
                  </button>
                  <button
                    onClick={() =>
                      setLessons((prev) =>
                        prev.map((l) =>
                          l._id === lesson._id
                            ? { ...l, isEditing: false }
                            : l
                        )
                      )
                    }
                    className="bg-gray-500 text-white px-2 py-1 rounded ml-2"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                // ✅ Normal View
                <div className="flex justify-between">
                  <div>
                    <h4 className="font-semibold">{lesson.title}</h4>
                    <p className="text-sm">{lesson.content}</p>
                    {lesson.videoUrl && (
                      <a
                        href={lesson.videoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 text-sm"
                      >
                        Watch Video
                      </a>
                    )}
                  </div>
                  <div className="space-x-2">
                    <button
                      onClick={() =>
                        setLessons((prev) =>
                          prev.map((l) =>
                            l._id === lesson._id
                              ? { ...l, isEditing: true }
                              : l
                          )
                        )
                      }
                      className="bg-yellow-500 text-white px-2 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteLesson(lesson._id)}
                      className="bg-red-600 text-white px-2 py-1 rounded"
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

// // src/pages/LessonsPage.js
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { fetchLessons } from "../features/lessons/lessonService";

// export default function LessonsPage() {
//   const { courseId } = useParams();
//   const [lessons, setLessons] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const loadLessons = async () => {
//       try {
//         const data = await fetchLessons(courseId);
//         setLessons(data);
//       } catch (err) {
//         setError("Failed to load lessons");
//       }
//     };
//     loadLessons();
//   }, [courseId]);

//   if (error) return <p className="text-red-500">{error}</p>;
//   if (!lessons.length) return <p>No lessons available for this course.</p>;

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Lessons</h1>
//       <ul className="space-y-4">
//         {lessons.map((lesson) => (
//           <li key={lesson._id} className="p-4 border rounded shadow">
//             <h2 className="font-semibold text-lg">{lesson.title}</h2>
//             <p className="text-gray-700 mb-2">{lesson.content}</p>

//             {lesson.videoUrl && (
//               <a
//                 href={lesson.videoUrl}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-blue-600 underline"
//               >
//                 Watch Video
//               </a>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
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

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );

  if (!lessons.length)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">No lessons available for this course.</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <section className="section-padding bg-gradient-to-br from-primary/5 via-background to-accent/20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Course Lessons</h1>
          <p className="text-lg text-muted-foreground">
            Explore the lessons included in this course
          </p>
        </div>
      </section>

      {/* Lessons List */}
      <section className="section-padding">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-6">
          {lessons.map((lesson) => (
            <div
              key={lesson._id}
              className="p-6 border rounded-xl shadow hover:shadow-lg transition bg-white"
            >
              <h2 className="font-semibold text-xl mb-2">{lesson.title}</h2>
              <p className="text-gray-700 mb-3">{lesson.content}</p>

              {lesson.videoUrl && (
                <a
                  href={lesson.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 px-4 py-2 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition"
                >
                  Watch Video
                </a>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

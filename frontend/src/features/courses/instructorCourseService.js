import axios from "axios";

const API_URL = "http://localhost:5000/api";
const API_URLL = "http://localhost:5000/api/courses";

// Helper to add token
const authConfig = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});

// ✅ Create Course
const createCourse = async (courseData, token) => {
  const res = await axios.post(API_URLL, courseData, authConfig(token));
  return res.data;
};

// ✅ Get Instructor’s Courses
const getMyCourses = async (token) => {
  const res = await axios.get(`${API_URL}/instructor/courses`, authConfig(token));
  return res.data;
};

// ✅ Update Course
const updateCourse = async (id, courseData, token) => {
  const res = await axios.put(`${API_URLL}/${id}`, courseData, authConfig(token));
  return res.data;
};

// ✅ Delete Course
const deleteCourse = async (id, token) => {
  const res = await axios.delete(`${API_URLL}/${id}`, authConfig(token));
  return res.data;
};
const getCourseDetailWithStudents = async (id, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const res = await axios.get(`http://localhost:5000/api/instructor/course/${id}`, config);
  return res.data;
};
const instructorCourseService = {
  createCourse,
  getMyCourses,
  updateCourse,
  deleteCourse,
  getCourseDetailWithStudents
};

export default instructorCourseService;





// import axios from "axios";

// const API_URL = "http://localhost:5000/api";
// const API_URLL = `${API_URL}/courses`;

// // Helper to add token
// const authConfig = (token) => ({
//   headers: { Authorization: `Bearer ${token}` },
// });

// // ✅ Create Course
// const createCourse = async (courseData, token) => {
//   const res = await axios.post(API_URLL, courseData, authConfig(token));
//   return res.data;
// };

// // ✅ Get Instructor’s Courses
// const getMyCourses = async (token) => {
//   const res = await axios.get(`${API_URL}/instructor/courses`, authConfig(token));
//   return res.data;
// };

// // ✅ Update Course
// const updateCourse = async (id, courseData, token) => {
//   const res = await axios.put(`${API_URLL}/${id}`, courseData, authConfig(token));
//   return res.data;
// };

// // ✅ Delete Course
// const deleteCourse = async (id, token) => {
//   const res = await axios.delete(`${API_URLL}/${id}`, authConfig(token));
//   return res.data;
// };

// // ✅ Get Course Detail + Students
// const getCourseDetailWithStudents = async (id, token) => {
//   const res = await axios.get(`${API_URL}/instructor/course/${id}`, authConfig(token));
//   return res.data;
// };

// /* ---------------- LESSONS ---------------- */

// // ✅ Get Lessons by Course ID
// const getLessons = async (courseId, token) => {
//   const res = await axios.get(`${API_URL}/lessons/${courseId}`, authConfig(token));
//   return res.data;
// };

// // ✅ Create Lesson
// const createLesson = async (courseId, lessonData, token) => {
//   const res = await axios.post(`${API_URL}/lessons/${courseId}`, lessonData, authConfig(token));
//   return res.data;
// };

// // ✅ Update Lesson
// const updateLesson = async (lessonId, lessonData, token) => {
//   const res = await axios.put(`${API_URL}/lessons/${lessonId}`, lessonData, authConfig(token));
//   return res.data;
// };

// // ✅ Delete Lesson
// const deleteLesson = async (lessonId, token) => {
//   const res = await axios.delete(`${API_URL}/lessons/${lessonId}`, authConfig(token));
//   return res.data;
// };

// const instructorCourseService = {
//   createCourse,
//   getMyCourses,
//   updateCourse,
//   deleteCourse,
//   getCourseDetailWithStudents,
//   getLessons,
//   createLesson,
//   updateLesson,
//   deleteLesson,
// };

// export default instructorCourseService;

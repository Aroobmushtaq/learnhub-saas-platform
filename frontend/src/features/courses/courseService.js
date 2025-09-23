import axios from "axios";

const API_URL = "http://localhost:5000/api/enrollments/courses";

// Get all courses (supports search/filter via query)
const getCourses = async (query = "") => {
  const response = await axios.get(`${API_URL}${query}`);
  return response.data;
};

// Enroll in a course
const enrollCourse = async (courseId, userId) => {
  const response = await axios.post("http://localhost:5000/api/enrollments", {
    courseId,
    userId,
  });
  return response.data;
};

const courseService = { getCourses, enrollCourse };
export default courseService;

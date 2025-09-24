// src/services/courseService.js
import axios from "axios";

const API_URL = "http://localhost:5000/api";

// Get all courses
const getCourses = async (query = "") => {
  const response = await axios.get(`${API_URL}/courses${query}`);
  return response.data;
};

// Enroll in a course
const enrollCourse = async (courseId) => {
  const token = localStorage.getItem("token"); // Must exist
  if (!token) throw new Error("No token found. Please login first.");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(`${API_URL}/enrollments/${courseId}`, {}, config);
  return response.data;
};

const courseService = { getCourses, enrollCourse };
export default courseService;

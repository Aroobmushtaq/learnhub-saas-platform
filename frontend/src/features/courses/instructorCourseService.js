import axios from "axios";
import { BASE_URL } from "../../config";
const API_URL = `${BASE_URL}/api`;
const API_URLL = `${BASE_URL}/api/courses`;

// Helper to add token
const authConfig = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});

//  Create Course
const createCourse = async (courseData, token) => {
  const res = await axios.post(API_URLL, courseData, authConfig(token));
  return res.data;
};

//  Get Instructor’s Courses
const getMyCourses = async (token) => {
  const res = await axios.get(`${API_URL}/instructor/courses`, authConfig(token));
  return res.data;
};

//  Update Course
const updateCourse = async (id, courseData, token) => {
  const res = await axios.put(`${API_URLL}/${id}`, courseData, authConfig(token));
  return res.data;
};

//  Delete Course
const deleteCourse = async (id, token) => {
  const res = await axios.delete(`${API_URLL}/${id}`, authConfig(token));
  return res.data;
};
const getCourseDetailWithStudents = async (id, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const res = await axios.get(`${BASE_URL}/api/instructor/course/${id}`, config);
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

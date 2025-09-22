import axios from "axios";

const API_URL = "http://localhost:5000/api/courses";

// Get all courses (supports search/filter via query)
const getCourses = async (query = "") => {
  const response = await axios.get(`${API_URL}${query}`);
  return response.data;
};

const courseService = { getCourses };
export default courseService;

// src/features/lessons/lessonService.js
import API from "../../utils/axiosConfig";
import { BASE_URL } from "../../config";
// Function to fetch lessons
export const fetchLessons = async (courseId) => {
  try {
    const response = await API.get(`${BASE_URL}/api/lessons/${courseId}`);
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching lessons:", error.response?.data || error.message);
    throw error.response?.data || { message: "Something went wrong" };
  }
};

// Export as default (so you can use either way)
export default {
  fetchLessons,
};

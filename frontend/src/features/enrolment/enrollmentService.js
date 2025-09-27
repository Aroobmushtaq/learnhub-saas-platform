import axios from "axios";

const API_URL = "http://localhost:5000/api/enrollments";

// ✅ Add token helper
const authConfig = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});

// ✅ Enroll in a course
export const enrollCourse = async (courseId, token) => {
  const res = await axios.post(`${API_URL}/${courseId}`, {}, authConfig(token));
  return res.data;
};

// ✅ Get my enrollments
export const getMyEnrollments = async (token) => {
  const res = await axios.get(`${API_URL}/my`, authConfig(token));
  return res.data;
};

// ✅ Get enrolled students for a course
export const getCourseEnrollments = async (courseId, token) => {
  const res = await axios.get(`${API_URL}/course/${courseId}`, authConfig(token));
  return res.data;
};

// ✅ Update enrollment status (pending/active/completed)
export const updateEnrollmentStatus = async (enrollmentId, status, token) => {
  const res = await axios.put(
    `${API_URL}/${enrollmentId}/status`,
    { status },
    authConfig(token)
  );
  return res.data;
};

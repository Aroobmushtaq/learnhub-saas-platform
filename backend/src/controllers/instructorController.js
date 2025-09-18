import Course from "../models/Course.js";
import Enrollment from "../models/Enrollment.js";
export const getInstructorCourses = async (req, res) => {
  try {
    const courses = await Course.find({ instructor: req.user._id });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching instructor courses" });
  }
};
export const getCourseWithStudents = async (req, res) => {
  try {
    const courseId = req.params.id;

    const course = await Course.findOne({
      _id: courseId,
      instructor: req.user._id
    });

    if (!course) {
      return res.status(404).json({ message: "Course not found or not yours" });
    }

    const students = await Enrollment.find({ course: courseId })
      .populate("student", "name email");

    res.json({ course, students });
  } catch (error) {
    res.status(500).json({ message: "Error fetching course details" });
  }
};
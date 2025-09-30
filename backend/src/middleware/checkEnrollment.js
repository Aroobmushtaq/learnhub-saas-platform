import Enrollment from "../models/Enrollment.js";

export const checkEnrollment = async (req, res, next) => {
  try {
    const courseId = req.params.courseId;
    const studentId = req.user._id;

    const enrollment = await Enrollment.findOne({
      student: studentId,
      course: courseId,
      status: "active",
    });

    if (!enrollment) {
      return res.status(403).json({ message: "You are not enrolled in this course." });
    }

    next(); // ✅ student is enrolled → continue
  } catch (error) {
    res.status(500).json({ message: "Error checking enrollment" });
  }
};

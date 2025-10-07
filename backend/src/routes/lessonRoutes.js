import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createLesson,
  getLessons,
  updateLesson,
  deleteLesson,
} from "../controllers/lessonController.js";
import Course from "../models/Course.js";
import Enrollment from "../models/Enrollment.js";

const router = express.Router();

//  Get lessons (Instructor OR enrolled students)
router.get("/:courseId", protect, async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    //  If instructor → allow access
    if (course.instructor.toString() === req.user._id.toString()) {
      return getLessons(req, res);
    }

    //  Otherwise check Enrollment collection
    const enrollment = await Enrollment.findOne({
      student: req.user._id,
      course: req.params.courseId,
      status: "active",
    });

    if (enrollment) {
      return getLessons(req, res);
    }

    return res.status(403).json({ message: "You are not enrolled in this course." });
  } catch (err) {
    console.error("Lesson fetch error:", err.message);
    return res.status(500).json({ message: "Server error" });
  }
});

//  Instructor only – Create lesson
router.post("/:courseId", protect, async (req, res) => {
  const course = await Course.findById(req.params.courseId);

  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }

  if (course.instructor.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Only instructor can add lessons" });
  }

  return createLesson(req, res);
});

//  Instructor only – Update lesson
router.put("/:id", protect, updateLesson);

//  Instructor only – Delete lesson
router.delete("/:id", protect, deleteLesson);

export default router;

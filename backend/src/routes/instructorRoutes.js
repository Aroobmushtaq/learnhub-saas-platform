import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { deleteLesson, getInstructorCourses, updateLesson } from "../controllers/instructorController.js";
import { getCourseWithStudents } from "../controllers/instructorController.js";
import {
  getInstructorProfile,
  updateInstructorProfile,
} from "../controllers/instructorController.js";
const router = express.Router();

router.get("/courses", protect, getInstructorCourses);
router.get("/course/:id", protect, getCourseWithStudents);
router.get("/profile", protect, getInstructorProfile);
router.put("/profile", protect, updateInstructorProfile);
router.put("/:lessonId", protect, updateLesson);
router.delete("/:lessonId", protect, deleteLesson);
export default router;

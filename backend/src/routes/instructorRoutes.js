import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getInstructorCourses } from "../controllers/instructorController.js";
import { getCourseWithStudents } from "../controllers/instructorController.js";
const router = express.Router();

router.get("/courses", protect, getInstructorCourses);
router.get("/course/:id", protect, getCourseWithStudents);
export default router;

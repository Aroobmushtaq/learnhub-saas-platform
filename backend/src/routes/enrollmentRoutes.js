import express from "express";
import {
  enrollCourse,
  getMyEnrollments,
  getCourseEnrollments,
} from "../controllers/enrollmentController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

// Student enrolls
router.post("/:courseId", protect, authorizeRoles("student"), enrollCourse);

// Student views own enrollments
router.get("/my", protect, authorizeRoles("student"), getMyEnrollments);

// Instructor/Admin views enrollments for their course
router.get(
  "/course/:courseId",
  protect,
  authorizeRoles("instructor", "admin"),
  getCourseEnrollments
);

export default router;

import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { checkAdmin } from "../middleware/checkAdmin.js";
import { getAllUsers, getAllCourses, deleteUser, deleteCourse } from "../controllers/adminController.js";

const router = express.Router();

// Get all users
router.get("/users", protect, checkAdmin, getAllUsers);

// Get all courses
router.get("/courses", protect, checkAdmin, getAllCourses);

// Delete a user
router.delete("/users/:id", protect, checkAdmin, deleteUser);

// Delete a course
router.delete("/courses/:id", protect, checkAdmin, deleteCourse);

export default router;

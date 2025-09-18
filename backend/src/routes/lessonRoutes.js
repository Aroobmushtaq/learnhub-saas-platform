import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { createLesson, getLessons } from "../controllers/lessonController.js";
import { checkEnrollment } from "../middleware/checkEnrollment.js";

const router = express.Router();
router.post("/:courseId", protect, createLesson);
router.get("/:courseId", protect, checkEnrollment, getLessons);

export default router;

import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { createLesson, getLessons } from "../controllers/lessonController.js";
import { checkEnrollment } from "../middleware/checkEnrollment.js";

const router = express.Router();
router.post("/:courseId", authMiddleware, createLesson);
router.get("/:courseId", authMiddleware, checkEnrollment, getLessons);

export default router;

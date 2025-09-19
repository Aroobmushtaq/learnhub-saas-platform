import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { createLesson, getLessons , updateLesson ,deleteLesson} from "../controllers/lessonController.js";
import { checkEnrollment } from "../middleware/checkEnrollment.js";

const router = express.Router();
router.post("/:courseId", protect, createLesson);
router.get("/:courseId", protect, checkEnrollment, getLessons);
router.put("/:id", protect, updateLesson);
router.delete("/:id", protect, deleteLesson);
export default router;

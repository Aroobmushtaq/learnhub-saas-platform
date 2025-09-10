import exspress from 'express';
import { createCourse, getCourses, updateCourse, deleteCourse} from '../controllers/courseController.js';
import { protect } from '../middleware/authMiddleware.js';
const router = exspress.Router();
router.route("/")
    .get(getCourses)
    .post(protect, createCourse);
router.route("/:id")
    .put(protect, updateCourse)
    .delete(protect, deleteCourse);

export default router;
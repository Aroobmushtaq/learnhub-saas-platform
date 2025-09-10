import exspress from 'express';
import { createCourse, getCourses, updateCourse, deleteCourse} from '../controllers/courseController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';
const router = exspress.Router();
router.route("/")
    .get(getCourses)
    .post(protect,authorizeRoles("instructor","admin"),createCourse);
router.route("/:id")
    .put(protect,authorizeRoles("instructor","admin"), updateCourse)
    .delete(protect,authorizeRoles("instructor","admin"), deleteCourse);

export default router;
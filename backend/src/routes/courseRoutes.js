import exspress from 'express';
import { createCourse, getCourses, updateCourse, deleteCourse, publishCourse, unpublishCourse, searchCourses } from '../controllers/courseController.js';
import { protect } from '../middleware/authMiddleware.js';
import upload from "../middleware/uploadMiddleware.js";
import { authorizeRoles } from '../middleware/roleMiddleware.js';
const router = exspress.Router();
router.get("/search", searchCourses);
router.route("/")
    .get(getCourses)
    .post(protect, authorizeRoles("instructor", "admin"), upload.single("image") ,createCourse);
router.route("/:id")
    .put(protect, authorizeRoles("instructor", "admin"), updateCourse)
    .delete(protect, authorizeRoles("instructor", "admin"), deleteCourse)
router.put("/:courseId/publish", protect, publishCourse);
router.put("/:courseId/unpublish", protect, unpublishCourse);
router.get("/", async (req, res) => {
    try {
        const courses = await Course.find({ published: true })
            .populate("instructor", "name email"); // sirf name & email show hoga

        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
export default router;
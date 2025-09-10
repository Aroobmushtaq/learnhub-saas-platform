import Course from '../models/Course.js';
// create course 
export const createCourse = async (req, res) => {
    try {
        const course = await Course.create({
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            instructor: req.user._id, // from token
            category: req.body.category,
        });
        res.status(201).json(course);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// get all courses
export const getCourses = async (req, res) => {
    try {
        const courses = await Course.find().populate("instructor", "name email");
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// update course
export const updateCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) return res.status(404).json({ message: "Course not found" });

        if (course.instructor.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "Not authorized" });
        }

        course.title = req.body.title || course.title;
        course.description = req.body.description || course.description;
        course.price = req.body.price || course.price;
        course.category = req.body.category || course.category;
        course.published = req.body.published ?? course.published;

        const updatedCourse = await course.save();
        res.json(updatedCourse);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// delete course
export const deleteCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) return res.status(404).json({ message: "Course not found" });

        if (course.instructor.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "Not authorized" });
        }

        await course.deleteOne();
        res.json({ message: "Course removed" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
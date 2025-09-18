import Lesson from "../models/Lesson.js";
import Course from "../models/Course.js";

export const createLesson = async (req, res) => {
  try {
    const { title, videoUrl, content } = req.body;
    const { courseId } = req.params;

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    if (course.instructor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to add lessons" });
    }

    const lesson = await Lesson.create({ course: courseId, title, videoUrl, content });
    res.status(201).json(lesson);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getLessons = async (req, res) => {
  try {
    const { courseId } = req.params;
    const lessons = await Lesson.find({ course: courseId });
    res.json(lessons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

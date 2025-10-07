import Lesson from "../models/Lesson.js";
import Course from "../models/Course.js";

// Create Lesson
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

// Get Lessons (for instructor & students)
export const getLessons = async (req, res) => {
  try {
    const { courseId } = req.params;

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    // Fetch all lessons of this course
    const lessons = await Lesson.find({ course: courseId }).sort({ createdAt: 1 });
    res.json(lessons);
    console.log("User ID:", req.user._id);
console.log("Course Instructor:", course.instructor);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Lesson
export const updateLesson = async (req, res) => {
  try {
    const { id } = req.params;

    const lesson = await Lesson.findById(id);
    if (!lesson) return res.status(404).json({ message: "Lesson not found" });

    const course = await Course.findById(lesson.course);
    if (course.instructor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to update lessons" });
    }

    const updatedLesson = await Lesson.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedLesson);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Lesson
export const deleteLesson = async (req, res) => {
  try {
    const { id } = req.params;

    const lesson = await Lesson.findById(id);
    if (!lesson) return res.status(404).json({ message: "Lesson not found" });

    const course = await Course.findById(lesson.course);
    if (course.instructor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to delete lessons" });
    }

    await lesson.deleteOne();
    res.json({ message: "Lesson deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

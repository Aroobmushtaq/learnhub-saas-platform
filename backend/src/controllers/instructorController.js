import Course from "../models/Course.js";
import Enrollment from "../models/Enrollment.js";
import User from "../models/User.js";
import Lesson from "../models/Lesson.js";
export const getInstructorCourses = async (req, res) => {
  try {
    const courses = await Course.find({ instructor: req.user._id });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching instructor courses" });
  }
};
export const getCourseWithStudents = async (req, res) => {
  try {
    const courseId = req.params.id;

    const course = await Course.findOne({
      _id: courseId,
      instructor: req.user._id
    });

    if (!course) {
      return res.status(404).json({ message: "Course not found or not yours" });
    }

    const students = await Enrollment.find({ course: courseId })
      .populate("student", "name email");

    res.json({ course, students });
  } catch (error) {
    res.status(500).json({ message: "Error fetching course details" });
  }
};
//  Update Lesson (Instructor only)
export const updateLesson = async (req, res) => {
  try {
    const { title, content, videoUrl } = req.body;
    const lessonId = req.params.lessonId;

    const lesson = await Lesson.findById(lessonId).populate("course");

    if (!lesson) return res.status(404).json({ message: "Lesson not found" });

    // Sirf course ka instructor hi edit kar sake
    if (lesson.course.instructor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to edit this lesson" });
    }

    lesson.title = title || lesson.title;
    lesson.content = content || lesson.content;
    lesson.videoUrl = videoUrl || lesson.videoUrl;

    await lesson.save();

    res.json({ message: "Lesson updated successfully", lesson });
  } catch (error) {
    res.status(500).json({ message: "Error updating lesson" });
  }
};

//  Delete Lesson (Instructor only)
export const deleteLesson = async (req, res) => {
  try {
    const lessonId = req.params.lessonId;

    const lesson = await Lesson.findById(lessonId).populate("course");

    if (!lesson) return res.status(404).json({ message: "Lesson not found" });

    // Sirf instructor hi delete kar sake
    if (lesson.course.instructor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this lesson" });
    }

    await lesson.deleteOne();

    res.json({ message: "Lesson deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting lesson" });
  }
};

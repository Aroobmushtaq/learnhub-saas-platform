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
            image: req.file
        ? req.file.path.replace(/\\/g, "/") //  normalize slashes
        : "https://via.placeholder.com/400x200.png?text=Course+Image", // fallback
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
// export const updateCourse = async (req, res) => {
//     try {
//         const course = await Course.findById(req.params.id);
//         if (!course) return res.status(404).json({ message: "Course not found" });

//         if (course.instructor.toString() !== req.user._id.toString() &&
//             req.user.role !== "admin") {
//             return res.status(401).json({ message: "Not authorized" });
//         }

//         course.title = req.body.title || course.title;
//         course.description = req.body.description || course.description;
//         course.price = req.body.price || course.price;
//         course.category = req.body.category || course.category;
//         course.published = req.body.published ?? course.published;

//         const updatedCourse = await course.save();
//         res.json(updatedCourse);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };
// update course
export const updateCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });

    if (
      course.instructor.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(401).json({ message: "Not authorized" });
    }

    course.title = req.body.title || course.title;
    course.description = req.body.description || course.description;
    course.price = req.body.price || course.price;
    course.category = req.body.category || course.category;
    course.published = req.body.published ?? course.published;

    //  Handle new image upload
    if (req.file) {
      course.image = req.file.path.replace(/\\/g, "/");
    }

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

        if (course.instructor.toString() !== req.user._id.toString() &&
            req.user.role !== "admin") {
            return res.status(401).json({ message: "Not authorized" });
        }

        await course.deleteOne();
        res.json({ message: "Course removed" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const publishCourse = async (req, res) => {
    try {
        const { courseId } = req.params;

        // Ensure only instructor of the course can publish
        const course = await Course.findById(courseId);

        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        if (course.instructor.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "You are not the instructor of this course" });
        }

        course.published = true;
        await course.save();

        res.json({ message: "Course published successfully", course });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const unpublishCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        const course = await Course.findById(courseId);

        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        // Only instructor of course can unpublish
        if (course.instructor.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "You are not the instructor of this course" });
        }

        course.published = false;
        await course.save();

        res.json({ message: " Course unpublished successfully", course });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const searchCourses = async (req, res) => {
  try {
    const { keyword, category, level } = req.query;

    // Dynamic filter object
    let filter = { published: true }; // sirf published courses dikhane ke liye

    if (keyword) {
      filter.title = { $regex: keyword, $options: "i" }; // title me search
    }
    if (category) {
      filter.category = category;
    }
    if (level) {
      filter.level = level;
    }

    const courses = await Course.find(filter)
      .populate("instructor", "name email");

    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: "Error searching courses" });
  }
};
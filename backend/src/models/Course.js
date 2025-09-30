import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: String,
      enum: ["Web Development", "Design", "Business", "Marketing", "Other"],
      default: "Other",
    },
    // published: {
    //   type: Boolean,
    //   default: false,
    // },
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);
export default Course;

// import mongoose from "mongoose";

// const courseSchema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       required: true,
//     },
//     description: {
//       type: String,
//       required: true,
//     },
//     price: {
//       type: Number,
//       required: true,
//       default: 0,
//     },
//     instructor: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     category: {
//       type: String,
//       enum: ["Web Development", "Design", "Business", "Marketing", "Other"],
//       default: "Other",
//     },
//     // published: {
//     //   type: Boolean,
//     //   default: false,
//     // },
//   },
//   { timestamps: true }
// );

// const Course = mongoose.model("Course", courseSchema);
// export default Course;

import mongoose from "mongoose";

// const courseSchema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       required: true,
//     },
//     description: {
//       type: String,
//       required: true,
//     },
//     price: {
//       type: Number,
//       required: true,
//       default: 0,
//     },
//     instructor: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     category: {
//       type: String,
//       enum: ["Web Development", "Design", "Business", "Marketing", "Other"],
//       default: "Other",
//     },
//     image: {
//       type: String, // store image URL
//       default: "https://via.placeholder.com/400x200.png?text=Course+Image",
//     },
//     // published: {
//     //   type: Boolean,
//     //   default: false,
//     // },
//   },
//   { timestamps: true }
// );

// const Course = mongoose.model("Course", courseSchema);
// export default Course;



const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, default: 0 },
    instructor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    category: { type: String, enum: ["Web Development", "Design", "Business", "Marketing", "Other"], default: "Other" },
    image: { type: String, default: "https://via.placeholder.com/400x200.png?text=Course+Image" },
    
    // ✅ Add this field
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);
const Course = mongoose.model("Course", courseSchema);
export default Course;
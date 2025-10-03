// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { createCourse } from "../../features/courses/instructorCourseSlice";

// export default function AddCourse() {
//   const dispatch = useDispatch();
//   const { isLoading, isError, message } = useSelector((s) => s.instructorCourses);

//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     price: "",
//     category: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(createCourse(formData));
//     setFormData({ title: "", description: "", price: "", category: "" });
//   };

//   return (
//     <div className="max-w-lg mx-auto mt-6 p-4 bg-white shadow rounded">
//       <h2 className="text-2xl font-bold mb-4">Add New Course</h2>

//       {isError && <p className="text-red-600">{message}</p>}

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="text"
//           name="title"
//           placeholder="Course Title"
//           value={formData.title}
//           onChange={handleChange}
//           className="w-full border px-3 py-2 rounded"
//           required
//         />
//         <textarea
//           name="description"
//           placeholder="Course Description"
//           value={formData.description}
//           onChange={handleChange}
//           className="w-full border px-3 py-2 rounded"
//           required
//         />
//         <input
//           type="number"
//           name="price"
//           placeholder="Price"
//           value={formData.price}
//           onChange={handleChange}
//           className="w-full border px-3 py-2 rounded"
//           required
//         />
//         <input
//           type="text"
//           name="category"
//           placeholder="Category"
//           value={formData.category}
//           onChange={handleChange}
//           className="w-full border px-3 py-2 rounded"
//           required
//         />
//         <button
//           type="submit"
//           disabled={isLoading}
//           className="bg-blue-600 text-white px-4 py-2 rounded"
//         >
//           {isLoading ? "Saving..." : "Add Course"}
//         </button>
//       </form>
//     </div>
//   );
// }
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCourse } from "../../features/courses/instructorCourseSlice";

export default function AddCourse() {
  const dispatch = useDispatch();
  const { isLoading, isError, message } = useSelector(
    (s) => s.instructorCourses
  );

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    image: null, // for image
  });

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // prepare form data for file upload
    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("category", formData.category);
    if (formData.image) {
      data.append("image", formData.image);
    }

    dispatch(createCourse(data)); // your slice should handle FormData
    setFormData({ title: "", description: "", price: "", category: "", image: null });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-extrabold text-blue-700">Add a New Course</h2>
          <p className="text-gray-500 mt-1">
            Fill in the details to publish your course
          </p>
        </div>

        {/* Error Message */}
        {isError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
            {message}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5" encType="multipart/form-data">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Course Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter course title"
              className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Write a short description..."
              rows="4"
              className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            ></textarea>
          </div>

          {/* Price & Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700">Price ($)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Enter price"
                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="e.g. Web Development"
                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Course Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm px-4 py-2"
            />
            {formData.image && (
              <p className="text-sm text-gray-500 mt-2">
                Selected: {formData.image.name}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 rounded-lg shadow-md hover:opacity-90 transition duration-200"
          >
            {isLoading ? "Saving..." : "Add Course"}
          </button>
        </form>
      </div>
    </div>
  );
}

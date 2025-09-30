// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import instructorCourseService from "./instructorCourseService";

// // ✅ Create Course
// export const createCourse = createAsyncThunk(
//   "instructorCourses/create",
//   async (courseData, thunkAPI) => {
//     try {
//       const token = thunkAPI.getState().auth.user?.token;
//       return await instructorCourseService.createCourse(courseData, token);
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err.response?.data?.message || "Create failed");
//     }
//   }
// );

// // ✅ Get My Courses
// export const getMyCourses = createAsyncThunk(
//   "instructorCourses/getMyCourses",
//   async (_, thunkAPI) => {
//     try {
//       const token = thunkAPI.getState().auth.user?.token;
//       return await instructorCourseService.getMyCourses(token);
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err.response?.data?.message || "Fetch failed");
//     }
//   }
// );

// // ✅ Update Course
// export const updateCourse = createAsyncThunk(
//   "instructorCourses/update",
//   async ({ id, courseData }, thunkAPI) => {
//     try {
//       const token = thunkAPI.getState().auth.user?.token;
//       return await instructorCourseService.updateCourse(id, courseData, token);
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err.response?.data?.message || "Update failed");
//     }
//   }
// );

// // ✅ Delete Course
// export const deleteCourse = createAsyncThunk(
//   "instructorCourses/delete",
//   async (id, thunkAPI) => {
//     try {
//       const token = thunkAPI.getState().auth.user?.token;
//       await instructorCourseService.deleteCourse(id, token);
//       return id; // return deleted course id
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err.response?.data?.message || "Delete failed");
//     }
//   }
// );
// // ✅ Get Course Detail + Students
// export const getCourseDetailWithStudents = createAsyncThunk(
//   "instructorCourses/getCourseDetailWithStudents",
//   async (id, thunkAPI) => {
//     try {
//       const token = thunkAPI.getState().auth.user?.token;
//       return await instructorCourseService.getCourseDetailWithStudents(id, token);
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err.response?.data?.message || "Fetch failed");
//     }
//   }
// );


// const instructorCourseSlice = createSlice({
//   name: "instructorCourses",
//   initialState: {
//     myCourses: [],
//     isLoading: false,
//     enrolledStudents: [],
//     isSuccess: false,
//     isError: false,
//     message: "",
//   },
//   reducers: {
//     resetInstructorCourses: (state) => {
//       state.isLoading = false;
//       state.isSuccess = false;
//       state.isError = false;
//       state.message = "";
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // ✅ Create
//       .addCase(createCourse.fulfilled, (state, action) => {
//         state.myCourses.push(action.payload);
//       })
//       // ✅ Get
//       .addCase(getMyCourses.fulfilled, (state, action) => {
//         state.myCourses = action.payload;
//       })
//       // ✅ Update
//       .addCase(updateCourse.fulfilled, (state, action) => {
//         state.myCourses = state.myCourses.map((c) =>
//           c._id === action.payload._id ? action.payload : c
//         );
//       })
//       // ✅ Delete
//       .addCase(deleteCourse.fulfilled, (state, action) => {
//         state.myCourses = state.myCourses.filter((c) => c._id !== action.payload);
//       })
//       .addCase(getCourseDetailWithStudents.fulfilled, (state, action) => {
//   state.selectedCourse = action.payload.course;
//   state.enrolledStudents = action.payload.students;
// })


//       // ✅ Global pending
//       .addMatcher((a) => a.type.startsWith("instructorCourses/") && a.type.endsWith("/pending"), (state) => {
//         state.isLoading = true;
//         state.isError = false;
//         state.message = "";
//       })
//       // ✅ Global fulfilled
//       .addMatcher((a) => a.type.startsWith("instructorCourses/") && a.type.endsWith("/fulfilled"), (state) => {
//         state.isLoading = false;
//         state.isSuccess = true;
//       })
//       // ✅ Global rejected
//       .addMatcher((a) => a.type.startsWith("instructorCourses/") && a.type.endsWith("/rejected"), (state, action) => {
//         state.isLoading = false;
//         state.isError = true;
//         state.message = action.payload;
//       });
//   },
// });

// export const { resetInstructorCourses } = instructorCourseSlice.actions;
// export default instructorCourseSlice.reducer;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instructorCourseService from "./instructorCourseService";

/* ---------------- COURSES ---------------- */

// ✅ Create Course
export const createCourse = createAsyncThunk(
  "instructorCourses/create",
  async (courseData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user?.token;
      return await instructorCourseService.createCourse(courseData, token);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Create failed");
    }
  }
);

// ✅ Get My Courses
export const getMyCourses = createAsyncThunk(
  "instructorCourses/getMyCourses",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user?.token;
      return await instructorCourseService.getMyCourses(token);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Fetch failed");
    }
  }
);

// ✅ Update Course
export const updateCourse = createAsyncThunk(
  "instructorCourses/update",
  async ({ id, courseData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user?.token;
      return await instructorCourseService.updateCourse(id, courseData, token);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Update failed");
    }
  }
);

// ✅ Delete Course
export const deleteCourse = createAsyncThunk(
  "instructorCourses/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user?.token;
      await instructorCourseService.deleteCourse(id, token);
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Delete failed");
    }
  }
);

// ✅ Get Course Detail + Students
export const getCourseDetailWithStudents = createAsyncThunk(
  "instructorCourses/getCourseDetailWithStudents",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user?.token;
      return await instructorCourseService.getCourseDetailWithStudents(id, token);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Fetch failed");
    }
  }
);

/* ---------------- LESSONS ---------------- */

// ✅ Get Lessons
export const getLessons = createAsyncThunk(
  "instructorCourses/getLessons",
  async (courseId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user?.token;
      return await instructorCourseService.getLessons(courseId, token);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Fetch failed");
    }
  }
);

// ✅ Create Lesson
export const createLesson = createAsyncThunk(
  "instructorCourses/createLesson",
  async ({ courseId, lessonData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user?.token;
      return await instructorCourseService.createLesson(courseId, lessonData, token);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Create failed");
    }
  }
);

// ✅ Update Lesson
export const updateLesson = createAsyncThunk(
  "instructorCourses/updateLesson",
  async ({ lessonId, lessonData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user?.token;
      return await instructorCourseService.updateLesson(lessonId, lessonData, token);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Update failed");
    }
  }
);

// ✅ Delete Lesson
export const deleteLesson = createAsyncThunk(
  "instructorCourses/deleteLesson",
  async (lessonId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user?.token;
      await instructorCourseService.deleteLesson(lessonId, token);
      return lessonId;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Delete failed");
    }
  }
);

/* ---------------- SLICE ---------------- */

const instructorCourseSlice = createSlice({
  name: "instructorCourses",
  initialState: {
    myCourses: [],
    lessons: [],
    enrolledStudents: [],
    selectedCourse: null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
  },
  reducers: {
    resetInstructorCourses: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      /* ---------- COURSES ---------- */
      .addCase(createCourse.fulfilled, (state, action) => {
        state.myCourses.push(action.payload);
      })
      .addCase(getMyCourses.fulfilled, (state, action) => {
        state.myCourses = action.payload;
      })
      .addCase(updateCourse.fulfilled, (state, action) => {
        state.myCourses = state.myCourses.map((c) =>
          c._id === action.payload._id ? action.payload : c
        );
      })
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.myCourses = state.myCourses.filter((c) => c._id !== action.payload);
      })
      .addCase(getCourseDetailWithStudents.fulfilled, (state, action) => {
        state.selectedCourse = action.payload.course;
        state.enrolledStudents = action.payload.students;
      })

      /* ---------- LESSONS ---------- */
      .addCase(getLessons.fulfilled, (state, action) => {
        state.lessons = action.payload;
      })
      .addCase(createLesson.fulfilled, (state, action) => {
        state.lessons.push(action.payload);
      })
      .addCase(updateLesson.fulfilled, (state, action) => {
        state.lessons = state.lessons.map((l) =>
          l._id === action.payload._id ? action.payload : l
        );
      })
      .addCase(deleteLesson.fulfilled, (state, action) => {
        state.lessons = state.lessons.filter((l) => l._id !== action.payload);
      })

      /* ---------- GLOBAL STATES ---------- */
      .addMatcher(
        (a) => a.type.startsWith("instructorCourses/") && a.type.endsWith("/pending"),
        (state) => {
          state.isLoading = true;
          state.isError = false;
          state.message = "";
        }
      )
      .addMatcher(
        (a) => a.type.startsWith("instructorCourses/") && a.type.endsWith("/fulfilled"),
        (state) => {
          state.isLoading = false;
          state.isSuccess = true;
        }
      )
      .addMatcher(
        (a) => a.type.startsWith("instructorCourses/") && a.type.endsWith("/rejected"),
        (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        }
      );
  },
});

export const { resetInstructorCourses } = instructorCourseSlice.actions;
export default instructorCourseSlice.reducer;

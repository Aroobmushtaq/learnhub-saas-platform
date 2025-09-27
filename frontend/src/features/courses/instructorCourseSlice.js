import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instructorCourseService from "./instructorCourseService";

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
      return id; // return deleted course id
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Delete failed");
    }
  }
);

const instructorCourseSlice = createSlice({
  name: "instructorCourses",
  initialState: {
    myCourses: [],
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
      // ✅ Create
      .addCase(createCourse.fulfilled, (state, action) => {
        state.myCourses.push(action.payload);
      })
      // ✅ Get
      .addCase(getMyCourses.fulfilled, (state, action) => {
        state.myCourses = action.payload;
      })
      // ✅ Update
      .addCase(updateCourse.fulfilled, (state, action) => {
        state.myCourses = state.myCourses.map((c) =>
          c._id === action.payload._id ? action.payload : c
        );
      })
      // ✅ Delete
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.myCourses = state.myCourses.filter((c) => c._id !== action.payload);
      })

      // ✅ Global pending
      .addMatcher((a) => a.type.startsWith("instructorCourses/") && a.type.endsWith("/pending"), (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = "";
      })
      // ✅ Global fulfilled
      .addMatcher((a) => a.type.startsWith("instructorCourses/") && a.type.endsWith("/fulfilled"), (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      // ✅ Global rejected
      .addMatcher((a) => a.type.startsWith("instructorCourses/") && a.type.endsWith("/rejected"), (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetInstructorCourses } = instructorCourseSlice.actions;
export default instructorCourseSlice.reducer;

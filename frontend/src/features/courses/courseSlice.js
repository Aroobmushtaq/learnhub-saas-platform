// src/features/courses/courseSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ✅ Fetch all courses
export const fetchCourses = createAsyncThunk("courses/fetchCourses", async (query = "", thunkAPI) => {
  try {
    const res = await axios.get(`http://localhost:5000/api/courses${query}`);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to fetch courses");
  }
});

// ✅ Enroll course
export const enrollCourse = createAsyncThunk("courses/enrollCourse", async (courseId, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user?.token; // ✅ get token from Redux
    if (!token) throw new Error("No token found");

    const res = await axios.post(
      `http://localhost:5000/api/enrollments/${courseId}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );

    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Enrollment failed");
  }
});

const courseSlice = createSlice({
  name: "courses",
  initialState: {
    courses: [],
    myCourses: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
  },
  reducers: {
    clearError: (state) => {
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // fetch courses
      .addCase(fetchCourses.pending, (state) => { state.isLoading = true; })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.courses = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // enroll course
      .addCase(enrollCourse.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.message = "Enrolled successfully";
      })
      .addCase(enrollCourse.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(fetchMyCourses.pending, (state) => {
        state.isLoading = true;
      })
    .addCase(fetchMyCourses.fulfilled, (state, action) => {
      state.isLoading = false;
      state.myCourses = action.payload;
      state.isError = false;
      state.message = "";
    })
    .addCase(fetchMyCourses.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
},
});
// ✅ Fetch logged-in user's enrolled courses
export const fetchMyCourses = createAsyncThunk(
  "courses/fetchMyCourses",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user?.token;
      const res = await axios.get("http://localhost:5000/api/enrollments/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch my courses"
      );
    }
  }
);
export const { clearError } = courseSlice.actions;
export default courseSlice.reducer;

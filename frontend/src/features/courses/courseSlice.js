// src/features/courses/courseSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ✅ Fetch all courses
export const fetchCourses = createAsyncThunk(
  "courses/fetchCourses",
  async (query = "", thunkAPI) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/courses${query}`);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch courses"
      );
    }
  }
);

const courseSlice = createSlice({
  name: "courses",
  initialState: {
    courses: [],   // list of courses
    isLoading: false,
    isError: false,
    message: "",
  },
  reducers: {
    // ✅ Reset error state
    clearError: (state) => {
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // 🔹 Fetch all courses
      .addCase(fetchCourses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.courses = action.payload;
        state.isError = false;
        state.message = "";
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { clearError } = courseSlice.actions;
export default courseSlice.reducer;

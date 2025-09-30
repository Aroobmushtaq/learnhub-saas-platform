import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../utils/axiosConfig";

// fetch enrolled courses
export const fetchEnrolledCourses = createAsyncThunk(
  "enrolled/fetchEnrolledCourses",
  async (_, thunkAPI) => {
    try {
      const res = await API.get("/api/courses/enrolled");
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const enrolledSlice = createSlice({
  name: "enrolled",
  initialState: {
    courses: [],
    isLoading: false,
    isError: false,
    message: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEnrolledCourses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchEnrolledCourses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.courses = action.payload;
      })
      .addCase(fetchEnrolledCourses.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export default enrolledSlice.reducer;

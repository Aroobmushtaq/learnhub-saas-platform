// src/features/admin/adminSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../config";
const API_URL = `${BASE_URL}/api/admin`;

// Helper to attach token
const authConfig = () => {
  const token = localStorage.getItem("token");
  return { headers: { Authorization: `Bearer ${token}` } };
};

//  Get all users
export const getUsers = createAsyncThunk("admin/getUsers", async (_, thunkAPI) => {
  try {
    const res = await axios.get(`${API_URL}/users`, authConfig());
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
  }
});

//  Delete user
export const deleteUser = createAsyncThunk("admin/deleteUser", async (userId, thunkAPI) => {
  try {
    await axios.delete(`${API_URL}/users/${userId}`, authConfig());
    return userId;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
  }
});

//  Get all courses
export const getCourses = createAsyncThunk("admin/getCourses", async (_, thunkAPI) => {
  try {
    const res = await axios.get(`${API_URL}/courses`, authConfig());
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
  }
});

//  Delete course
export const deleteCourse = createAsyncThunk("admin/deleteCourse", async (courseId, thunkAPI) => {
  try {
    await axios.delete(`${API_URL}/courses/${courseId}`, authConfig());
    return courseId;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
  }
});

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    users: [],
    courses: [],
    isLoading: false,
    isError: false,
    message: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Users
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((u) => u._id !== action.payload);
      })

      // Courses
      .addCase(getCourses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCourses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.courses = action.payload;
      })
      .addCase(getCourses.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.courses = state.courses.filter((c) => c._id !== action.payload);
      });
  },
});

export default adminSlice.reducer;

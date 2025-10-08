
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  lessons: [],
  isLoading: false,
  isError: false,
  message: "",
};

//  Async thunks
export const getLessons = createAsyncThunk(
  "lessons/getLessons",
  async (courseId, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`http://localhost:5000/api/lessons/${courseId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const addLesson = createAsyncThunk(
  "lessons/addLesson",
  async ({ courseId, lessonData }, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `http://localhost:5000/api/lessons/${courseId}`,
        lessonData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data; // MUST return the new lesson
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const updateLesson = createAsyncThunk(
  "lessons/updateLesson",
  async ({ lessonId, updatedData }, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `http://localhost:5000/api/lessons/${lessonId}`,
        updatedData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const deleteLesson = createAsyncThunk(
  "lessons/deleteLesson",
  async (lessonId, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/lessons/${lessonId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return lessonId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const lessonSlice = createSlice({
  name: "lessons",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLessons.pending, (state) => { state.isLoading = true; })
      .addCase(getLessons.fulfilled, (state, action) => {
        state.isLoading = false;
        state.lessons = action.payload;
      })
      .addCase(getLessons.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(addLesson.fulfilled, (state, action) => {
        state.lessons.push(action.payload); //  push new lesson
      })
      .addCase(updateLesson.fulfilled, (state, action) => {
        state.lessons = state.lessons.map((l) =>
          l._id === action.payload._id ? action.payload : l
        );
      })
      .addCase(deleteLesson.fulfilled, (state, action) => {
        state.lessons = state.lessons.filter((l) => l._id !== action.payload);
      });
  },
});

export default lessonSlice.reducer;

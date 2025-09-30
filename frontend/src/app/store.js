import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import courseReducer from '../features/courses/courseSlice';
import adminReducer from '../features/admin/adminSlice';
import instructorReducer from '../features/instructor/instructorSlice';
import enrolledReducer from '../features/courses/enrolledSlice';
import instructorCourseReducer from '../features/courses/instructorCourseSlice'
import lessonReducer from "../features/lessons/lessonSlice"
export const store = configureStore({
  reducer: {
    auth: authReducer,
    courses: courseReducer,
    admin: adminReducer,
    instructor: instructorReducer,
    lessons: lessonReducer,
    enrolled: enrolledReducer,
    instructorCourses: instructorCourseReducer
  },
});

export default store;

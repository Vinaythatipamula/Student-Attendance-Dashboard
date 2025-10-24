import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import studentsSlice from './slices/studentsSlice';
import attendanceSlice from './slices/attendanceSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    students: studentsSlice,
    attendance: attendanceSlice,
  },
});

export default store;



import { createSlice } from '@reduxjs/toolkit';

const savedStudents = JSON.parse(localStorage.getItem('students')) || [];
const initialState = {
  students: savedStudents,
  loading: false,
  error: null,
};

const studentsSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    fetchStudentsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchStudentsSuccess: (state, action) => {
      state.loading = false;
      state.students = action.payload;
      state.error = null;
      localStorage.setItem('students', JSON.stringify(state.students))
    },
    fetchStudentsFailure: (state, action) => {
      state.loading = false;
      state.students = [];
      state.error = action.payload;
    },
    updateStudentAttendance: (state, action) => {
      const { studentId, isPresent } = action.payload;
      const student = state.students.find(s => s.id === studentId);
      if (student) {
        student.isPresent = isPresent;
        // Save to localStorage for persistence across navigation (but not as attendance records)
        localStorage.setItem('students', JSON.stringify(state.students));
      }
    },
    resetAttendanceForNewDay: (state) => {
      // Reset all students' attendance to false for a new day
      state.students.forEach(student => {
        student.isPresent = false;
      });
      localStorage.setItem('students', JSON.stringify(state.students));
    },
    clearCurrentAttendance: (state) => {
      // Clear current attendance after submission (optional - for fresh start)
      state.students.forEach(student => {
        student.isPresent = false;
      });
      localStorage.setItem('students', JSON.stringify(state.students));
    },
  },
});

export const { 
  fetchStudentsStart, 
  fetchStudentsSuccess, 
  fetchStudentsFailure, 
  updateStudentAttendance,
  resetAttendanceForNewDay,
  clearCurrentAttendance
} = studentsSlice.actions;
export default studentsSlice.reducer;


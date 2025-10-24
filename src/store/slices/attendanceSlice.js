


import { createSlice } from '@reduxjs/toolkit';

const savedAttendance = JSON.parse(localStorage.getItem("attendanceRecords")) || [];
const savedSummary = JSON.parse(localStorage.getItem("attendanceSummary")) || {
  totalStudents: 0,
  presentStudents: 0,
  absentStudents: 0,
  attendancePercentage: 0,
};

const initialState = {
  attendanceRecords: savedAttendance,
  summary: savedSummary,
  loading: false,
  error: null,
};

const attendanceSlice = createSlice({
  name: 'attendance',
  initialState,
  reducers: {
    submitAttendanceStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    submitAttendanceSuccess: (state, action) => {
      state.loading = false;
      state.error = null;

      const newAttendance = {
        date: new Date().toISOString().split('T')[0],
        timestamp: new Date().toISOString(),
        records: action.payload, // Array of today's student attendance
      };

      const existingIndex = state.attendanceRecords.findIndex(
        (entry) => entry.date === newAttendance.date
      );

      if (existingIndex !== -1) {
        state.attendanceRecords[existingIndex] = newAttendance;
      } else {
        state.attendanceRecords.push(newAttendance);
      }
      localStorage.setItem("attendanceRecords", JSON.stringify(state.attendanceRecords));

      // Auto-update summary when attendance is submitted
      const totalStudents = newAttendance.records.length;
      const presentStudents = newAttendance.records.filter((s) => s.isPresent).length;
      const absentStudents = totalStudents - presentStudents;
      const attendancePercentage = totalStudents > 0 
        ? Math.round((presentStudents / totalStudents) * 100)
        : 0;

      state.summary = {
        totalStudents,
        presentStudents,
        absentStudents,
        attendancePercentage,
      };

      localStorage.setItem("attendanceSummary", JSON.stringify(state.summary));
    },

    submitAttendanceFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Summary Reducers
    fetchSummaryStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchSummarySuccess: (state, action) => {
      state.loading = false;
      state.summary = action.payload;
      state.error = null;
      localStorage.setItem("attendanceSummary", JSON.stringify(state.summary));
    },
    fetchSummaryFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    updateSummary: (state, action) => {
      state.summary = { ...state.summary, ...action.payload };
      localStorage.setItem("attendanceSummary", JSON.stringify(state.summary));
    },

  },
});

export const {
  submitAttendanceStart,
  submitAttendanceSuccess,
  submitAttendanceFailure,
  fetchSummaryStart,
  fetchSummarySuccess,
  fetchSummaryFailure,
  updateSummary
} = attendanceSlice.actions;

export default attendanceSlice.reducer;


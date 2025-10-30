import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  
  user: JSON.parse(localStorage.getItem("user")) || {email:"", password:""},
  isAuthenticated: !!localStorage.getItem("user"),
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;

      localStorage.setItem("user", JSON.stringify(action.payload));

    },

    updateUser: (state, action)=>{
      const {name, value} = action.payload
      state.user = {...state.user, [name]: value}
    },

    loginFailure: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      localStorage.removeItem("user");
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, updateUser, logout, clearError } = authSlice.actions;
export default authSlice.reducer;



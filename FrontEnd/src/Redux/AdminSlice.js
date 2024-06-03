import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentAdmin: null,
  loading: false,
  error: false,
};

export const AdminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.currentAdmin = action.payload;

      console.log(JSON.parse(JSON.stringify(state.currentAdmin)));
    },
    loginFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    Adminlogout: (state) => {
      state.currentAdmin = null;
      state.loading = false;
      state.error = false;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, Adminlogout } =
  AdminSlice.actions;

export default AdminSlice.reducer;

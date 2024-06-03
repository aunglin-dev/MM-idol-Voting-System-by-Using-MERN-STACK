import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  timeLine: null,
  loading: false,
  error: false,
  running: false,
  FinalTime: null,
  tempEndTime: null,
};

export const deadlineSlice = createSlice({
  name: "deadline",
  initialState,
  reducers: {
    timerStart: (state) => {
      state.loading = true;
    },
    TimeSuccess: (state, action) => {
      state.loading = false;
      state.running = action.payload;
    },
    TimeFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    addEndTime: (state, action) => {
      state.tempEndTime = action.payload;
    },
    addFinalTime: (state, action) => {
      state.FinalTime = action.payload;
    },
  },
});

export const {
  fetchStart,
  TimeSuccess,
  fetchFailure,
  addEndTime,
  addFinalTime,
} = deadlineSlice.actions;

export default deadlineSlice.reducer;

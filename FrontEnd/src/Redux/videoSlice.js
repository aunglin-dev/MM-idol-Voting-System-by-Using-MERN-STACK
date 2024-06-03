import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentVideo: null,
  loading: false,
  error: false,
  totalExtraVotes: 0,
};

export const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
    },
    fetchSuccess: (state, action) => {
      state.loading = false;
      state.currentVideo = action.payload;
    },
    fetchFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    like: (state, action) => {
      state.currentVideo.UsersLikes.push(action.payload);
      state.currentVideo.likes += 1;
    },
    dislike: (state, action) => {
      state.currentVideo.UsersLikes.splice(
        state.currentVideo.UsersLikes.findIndex(
          (userId) => userId === action.payload
        ),
        1
      );
      state.currentVideo.likes -= 1;
    },
    AddExtraVoteToVideo: (state, action) => {
      state.currentVideo.UsersExtraVotes.push(action.payload);
      state.totalExtraVotes = state.currentVideo.UsersExtraVotes.filter(
        (val) => val === action.payload
      ).length;
      state.currentVideo.likes += 1;
    },
    CalculateTotalVoteToVideo: (state, action) => {
      state.totalExtraVotes = state.currentVideo.UsersExtraVotes.filter(
        (val) => val === action.payload
      ).length;
    },
  },
});

export const {
  fetchStart,
  fetchSuccess,
  fetchFailure,
  like,
  dislike,
  CalculateTotalVoteToVideo,
  AddExtraVoteToVideo,
} = videoSlice.actions;

export default videoSlice.reducer;

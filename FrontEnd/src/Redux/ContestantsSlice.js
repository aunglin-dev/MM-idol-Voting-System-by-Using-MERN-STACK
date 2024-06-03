import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
  error: false,
  fetchvideo: null,
};

export const ContestantSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;

      console.log(JSON.parse(JSON.stringify(state.currentUser)));
    },
    loginFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    logout: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = false;
      state.fetchvideo = false;
    },
    fetchVideos: (state, action) => {
      state.fetchvideo = action.payload;
    },
    uploadVideo: (state, action) => {
      state.currentUser.Uploadedvideos.push(action.payload);
    },
    deleteVideo: (state, action) => {
      state.currentUser.Uploadedvideos.splice(
        state.currentUser.Uploadedvideos.findIndex(
          (vdId) => vdId === action.payload
        ),
        1
      );
    },
    UserLike: (state, action) => {
      state.currentUser.Votedvideos.push(action.payload);
    },
    UserDislike: (state, action) => {
      state.currentUser.Votedvideos.splice(
        state.currentUser.Votedvideos.findIndex(
          (vdId) => vdId === action.payload
        ),
        1
      );
    },
    AddExtraVote: (state, action) => {
      state.currentUser.extraVotes += action.payload;
    },

    ExtraVote: (state, action) => {
      state.currentUser.extraVotes -= 1;
      state.currentUser.ExtraVotedvideos.push(action.payload);
    },
    subscription: (state, action) => {
      if (state.currentUser.subscribedUsers.includes(action.payload)) {
        state.currentUser.subscribedUsers.splice(
          state.currentUser.subscribedUsers.findIndex(
            (channelId) => channelId === action.payload
          ),
          1
        );
      } else {
        state.currentUser.subscribedUsers.push(action.payload);
      }
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  subscription,
  fetchVideos,
  UserLike,
  UserDislike,
  AddExtraVote,
  deleteVideo,
  uploadVideo,
  ExtraVote,
} = ContestantSlice.actions;

export default ContestantSlice.reducer;

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    DateOFBirth: {
      type: String,
      required: true,
    },
    NRC: {
      type: String,
      required: true,
    },
    PhNo: {
      type: String,
      required: true,
    },
    Address: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
    subscribers: {
      type: Number,
      default: 0,
    },
    Uploadedvideos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    Votedvideos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    ExtraVotedvideos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    extraVotes: {
      type: Number,
      default: 0,
    },
    subscribedUsers: {
      type: [String],
    },
    Role: {
      type: String,
      default: "Viewer",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;

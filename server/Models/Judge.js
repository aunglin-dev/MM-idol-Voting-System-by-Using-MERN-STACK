import mongoose from "mongoose";

const judgeSchema = new mongoose.Schema(
  {
    AdminId: {
      type: String,
      required: true,
    },
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
    PhNo: {
      type: String,
      required: true,
    },
    History: {
      type: String,
      required: true,
    },
    imgUrl: {
      type: String,
    },
    subscribedUsers: {
      type: [String],
    },
    Votedvideos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    Role: {
      type: String,
      default: "Judge",
    },
  },
  { timestamps: true }
);

const Judge = mongoose.model("Judge", judgeSchema);

export default Judge;

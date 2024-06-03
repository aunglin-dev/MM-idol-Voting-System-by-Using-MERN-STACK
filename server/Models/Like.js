import mongoose from "mongoose";

const VoteSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    videoId: {
      type: String,
      required: true,
    },
    VoteType: {
      type: String,
      required: true,
      default: "Normal Vote",
    },
    Transaction: {
      type: String,
      required: true,
      default: "Vote",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Vote", VoteSchema);

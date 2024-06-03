import mongoose from "mongoose";

const ManageVideoSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    videoId: {
      type: String,
      required: true,
    },
    Transaction: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("ManageVideo", ManageVideoSchema);

import mongoose from "mongoose";

const ManageNewsSchema = new mongoose.Schema(
  {
    AdminId: {
      type: String,
      required: true,
    },
    NewsId: {
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

export default mongoose.model("ManageNews", ManageNewsSchema);

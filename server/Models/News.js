import mongoose from "mongoose";

const NewsSchema = new mongoose.Schema(
  {
    AdminId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    imgUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const News = mongoose.model("News", NewsSchema);
export default News;

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import UserRouter from "./Routes/user.js";
import AuthRouter from "./Routes/auth.js";
import NewsRouter from "./Routes/news.js";
import VideoRouter from "./Routes/video.js";
import JudgeRouter from "./Routes/Judge.js";
import CommentRouter from "./Routes/comment.js";
import VoteRouter from "./Routes/vote.js";
import cookieParser from "cookie-parser";
// import setupProxy from "./setupProxy.js";
import cors from "cors";
const app = express();
dotenv.config();

// setupProxy(app);

//Connect to the database
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("ok");
  })
  .catch((err) => console.log("error", err.message));

app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use("/api/users", UserRouter);
app.use("/api/auth", AuthRouter);
app.use("/api/videos", VideoRouter);
app.use("/api/comments", CommentRouter);
app.use("/api/news", NewsRouter);
app.use("/api/judges", JudgeRouter);
app.use("/api/VoteDetail", VoteRouter);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something's wrong";
  res.status(status).json({
    success: false,
    status,
    message,
  });
});

app.listen(8800, () => {
  console.log("Port is running on Localhost : 8800");
});

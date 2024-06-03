import express from "express";
import {
  addNews,
  GetNews,
  deleteNews,
  saveNewsDetail,
} from "../Controllers/newws.js";
import { verifyToken } from "../Utils/verifyToken.js";

const router = express.Router();

//create a news
router.post("/", verifyToken, addNews);

//Save NewsDetail
router.post("/savedNewsDetail", verifyToken, saveNewsDetail);

//Get News
router.get("/lastest", GetNews);

//Delete the news
router.delete("/:id", verifyToken, deleteNews);

export default router;

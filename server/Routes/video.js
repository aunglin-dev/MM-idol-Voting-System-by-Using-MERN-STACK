import express from "express";
import {
  addVideo,
  updateVideo,
  deleteVideo,
  addView,
  getVideo,
  RandomVideo,
  SubscribedVideo,
  TrendVideo,
  getVideoFromUsers,
  MostLikedVideo,
  SaveTransaction,
} from "../Controllers/video.js";
import { verifyToken } from "../Utils/verifyToken.js";

const router = express.Router();

//create a video
router.post("/", verifyToken, addVideo);

//Save Transaction
router.post("/saveVideoDetail", verifyToken, SaveTransaction);

//Edit the video
router.put("/:id", verifyToken, updateVideo);

//Delete the video
router.delete("/:id", verifyToken, deleteVideo);

//Find the video
router.get("/find/:id", getVideo);

//Fetch Mostliked Video
router.get("/findMostLikedVideo", MostLikedVideo);

router.put("/view/:id", addView);
router.get("/trend", TrendVideo);
router.get("/random", RandomVideo);
router.get("/sub", verifyToken, SubscribedVideo);
// router.get("/tags", getByTag);
// router.get("/search", search);
router.get("/getVideo/:userid", getVideoFromUsers);

export default router;

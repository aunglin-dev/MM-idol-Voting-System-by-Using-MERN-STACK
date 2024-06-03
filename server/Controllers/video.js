import { ErrorHandler } from "../Utils/error.js";
import Video from "../Models/Video.js";
import User from "../Models/User.js";
import Judge from "../Models/Judge.js";

import ManageVideo from "../Models/ManageVideo.js";

//Add Video
export const addVideo = async (req, res, next) => {
  const user = await User.findById(req.user.id);

  const newVideo = new Video({ userId: req.user.id, ...req.body });
  try {
    const savedVideo = await newVideo.save();
    user.Uploadedvideos = user.Uploadedvideos.concat(savedVideo._id);
    await user.save();

    res.status(200).json(savedVideo);
  } catch (err) {
    next(err);
  }
};

//Save Video Transaction
export const SaveTransaction = async (req, res, next) => {
  const data = new ManageVideo({ ...req.body, userId: req.user.id });
  try {
    const savedData = await data.save();
    res.status(200).send(savedData);
  } catch (err) {
    next(err);
  }
};
//Update Video
export const updateVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return next(ErrorHandler(404, "Video not found!"));
    if (req.user.id === video.userId) {
      const updatedVideo = await Video.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedVideo);
    } else {
      return next(ErrorHandler(403, "You can update only your video!"));
    }
  } catch (err) {
    next(err);
  }
};

//Delete Video

export const deleteVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return next(ErrorHandler(404, "Video not found!"));
    if (req.user.id === video.userId) {
      await Video.findByIdAndDelete(req.params.id);
      await User.findByIdAndUpdate(req.user.id, {
        $pull: { Uploadedvideos: video._id },
      });
      res.status(200).json("The video has been deleted.");
    } else {
      return next(ErrorHandler(403, "You can delete only your video!"));
    }
  } catch (err) {
    next(err);
  }
};

//Get Video
export const getVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    res.status(200).json(video);
  } catch (err) {
    next(err);
  }
};

//Add View
export const addView = async (req, res, next) => {
  try {
    await Video.findByIdAndUpdate(req.params.id, {
      $inc: { views: 1 },
    });
    res.status(200).json("The view has been increased.");
  } catch (err) {
    next(err);
  }
};

//Random Video
export const RandomVideo = async (req, res, next) => {
  try {
    const videos = await Video.aggregate([{ $sample: { size: 40 } }]);
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};

//Trend Video
export const TrendVideo = async (req, res, next) => {
  try {
    const videos = await Video.find().sort({ views: -1 });
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};

//Most liked
export const MostLikedVideo = async (req, res, next) => {
  try {
    const getVideo = await Video.find().sort({ likes: -1 }).limit(30);
    res.status(200).json(getVideo);
  } catch (err) {
    next(err);
  }
};

//Subscribed Video

export const SubscribedVideo = async (req, res, next) => {
  try {
    const Role = req.user.Role;

    const user =
      Role === "Judge"
        ? await Judge.findById(req.user.id)
        : await User.findById(req.user.id);

    // const user = await User.findById(req.user.id);

    const SubscribedContestants = user.subscribedUsers;

    const list = await Promise.all(
      SubscribedContestants.map(async (channelId) => {
        return await Video.find({ userId: channelId });
      })
    );
    res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt));
  } catch (err) {
    next(err);
  }
};

//Search Bar

export const getVideoFromUsers = async (req, res, next) => {
  const userId = req.params.userid;
  try {
    const videos = await Video.find({
      userId: userId,
    });
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};

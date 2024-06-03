import User from "../Models/User.js";
import { ErrorHandler } from "../Utils/error.js";
import Video from "../Models/Video.js";
import Payment from "../Models/Payment.js";

//Get The User
export const getUser = async (req, res, next) => {
  try {
    const getUser = await User.find({}).populate("videos");
    res.status(200).json(getUser);
  } catch (err) {
    next(err);
  }
};

//Get Total User
export const TotalUser = async (req, res, next) => {
  try {
    const getUser = await User.find({});
    res.status(200).json(getUser);
  } catch (err) {
    next(err);
  }
};

//Update The User
export const UserUpdate = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );

      console.log(req.params.id);
      console.log(req.user.id);
      res.status(200).json(updatedUser);
    } catch (err) {
      next(err);
    }
  } else {
    return next(ErrorHandler(403, "You have no access to update"));
  }
};

//Delete The User
export const deleteUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User Have Been Deleted");
    } catch (err) {
      next(err);
    }
  } else {
    return next(ErrorHandler(403, "You have no access to delete"));
  }
};

//Find User
export const findUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).populate("Uploadedvideos");
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

//follow

export const follow = async (req, res, next) => {
  const CurrentUser = req.user.id;
  const followedUser = req.params.id;
  try {
    await User.findByIdAndUpdate(CurrentUser, {
      $push: { subscribedUsers: req.params.id },
    });
    await User.findByIdAndUpdate(followedUser, {
      $inc: { subscribers: 1 },
    });
    res.status(200).json("Successfully followed");
  } catch (err) {
    next(err);
  }
};

//Unfollowing Constentants
export const Unfollow = async (req, res, next) => {
  const CurrentUser = req.user.id;
  const followedUser = req.params.id;
  try {
    await User.findByIdAndUpdate(CurrentUser, {
      $pull: { subscribedUsers: followedUser },
    });
    await User.findByIdAndUpdate(followedUser, {
      $inc: { subscribers: -1 },
    });
    res.status(200).json("Successfully Unfollowed");
  } catch (err) {
    next(err);
  }
};

//Like a video
export const like = async (req, res, next) => {
  const id = req.user.id;
  const videoId = req.params.videoId;
  try {
    await Video.findByIdAndUpdate(videoId, {
      $addToSet: { UsersLikes: id },
    });
    await User.findByIdAndUpdate(id, {
      $addToSet: { Votedvideos: videoId },
    });
    await Video.findByIdAndUpdate(videoId, {
      $inc: { likes: 1 },
    });
    res.status(200).json("The video has been liked.");
  } catch (err) {
    next(err);
  }
};

//Extra Like for a video
export const ExtraLike = async (req, res, next) => {
  const id = req.user.id;
  const videoId = req.params.videoId;
  const user = await User.findById(id);

  try {
    if (user.extraVotes !== 0) {
      await Video.findByIdAndUpdate(videoId, {
        $push: { UsersExtraVotes: id },
      });
      await User.findByIdAndUpdate(id, {
        $push: { ExtraVotedvideos: videoId },
      });
      await User.findByIdAndUpdate(id, {
        $inc: { extraVotes: -1 },
      });
      await Video.findByIdAndUpdate(videoId, {
        $inc: { likes: 1 },
      });
      res.status(200).json("The video has been voted voted for extra.");
    } else {
      res.status(400).json("You Don't Have extra votes");
    }
  } catch (err) {
    next(err);
  }
};

//UnLike a video
export const UnLike = async (req, res, next) => {
  const CurrentUser = req.user.id;
  const videoId = req.params.videoId;
  try {
    await Video.findByIdAndUpdate(videoId, {
      $pull: { UsersLikes: CurrentUser },
    });
    await User.findByIdAndUpdate(CurrentUser, {
      $pull: { Votedvideos: videoId },
    });
    await Video.findByIdAndUpdate(videoId, {
      $inc: { likes: -1 },
    });

    res.status(200).json("Video has been unliked");
  } catch (err) {
    next(err);
  }
};

//Make Payment
export const MakePayment = async (req, res, next) => {
  const newPayment = new Payment({ ...req.body, userId: req.user.id });

  try {
    const savedPayment = await newPayment.save();
    res.status(200).send(savedPayment);
    await User.findByIdAndUpdate(req.user.id, {
      $inc: { extraVotes: savedPayment.TotalQuantity },
    });
  } catch (err) {
    next(err);
  }
};

//Top Finalist
export const TopFinalist = async (req, res, next) => {
  try {
    const getTopFinalists = await User.find().sort({});
  } catch (err) {
    next(err);
  }
};

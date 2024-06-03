import { ErrorHandler } from "../Utils/error.js";
import Vote from "../Models/Like.js";

export const AddVoteDetail = async (req, res, next) => {
  const newComment = new Vote({ ...req.body, userId: req.user.id });
  try {
    const savedComment = await newComment.save();
    res.status(200).send(savedComment);
  } catch (err) {
    next(err);
  }
};

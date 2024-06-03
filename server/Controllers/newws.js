import { ErrorHandler } from "../Utils/error.js";
import News from "../Models/News.js";
import Admin from "../Models/Admin.js";
import ManageNews from "../Models/ManageNews.js";

//Add Video
export const addNews = async (req, res, next) => {
  const newNews = new News({ AdminId: req.user.id, ...req.body });
  try {
    const savedNews = await newNews.save();
    res.status(200).json(savedNews);
  } catch (err) {
    next(err);
  }
};

//Save NewsDetail
export const saveNewsDetail = async (req, res, next) => {
  const data = new ManageNews({ ...req.body, AdminId: req.user.id });
  try {
    const savedData = await data.save();
    res.status(200).send(savedData);
  } catch (err) {
    next(err);
  }
};

//Delete Video

export const deleteNews = async (req, res, next) => {
  try {
    const findNews = await News.findById(req.params.id);
    if (!findNews) return next(ErrorHandler(404, "News not found!"));

    await News.findByIdAndDelete(req.params.id);
    res.status(200).json("The News has been deleted.");
  } catch (err) {
    next(err);
  }
};

//Get  Video
export const GetNews = async (req, res, next) => {
  try {
    const news = await News.find().sort({ createdAt: -1 });
    res.status(200).json(news);
  } catch (err) {
    next(err);
  }
};

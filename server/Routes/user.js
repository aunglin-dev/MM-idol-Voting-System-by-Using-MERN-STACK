import express from "express";
import {
  UserUpdate,
  deleteUser,
  findUser,
  follow,
  Unfollow,
  UnLike,
  getUser,
  ExtraLike,
  TotalUser,
  like,
  MakePayment,
} from "../Controllers/user.js";
import { verifyToken } from "../Utils/verifyToken.js";

const Router = express.Router();

//Get User
Router.get("/total", getUser);

//Get Total User
Router.get("/TotalUser", TotalUser);

//User Update
Router.put("/Update/:id", verifyToken, UserUpdate);

//User Delete
Router.delete("/:id", verifyToken, deleteUser);

//Getting User
Router.get("/find/:id", findUser);

//Subscribe
Router.put("/sub/:id", verifyToken, follow);

//UnSubscribe
Router.put("/unsub/:id", verifyToken, Unfollow);

//Like
Router.put("/like/:videoId", verifyToken, like);

//ExtraLike
Router.put("/Extralike/:videoId", verifyToken, ExtraLike);

//UnLike
Router.put("/Unlike/:videoId", verifyToken, UnLike);

//Make Payment
Router.post("/Payment", verifyToken, MakePayment);

export default Router;

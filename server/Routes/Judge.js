import express from "express";
import { getJudge, FindJudge } from "../Controllers/Judge.js";
import { verifyToken } from "../Utils/verifyToken.js";

const Router = express.Router();

//Get User
Router.get("/total", getJudge);

//Getting User
Router.get("/find/:id", FindJudge);

export default Router;

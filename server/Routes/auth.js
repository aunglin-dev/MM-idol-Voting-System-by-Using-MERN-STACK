import express from "express";
import { signup, signin } from "../Controllers/auth.js";
import {
  Adminsignin,
  Adminsignup,
  findUser,
  TotalAdmin,
} from "../Controllers/Admin.js";
import { JudgeSignup } from "../Controllers/Judge.js";

const Router = express.Router();

//Contestants Register
Router.post("/signup", signup);

//Contestants Login
Router.post("/signin", signin);

//Admin Register
Router.post("/Adminsignup", Adminsignup);

//Admin Login
Router.post("/Adminsignin", Adminsignin);

//Get Admin
Router.get("/findAdmin/:id", findUser);

//Judge Register
Router.post("/Judgesignup", JudgeSignup);

//Get AllAdmin
Router.get("/GetAllAdmin", TotalAdmin);

export default Router;

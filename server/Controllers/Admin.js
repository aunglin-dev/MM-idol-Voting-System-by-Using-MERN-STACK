import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Admin from "../Models/Admin.js";
import { ErrorHandler } from "../Utils/error.js";
import Jwt from "jsonwebtoken";

//Registeration
export const Adminsignup = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new Admin({ ...req.body, password: hash });

    await newUser.save();
    res.status(200).send("Successfully User added");
  } catch (err) {
    next(err);
  }
};

//Login
export const Adminsignin = async (req, res, next) => {
  try {
    const { email } = req.body;

    //Find user from database
    const user = await Admin.findOne({ email });

    //Check Password
    const passwordCorrect =
      user === null
        ? false
        : await bcrypt.compare(req.body.password, user.password);

    if (!(user && passwordCorrect))
      return next(ErrorHandler(400, "Invalid Username or Password"));

    //Create a token
    const Usertoken = { name: user.name, id: user._id };

    const token = Jwt.sign(Usertoken, process.env.SECRET);

    //Retrive data except password
    const { password, ...other } = user._doc;

    //Sending a token with a cookie
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(other);
  } catch (err) {
    next(err);
  }
};

//Find User
export const findUser = async (req, res, next) => {
  try {
    const user = await Admin.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

//Get Total Admin

export const TotalAdmin = async (req, res, next) => {
  try {
    const getUser = await Admin.find({});
    res.status(200).json(getUser);
  } catch (err) {
    next(err);
  }
};

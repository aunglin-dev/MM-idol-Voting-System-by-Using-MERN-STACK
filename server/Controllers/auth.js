import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../Models/User.js";
import { ErrorHandler } from "../Utils/error.js";
import Jwt from "jsonwebtoken";
import Judge from "../Models/Judge.js";

//Registeration
export const signup = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({ ...req.body, password: hash });

    await newUser.save();
    res.status(200).send("Successfully User added");
  } catch (err) {
    next(err);
  }
};

//Login
export const signin = async (req, res, next) => {
  try {
    const { email } = req.body;
    const { Role } = req.body;

    //Find user from database
    const user =
      Role === "Judge"
        ? await Judge.findOne({ email })
        : await User.findOne({ email });

    //Check Password
    const passwordCorrect =
      user === null
        ? false
        : await bcrypt.compare(req.body.password, user.password);

    if (!(user && passwordCorrect))
      return next(ErrorHandler(400, "Invalid Username or Password"));

    //Create a token
    const Usertoken = { name: user.name, id: user._id, Role: user.Role };

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

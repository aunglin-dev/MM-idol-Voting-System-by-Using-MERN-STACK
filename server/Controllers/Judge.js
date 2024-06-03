import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Judge from "../Models/Judge.js";
import { ErrorHandler } from "../Utils/error.js";

//Registeration
export const JudgeSignup = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new Judge({ ...req.body, password: hash });

    await newUser.save();
    res.status(200).send("Successfully Judge added");
  } catch (err) {
    next(err);
  }
};

//Get Judge
export const getJudge = async (req, res, next) => {
  try {
    const getUser = await Judge.find();
    res.status(200).json(getUser);
  } catch (err) {
    next(err);
  }
};

//Find Specific Judge
export const FindJudge = async (req, res, next) => {
  try {
    const user = await Judge.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

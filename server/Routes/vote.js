import express from "express";
import { AddVoteDetail } from "../Controllers/Vote.js";
import { verifyToken } from "../Utils/verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, AddVoteDetail);

export default router;

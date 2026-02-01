import express from "express";
import { getMessages } from "./wsController";
import verifyToken from "../middleware/auth";

const router = express.Router();

router.get("/messages", verifyToken, getMessages);

export default router;
import express from "express";
import { register } from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.post("/", register);

export default userRouter;

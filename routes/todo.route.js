import express from "express";
import { createTodo } from "../controllers/todo.controller.js";

const todoRouter = express.Router();

todoRouter.post("/create", createTodo);

export default todoRouter;

import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/db.js";
import userRouter from "./routes/user.route.js";
import todoRouter from "./routes/todo.route.js";

const app = express();
dotenv.config();
connectDB();

app.use(express.json());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/todos", todoRouter);

const PORT = process.env.PORT || 3000;

const startServer = () => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();

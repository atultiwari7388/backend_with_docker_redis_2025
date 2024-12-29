import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/db.js";

const app = express();
dotenv.config();
connectDB();

const PORT = process.env.PORT || 3000;

const startServer = () => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();

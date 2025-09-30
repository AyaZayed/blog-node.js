import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
const app = express();
import dotenv from "dotenv";
import postsRouter from "./routes/postsRoutes";
import "express-async-errors";
import APIError from "./utils/APIError";

dotenv.config();

// MIDDLEWARES
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// ROUTES
app.use("/posts", postsRouter);

// NOT FOUND ROUTES
app.use((req, res, next) => {
   next(new APIError(404, `${req.method} ${req.path} is not found`));
});

// SERVER ENVIROMENT VARIABLES
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || "localhost";
const MONGO_URI = String(process.env.MONGO_URI);

// SERVER LISTEN
app.listen(Number(PORT), HOST, () => {
   console.log(`Server running at http://${HOST}:${PORT}`);
   mongoose
      .connect(MONGO_URI)
      .then(() => {
         console.log("Connected to MongoDB");
      })
      .catch((err: Error) => {
         console.error(`Couldn't connect to MongoDB `, err);
      });
});

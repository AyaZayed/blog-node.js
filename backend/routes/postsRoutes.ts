import express from "express";
import postsController from "../controllers/postsController";
import auth from "../middlewares/auth";

const postsRouter = express.Router();

postsRouter.get("/", postsController.getAllPosts);

postsRouter.post("/", auth, postsController.createPost);

export default postsRouter;

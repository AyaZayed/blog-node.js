import express from "express";
import postsController from "../controllers/postsController";

const postsRouter = express.Router();
postsRouter.get("/", postsController.getAllPosts);

export default postsRouter;

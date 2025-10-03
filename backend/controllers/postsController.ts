import { Request, Response } from "express";
import Post from "../models/postSchema";
import APIError from "../utils/APIError";

class PostsController {
   async getAllPosts(req: Request, res: Response) {
      const posts = await Post.find();

      if (!posts) {
         throw new APIError(404, "No posts found");
      }

      res.status(200).json({ status: "success", data: posts });
   }

   async createPost(req: Request, res: Response) {
      const user = req.user;
      if (!user) {
         throw new APIError(400, "Not authorized to create post");
      }
      const post = await Post.create({
         ...req.body,
         author: user._id,
      });
      res.status(201).json({
         status: "success",
         data: post,
      });
   }
}

const postsController = new PostsController();

export default postsController;

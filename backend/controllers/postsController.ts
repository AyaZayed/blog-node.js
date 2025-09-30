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
}

const postsController = new PostsController();

export default postsController;

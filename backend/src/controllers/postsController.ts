import { Request, Response } from "express";
import Post from "../models/postSchema";
import APIError from "../utils/APIError";

class PostsController {
   async getPosts(req: Request, res: Response) {
      const limit = Number(req.query.limit) || 10;
      const page = Number(req.query.page) || 1;

      const filter: any = {};

      console.log(req.query.tag);

      if (req.query.isPublished !== undefined) {
         filter.isPublished = req.query.isPublished === "true";
      }

      if (req.query.isFeatured !== undefined) {
         filter.isFeatured = req.query.isFeatured === "true";
      }

      if (req.query.tag) {
         filter.tags = req.query.tag;
         console.log(filter.tags);
      }

      let sort: any = "-publishedAt";
      if (req.query.sort) {
         sort = (req.query.sort as string).split(",").join(" ");
      }

      const postsCount = await Post.countDocuments(filter);
      const pagesNum = Math.ceil(postsCount / limit);

      const posts = await Post.find(filter)
         .sort(sort)
         .skip((page - 1) * limit)
         .limit(limit);

      if (!posts || !posts.length) {
         throw new APIError(404, "No posts found");
      }

      const pagination = {
         page,
         pagesNum,
         total: postsCount,
         next: page < pagesNum,
         prev: page > 1,
      };

      res.status(200).json({
         status: "success",
         results: posts.length,
         data: posts,
         pagination,
      });
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

      if (!post) {
         throw new APIError(400, "Post could not be created");
      }

      res.status(201).json({
         status: "success",
         data: post,
      });
   }

   async getPost(req: Request, res: Response) {
      const postId = req.params.id;
      const post = await Post.findById(postId).populate("author");
      if (!post) {
         throw new APIError(404, `Post with id ${postId} not found`);
      }
      res.status(200).json({ status: "success", data: post });
   }

   async updatePost(req: Request, res: Response) {
      const postId = req.params.id;
      const post = await Post.findByIdAndUpdate(postId, req.body, {
         new: true,
         runValidators: true,
      });
      if (!post) {
         throw new APIError(404, `Post with id ${postId} not found`);
      }
      res.status(200).json({ status: "success", data: post });
   }

   async deletePost(req: Request, res: Response) {
      const postId = req.params.id;
      const post = await Post.findByIdAndDelete(postId);
      if (!post) {
         throw new APIError(404, `Post with id ${postId} not found`);
      }
      res.status(200).json({ status: "success", data: post });
   }
}

const postsController = new PostsController();

export default postsController;

import express from "express";
import postsController from "../controllers/postsController";
import auth from "../middlewares/auth";
import wrap from "express-async-wrap";
import createRateLimiter from "../middlewares/rateLimiter";
import validate from "../middlewares/validation";
import { createPostSchema } from "../schemas/postValidation";

const apiLimiter = createRateLimiter(200, 15);

const postsRouter = express.Router();

postsRouter.get("/", apiLimiter, postsController.getPosts);

postsRouter.get("/:id", apiLimiter, postsController.getPost);

postsRouter.post(
   "/",
   auth,
   validate(createPostSchema),
   wrap(postsController.createPost)
);

postsRouter.put(
   "/:id",
   auth,
   validate(createPostSchema),
   wrap(postsController.updatePost)
);

postsRouter.delete("/:id", auth, postsController.deletePost);

export default postsRouter;

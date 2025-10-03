import express from "express";
import usersController from "../controllers/usersController";
import auth from "../middlewares/auth";
import createRateLimiter from "../middlewares/rateLimiter";
import validate from "../middlewares/validation";
import { loginSchema, signupSchema } from "../schemas/userValidation";
import wrap from "express-async-wrap";

const usersRouter = express.Router();

usersRouter.get("/", auth, wrap(usersController.getAllUsers));

usersRouter.get("/:id", auth, usersController.getUserById);

usersRouter.put("/:id", auth, usersController.updateUserById);

usersRouter.delete("/:id", auth, usersController.deleteUserById);

const authRateLimit = createRateLimiter(
   5,
   15,
   "Too many login/signup attempts."
);

usersRouter.post(
   "/signup",
   authRateLimit,
   validate(signupSchema),
   usersController.signup
);

usersRouter.post(
   "/login",
   authRateLimit,
   validate(loginSchema),
   usersController.login
);

export default usersRouter;

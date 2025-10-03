import express from "express";
import usersController from "../controllers/usersController";
import auth from "../middlewares/auth";

const usersRouter = express.Router();

usersRouter.get("/", auth, usersController.getAllUsers);

usersRouter.get("/:id", usersController.getUserById);

usersRouter.put("/:id", auth, usersController.updateUserById);

usersRouter.delete("/:id", auth, usersController.deleteUserById);

usersRouter.post("/signup", usersController.signup);

usersRouter.post("/login", usersController.login);

export default usersRouter;

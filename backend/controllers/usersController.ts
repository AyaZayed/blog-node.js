import { Request, Response } from "express";
import User from "../models/userSchema";
import APIError from "../utils/APIError";
import bcrypt from "bcrypt";
import { promisify } from "node:util";
const jwt = require("jsonwebtoken");

const jwtSign = promisify(jwt.sign);

class UsersController {
   async signup(req: Request, res: Response) {
      const data = req.body;
      if (!data.password || !data.passwordConfirm) {
         throw new APIError(400, "Password is required");
      }

      if (data.password !== data.passwordConfirm) {
         throw new APIError(400, "Passwords do not match");
      }

      const SALT_ROUNDS = Number(process.env.SALT_ROUNDS) || 10;

      const hashedPassowrd = await bcrypt.hash(data.password, SALT_ROUNDS);

      const newUser = await User.create({
         ...data,
         role: "user",
         password: hashedPassowrd,
      });

      if (!newUser) {
         throw new APIError(400, "User could not be created");
      }

      res.status(201).json({
         status: "success",
         data: newUser,
      });
   }

   async login(req: Request, res: Response) {
      const { email, password } = req.body;

      if (!email || !password) {
         throw new APIError(400, "Email and password are required");
      }

      const user = await User.findOne({ email });

      if (!user) {
         throw new APIError(400, "Invalid email or password");
      }

      console.log(password, user);

      const isMatched = await bcrypt.compare(password, user.password);

      if (!isMatched) {
         throw new APIError(400, "Invalid email or password");
      }

      const JWT_SECRET = process.env.JWT_SECRET;
      const JWT_EXPIRATION = process.env.JWT_EXPIRATION;

      const token = await jwtSign(
         {
            userId: user.id,
         },
         JWT_SECRET,
         {
            expiresIn: JWT_EXPIRATION,
         }
      );

      res.status(200).json({
         status: "success",
         data: { token },
      });
   }

   async getAllUsers(req: Request, res: Response) {
      const users = await User.find();

      if (!users) {
         throw new APIError(404, "No users found");
      }

      res.status(200).json({ status: "success", data: users });
   }

   async getUserById(req: Request, res: Response) {
      const userId = req.params.id;
      const user = await User.findById(userId);
      if (!user) {
         throw new APIError(404, `user with id ${userId} is not found`);
      }
      res.status(200).json({
         status: "success",
         data: user,
      });
   }
}

const usersController = new UsersController();
export default usersController;

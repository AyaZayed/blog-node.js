import { NextFunction, Request, Response } from "express";
import APIError from "../utils/APIError";

const restrictTo = (role: string) => {
   return (req: Request, res: Response, next: NextFunction) => {
      if (role !== req.user?.role) {
         throw new APIError(403, "You are not allowed to perform this action");
      }
   };
};

export default restrictTo;

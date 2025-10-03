import IUser from "../../interfaces/userInterface.model";

declare global {
   namespace Express {
      interface Request {
         user?: IUser;
      }
   }
}

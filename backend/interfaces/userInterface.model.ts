import { Document, ObjectId } from "mongoose";

interface IUser extends Document {
   _id: ObjectId;
   name: string;
   email: string;
   password: string;
   role: "user" | "admin";
   createdAt: Date;
   updatedAt: Date;
}

export default IUser;

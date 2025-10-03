import mongoose from "mongoose";
import IUser from "../interfaces/userInterface.model";

const userSchema = new mongoose.Schema<IUser>(
   {
      name: {
         type: String,
         required: [true, "A user must have a name"],
         minlength: [2, "Name must be at least 2 characters"],
         maxlength: [50, "Name cannot exceed 50 characters"],
      },
      email: {
         type: String,
         required: [true, "A user must have an email"],
         unique: true,
         lowercase: true,
         match: [/\S+@\S+\.\S+/, "Please enter a valid email"],
      },
      password: {
         type: String,
         required: [true, "A user must have a password"],
      },
      role: {
         type: String,
         enum: ["user", "admin"],
         default: "user",
      },
   },
   { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
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
         minlength: [8, "Password must be at least 8 characters"],
         match: [
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            "Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character",
         ],
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

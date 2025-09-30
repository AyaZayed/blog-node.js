import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
   {
      title: {
         type: String,
         required: [true, "A post must have a title"],
         trim: true,
         maxlength: [120, "Title cannot be more than 120 characters"],
         unique: [true, "A post title must be unique"],
      },
      content: {
         type: String,
         required: [true, "A post must have content"],
      },
      author: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",
         required: [true, "A post must have an author"],
      },
      tags: [
         {
            type: String,
            trim: true,
            lowercase: true,
         },
      ],
      slug: {
         type: String,
         unique: true,
         lowercase: true,
         trim: true,
      },
      thumbnail: {
         type: String,
         default: null,
      },
      images: [
         {
            url: { type: String, required: true },
            caption: { type: String, trim: true },
         },
      ],
      isPublished: {
         type: Boolean,
         default: false,
      },
      publishedAt: {
         type: Date,
      },
   },
   {
      timestamps: true,
   }
);

postSchema.pre("save", function (next) {
   if (!this.slug && this.title) {
      this.slug = this.title
         .toLowerCase()
         .replace(/[^a-z0-9]+/g, "-")
         .replace(/(^-|-$)+/g, "");
   }
   next();
});

const Post = mongoose.model("Post", postSchema);
export default Post;

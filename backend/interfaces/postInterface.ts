import { Document, ObjectId } from "mongoose";

interface IPost extends Document {
   _id: ObjectId;
   title: string;
   content: string;
   author: ObjectId;
   tags: string[];
   slug: string;
   thumbnail: string;
   isPublished: boolean;
   isFeatured: boolean;
   publishedAt: Date;
   createdAt: Date;
   updatedAt: Date;
   images: string[];
}

export default IPost;

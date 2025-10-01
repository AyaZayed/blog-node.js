interface IPost {
   title: string;
   content: string;
   author: string;
   tags: string[];
   slug: string;
   thumbnail: string;
   isPublished: boolean;
   publishedAt: Date;
   createdAt: Date;
   updatedAt: Date;
   images: string[];
}

export default IPost;

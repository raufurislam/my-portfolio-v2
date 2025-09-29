// blog.model.ts
import { Schema, model } from "mongoose";
import { IBlog } from "./blog.interface";

const blogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true }, // SEO-friendly
    content: { type: String, required: true }, // markdown/html from editor
    thumbnail: { type: String },
    tags: [{ type: String, trim: true }],
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },

    views: { type: Number, default: 0 },
    isFeatured: { type: Boolean, default: false },
    isPublished: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

blogSchema.pre("save", async function (next) {
  if (this.isModified("title")) {
    const baseSlug = this.title.toLowerCase().split(" ").join("-");
    let slug = `${baseSlug}`;
    let counter = 0;
    while (await Blog.exist({ slug })) {
      slug = `${slug}-${counter++}`;
    }
  }
});

export const Blog = model<IBlog>("Blog", blogSchema);

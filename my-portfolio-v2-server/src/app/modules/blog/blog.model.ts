import { Schema, model } from "mongoose";
import { IBlog } from "./blog.interface";

const blogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    content: { type: String, required: true },
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

// Auto-generate unique slug
blogSchema.pre("validate", async function (next) {
  if (this.isModified("title")) {
    const baseSlug = this.title.toLowerCase().trim().replace(/\s+/g, "-");
    let slug = baseSlug;
    let counter = 1;

    while (await Blog.exists({ slug })) {
      slug = `${baseSlug}-${counter++}`;
    }
    this.slug = slug;
  }
  next();
});

export const Blog = model<IBlog>("Blog", blogSchema);

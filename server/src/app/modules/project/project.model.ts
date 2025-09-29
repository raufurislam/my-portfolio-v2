import { Schema, model } from "mongoose";
import { IProject } from "./project.interface";

const projectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String, required: true, trim: true },

    technologies: [{ type: String, trim: true, required: true }],

    github: {
      frontend: { type: String, trim: true },
      backend: { type: String, trim: true },
      monorepo: { type: String, trim: true },
    },

    liveUrl: { type: String, trim: true },

    thumbnail: { type: String, trim: true },
    screenshots: [{ type: String, trim: true }],

    author: { type: Schema.Types.ObjectId, ref: "User", required: true },

    views: { type: Number, default: 0 },
    isFeatured: { type: Boolean, default: false },
    isPublished: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

projectSchema.pre("validate", async function (next) {
  if (this.isModified("title") || !this.slug) {
    const baseSlug = this.title.toLowerCase().replace(/\s+/g, "-");
    let slug = baseSlug;
    let counter = 1;

    while (await Project.exists({ slug })) {
      slug = `${baseSlug}-${counter++}`;
    }
    this.slug = slug;
  }
  next();
});

export const Project = model<IProject>("Project", projectSchema);

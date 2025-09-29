import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../users/users.interface";
import { BlogControllers } from "./blog.controller";

const router = Router();

router.get("/", BlogControllers.getAllBlogsScroll);
router.get("/featured", BlogControllers.getFeaturedBlogs);
router.get("/:slug", BlogControllers.getBlogBySlug);

router.post("/", checkAuth(Role.SUPER_ADMIN), BlogControllers.createBlog);
router.patch("/:id", checkAuth(Role.SUPER_ADMIN), BlogControllers.updateBlog);
router.delete("/:id", checkAuth(Role.SUPER_ADMIN), BlogControllers.deleteBlog);

export const BlogRoute = router;

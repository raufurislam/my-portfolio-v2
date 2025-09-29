import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../users/users.interface";
import { BlogControllers } from "./blog.controller";

const router = Router();

router.post("/", checkAuth(Role.SUPER_ADMIN), BlogControllers.createBlog);

export const BlogRoute = router;

import { Router } from "express";
import usersRouter from "../modules/users/users.routes";
import { AuthRoute } from "../modules/auth/auth.route";
import { BlogRoute } from "../modules/blog/blog.route";
import { ProjectRoute } from "../modules/project/project.route";

export const router = Router();

const moduleRoutes = [
  {
    path: "/user",
    route: usersRouter,
  },
  {
    path: "/auth",
    route: AuthRoute,
  },
  {
    path: "/blog",
    route: BlogRoute,
  },
  {
    path: "/project",
    route: ProjectRoute,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

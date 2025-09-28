import { Router } from "express";
import usersRouter from "../modules/users/users.routes";
import { AuthRoute } from "../modules/auth/auth.route";

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
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

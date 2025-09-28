import { Router } from "express";
import usersRouter from "../modules/users/users.routes";

export const router = Router();

const moduleRoutes = [
  {
    path: "/user",
    route: usersRouter,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

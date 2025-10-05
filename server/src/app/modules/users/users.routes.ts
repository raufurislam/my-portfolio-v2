import { Router } from "express";
import { UserControllers } from "./users.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { registerSchema } from "./users.validation";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "./users.interface";

const usersRouter = Router();

usersRouter.post(
  "/register",
  validateRequest(registerSchema),
  UserControllers.createUser
);

usersRouter.get(
  "/all-users",
  checkAuth(Role.SUPER_ADMIN),
  UserControllers.getAllUsers
);

export default usersRouter;

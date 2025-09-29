import { Router } from "express";
import { UserControllers } from "./users.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { registerSchema } from "./users.validation";

const usersRouter = Router();

usersRouter.post(
  "/register",
  validateRequest(registerSchema),
  UserControllers.createUser
);

export default usersRouter;

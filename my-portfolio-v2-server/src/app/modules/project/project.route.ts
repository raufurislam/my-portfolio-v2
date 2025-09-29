import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../users/users.interface";
import { ProjectControllers } from "./project.controller";

const router = Router();

router.post("/", checkAuth(Role.SUPER_ADMIN), ProjectControllers.createProject);

export const ProjectRoute = router;

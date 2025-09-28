import compression from "compression";
import cors from "cors";
import express, { Request, Response } from "express";
import { router } from "./app/routes";
import { envVars } from "./app/config/env";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";

const app = express();

// Middleware
app.use(cors());
app.use(compression());
app.use(express.json());

app.use(
  cors({
    origin: envVars.FRONTEND_URL,
    credentials: true,
  })
);

// api routes root
app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome to Server",
  });
});

app.use(globalErrorHandler);

app.use(notFound);

export default app;

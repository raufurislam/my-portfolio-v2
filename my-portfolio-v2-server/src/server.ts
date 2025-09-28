/* eslint-disable no-console */
import { Server } from "http";
import app from "./app";
import { prisma } from "./app/config/db";
import { envVars } from "./app/config/env";

let server: Server;

const startServer = async () => {
  try {
    await prisma.$connect();
    console.log("Connected to DB");
    console.log(envVars.DATABASE_URL, "database url");

    server = app.listen(envVars.PORT || 5000, () => {
      console.log(`Server is running on port ${envVars.PORT || 5000}`);
    });
  } catch (error) {
    console.log(error);
  }
};

(async () => {
  await startServer();
  // await seedSuperAdmin();
})();

process.on("unhandledRejection", (err) => {
  console.log("Unhandled Rejection detected. Server shutting down...", err);

  if (server) {
    server.close(() => {
      prisma.$disconnect().finally(() => process.exit(1));
    });
  } else {
    process.exit(1);
  }
});

process.on("uncaughtException", (err) => {
  console.log("Uncaught Exception detected. Server shutting down...", err);

  if (server) {
    server.close(() => {
      prisma.$disconnect().finally(() => process.exit(1));
    });
  } else {
    process.exit(1);
  }
});

process.on("SIGTERM", () => {
  console.log("SIGTERM signal received. Server is shutting down");

  if (server) {
    server.close(() => {
      prisma.$disconnect().finally(() => process.exit(1));
    });
  } else {
    process.exit(1);
  }
});

process.on("SIGINT", () => {
  console.log("SIGINT signal received. Server is shutting down");

  if (server) {
    server.close(() => {
      prisma.$disconnect().finally(() => process.exit(1));
    });
  } else {
    process.exit(1);
  }
});

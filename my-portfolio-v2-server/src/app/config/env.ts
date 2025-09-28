import dotenv from "dotenv";

dotenv.config();

interface EnvConfig {
  PORT: string;
  NODE_ENV: "development" | "production";
  DATABASE_URL: string;
  FRONTEND_URL: string;
}

const loadEnvVariables = (): EnvConfig => {
  const requiredEnvVariables: string[] = [
    "PORT",
    "DATABASE_URL",
    "NODE_ENV",
    "FRONTEND_URL",
  ];

  requiredEnvVariables.forEach((key) => {
    if (!process.env[key]) {
      throw new Error(`Missing require environment variable ${key}`);
    }
  });
  return {
    PORT: process.env.PORT as string,
    DATABASE_URL: process.env.DATABASE_URL!,
    NODE_ENV: process.env.NODE_ENV as "development" | "production",
    FRONTEND_URL: process.env.FRONTEND_URL as string,
  };
};

export const envVars: EnvConfig = loadEnvVariables();

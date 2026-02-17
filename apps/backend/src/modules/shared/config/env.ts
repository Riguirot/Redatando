import dotenv from "dotenv";

dotenv.config();

function required(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`❌ Environment variable ${key} is required`);
  }
  return value;
}

export const env = {
  PORT: Number(process.env.PORT) || 3000,
  NODE_ENV: process.env.NODE_ENV || "development",

  APP_NAME: process.env.APP_NAME || "redatando",
  APP_VERSION: process.env.APP_VERSION || "1.0.0",

  RATE_LIMIT_WINDOW_MINUTES: Number(
    process.env.RATE_LIMIT_WINDOW_MINUTES || 15
  ),
  RATE_LIMIT_MAX_REQUESTS: Number(
    process.env.RATE_LIMIT_MAX_REQUESTS || 100
  ),

  CORS_ORIGIN: process.env.CORS_ORIGIN || "*",

  LOG_LEVEL: process.env.LOG_LEVEL || "info"
};

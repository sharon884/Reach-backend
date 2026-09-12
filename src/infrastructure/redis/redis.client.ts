import { createClient } from "redis";

import { env } from "@/config/env";

import { logger } from "@/infrastructure/logger/index";

export const redisClient = createClient({
  url: env.REDIS_URL,
});

redisClient.on("error", (error) => {
  logger.error("Redis client error", {
    error,
  });
});
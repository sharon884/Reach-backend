import app from "@/app";

import { env } from "@/config/env";

import { logger } from "@/infrastructure/shared/logger/index";

import { redisClient } from "@/infrastructure/shared/redis/redis.client";

async function startServer(): Promise<void> {
  try {
    await redisClient.connect();

    app.listen(env.PORT, () => {
      logger.info(
        `Reach backend running on port ${env.PORT}`,
      );
    });
  } catch (error) {
    logger.error(
      "Failed to start Reach backend",
      {
        error,
      },
    );

    process.exit(1);
  }
}

startServer();
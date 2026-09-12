import app from "@/app";

import { env } from "@/config/env";

import { redisClient } from "@/infrastructure/redis/redis.client";

async function startServer(): Promise<void> {
  try {
    await redisClient.connect();

    app.listen(env.PORT, () => {
      console.log(`Reach backend running on port ${env.PORT}`);
    });
  } catch (error) {
    console.error("Failed to start Reach backend:", error);

    process.exit(1);
  }
}

startServer();
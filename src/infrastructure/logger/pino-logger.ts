import pino, { type Logger } from "pino";

import type { ILogger } from "@/application/services/logger";

export class PinoLogger implements ILogger {
  private readonly _logger: Logger;

  constructor() {
    this._logger = pino({
      level: "info",

      transport:
        process.env.NODE_ENV !== "production"
          ? {
              target: "pino-pretty",
              options: {
                colorize: true,
                translateTime: "SYS:standard",
                ignore: "pid,hostname",
              },
            }
          : undefined,
    });
  }

  info(
    message: string,
    meta?: Record<string, unknown>,
  ): void {
    this._logger.info(meta ?? {}, message);
  }

  warn(
    message: string,
    meta?: Record<string, unknown>,
  ): void {
    this._logger.warn(meta ?? {}, message);
  }

  error(
    message: string,
    meta?: Record<string, unknown>,
  ): void {
    this._logger.error(meta ?? {}, message);
  }
}
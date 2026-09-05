import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().int().positive().default(3000),

  DATABASE_URL: z.string().url(),

  SMTP_HOST: z.string().min(1),
  SMTP_PORT: z.coerce.number().int().positive(),
  SMTP_USER: z.string().min(1),
  SMTP_PASSWORD: z.string().min(1),
  SMTP_FROM: z.string().email(),

  JWT_SECRET: z.string().min(32),
});

const parsedEnv = envSchema.safeParse(process.env);

console.log("PORT from process.env:", process.env.PORT);

if (!parsedEnv.success) {
  console.error("Invalid environment variables:");
  console.error(z.treeifyError(parsedEnv.error));
  process.exit(1);
}

export const env = parsedEnv.data;
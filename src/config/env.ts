import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().int().positive().default(3000),
});

const parsedEnv = envSchema.safeParse(process.env);
console.log("PORT from process.env:", process.env.PORT);

if (!parsedEnv.success) {
  console.error("❌ Invalid environment variables:");
  console.error(z.treeifyError(parsedEnv.error));
  process.exit(1);
}

export const env = parsedEnv.data;
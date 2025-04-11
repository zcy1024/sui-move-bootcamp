import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  SUI_NETWORK: z.string(),
  ADMIN_SECRET_KEY: z.string(),
  USER_SECRET_KEY: z.string(),
  PACKAGE_ID: z.string(),
  FEE_CAP_ID: z.string(),
  TREASURY_ID: z.string(),
  CLOCK_ID: z.string(),
});

// Parse and validate the environment variables
const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error(
    "❌ Invalid environment variables:",
    JSON.stringify(parsedEnv.error.format(), null, 2)
  );
  process.exit(1); // Exit the process to prevent runtime issues
}

export const ENV = parsedEnv.data;

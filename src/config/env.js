import { z } from "zod";

const envSchema = z.object({
  PORT: z.string().default("8000"),
  MONGODB_URI: z.string().url("Must be a valid MongoDB URI"),
  CORS_ORIGIN: z.string().default("*"),
  CLOUDINARY_CLOUD_NAME: z.string().optional(),
  CLOUDINARY_API_KEY: z.string().optional(),
  CLOUDINARY_API_SECRET: z.string().optional(),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
});

// Assuming dotenv.config() is called in index.js before importing this config
const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error("❌ Invalid environment variables:", parsedEnv.error.format());
  process.exit(1);
}

export const env = parsedEnv.data;

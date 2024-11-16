import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {},
  client: {
    NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID: z.string().min(1),
  },
  // Only need to destructure client variables
  experimental__runtimeEnv: {
    NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID: "0405cd11-35a8-45a2-9e58-31f25f0aacf9",
  },
  skipValidation: process.env.SKIP_ENV_VALIDATION === "true",
});

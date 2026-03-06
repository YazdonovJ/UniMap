import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Generated build artifacts checked into the repo.
    "Kimi_Agent_Deployment_v2/**",
    "test-results/**",
    // Local debug scripts outside the Next.js app runtime.
    "puppet.js",
    "test.js",
  ]),
]);

export default eslintConfig;

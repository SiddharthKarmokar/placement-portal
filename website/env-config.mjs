const normalize = (value) => {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  if (!trimmed || trimmed === "undefined" || trimmed === "null") return undefined;
  return trimmed;
};

const runtimeEnv = normalize(
  typeof window !== "undefined" ? window.__ENV__?.VITE_SERVER : undefined
);
const viteEnv = normalize(import.meta.env.VITE_SERVER);

export const API_URL = runtimeEnv || viteEnv;

if (!API_URL) {
  throw new Error("❌ Missing VITE_SERVER. Define in .env or inject env-config.js.");
}

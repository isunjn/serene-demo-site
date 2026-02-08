// static/edit/auth.js — PAT-based auth
//
// Flow:
//   1. Try to fetch .env (exists on localhost, 404s on production)
//   2. If found, parse GITHUB_PERSONAL_ACCESS_TOKEN and store in sessionStorage
//   3. If not found, caller should show password prompt
//
// Usage:
//   import { initAuth, getToken, setToken } from "./auth.js";
//   const token = await initAuth();  // tries .env, then sessionStorage
//   if (!token) { /* show password field */ }

const STORAGE_KEY = "gh_token";

/** Try to read a PAT from .env (local dev only). */
async function loadEnvToken() {
  try {
    const res = await fetch(".env");
    if (!res.ok) return null;
    const text = await res.text();
    const match = text.match(/^GITHUB_PERSONAL_ACCESS_TOKEN=["']?(.+?)["']?\s*$/m);
    return match ? match[1] : null;
  } catch {
    return null;
  }
}

/** Attempt auto-auth from .env, fall back to sessionStorage. */
export async function initAuth() {
  const envToken = await loadEnvToken();
  if (envToken) {
    sessionStorage.setItem(STORAGE_KEY, envToken);
    return envToken;
  }
  return sessionStorage.getItem(STORAGE_KEY) || null;
}

/** Return the current token from sessionStorage, or null. */
export function getToken() {
  return sessionStorage.getItem(STORAGE_KEY) || null;
}

/** Store a token (from password prompt). */
export function setToken(token) {
  sessionStorage.setItem(STORAGE_KEY, token);
}

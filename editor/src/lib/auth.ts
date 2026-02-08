const STORAGE_KEY = 'gh_token';

/** Try to read a PAT from .env (local dev only — 404s in production). */
async function loadEnvToken(): Promise<string | null> {
	try {
		const res = await fetch('.env');
		if (!res.ok) return null;
		const text = await res.text();
		const match = text.match(/^GITHUB_PERSONAL_ACCESS_TOKEN=["']?(.+?)["']?\s*$/m);
		return match ? match[1] : null;
	} catch {
		return null;
	}
}

/** Attempt auto-auth from .env, fall back to sessionStorage. */
export async function initAuth(): Promise<string | null> {
	const envToken = await loadEnvToken();
	if (envToken) {
		sessionStorage.setItem(STORAGE_KEY, envToken);
		return envToken;
	}
	return sessionStorage.getItem(STORAGE_KEY) || null;
}

/** Return the current token, or null. */
export function getToken(): string | null {
	return sessionStorage.getItem(STORAGE_KEY) || null;
}

/** Store a token (from login form). */
export function setToken(token: string): void {
	sessionStorage.setItem(STORAGE_KEY, token);
}

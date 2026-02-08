import { getToken } from './auth';

const OWNER = 'bharatagarwal';
const REPO = 'personal-site';
const API = 'https://api.github.com';
const POSTS_PATH = 'content/posts';

export class GitHubError extends Error {
	constructor(
		public status: number,
		message: string
	) {
		super(message);
	}
}

export interface PostEntry {
	name: string;
	path: string;
	sha: string;
}

export interface PostContent {
	content: string;
	sha: string;
}

async function request(path: string, options?: RequestInit): Promise<Response> {
	const token = getToken();
	if (!token) throw new GitHubError(401, 'Not authenticated');

	const res = await fetch(`${API}${path}`, {
		...options,
		headers: {
			Authorization: `Bearer ${token}`,
			Accept: 'application/vnd.github.v3+json',
			...options?.headers
		}
	});

	if (!res.ok) {
		const body = await res.json().catch(() => ({}));
		const message = (body as { message?: string }).message ?? res.statusText;
		throw new GitHubError(res.status, message);
	}

	return res;
}

/** List markdown files in content/posts/. */
export async function listPosts(): Promise<PostEntry[]> {
	const res = await request(`/repos/${OWNER}/${REPO}/contents/${POSTS_PATH}`);
	const entries = (await res.json()) as Array<{ name: string; path: string; sha: string; type: string }>;
	return entries.filter((e) => e.type === 'file' && e.name.endsWith('.md'));
}

/** Fetch a single post's content (decoded) and its SHA. */
export async function getPost(slug: string): Promise<PostContent> {
	const res = await request(`/repos/${OWNER}/${REPO}/contents/${POSTS_PATH}/${slug}.md`);
	const data = (await res.json()) as { content: string; sha: string };
	const content = atob(data.content.replace(/\n/g, ''));
	return { content, sha: data.sha };
}

/** Create or update a post. Pass sha for updates, omit for creates. */
export async function savePost(
	slug: string,
	content: string,
	sha?: string
): Promise<{ sha: string }> {
	const body: Record<string, string> = {
		message: sha ? `Update ${slug}` : `Create ${slug}`,
		content: btoa(unescape(encodeURIComponent(content)))
	};
	if (sha) body.sha = sha;

	const res = await request(`/repos/${OWNER}/${REPO}/contents/${POSTS_PATH}/${slug}.md`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(body)
	});

	const data = (await res.json()) as { content: { sha: string } };
	return { sha: data.content.sha };
}

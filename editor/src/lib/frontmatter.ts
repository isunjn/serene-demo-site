import { parse, stringify } from 'smol-toml';

export interface Frontmatter {
	title: string;
	date: string;
	draft?: boolean;
	description?: string;
	taxonomies?: { tags: string[] };
	extra?: { featured: boolean; toc: boolean };
}

export const DEFAULT_FRONTMATTER: Frontmatter = {
	title: '',
	date: new Date().toISOString().slice(0, 10),
	draft: true,
	description: '',
	taxonomies: { tags: [] },
	extra: { featured: false, toc: false }
};

/**
 * Split raw file content on +++ delimiters, parse the TOML frontmatter.
 * Returns the parsed frontmatter and the markdown body.
 */
export function parseFrontmatter(raw: string): { frontmatter: Frontmatter; body: string } {
	const match = raw.match(/^\+\+\+\n([\s\S]*?)\n\+\+\+\n([\s\S]*)$/);
	if (!match) throw new Error('Invalid frontmatter: missing +++ delimiters');
	const parsed = parse(match[1]) as Record<string, unknown>;
	if (parsed.date instanceof Date) {
		parsed.date = parsed.date.toISOString().slice(0, 10);
	}
	const frontmatter = parsed as unknown as Frontmatter;
	return { frontmatter, body: match[2] };
}

/**
 * Serialize frontmatter and body back into a full file string with +++ delimiters.
 */
export function serializeFrontmatter(frontmatter: Frontmatter, body: string): string {
	const toml = stringify(frontmatter as unknown as Record<string, unknown>);
	const content = `+++\n${toml}+++\n${body}`;
	return content.endsWith('\n') ? content : content + '\n';
}

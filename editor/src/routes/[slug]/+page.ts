import { getPost } from '$lib/github';
import { parseFrontmatter } from '$lib/frontmatter';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	const { content, sha } = await getPost(params.slug);
	const { frontmatter, body } = parseFrontmatter(content);
	return { slug: params.slug, frontmatter, body, sha };
};

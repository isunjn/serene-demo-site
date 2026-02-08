<script lang="ts">
	import { listPosts, GitHubError } from './github';
	import { Search, SkeletonText } from 'carbon-components-svelte';

	let slugs = $state<string[]>([]);
	let query = $state('');
	let loading = $state(true);
	let error = $state<string | null>(null);

	let filtered = $derived(
		query ? slugs.filter((s) => s.includes(query.toLowerCase())) : slugs
	);

	async function loadPosts() {
		try {
			const entries = await listPosts();
			slugs = entries
				.filter((e) => e.name !== '_index.md')
				.map((e) => e.name.replace(/\.md$/, ''));
		} catch (e) {
			error = e instanceof GitHubError ? e.message : 'Failed to load posts';
		} finally {
			loading = false;
		}
	}

	loadPosts();
</script>

{#if loading}
	<SkeletonText heading />
	<SkeletonText paragraph lines={5} />
{:else if error}
	<p class="error">{error}</p>
{:else}
	<Search bind:value={query} placeholder="Filter posts…" autofocus />
	<ul class="post-list">
		{#each filtered as slug}
			<li>
				<a href="/edit/{slug}">{slug}</a>
			</li>
		{/each}
	</ul>
{/if}

<style>
	.post-list {
		list-style: none;
		padding: 0;
		margin: 1rem 0;
	}

	.post-list li + li {
		border-top: 1px solid var(--cds-border-subtle);
	}

	.post-list a {
		display: block;
		padding: 0.75rem 0;
		text-decoration: none;
		color: inherit;
	}

	.post-list a:hover {
		background: var(--cds-layer-hover);
	}

	.error {
		color: var(--cds-text-error);
	}
</style>

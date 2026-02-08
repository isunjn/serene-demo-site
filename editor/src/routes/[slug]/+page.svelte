<script lang="ts">
	import 'carbon-components-svelte/css/g10.css';
	import {
		Button,
		Checkbox,
		InlineNotification,
		TextArea,
		TextInput
	} from 'carbon-components-svelte';
	import { serializeFrontmatter } from '$lib/frontmatter';
	import type { Frontmatter } from '$lib/frontmatter';
	import { savePost } from '$lib/github';
	import { base } from '$app/paths';

	const { data } = $props();
	// svelte-ignore state_referenced_locally
	const { frontmatter, body: initialBody, sha: initialSha, slug } = data;

	let title = $state(frontmatter.title);
	let date = $state(frontmatter.date);
	let description = $state(frontmatter.description ?? '');
	let draft = $state(frontmatter.draft ?? false);
	let tags = $state((frontmatter.taxonomies?.tags ?? []).join(', '));
	let featured = $state(frontmatter.extra?.featured ?? false);
	let toc = $state(frontmatter.extra?.toc ?? false);
	let body = $state(initialBody);
	let sha = $state(initialSha);

	let saving = $state(false);
	let saved = $state(false);
	let error = $state<string | null>(null);

	async function save() {
		saving = true;
		saved = false;
		error = null;

		const frontmatter: Frontmatter = {
			title,
			date,
			description: description || undefined,
			draft: draft || undefined,
			taxonomies: { tags: tags ? tags.split(',').map((t: string) => t.trim()).filter(Boolean) : [] },
			extra: { featured, toc }
		};

		const content = serializeFrontmatter(frontmatter, body);

		try {
			const result = await savePost(slug, content, sha);
			sha = result.sha;
			saved = true;
		} catch (e) {
			error = e instanceof Error ? e.message : 'Save failed';
		} finally {
			saving = false;
		}
	}
</script>

<svelte:head>
	<title>Edit — {slug}</title>
</svelte:head>

<div class="editor">
	<header class="editor-header">
		<a href="{base}/">&larr; Posts</a>
		<h1>{slug}</h1>
	</header>

	<section class="fields">
		<TextInput labelText="Title" bind:value={title} />
		<TextInput labelText="Date" bind:value={date} placeholder="YYYY-MM-DD" />
		<TextInput labelText="Description" bind:value={description} />
		<TextInput labelText="Tags" bind:value={tags} placeholder="tag1, tag2, tag3" helperText="Comma-separated" />
		<div class="checkboxes">
			<Checkbox labelText="Draft" bind:checked={draft} />
			<Checkbox labelText="Featured" bind:checked={featured} />
			<Checkbox labelText="Table of contents" bind:checked={toc} />
		</div>
	</section>

	<section class="body">
		<TextArea labelText="Body" bind:value={body} rows={24} />
	</section>

	<footer class="actions">
		<Button on:click={save} disabled={saving}>
			{saving ? 'Saving…' : 'Save'}
		</Button>
		{#if saved}
			<InlineNotification
				kind="success"
				title="Saved"
				subtitle="Committed to main."
				hideCloseButton
				lowContrast
			/>
		{/if}
		{#if error}
			<InlineNotification
				kind="error"
				title="Error"
				subtitle={error}
				hideCloseButton
				lowContrast
			/>
		{/if}
	</footer>
</div>

<style>
	.editor {
		max-width: 48rem;
		margin: 0 auto;
		padding: 2rem 1rem;
	}

	.editor-header {
		margin-bottom: 1.5rem;
	}

	.editor-header a {
		font-size: 0.875rem;
		color: var(--cds-link-primary);
		text-decoration: none;
	}

	.editor-header h1 {
		margin: 0.25rem 0 0;
		font-size: 1.25rem;
	}

	.fields {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin-bottom: 1.5rem;
	}

	.checkboxes {
		display: flex;
		gap: 1.5rem;
	}

	.body {
		margin-bottom: 1.5rem;
	}

	.actions {
		display: flex;
		align-items: center;
		gap: 1rem;
	}
</style>

<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import { Markdown } from 'tiptap-markdown';

	let { content = $bindable('') }: { content: string } = $props();

	let element: HTMLDivElement = $state(undefined!);
	let editor: Editor | undefined = $state(undefined);
	let sourceMode = $state(false);

	onMount(() => {
		editor = new Editor({
			element,
			extensions: [
				StarterKit,
				Markdown,
			],
			content,
			onUpdate: ({ editor: e }) => {
				content = (e.storage as any).markdown.getMarkdown();
			},
		});
	});

	onDestroy(() => {
		editor?.destroy();
	});

	function toggleSource() {
		if (sourceMode) {
			// Source → Rich: push textarea content into TipTap
			editor?.commands.setContent(content);
		}
		sourceMode = !sourceMode;
	}
</script>

<div class="tiptap-wrap">
	<div class="toolbar">
		<button class="source-toggle" onclick={toggleSource}>
			{sourceMode ? 'Rich' : 'Source'}
		</button>
	</div>

	<div class="rich-editor" bind:this={element} class:hidden={sourceMode}></div>
	{#if sourceMode}
		<textarea class="source-editor" bind:value={content} rows={24}></textarea>
	{/if}
</div>

<style>
	.tiptap-wrap {
		border: 1px solid var(--cds-border-strong, #8d8d8d);
		border-radius: 2px;
	}

	.toolbar {
		display: flex;
		align-items: center;
		padding: 0.25rem 0.5rem;
		border-bottom: 1px solid var(--cds-border-subtle, #e0e0e0);
		background: var(--cds-layer-02, #f4f4f4);
	}

	.source-toggle {
		font-size: 0.75rem;
		padding: 0.25rem 0.75rem;
		background: transparent;
		border: 1px solid var(--cds-border-strong, #8d8d8d);
		border-radius: 2px;
		cursor: pointer;
		color: var(--cds-text-primary, #161616);
	}

	.source-toggle:hover {
		background: var(--cds-layer-hover, #e8e8e8);
	}

	.rich-editor :global(.tiptap) {
		padding: 1rem;
		min-height: 20rem;
		outline: none;
	}

	.rich-editor :global(.tiptap p) {
		margin: 0 0 0.75rem;
	}

	.rich-editor :global(.tiptap h1),
	.rich-editor :global(.tiptap h2),
	.rich-editor :global(.tiptap h3) {
		margin: 1.5rem 0 0.5rem;
	}

	.rich-editor :global(.tiptap code) {
		background: var(--cds-layer-02, #f4f4f4);
		padding: 0.125rem 0.25rem;
		border-radius: 2px;
		font-size: 0.875em;
	}

	.rich-editor :global(.tiptap pre) {
		background: var(--cds-layer-02, #f4f4f4);
		padding: 0.75rem 1rem;
		border-radius: 2px;
		overflow-x: auto;
	}

	.rich-editor :global(.tiptap pre code) {
		background: none;
		padding: 0;
	}

	.rich-editor :global(.tiptap blockquote) {
		border-left: 3px solid var(--cds-border-strong, #8d8d8d);
		margin: 0.75rem 0;
		padding-left: 1rem;
		color: var(--cds-text-secondary, #525252);
	}

	.rich-editor :global(.tiptap ul),
	.rich-editor :global(.tiptap ol) {
		padding-left: 1.5rem;
		margin: 0 0 0.75rem;
	}

	.rich-editor :global(.tiptap hr) {
		border: none;
		border-top: 1px solid var(--cds-border-subtle, #e0e0e0);
		margin: 1.5rem 0;
	}

	.hidden {
		display: none;
	}

	.source-editor {
		width: 100%;
		min-height: 20rem;
		padding: 1rem;
		border: none;
		outline: none;
		font-family: 'IBM Plex Mono', monospace;
		font-size: 0.875rem;
		line-height: 1.5;
		resize: vertical;
		box-sizing: border-box;
	}
</style>

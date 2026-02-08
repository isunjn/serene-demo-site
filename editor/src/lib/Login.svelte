<script lang="ts">
	import { PasswordInput, Button } from 'carbon-components-svelte';
	import { setToken } from './auth';

	interface Props {
		onauth: () => void;
	}
	let { onauth }: Props = $props();

	let token = $state('');

	function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		const trimmed = token.trim();
		if (!trimmed) return;
		setToken(trimmed);
		onauth();
	}
</script>

<form onsubmit={handleSubmit}>
	<!-- Hidden username for password manager matching -->
	<input type="text" autocomplete="username" value="editor" style="display:none" />

	<PasswordInput
		bind:value={token}
		labelText="GitHub Personal Access Token"
		placeholder="ghp_..."
		autocomplete="current-password"
		required
	/>

	<Button type="submit" style="margin-top: 1rem">Sign in</Button>
</form>

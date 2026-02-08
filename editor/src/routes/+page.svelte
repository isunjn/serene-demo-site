<script lang="ts">
	import 'carbon-components-svelte/css/g10.css';
	import { initAuth, getToken } from '$lib/auth';
	import Login from '$lib/Login.svelte';

	let authenticated = $state(false);
	let loading = $state(true);

	async function checkAuth() {
		const token = await initAuth();
		authenticated = !!token;
		loading = false;
	}

	function handleAuth() {
		authenticated = !!getToken();
	}

	checkAuth();
</script>

<svelte:head>
	<title>Edit — bharatagarwal.io</title>
</svelte:head>

{#if loading}
	<p>Loading…</p>
{:else if !authenticated}
	<h1>Blog Editor</h1>
	<Login onauth={handleAuth} />
{:else}
	<h1>Blog Editor</h1>
	<p>Authenticated. Post listing goes here.</p>
{/if}

<script lang="ts">
	import { page } from '$app/state';
	import ErrorView from '$lib/ErrorView.svelte';
</script>

<ErrorView status={page.status} message={page.error?.message} />

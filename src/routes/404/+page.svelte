<script lang="ts">
	import ErrorView from '$lib/ErrorView.svelte';
</script>

<!-- Prerendered to build/404.html, which GitHub Pages serves for unknown URLs. -->
<ErrorView status={404} message="Not Found" />

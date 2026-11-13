<script lang="ts">
	import ErrorView from '#lib/ErrorView.svelte';
	import * as m from '#lib/paraglide/messages.js';
</script>

<!-- Prerendered to build/404.html, which GitHub Pages serves for unknown URLs. -->
<ErrorView status={404} message={m.notFoundMessage()} />

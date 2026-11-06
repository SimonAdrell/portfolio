<script lang="ts">
	import NavComponent from '$lib//nav/NavComponent.svelte';
	import { i18n } from '$lib/i18n';
	import { ParaglideJS } from '@inlang/paraglide-sveltekit';
	import '../app.css';
	let { children } = $props();
</script>

<ParaglideJS {i18n}>
	<div class=" min-h-screen bg-primary md:grid dark:bg-primaryDark">
		<header class="sticky top-0 bg-primary dark:bg-primaryDark">
			<NavComponent></NavComponent>
		</header>
		<main class="">
			{@render children()}
		</main>
	</div>
</ParaglideJS>

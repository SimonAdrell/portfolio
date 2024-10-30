<script lang="ts">
	import FooterComponent from '$lib//nav/FooterComponent.svelte';

	import NavComponent from '$lib//nav/NavComponent.svelte';

	import { i18n } from '$lib/i18n';
	import { ParaglideJS } from '@inlang/paraglide-sveltekit';
	import '../app.css';
	import * as m from '$lib/paraglide/messages';
	import { backIn } from 'svelte/easing';
	let { children } = $props();
</script>

<ParaglideJS {i18n}>
	<div class="grid min-h-svh grid-rows-[auto-1fr-auto] bg-black">
		<header>
			<NavComponent></NavComponent>
		</header>
		<main class="">
			{@render children()}
		</main>
		<footer>
			<FooterComponent></FooterComponent>
		</footer>
	</div>

	<style lang="postcss">
		:global(html) {
			background-color: theme(colors.black);
		}
		:global(body) {
			background-color: theme(colors.black);
		}
	</style>
</ParaglideJS>

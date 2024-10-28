<script lang="ts">
	import NavComponent from '$lib//nav/NavComponent.svelte';

	import { i18n } from '$lib/i18n';
	import { ParaglideJS } from '@inlang/paraglide-sveltekit';
	import '../app.css';
	import * as m from '$lib/paraglide/messages';
	import { backIn } from 'svelte/easing';
	let { children } = $props();
</script>

<ParaglideJS {i18n}>
	<div class="min-h-full bg-black">
		<NavComponent></NavComponent>
		<main>
			{@render children()}
		</main>
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

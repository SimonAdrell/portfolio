<script lang="ts">
	import FooterComponent from "$lib//nav/FooterComponent.svelte";
	import NavComponent from "$lib//nav/NavComponent.svelte";
	import { i18n } from "$lib/i18n";
	import { ParaglideJS } from "@inlang/paraglide-sveltekit";
	import { page } from "$app/stores";
	import "../app.css";
	let { children } = $props();
	console.log(children);
	let isStartPage = (): boolean => {
		return true;
		return $page.url.pathname != "/";
	};
</script>

<ParaglideJS {i18n}>
	<div class=" md:grid min-h-screen  bg-primary dark:bg-primaryDark">
		<header class="sticky top-0 bg-primary dark:bg-primaryDark">
			{#if isStartPage()}
				<NavComponent></NavComponent>
			{/if}
		</header>
		<main class="">
			{@render children()}
		</main>
	</div>
</ParaglideJS>

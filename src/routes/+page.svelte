<script lang="ts">
	import { base } from "$app/paths";
	import { fly } from "svelte/transition";
	import { backOut } from "svelte/easing";
	import { onMount } from "svelte";
	import myface from "$lib/assets/myface.svg";
	import { Send } from "lucide-svelte";
	import * as m from "$lib/paraglide/messages";
	let ready = false;
	onMount(() => (ready = true));
</script>

<div class="flex w-screen items-center align-middle">
	<div class="items-center justify-center text-center flex">
		{#if ready}
			<header
				in:fly={{
					y: 70,
					delay: 10,
					easing: backOut,
				}}
			>
				<div
					class="w-screen justify-center place-items-center flex items-center"
				>
					<div>
						<img src={myface} alt="" width="300" height="300" />
					</div>
				</div>
				<h1
					class=" text-8xl w-screen font-SimonsHandwriting text-tertiary dark:text-tertiaryDark md:text-9xl lg:text-10xl text-center"
				>
					Code By Simon
				</h1>
				<div class="text-2xl w-screen items-center place-items-center">
					<a href="{base}/contact" class="flex justify-center items-center">
						<button
							aria-label="Contact me"
							type="button"
							class="bg-accent p-3 rounded-2xl flex items-center"
						>
							<span>
								<Send></Send>
							</span>
							<span class="pl-3"> {m.ctaStart()} </span></button
						>
					</a>
				</div>
			</header>
		{/if}
	</div>
</div>

<script lang="ts">
	import { page } from '$app/stores';
	import mysadfaceSvg from '$lib/assets/sadFace.png';
	import { Send } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { backOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	import * as m from '$lib/paraglide/messages';
	let ready = false;
	onMount(() => (ready = true));
</script>

<div class="flex w-screen items-center align-middle">
	<div class="flex items-center">
		{#if ready}
			<header
				in:fly={{
					y: 70,
					delay: 10,
					easing: backOut
				}}
			>
				<div class="w-screen place-items-center">
					<div>
						<img
							src={mysadfaceSvg}
							alt="Sad face"
							class="h-40 w-40 md:h-60 md:w-60 lg:h-80 lg:w-80"
						/>
					</div>
				</div>
				<h1
					class=" lg:text-10xl w-screen p-6 text-center text-8xl text-tertiary md:text-9xl dark:text-tertiaryDark"
				>
					{$page.status}
					{$page.error?.message}
				</h1>
				<div class="w-screen place-items-center items-center text-2xl">
					<a href="/contact" class="flex items-center">
						<button
							aria-label="Contact me"
							type="button"
							class="flex items-center rounded-2xl bg-accent p-3"
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

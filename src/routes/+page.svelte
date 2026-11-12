<script lang="ts">
	import { resolve } from '$app/paths';
	import { fly } from 'svelte/transition';
	import { backOut } from 'svelte/easing';
	import { onMount } from 'svelte';
	import myface from '$lib/assets/myface.svg';
	import { Send } from '@lucide/svelte';
	import * as m from '$lib/paraglide/messages';
	let ready = false;
	onMount(() => (ready = true));
</script>

<div class="flex w-screen items-center align-middle">
	<div class="flex items-center justify-center text-center">
		{#if ready}
			<header
				in:fly={{
					y: 70,
					delay: 10,
					easing: backOut
				}}
			>
				<div class="flex w-screen place-items-center items-center justify-center">
					<div>
						<img src={myface} alt="" width="300" height="300" />
					</div>
				</div>
				<h1
					class=" lg:text-10xl w-screen text-center font-SimonsHandwriting text-8xl text-tertiary md:text-9xl dark:text-tertiaryDark"
				>
					Code By Simon
				</h1>
				<div class="w-screen place-items-center items-center text-2xl">
					<a href={resolve('/contact')} class="flex items-center justify-center">
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

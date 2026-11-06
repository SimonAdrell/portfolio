<script lang="ts">
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { backOut } from 'svelte/easing';
	import myfaceSvg from '$lib/assets/myface.svg?raw';
	import { Mail, ExternalLink } from 'lucide-svelte';

	let ready = false;
	onMount(() => (ready = true));
</script>

<svelte:head>
	<title>Who am I?</title>
</svelte:head>

<div class="flex w-screen items-center">
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
						{@html myfaceSvg}
					</div>
				</div>
				<h1
					class=" lg:text-10xl w-screen text-center font-SimonsHandwriting text-8xl text-tertiary md:text-9xl dark:text-tertiaryDark"
				>
					Code By Simon
				</h1>
				<div class="w-screen place-items-center items-center text-2xl">
					<a
						href="https://www.linkedin.com/in/simon-adrell"
						target="_blank"
						class="flex items-center justify-center"
					>
						<button
							aria-label="Connect with me on linkedin"
							type="button"
							class="flex items-center rounded-2xl bg-accent p-3"
						>
							<span>
								<ExternalLink></ExternalLink>
							</span>
							<span class="pl-3"> LinkedIn</span></button
						>
					</a>
				</div>
				<div class="mt-5 w-screen place-items-center items-center text-2xl">
					<a
						href="mailto:simon@codebysimon.com?subject=Hello%20Simon"
						class="flex items-center justify-center"
					>
						<button
							aria-label="Email me"
							type="button"
							class="flex items-center rounded-2xl bg-accent p-3"
						>
							<span>
								<Mail></Mail>
							</span>
							<span class="pl-3">Simon@CodeBySimon.com</span>
						</button>
					</a>
				</div>
			</header>
		{/if}
	</div>
</div>

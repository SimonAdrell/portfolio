<script lang="ts">
	import { onMount } from "svelte";
	import { fly } from "svelte/transition";
	import { backOut } from "svelte/easing";
	import myfaceSvg from "$lib/assets/myface.svg?raw";
	import { Mail, ExternalLink } from "lucide-svelte";

	let ready = false;
	onMount(() => (ready = true));
</script>

<svelte:head>
	<title>Who am I?</title>
</svelte:head>

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
						{@html myfaceSvg}
					</div>
				</div>
				<h1
					class=" text-8xl w-screen font-SimonsHandwriting text-tertiary dark:text-tertiaryDark md:text-9xl lg:text-10xl text-center"
				>
					Code By Simon
				</h1>
				<div class="text-2xl w-screen items-center place-items-center">
					<a
						href="https://www.linkedin.com/in/simon-adrell"
						target="_blank"
						class="flex justify-center items-center"
					>
						<button
							aria-label="Connect with me on linkedin"
							type="button"
							class="bg-accent p-3 rounded-2xl flex items-center"
						>
							<span>
								<ExternalLink></ExternalLink>
							</span>
							<span class="pl-3"> LinkedIn</span></button
						>
					</a>
				</div>
				<div
					class="text-2xl w-screen mt-5 items-center place-items-center"
				>
					<a
						href="mailto:simon@codebysimon.com?subject=Hello%20Simon"
						class="flex justify-center items-center"
					>
						<button
							aria-label="Email me"
							type="button"
							class="bg-accent p-3 rounded-2xl flex items-center"
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

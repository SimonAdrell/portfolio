<script lang="ts">
	import * as m from "$lib/paraglide/messages";
	import myfaceSvg from "$lib/assets/myface.svg?raw";
	import { fly } from "svelte/transition";
	import { onMount } from "svelte";
	import { backOut } from "svelte/easing";
	import portrait from "$lib/assets/porttrait.jpg";
	import rutImg from "$lib/assets/rutImg.jpeg";
	import { Send } from "lucide-svelte";

	let ready = $state(false);
	onMount(() => (ready = true));
</script>

<svelte:head>
	<title>Code By Simon - About Me</title>
</svelte:head>

<div class="h-screen w-full">
	<div class="flex h-1/3 mb-7 md:mb-0 md:h-[20rem] w-full">
		{#if ready}
			<header
				class="flex items-center justify-center h-full w-full"
				in:fly={{
					y: 70,
					delay: 10,
					easing: backOut,
				}}
			>
				<div
					class="text-tertiary dark:text-secondaryDark max-w-fit flex-1"
				>
					<div class="">
						<h1
							class=" max-w-fit font-SimonsHandwriting text-7xl md:text-9xl ml-9 md:ml-0 leading-1"
						>
							{m.aboutMeHeader()}
						</h1>
					</div>
				</div>
			</header>
		{/if}
	</div>
	<div
		class="flex h-4/6 bg-tertiary dark:text-secondaryDark text-primary dark:text-primaryDark place-items-center flex-col"
	>
		<div class="mt-[-5rem] flex-1">
			{@html myfaceSvg}
		</div>
		<h2 class=" md:text-3xl text-2xl flex-1">
			{m.aboutTagline()}
		</h2>
	</div>
</div>

<div class=" ">
	<main class="">
		<div class="py mx-auto max-w-screen-xl lg:py-16">
			<div class=" text-secondary dark:text-secondaryDark text-xl">
				<div class="  md:flex flex-row">
					<div class="flex-1 justify-center p-12 flex">
						<img
							src={portrait}
							alt="Portrait of Simon"
							height="50"
							class="rounded-xl h-[20rem] shadow object-contain"
						/>
					</div>
					<div class="flex-1 grow p-12">
						<h1
							class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-tertiary dark:text-secondaryDark md:text-5xl lg:text-5xl"
						>
							Developer since 2012
						</h1>
						<div
							class="block mt-12 p-4 md:p-6 bg-accent dark:bg-tertiary border border-gray-200 rounded-lg shadow dark:text-secondaryDark dark:border-gray-700"
						>
							<p class="">
								{m.aboutTheDeveloper()}
							</p>
							<p class="mt-5">
								{m.aboutTheDeveloperSecond()}
							</p>
						</div>
					</div>
				</div>
				<div class="md:flex flex-row">
					<div class="flex-1 box-content my-3 p-12">
						<h1
							class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-tertiary md:text-5xl lg:text-5xl dark:text-secondaryDark"
						>
							Vanlifer since 2021
						</h1>
						<div
							class="block mt-12 p-6 bg-accent border border-gray-200 rounded-lg shadow dark:bg-tertiary dark:border-tertiaryDark"
						>
							<p class="whitespace-pre-wrap">
								{m.aboutTheVanlifer()}
							</p>
							<p class="mt-5 whitespace-pre-wrap">
								{m.aboutTheVanliferSecond()}
							</p>
							<div class="">
								<p class="mt-5">
									{m.CheckInstagram()}
								</p>
								<a
									class="text-7xl md:text-9xl text-orange font-SimonsHandwriting"
									href="https://www.instagram.com/onanothertrail/"
									target="_blank">OnAnotherTrail</a
								>
							</div>
						</div>
					</div>
					<div class="flex-1 justify-center p-12 flex">
						<img
							src={rutImg}
							alt="Campervan with mountains in the background"
							class="rounded-xl object-contain"
						/>
					</div>
				</div>
				<div>
					<a
						href="/contact"
						class="flex justify-center items-center mt-4 text-tertiary"
					>
						<button
							aria-label="Contact me"
							type="button"
							class="bg-accent p-3 rounded-2xl flex items-center"
						>
							<span>
								<Send></Send>
							</span>
							<span class="pl-3">
								{m.ctaStart()}
							</span></button
						>
					</a>
				</div>
			</div>
		</div>
	</main>
</div>

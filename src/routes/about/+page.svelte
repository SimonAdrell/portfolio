<script lang="ts">
	import { base } from '$app/paths';
	import * as m from '$lib/paraglide/messages';
	import myfaceSvg from '$lib/assets/myface.svg?raw';
	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { backOut } from 'svelte/easing';
	import portrait from '$lib/assets/porttrait.jpg';
	import rutImg from '$lib/assets/rutImg.jpeg';
	import { Send } from 'lucide-svelte';

	let ready = $state(false);
	onMount(() => (ready = true));
</script>

<svelte:head>
	<title>Code By Simon - About Me</title>
</svelte:head>

<div class="h-screen w-full">
	<div class="mb-7 flex h-1/3 w-full md:mb-0 md:h-[20rem]">
		{#if ready}
			<header
				class="flex h-full w-full items-center justify-center"
				in:fly={{
					y: 70,
					delay: 10,
					easing: backOut
				}}
			>
				<div class="max-w-fit flex-1 text-tertiary dark:text-secondaryDark">
					<div class="">
						<h1
							class=" leading-1 ml-9 max-w-fit font-SimonsHandwriting text-7xl md:ml-0 md:text-9xl"
						>
							{m.aboutMeHeader()}
						</h1>
					</div>
				</div>
			</header>
		{/if}
	</div>
	<div
		class="flex h-4/6 flex-col place-items-center bg-tertiary text-primary dark:text-primaryDark dark:text-secondaryDark"
	>
		<div class="mt-[-5rem] flex-1">
			{@html myfaceSvg}
		</div>
		<h2 class=" flex-1 text-2xl md:text-3xl">
			{m.aboutTagline()}
		</h2>
	</div>
</div>

<div class=" ">
	<main class="">
		<div class="py mx-auto max-w-screen-xl lg:py-16">
			<div class=" text-xl text-secondary dark:text-secondaryDark">
				<div class="  flex-row md:flex">
					<div class="flex flex-1 justify-center p-12">
						<img
							src={portrait}
							alt="Portrait of Simon"
							height="50"
							class="h-[20rem] rounded-xl object-contain shadow"
						/>
					</div>
					<div class="flex-1 grow p-12">
						<h1
							class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-tertiary md:text-5xl lg:text-5xl dark:text-secondaryDark"
						>
							Developer since 2012
						</h1>
						<div
							class="mt-12 block rounded-lg border border-gray-200 bg-accent p-4 shadow md:p-6 dark:border-gray-700 dark:bg-tertiary dark:text-secondaryDark"
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
				<div class="flex-row md:flex">
					<div class="my-3 box-content flex-1 p-12">
						<h1
							class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-tertiary md:text-5xl lg:text-5xl dark:text-secondaryDark"
						>
							Vanlifer since 2021
						</h1>
						<div
							class="mt-12 block rounded-lg border border-gray-200 bg-accent p-6 shadow dark:border-tertiaryDark dark:bg-tertiary"
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
									class="font-SimonsHandwriting text-7xl text-orange md:text-9xl"
									href="https://www.instagram.com/onanothertrail/"
									target="_blank">OnAnotherTrail</a
								>
							</div>
						</div>
					</div>
					<div class="flex flex-1 justify-center p-12">
						<img
							src={rutImg}
							alt="Campervan with mountains in the background"
							class="rounded-xl object-contain"
						/>
					</div>
				</div>
				<div>
					<a href="{base}/contact" class="mt-4 flex items-center justify-center text-tertiary">
						<button
							aria-label="Contact me"
							type="button"
							class="flex items-center rounded-2xl bg-accent p-3"
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

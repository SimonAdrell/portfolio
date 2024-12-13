<script lang="ts">
	import type { ActionData, PageData } from "./$types";
	import * as m from "$lib/paraglide/messages";
	import { fade } from "svelte/transition";
	import { DotLottie } from "@lottiefiles/dotlottie-web";
	import { onMount } from "svelte";
	import { onNavigate } from "$app/navigation";
	import franskaCentralmassivet from '$lib/assets/franskaCentralmas.png';
	let canvas = $state<HTMLCanvasElement>();
	onMount(() => {
		if (canvas) {
			const dotLottie = new DotLottie({
				autoplay: true,
				loop: false,
				canvas: canvas,
				src: "src/lib/assets/lottie/confetti.json", // or .json file
			});
		}
	});

	let { data, form }: { data: PageData; form: ActionData } = $props();
</script>

<svelte:head>
	<title>Who am I?</title>
</svelte:head>

<div class="flex items-center h-fit justify-center text-white">
	<main transition:fade={{ delay: 40, duration: 500 }} class="w-3/4">
		<div class="p-3 mb-4">
			<h1 class="text-5xl font-thin">
				{m.connect()}
			</h1>
		</div>
		<div class="flex flex-row">
			<div class="flex-1 bg-bginfo rounded-md mr-10 shadow-lg  shadow-slate-950">
				<div class="items-center justify-center text-gray-700 ">
					<header transition:fade class="p-10">
						<h1
							class="bold text-xl md:text-5xl ml-9 md:ml-0 "
						>
							<!-- {m.connectTagLine()} -->
						</h1>
						<p>
							Whether you have a project in mind, need a reliable
							developer on your team, or just want to discuss
							ideas, I'd love to hear from you.
						</p>
						<p class="mt-4">
							I'm available for freelance opportunities or
							consulting.
						</p>
						<p class="mt-4">
							Fill out the form, and I'll get back to you as soon
							as possible. Looking forward to connecting with you!
						</p>
					</header>
					<div class="min-w-full">
						<img class="min-w-full " src="{franskaCentralmassivet}" alt="Franska centralmassivet">
					</div>
				</div>
			</div>
			<div class="flex-2">
				<div class=" bg-white text-lg rounded-md text-gray-900">
					{#if form?.success}
						<p class="">Thanks for contacting me!</p>
						<canvas
							bind:this={canvas}
							id="dotlottie-canvas"
							style="width: 300px; height:300px;"
						></canvas>
					{:else}
						<form method="POST" class="">
							<div class="md:flex flex-wrap flex-1">
								<div class="flex-1 md:p-5 my-3">
									<label
										for="firstName"
										class="block text-xl font-thin mb-2"
									>
										Firstname
									</label>
									<input
										name="firstName"
										placeholder="Firstname"
										id="firstName"
										autocomplete="given-name"
										type="text"
										class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
									/>
								</div>
								<div class="flex-1 md:p-5 my-3">
									<label
										for="lastName"
										class="block text-xl font-thin mb-2"
									>
										Lastname
									</label>

									<input
										name="lastName"
										id="lastName"
										placeholder="Lastname"
										autocomplete="family-name"
										class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
										type="text"
									/>
								</div>
							</div>
							<div class="md:flex flex-row flex-1">
								<div class="flex-1 md:px-5">
									<label
										for="email"
										class="block font-thin text-xl mb-2"
									>
										Email:
									</label>
									<input
										name="email"
										placeholder="Email"
										autocomplete="email"
										id="email"
										class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
										type="email"
									/>
								</div>
							</div>
							<div class="md:flex flex-row flex-1 py-2">
								<div class="flex-1 md:px-5 my-3">
									<label
										for="message"
										class="block font-thin text-xl mb-2"
									>
										Message:
									</label>
									<textarea
										placeholder="Message"
										aria-multiline="true"
										rows="6"
										name="message"
										id="message"
										class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
									></textarea>
								</div>
							</div>
							<div class="md:flex flex-1 md:p-5">
								<button
									class="bg-gray-600 min-w-full border p-2 active:bg-orange text-white px-6 rounded"
								>
									Send
								</button>
							</div>
						</form>
					{/if}
				</div>
			</div>
		</div>
	</main>
</div>

<style>
	@keyframes fade-in {
		from {
			opacity: 0;
		}
	}

	@keyframes fade-out {
		to {
			opacity: 0;
		}
	}

	@keyframes slide-from-right {
		from {
			transform: translateX(30px);
		}
	}

	@keyframes slide-to-left {
		to {
			transform: translateX(-30px);
		}
	}

	:root::view-transition-old(root) {
		animation:
			90ms cubic-bezier(0.4, 0, 1, 1) both fade-out,
			300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-to-left;
	}

	:root::view-transition-new(root) {
		animation:
			210ms cubic-bezier(0, 0, 0.2, 1) 90ms both fade-in,
			300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-from-right;
	}
</style>

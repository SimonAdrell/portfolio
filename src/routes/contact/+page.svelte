<script lang="ts">
	import type { ActionData, PageData } from "./$types";
	import * as m from "$lib/paraglide/messages";
	import { Send } from "lucide-svelte";
	import { DotLottie } from "@lottiefiles/dotlottie-web";
	import { onMount } from "svelte";
	import franskaCentralmassivet from "$lib/assets/franskaCentralmas.png";
	import { enhance } from "$app/forms";
	let canvas = $state<HTMLCanvasElement>();
	onMount(() => {
		if (canvas) {
			const dotLottie = new DotLottie({
				autoplay: true,
				loop: false,
				canvas: canvas,
				src: "src/lib/assets/lottie/confetti.json",
			});
		}
	});

	var loading = $state(false);

	let { form }: { form: ActionData } = $props();
</script>

<svelte:head>
	<title>Who am I?</title>
</svelte:head>

<div class=" flex items-center p-3 justify-center text-white">
	<main class="w-3/4">
		<div class="md:grid grid-cols-2 grid-rows-1 gap-4">
			<div class=" bg-accent rounded-md shadow">
				<div class="items-center justify-center text-gray-700">
					<header class="p-10">
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
						<img
							class="min-w-full"
							src={franskaCentralmassivet}
							alt="Franska centralmassivet"
						/>
					</div>
				</div>
			</div>
			<div>
				<div class="p-3 bg-accent text-lg rounded-md text-gray-900">
					{#if form?.success}
						<div class=" p-2 align-middle items-center text-center">
							<h1
								class=" text-tertiary md:text-5xl lg:text-7xl text-center dark:text-tertiaryDark text-12xl font-SimonsHandwriting"
							>
								Thanks for contacting me!
							</h1>
							<canvas
								bind:this={canvas}
								id="dotlottie-canvas"
								style="width: 300px; height:300px;"
							></canvas>
						</div>
					{:else if loading}
						<div class=" p-2 align-middle items-center text-center">
							<div class="text-center">
								<div role="status">
									<svg
										aria-hidden="true"
										class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
										viewBox="0 0 100 101"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
											fill="currentColor"
										/>
										<path
											d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
											fill="currentFill"
										/>
									</svg>
									<span class="sr-only">Loading...</span>
								</div>
							</div>
						</div>
					{:else}
						<form
							method="POST"
							class=""
							use:enhance={() => {
								loading = true;
								return async ({ update }) => {
									loading = false;
									update();
								};
							}}
						>
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
									type="submit"
									class="bg-gray-600 border active:bg-orange text-white px-6 rounded p-3 flex items-center"
								>
									<span>
										<Send></Send>
									</span>
									<span class="pl-3"> Send </span>
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

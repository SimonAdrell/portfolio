<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import { navOptions } from './nav.svelte';
</script>

<nav class="bg-black">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex h-16">
			<div class="flex flex-1 items-center justify-end">
				<div class="hidden md:block">
					<div class="ml-10 flex items-baseline space-x-4 font-thin text-white">
						{#each navOptions as option, i}
							<a
								href={option.href}
								class="rounded-md px-3 py-2 text-sm hover:bg-gray-700 hover:text-white"
								aria-current="page">{option.page}</a
							>
						{/each}
					</div>
				</div>
			</div>
			<div class="-mr-2 flex md:hidden">
				<!-- Mobile menu button -->
				<button
					type="button"
					class="relative inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
					aria-controls="mobile-menu"
					aria-expanded="false"
				>
					<span class="absolute -inset-0.5"></span>
					<span class="sr-only">Open main menu</span>
					<!-- Menu open: "hidden", Menu closed: "block" -->
					<svg
						class="block h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						aria-hidden="true"
						data-slot="icon"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
						/>
					</svg>
					<!-- Menu open: "block", Menu closed: "hidden" -->
					<svg
						class="hidden h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						aria-hidden="true"
						data-slot="icon"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
					</svg>
				</button>
			</div>
		</div>
	</div>

	<!-- Mobile menu, show/hide based on menu state. -->
	<div class="hidden md:hidden" id="mobile-menu">
		<div class="space-y-1 px-2 pb-3 pt-2 font-thin text-white sm:px-3">
			<a
				href="/about"
				class="block rounded-md px-3 py-2 text-base hover:bg-gray-700"
				aria-current="page">About me</a
			>
			<a
				href="/skills"
				class="block rounded-md px-3 py-2 text-base hover:bg-gray-700 hover:text-white">My Skills</a
			>
			<a
				href="/cases"
				class="block rounded-md px-3 py-2 text-base hover:bg-gray-700 hover:text-white"
				>Customer cases</a
			>
			<a
				href="/contact"
				class="block rounded-md px-3 py-2 text-base hover:bg-gray-700 hover:text-white">Contact</a
			>
		</div>
	</div>
</nav>

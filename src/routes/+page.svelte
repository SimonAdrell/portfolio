<script lang="ts">
	import { fly } from "svelte/transition";
	import { backOut } from "svelte/easing";
	import { onMount } from "svelte";
	import { navOptions } from "$lib/nav/nav.svelte";
	import myfaceSvg from "$lib/assets/myface.svg?raw";
	let ready = false;
	onMount(() => (ready = true));
</script>

<div class="flex w-screen items-center align-middle">
	<div class="items-center flex">
		{#if ready}
			<header
				in:fly={{
					y: 70,
					delay: 10,
					easing: backOut,
				}}
			>
				<div class="w-screen place-items-center">
					<div>
						{@html myfaceSvg}
					</div>
				</div>
				<h1
					class=" text-8xl w-screen font-SimonsHandwriting text-tertiary dark:text-tertiaryDark md:text-9xl lg:text-10xl text-center"
				>
					Code By Simon
				</h1>
				<div class="w-screen hidden place-items-center">
					<div class="xl:flex flex-wrap p-2">
						{#each navOptions as option, i}
							<div class="flex-2 pt-7 text-center">
								<a
									href={option.href}
									class="	rounded-md px-5 py-2 font-thin md:text-4xl underline underline-offset-[10px] decoration-1 text-2xl hover:text-white transition-colors duration-500 text-orange"
									>{option.page}</a
								>
							</div>
						{/each}
					</div>
				</div>
			</header>
		{/if}
	</div>
</div>

<script lang="ts">
	import { resolve } from '$app/paths';
	import mysadfaceSvg from '$lib/assets/sadFace.png';
	import { Send } from '@lucide/svelte';
	import * as m from '$lib/paraglide/messages';

	let { status, message }: { status: number; message?: string } = $props();
</script>

<!-- No intro animation: content must render without JavaScript (GitHub Pages 404.html). -->
<main class="flex min-h-screen w-full items-center justify-center">
	<div>
		<div class="flex justify-center">
			<img
				src={mysadfaceSvg}
				alt={m.notFoundImageAlt()}
				class="h-40 w-40 md:h-60 md:w-60 lg:h-80 lg:w-80"
			/>
		</div>
		<h1 class="p-6 text-center text-8xl text-tertiary md:text-9xl dark:text-tertiaryDark">
			{status}
			{message}
		</h1>
		<div class="flex justify-center text-2xl">
			<a href={resolve('/')} class="flex min-h-11 items-center rounded-2xl bg-accent p-3">
				<Send aria-hidden="true"></Send>
				<span class="pl-3">{m.notFoundBack()}</span>
			</a>
		</div>
	</div>
</main>

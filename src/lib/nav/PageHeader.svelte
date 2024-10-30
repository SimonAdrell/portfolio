<script lang="ts">
	import { fade } from 'svelte/transition';
	export let header: string;
	export let headerTagLine: string;
</script>

<div class=" inset-0 flex items-end justify-center p-2">
	<header transition:fade>
		<h1 class="bold text-3xl font-normal tracking-tight text-white md:text-8xl">{header}</h1>
		<h2 class="mb-3 font-thin tracking-tight text-white md:text-2xl">
			{headerTagLine}
		</h2>
	</header>
</div>

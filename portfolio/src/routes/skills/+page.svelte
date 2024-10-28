<script lang="ts">
	import type { PageData } from './$types';
	import { fade } from 'svelte/transition';
	import * as m from '$lib/paraglide/messages';

	export let data: PageData;
</script>

<div class="flex h-screen items-center justify-center" transition:fade>
	<div>
		<div class=" inset-0 flex items-end justify-center">
			<header transition:fade>
				<h1 class="bold text-3xl font-normal tracking-tight text-white md:text-8xl">
					{m.mySkills()}
				</h1>
				<h2 class="mb-3 font-thin tracking-tight text-white md:text-2xl">
					{m.mySkillsTagLine()}
				</h2>
			</header>
		</div>
	</div>
</div>

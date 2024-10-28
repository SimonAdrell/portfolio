<script lang="ts">
	import type { PageData } from './$types';
	import { fade } from 'svelte/transition';
	import * as m from '$lib/paraglide/messages';
	import startPageImage from '$lib/assets/startPageImage.png';
	export let data: PageData;
	function scrollIntoView() {
		const el = document.querySelector('#mainContent');
		if (!el) return;
		el.scrollIntoView({
			behavior: 'smooth'
		});
	}
	scrollIntoView();
</script>

<div class="flex h-screen items-center justify-center" transition:fade>
	<div>
		<div class=" inset-0 flex items-end justify-center">
			<header transition:fade>
				<h1 class="bold text-3xl font-normal tracking-tight text-white md:text-8xl">
					{m.aboutMe()}
				</h1>
				<h2 class="mb-3 font-thin tracking-tight text-white md:text-2xl">
					{m.aboutTagline()}
				</h2>
			</header>
		</div>
	</div>
</div>

<div class="flex items-center justify-center text-white">
	<main transition:fade={{ delay: 400, duration: 1200 }} class="w-3/4">
		<div class="flex p-10">
			<div class="flex-2 p-6">
				<img class="rounded-t-3xl" src={startPageImage} alt="Simon" />
			</div>
			<p class="flex-3 mb-3 p-6 font-thin tracking-tight text-white md:text-2xl">
				Simon Adrell is the visionary founder of [Company Name], where he combines years of industry
				expertise with a dedication to excellence and innovation. Known for his hands-on approach
				and deep technical knowledge, Simon has guided [Company Name] in creating solutions that
				truly meet clients’ needs and surpass expectations.
			</p>
		</div>
		<div class="flex p-10">
			<p class="mb-3 flex-1 p-6 font-thin tracking-tight text-white md:text-2xl">
				With a background in [industry or field, e.g., software engineering, digital marketing,
				product design], Simon has a knack for identifying unique opportunities and delivering
				cutting-edge projects. His leadership style is rooted in collaboration, fostering a creative
				environment where innovation and growth thrive.
			</p>
			<div class="flex-1 p-6">
				<img class="rounded-full" src={startPageImage} alt="Simon" />
			</div>
		</div>
		<div class="flex p-10">
			<div class="flex-1 p-6">
				<img class="rounded-full" src={startPageImage} alt="Simon" />
			</div>
			<p class="mb-3 flex-1 p-6 font-thin tracking-tight text-white md:text-2xl">
				Outside of work, Simon is passionate about [interests or hobbies, e.g., outdoor adventures,
				sustainable technology, community-building]. This personal connection to [hobby/interest]
				helps him stay grounded and bring a fresh perspective to the business.
			</p>
		</div>
	</main>
</div>

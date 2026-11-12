<script lang="ts">
	import myface from '$lib/assets/myface.svg';
	import { Mail, ExternalLink } from '@lucide/svelte';
</script>

<svelte:head>
	<title>Who am I?</title>
</svelte:head>

<div class="flex w-screen items-center">
	<div class="flex items-center justify-center text-center">
		<header class="slide-in">
			<div class="flex w-screen place-items-center items-center justify-center">
				<div>
					<img src={myface} alt="" width="300" height="300" />
				</div>
			</div>
			<h1
				class=" lg:text-10xl w-screen text-center font-SimonsHandwriting text-8xl text-tertiary md:text-9xl dark:text-tertiaryDark"
			>
				Code By Simon
			</h1>
			<div class="w-screen place-items-center items-center text-2xl">
				<a
					href="https://www.linkedin.com/in/simon-adrell"
					target="_blank"
					class="flex items-center justify-center"
				>
					<button
						aria-label="Connect with me on linkedin"
						type="button"
						class="flex items-center rounded-2xl bg-accent p-3"
					>
						<span>
							<ExternalLink></ExternalLink>
						</span>
						<span class="pl-3"> LinkedIn</span></button
					>
				</a>
			</div>
			<div class="mt-5 w-screen place-items-center items-center text-2xl">
				<a
					href="mailto:simon@codebysimon.com?subject=Hello%20Simon"
					class="flex items-center justify-center"
				>
					<button
						aria-label="Email me"
						type="button"
						class="flex items-center rounded-2xl bg-accent p-3"
					>
						<span>
							<Mail></Mail>
						</span>
						<span class="pl-3">Simon@CodeBySimon.com</span>
					</button>
				</a>
			</div>
		</header>
	</div>
</div>

<style>
	@media (prefers-reduced-motion: no-preference) {
		.slide-in {
			animation: slide-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both;
		}
	}
	@keyframes slide-in {
		from {
			opacity: 0;
			transform: translateY(70px);
		}
	}
</style>

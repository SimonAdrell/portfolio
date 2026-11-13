<script lang="ts">
	import { page } from '$app/state';
	import { navOptions } from './nav.svelte';
	import { resolve } from '$app/paths';
	let visible = $state(false);
	const isStartPage = (): boolean => page.url.pathname != resolve('/');
	const toggleVisibility = () => {
		visible = !visible;
	};
</script>

<nav class="">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex h-16">
			<div class="flex-1 md:p-4">
				{#if isStartPage()}
					<a href={resolve('/')} title="Start">
						<span class="font-SimonsHandwriting text-6xl text-orange md:text-8xl md:leading-6"
							>Code By Simon</span
						>
					</a>
				{/if}
			</div>
			<div class="hidden flex-1 justify-end p-4 md:flex">
				<div class="hidden md:block">
					<div class="ml-10 flex items-baseline space-x-4 font-thin">
						{#each navOptions as option (option.href)}
							<div>
								<a
									href={resolve(option.href)}
									class=" pt-2 text-xl text-secondary underline-offset-1 transition-all duration-100 hover:pt-4 hover:text-tertiary aria-current:text-2xl aria-current:text-tertiary dark:text-secondaryDark hover:dark:text-tertiaryDark"
									aria-current={page.url.pathname === resolve(option.href)}>{option.page}</a
								>
							</div>
						{/each}
					</div>
				</div>
			</div>
			<label class="relative z-40 cursor-pointer px-3 py-6 md:hidden" for="mobile-menu">
				<input class="peer hidden" type="checkbox" id="mobile-menu" bind:checked={visible} />
				<div
					class="relative z-50 block h-[2px] w-7 bg-orange bg-transparent content-[''] peer-checked:bg-transparent before:absolute before:top-[-0.35rem] before:z-50 before:block before:h-full before:w-full before:bg-orange before:transition-all before:duration-200 before:ease-out before:content-[''] peer-checked:before:top-0 peer-checked:before:w-full peer-checked:before:rotate-45 peer-checked:before:transform after:absolute after:right-0 after:bottom-[-0.35rem] after:block after:h-full after:w-full after:bg-orange after:transition-all after:duration-200 after:ease-out after:content-[''] peer-checked:after:bottom-0 peer-checked:after:w-full peer-checked:after:-rotate-45 peer-checked:after:transform"
				></div>
				<div
					class="fixed inset-0 z-40 hidden h-full w-full bg-black/50 backdrop-blur-xs peer-checked:block"
				>
					&nbsp;
				</div>
				<div
					class="fixed top-0 right-0 z-40 h-full w-full translate-x-full overflow-y-auto overscroll-y-none transition duration-500 peer-checked:translate-x-0"
				>
					<div
						class="float-right min-h-full w-[65%] bg-primary px-6 pt-12 text-tertiary shadow-2xl dark:bg-primaryDark dark:text-tertiaryDark"
					>
						<menu>
							{#each navOptions as option (option.href)}
								<li class="m-2">
									<a
										href={resolve(option.href)}
										class=" rounded-md px-3 py-2 text-2xl hover:text-white"
										aria-current={page.url.pathname === resolve(option.href)}
										onclick={toggleVisibility}>{option.page}</a
									>
								</li>
							{/each}
						</menu>
					</div>
				</div>
			</label>
		</div>
	</div>
</nav>

<script lang="ts">
	import { page } from "$app/state";
	import { navOptions } from "./nav.svelte";
	let visible = $state(false);
	const isStartPage = (): boolean => page.url.pathname != "/";
	const toggleVisibility = () => {
		visible = !visible;
	};
</script>

<nav class="">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex h-16">
			<div class="flex-1 md:p-4">
				{#if isStartPage()}
					<a href="/" title="Start">
						<span
							class="font-SimonsHandwriting text-6xl md:text-8xl md:leading-6 text-orange"
							>Code By Simon</span
						>
					</a>
				{/if}
			</div>
			<div class="flex-1 hidden md:flex p-4 justify-end">
				<div class="hidden md:block">
					<div class="ml-10 flex items-baseline space-x-4 font-thin">
						{#each navOptions as option, i}
							<div>
								<a
									href={option.href}
									class=" text-xl underline-offset-1 text-secondary dark:text-secondaryDark transition-all duration-100 hover:pt-4 pt-2 hover:dark:text-tertiaryDark hover:text-tertiary aria-[current=true]:text-tertiary aria-[current=trye]:dark:text-tertiaryDark aria-[current=true]:text-2xl"
									aria-current={page.url.pathname ===
										option.href}>{option.page}</a
								>
							</div>
						{/each}
					</div>
				</div>
			</div>
			<label
				class="relative z-40 cursor-pointer px-3 py-6 md:hidden"
				for="mobile-menu"
			>
				<input
					class="peer hidden"
					type="checkbox"
					id="mobile-menu"
					bind:checked={visible}
				/>
				<div
					class="bg-orange before:bg-orange after:bg-orange relative z-50 block h-[2px] w-7 bg-transparent content-[''] before:absolute before:top-[-0.35rem] before:z-50 before:block before:h-full before:w-full before:transition-all before:duration-200 before:ease-out before:content-[''] after:absolute after:bottom-[-0.35rem] after:right-0 after:block after:h-full after:w-full after:transition-all after:duration-200 after:ease-out after:content-[''] peer-checked:bg-transparent before:peer-checked:top-0 before:peer-checked:w-full before:peer-checked:rotate-45 before:peer-checked:transform after:peer-checked:bottom-0 after:peer-checked:w-full after:peer-checked:-rotate-45 after:peer-checked:transform"
				></div>
				<div
					class="fixed inset-0 z-40 hidden h-full w-full bg-black/50 backdrop-blur-sm peer-checked:block"
				>
					&nbsp;
				</div>
				<div
					class="fixed right-0 top-0 z-40 h-full w-full translate-x-full overflow-y-auto overscroll-y-none transition duration-500 peer-checked:translate-x-0"
				>
					<div
						class="float-right min-h-full w-[65%] bg-primary dark:bg-primaryDark dark:text-tertiaryDark text-tertiary px-6 pt-12 shadow-2xl"
					>
						<menu>
							{#each navOptions as option, i}
								<li class="m-2">
									<a
										href={option.href}
										class=" rounded-md px-3 py-2 text-2xl hover:text-white"
										aria-current={page.url.pathname ===
											option.href}
										onclick={toggleVisibility}
										>{option.page}</a
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

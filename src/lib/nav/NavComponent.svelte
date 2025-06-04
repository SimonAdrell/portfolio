<script lang="ts">
	import { page } from "$app/state";
	let visible = $state(false);
	const isStartPage = (): boolean => page.url.pathname != "/";
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
		</div>
	</div>
</nav>

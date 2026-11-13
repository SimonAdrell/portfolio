<script lang="ts">
	import { resolve } from '$app/paths';
	import TypingAnimation from './TypingAnimation.svelte';
	import handsImg from '$lib/assets/workingHands.jpeg';
	import * as m from '$lib/paraglide/messages';
	import { Send } from '@lucide/svelte';
</script>

<div
	class="mb-7 flex h-120 w-full items-center justify-center bg-gray-900/50 bg-[url('$lib/assets/workingHands.jpeg')] bg-cover bg-center md:mb-0 md:h-144"
>
	<header class="flex h-full w-full flex-col items-center justify-center bg-gray-900/50">
		<div class=" pb-10 text-center text-7xl font-thin text-orange">
			<TypingAnimation typingTexts={[m.mySkills()]}></TypingAnimation>
		</div>
		<div class="text-center text-4xl text-orange">
			<span>
				[{m.mySkillsTagLine()}]
			</span>
		</div>
	</header>
</div>
<div class="text-fontcolor flex items-center justify-center">
	<main class="w-3/4">
		<div class="md:p-12">
			<h1
				class="bold p-1 text-3xl font-normal tracking-tight text-tertiary md:text-6xl dark:text-secondaryDark"
			>
				So, what's my history?
			</h1>
			<div
				class="mt-12 block rounded-lg border border-gray-200 bg-accent p-6 text-lg font-light text-tertiary shadow-sm dark:border-gray-700 dark:bg-accentDark dark:text-secondaryDark"
			>
				<div class="flex-row md:flex">
					<div class="flex-1 justify-center md:p-5">
						<img
							src={handsImg}
							alt="Keyboard and hands on desk with blurry background"
							class="rounded-xl"
						/>
					</div>
					<div class="flex-1 md:p-5">
						<p class=" text-lg font-light">
							I began my programming career in 2012, and since then, I’ve been committed to learning
							new languages, frameworks, and approaches to coding.
						</p>
						<p class=" pt-4 text-lg font-light">
							With over a decade of experience, I’ve gained deep expertise in .NET and C# but am
							always open to expanding my skills. I’m a quick learner and enjoy adapting to new
							challenges.
						</p>
						<p class=" pt-4 text-lg font-light">
							In 2024, I furthered my knowledge by earning an Azure certification, adding cloud
							expertise to my skillset. Whether it’s back-end development, cloud integration, or
							tackling complex issues, I bring reliability and dedication to every project.
						</p>
					</div>
				</div>
			</div>
			<div>
				<div class="flex-1 md:p-5">
					<a href={resolve('/contact')} class="mt-4 flex items-center justify-center text-tertiary">
						<button
							aria-label="Contact me"
							type="button"
							class="flex items-center rounded-2xl bg-accent p-3"
						>
							<span>
								<Send></Send>
							</span>
							<span class="pl-3">
								{m.ctaStart()}
							</span></button
						>
					</a>
				</div>
			</div>
			<div class="mt-12">
				<h2
					class="bold p-1 text-3xl font-normal tracking-tight text-tertiary md:text-3xl dark:text-secondaryDark"
				>
					Technologies and Tools I've Worked With:
				</h2>
				<div class="mt-4 flex flex-wrap gap-2">
					<span
						class="transform rounded-sm bg-tertiary px-5 py-2 text-sm font-medium text-primary transition duration-300 ease-in-out hover:bg-primary hover:text-tertiary dark:text-secondaryDark"
						>.Net Core</span
					>
					<span
						class="transform rounded-sm bg-tertiary px-5 py-2 text-sm font-medium text-primary transition duration-300 ease-in-out hover:bg-primary hover:text-tertiary dark:text-secondaryDark"
						>.NET</span
					>
					<span
						class="transform rounded-sm bg-tertiary px-5 py-2 text-sm font-medium text-primary transition duration-300 ease-in-out hover:bg-primary hover:text-tertiary dark:text-secondaryDark"
						>C#</span
					>
					<span
						class="transform rounded-sm bg-tertiary px-5 py-2 text-sm font-medium text-primary transition duration-300 ease-in-out hover:bg-primary hover:text-tertiary dark:text-secondaryDark"
						>Entity Framework</span
					>
					<span
						class="transform rounded-sm bg-tertiary px-5 py-2 text-sm font-medium text-primary transition duration-300 ease-in-out hover:bg-primary hover:text-tertiary dark:text-secondaryDark"
						>Azure blob storage</span
					>
					<span
						class="transform rounded-sm bg-tertiary px-5 py-2 text-sm font-medium text-primary transition duration-300 ease-in-out hover:bg-primary hover:text-tertiary dark:text-secondaryDark"
						>Azure Service Bus</span
					>
					<span
						class="transform rounded-sm bg-tertiary px-5 py-2 text-sm font-medium text-primary transition duration-300 ease-in-out hover:bg-primary hover:text-tertiary dark:text-secondaryDark"
						>Azure DevOps</span
					>
					<span
						class="transform rounded-sm bg-tertiary px-5 py-2 text-sm font-medium text-primary transition duration-300 ease-in-out hover:bg-primary hover:text-tertiary dark:text-secondaryDark"
						>Docker</span
					>
					<span
						class="transform rounded-sm bg-tertiary px-5 py-2 text-sm font-medium text-primary transition duration-300 ease-in-out hover:bg-primary hover:text-tertiary dark:text-secondaryDark"
						>Elasticsearch</span
					>
					<span
						class="transform rounded-sm bg-tertiary px-5 py-2 text-sm font-medium text-primary transition duration-300 ease-in-out hover:bg-primary hover:text-tertiary dark:text-secondaryDark"
						>React.js</span
					>
					<span
						class="transform rounded-sm bg-tertiary px-5 py-2 text-sm font-medium text-primary transition duration-300 ease-in-out hover:bg-primary hover:text-tertiary dark:text-secondaryDark"
						>React Native</span
					>
					<span
						class="transform rounded-sm bg-tertiary px-5 py-2 text-sm font-medium text-primary transition duration-300 ease-in-out hover:bg-primary hover:text-tertiary dark:text-secondaryDark"
						>Svelte</span
					>
					<span
						class="transform rounded-sm bg-tertiary px-5 py-2 text-sm font-medium text-primary transition duration-300 ease-in-out hover:bg-primary hover:text-tertiary dark:text-secondaryDark"
						>SvelteKit</span
					>
					<span
						class="transform rounded-sm bg-tertiary px-5 py-2 text-sm font-medium text-primary transition duration-300 ease-in-out hover:bg-primary hover:text-tertiary dark:text-secondaryDark"
						>HTML</span
					>
					<span
						class="transform rounded-sm bg-tertiary px-5 py-2 text-sm font-medium text-primary transition duration-300 ease-in-out hover:bg-primary hover:text-tertiary dark:text-secondaryDark"
						>JSON</span
					>
					<span
						class="transform rounded-sm bg-tertiary px-5 py-2 text-sm font-medium text-primary transition duration-300 ease-in-out hover:bg-primary hover:text-tertiary dark:text-secondaryDark"
						>Scrum</span
					>
					<span
						class="transform rounded-sm bg-tertiary px-5 py-2 text-sm font-medium text-primary transition duration-300 ease-in-out hover:bg-primary hover:text-tertiary dark:text-secondaryDark"
						>SQL</span
					>
					<span
						class="transform rounded-sm bg-tertiary px-5 py-2 text-sm font-medium text-primary transition duration-300 ease-in-out hover:bg-primary hover:text-tertiary dark:text-secondaryDark"
						>Vs Code</span
					>
					<span
						class="transform rounded-sm bg-tertiary px-5 py-2 text-sm font-medium text-primary transition duration-300 ease-in-out hover:bg-primary hover:text-tertiary dark:text-secondaryDark"
						>Visual Studio</span
					>
					<span
						class="transform rounded-sm bg-tertiary px-5 py-2 text-sm font-medium text-primary transition duration-300 ease-in-out hover:bg-primary hover:text-tertiary dark:text-secondaryDark"
						>Terraform</span
					>
					<span
						class="transform rounded-sm bg-tertiary px-5 py-2 text-sm font-medium text-primary transition duration-300 ease-in-out hover:bg-primary hover:text-tertiary dark:text-secondaryDark"
						>SSRS</span
					>
					<span
						class="transform rounded-sm bg-tertiary px-5 py-2 text-sm font-medium text-primary transition duration-300 ease-in-out hover:bg-primary hover:text-tertiary dark:text-secondaryDark"
						>SSIS</span
					>
					<span
						class="transform rounded-sm bg-tertiary px-5 py-2 text-sm font-medium text-primary transition duration-300 ease-in-out hover:bg-primary hover:text-tertiary dark:text-secondaryDark"
						>SSAS</span
					>
					<span
						class="transform rounded-sm bg-tertiary px-5 py-2 text-sm font-medium text-primary transition duration-300 ease-in-out hover:bg-primary hover:text-tertiary dark:text-secondaryDark"
						>GIT</span
					>
					<span
						class="transform rounded-sm bg-tertiary px-5 py-2 text-sm font-medium text-primary transition duration-300 ease-in-out hover:bg-primary hover:text-tertiary dark:text-secondaryDark"
						>GraphQL</span
					>
				</div>
			</div>
		</div>
	</main>
</div>

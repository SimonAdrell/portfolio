<script lang="ts">
	import TypingAnimation from "./TypingAnimation.svelte";
	import handsImg from "$lib/assets/workingHands.jpeg";
	import * as m from "$lib/paraglide/messages";
	import { Send } from "lucide-svelte";
</script>

<div
	class="flex h-[30rem] mb-7 md:mb-0 md:h-[36rem] items-center bg-[url('$lib/assets/workingHands.jpeg')] w-full bg-cover bg-center bg-gray-900 bg-opacity-50 justify-center"
>
	<header
		class="flex items-center justify-center h-full w-full bg-gray-900 bg-opacity-50 flex-col"
	>
		<div
			class=" font-thin text-12xl text-center text-orange text-7xl pb-10"
		>
			<TypingAnimation typingTexts={[m.mySkills()]}></TypingAnimation>
		</div>
		<div class="text-center text-orange text-4xl">
			<span>
				[{m.mySkillsTagLine()}]
			</span>
		</div>
	</header>
</div>
<div class="flex items-center justify-center text-fontcolor">
	<main class="w-3/4">
		<div class="md:p-12">
			<h1
				class="bold p-1 text-3xl font-normal tracking-tight text-tertiary dark:text-secondaryDark md:text-6xl"
			>
				So, what's my history?
			</h1>
			<div
				class="text-tertiary dark:text-secondaryDark font-light text-lg block mt-12 p-6 bg-accent dark:bg-accentDark border border-gray-200 rounded-lg shadow dark:border-gray-700"
			>
				<div class="md:flex flex-row">
					<div class="flex-1 justify-center md:p-5">
						<img
							src={handsImg}
							alt="Keyboard and hands on desk with blurry background"
							class="h-4/4 rounded-xl"
						/>
					</div>
					<div class="flex-1 md:p-5">
						<p class=" font-light text-lg">
							I began my programming career in 2012, and since
							then, I’ve been committed to learning new languages,
							frameworks, and approaches to coding.
						</p>
						<p class=" font-light text-lg pt-4">
							With over a decade of experience, I’ve gained deep
							expertise in .NET and C# but am always open to
							expanding my skills. I’m a quick learner and enjoy
							adapting to new challenges.
						</p>
						<p class=" font-light text-lg pt-4">
							In 2024, I furthered my knowledge by earning an
							Azure certification, adding cloud expertise to my
							skillset. Whether it’s back-end development, cloud
							integration, or tackling complex issues, I bring
							reliability and dedication to every project.
						</p>
					</div>
				</div>
			</div>
			<div>
				<div class="flex-1 md:p-5">
					<a
						href="/contact"
						class="flex justify-center items-center mt-4 text-tertiary"
					>
						<button
							aria-label="Contact me"
							type="button"
							class="bg-accent p-3 rounded-2xl flex items-center"
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
					class="bold p-1 text-3xl font-normal tracking-tight text-tertiary dark:text-secondaryDark md:text-3xl"
				>
					Technologies and Tools I've Worked With:
				</h2>
				<div class="flex flex-wrap gap-2 mt-4">
					<span
						class="bg-tertiary text-primary dark:text-secondaryDark text-sm font-medium px-5 py-2 rounded transition duration-300 ease-in-out transform hover:bg-primary hover:text-tertiary"
						>.Net Core</span
					>
					<span
						class="bg-tertiary text-primary dark:text-secondaryDark text-sm font-medium px-5 py-2 rounded transition duration-300 ease-in-out transform hover:bg-primary hover:text-tertiary"
						>.NET</span
					>
					<span
						class="bg-tertiary text-primary dark:text-secondaryDark text-sm font-medium px-5 py-2 rounded transition duration-300 ease-in-out transform hover:bg-primary hover:text-tertiary"
						>C#</span
					>
					<span
						class="bg-tertiary text-primary dark:text-secondaryDark text-sm font-medium px-5 py-2 rounded transition duration-300 ease-in-out transform hover:bg-primary hover:text-tertiary"
						>Entity Framework</span
					>
					<span
						class="bg-tertiary text-primary dark:text-secondaryDark text-sm font-medium px-5 py-2 rounded transition duration-300 ease-in-out transform hover:bg-primary hover:text-tertiary"
						>Azure blob storage</span
					>
					<span
						class="bg-tertiary text-primary dark:text-secondaryDark text-sm font-medium px-5 py-2 rounded transition duration-300 ease-in-out transform hover:bg-primary hover:text-tertiary"
						>Azure Service Bus</span
					>
					<span
						class="bg-tertiary text-primary dark:text-secondaryDark text-sm font-medium px-5 py-2 rounded transition duration-300 ease-in-out transform hover:bg-primary hover:text-tertiary"
						>Azure DevOps</span
					>
					<span
						class="bg-tertiary text-primary dark:text-secondaryDark text-sm font-medium px-5 py-2 rounded transition duration-300 ease-in-out transform hover:bg-primary hover:text-tertiary"
						>Docker</span
					>
					<span
						class="bg-tertiary text-primary dark:text-secondaryDark text-sm font-medium px-5 py-2 rounded transition duration-300 ease-in-out transform hover:bg-primary hover:text-tertiary"
						>Elasticsearch</span
					>
					<span
						class="bg-tertiary text-primary dark:text-secondaryDark text-sm font-medium px-5 py-2 rounded transition duration-300 ease-in-out transform hover:bg-primary hover:text-tertiary"
						>React.js</span
					>
					<span
						class="bg-tertiary text-primary dark:text-secondaryDark text-sm font-medium px-5 py-2 rounded transition duration-300 ease-in-out transform hover:bg-primary hover:text-tertiary"
						>React Native</span
					>
					<span
						class="bg-tertiary text-primary dark:text-secondaryDark text-sm font-medium px-5 py-2 rounded transition duration-300 ease-in-out transform hover:bg-primary hover:text-tertiary"
						>Svelte</span
					>
					<span
						class="bg-tertiary text-primary dark:text-secondaryDark text-sm font-medium px-5 py-2 rounded transition duration-300 ease-in-out transform hover:bg-primary hover:text-tertiary"
						>SvelteKit</span
					>
					<span
						class="bg-tertiary text-primary dark:text-secondaryDark text-sm font-medium px-5 py-2 rounded transition duration-300 ease-in-out transform hover:bg-primary hover:text-tertiary"
						>HTML</span
					>
					<span
						class="bg-tertiary text-primary dark:text-secondaryDark text-sm font-medium px-5 py-2 rounded transition duration-300 ease-in-out transform hover:bg-primary hover:text-tertiary"
						>JSON</span
					>
					<span
						class="bg-tertiary text-primary dark:text-secondaryDark text-sm font-medium px-5 py-2 rounded transition duration-300 ease-in-out transform hover:bg-primary hover:text-tertiary"
						>Scrum</span
					>
					<span
						class="bg-tertiary text-primary dark:text-secondaryDark text-sm font-medium px-5 py-2 rounded transition duration-300 ease-in-out transform hover:bg-primary hover:text-tertiary"
						>SQL</span
					>
					<span
						class="bg-tertiary text-primary dark:text-secondaryDark text-sm font-medium px-5 py-2 rounded transition duration-300 ease-in-out transform hover:bg-primary hover:text-tertiary"
						>Vs Code</span
					>
					<span
						class="bg-tertiary text-primary dark:text-secondaryDark text-sm font-medium px-5 py-2 rounded transition duration-300 ease-in-out transform hover:bg-primary hover:text-tertiary"
						>Visual Studio</span
					>
					<span
						class="bg-tertiary text-primary dark:text-secondaryDark text-sm font-medium px-5 py-2 rounded transition duration-300 ease-in-out transform hover:bg-primary hover:text-tertiary"
						>Terraform</span
					>
					<span
						class="bg-tertiary text-primary dark:text-secondaryDark text-sm font-medium px-5 py-2 rounded transition duration-300 ease-in-out transform hover:bg-primary hover:text-tertiary"
						>SSRS</span
					>
					<span
						class="bg-tertiary text-primary dark:text-secondaryDark text-sm font-medium px-5 py-2 rounded transition duration-300 ease-in-out transform hover:bg-primary hover:text-tertiary"
						>SSIS</span
					>
					<span
						class="bg-tertiary text-primary dark:text-secondaryDark text-sm font-medium px-5 py-2 rounded transition duration-300 ease-in-out transform hover:bg-primary hover:text-tertiary"
						>SSAS</span
					>
					<span
						class="bg-tertiary text-primary dark:text-secondaryDark text-sm font-medium px-5 py-2 rounded transition duration-300 ease-in-out transform hover:bg-primary hover:text-tertiary"
						>GIT</span
					>
					<span
						class="bg-tertiary text-primary dark:text-secondaryDark text-sm font-medium px-5 py-2 rounded transition duration-300 ease-in-out transform hover:bg-primary hover:text-tertiary"
						>GraphQL</span
					>
				</div>
			</div>
		</div>
	</main>
</div>

<script lang="ts">
	import TypingAnimation from "./TypingAnimation.svelte";
	import handsImg from "$lib/assets/workingHands.jpeg";
	import * as m from "$lib/paraglide/messages";

	export function animateTyping(node: HTMLElement, texts: string[]) {
		let textsToType = texts;

		let textsIndex = 0;
		let charIndex = 0;
		let currentText = "";

		const updateInnerHTML = (isTyping?: boolean) => {
			node.innerHTML = "&#8203;" + currentText + (isTyping ? "|" : "");
		};

		const blinkingCursor = () => {
			if (currentText.endsWith("|")) {
				currentText = currentText.slice(0, -1);
			} else {
				currentText += "|";
			}
			updateInnerHTML();
		};

		const waitingEffect = (delay: number) => {
			const interval = setInterval(blinkingCursor, 500);
			setTimeout(() => {
				clearInterval(interval); // Stop blinking
				if (currentText.endsWith("|")) {
					currentText = currentText.slice(0, -1);
				}
				updateInnerHTML();
			}, delay);
		};

		const typeEffect = () => {
			const currentString = textsToType[textsIndex];
			const delay = currentString[charIndex] === " " ? 75 : 100;

			if (charIndex < currentString.length) {
				currentText += currentString[charIndex++];
				setTimeout(typeEffect, delay);
			} else {
				waitingEffect(3000);
			}

			updateInnerHTML(true);
		};
		setTimeout(typeEffect, 500);

		return {
			onDestroy() {},
			update(newTexts: string[]) {
				textsToType = newTexts;
			},
		};
	}
</script>

<div
	class="flex h-[30rem] mb-7 md:mb-0 md:h-[36rem] items-center bg-[url('$lib/assets/workingHands.jpeg')] w-full bg-cover bg-center bg-gray-900 bg-opacity-50 justify-center"
>
	<header
		class="flex items-center justify-center h-full w-full bg-gray-900 bg-opacity-50"
	>
		<div>
			<h1
				class="bold text-5xl font-logo tracking-tight text-white md:text-8xl ml-9 md:ml-0"
			>
				[{m.mySkills()}]
			</h1>
			<TypingAnimation typingTexts={[m.mySkillsTagLine()]}
			></TypingAnimation>
		</div>
	</header>
</div>
<div class="flex items-center justify-center text-fontcolor">
	<main class="w-3/4">
		<div class="md:p-12">
			<h1
				class="bold p-1 text-3xl font-normal tracking-tight text-tertiary dark:text-tertiaryDark md:text-6xl"
			>
				So, what's my history?
			</h1>
			<div
				class="text-tertiary dark:text-tertiary font-light text-lg block mt-12 p-6 bg-accent dark:bg-accentDark border border-gray-200 rounded-lg shadow dark:border-gray-700"
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
		</div>
	</main>
</div>

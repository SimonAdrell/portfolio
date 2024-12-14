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
			// Always include the zero-width space and conditionally add the text and cursor
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

			<h3
				class="hidden bold p-1 text-tertiary dark:text-tertiary text-xl font-normal tracking-tight text-fontcolor md:text-3xl"
			>
				My Journey
			</h3>

			<ol
				class=" hidden relative border-s border-tertiary dark:border-tertiaryDark md:p-10 mt-2 ml-4"
			>
				<li class="mb-10 ms-4">
					<div
						class="absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full border border-tertiary dark:border-tertiaryDark bg-accent dark:bg-gray-700"
					></div>
					<h3
						class=" text-orange text-lg font-semibold dark:text-white"
					>
						Your Company?
					</h3>
					<p
						class="text-base font-normal text-tertiary dark:text-tertiary"
					>
						<a href="/contact"
							>Contact me and let me know what I can help you
							with!</a
						>
					</p>
				</li>
				<li class="mb-10 ms-4">
					<div
						class="absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full border border-tertiary dark:border-tertiaryDark bg-accent dark:bg-accentDark"
					></div>
					<time
						class="mb-1 text-sm font-normal leading-none text-tertiary dark:text-tertiaryDark"
						>May 2022</time
					>
					<h3
						class=" text-tertiary dark:text-tertiaryDark text-lg font-semibold"
					>
						Annevo AB
					</h3>
					<p
						class="text-base font-normal text-tertiary dark:text-tertiaryDark"
					>
						Consulting firm based in Gothenburg.
					</p>
					<ol
						class="relative border-s border-tertiary p-3 md:p-10 dark:tertiary"
					>
						<div
							class="absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full border border-tertiary bg-accent dark:border-tertiaryDark dark:bg-accentDark"
						></div>
						<time
							class="mb-1 text-sm font-normal leading-none text-tertiary dark:text-tertiaryDark"
							>June 2022</time
						>
						<h3
							class=" text-orange text-lg font-semibold dark:text-white"
						>
							365ID
						</h3>
						<p
							class="text-base font-normal text-tertiary dark:text-tertiaryDark"
						>
							365ID delivers ID verification using physical
							scanners, App, and SDK. My role revolved primarily
							around preparing the backend for the release and
							continued development of the App and SDK. One big
							part was adding a microservice for handling billing
							and purchases. It was implemented using C#.NET,
							Entity Framework, and Azure Service bus.
						</p>
						<p
							class=" mb-3 flex-1 p-6 text-base text-tertiary dark:text-tertiaryDark md:text-2xl"
						>
							<span class="font-bold">Tech & Tools: </span>
							.NET Core, C#, Azure Service Bus, MSSQL, Entity Framework,
							Octopus Deploy, Windows Services, gRPC, GraphQL
						</p>
					</ol>
				</li>
				<li class="ms-4">
					<div
						class="absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full border border-tertiary bg-gray-200 dark:border-gray-900 dark:bg-gray-700"
					></div>
					<time
						class="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500"
						>June 2021</time
					>
					<h3
						class="text-orange text-lg font-semibold dark:text-white"
					>
						Jetshop/Norce
					</h3>
					<p
						class="p-2 text-base font-normal text-gray-500 dark:text-gray-400"
					>
						A part of the Jetshop Checkout team. Jetshop delivers
						webshop SaaS for businesses in all sizes and the
						checkout team was responsible for the checkout part of
						the service, mainly an monolithic webforms project but
						also multiple microservices written in .NET 5. During
						Simon's time at Jetshop he set up and integrated both
						the payment option Vipps and shipping selector Ingrid,
						both of them using REST calls. The Jetshop services
						moved from RabbitMQ over to Azure ServiceBus which gave
						him experience in setting up Azure and queue services.
					</p>
					<p
						class="p-2 text-base font-normal text-gray-500 dark:text-gray-400"
					>
						Thanks to Jetshops NoOps philosophy Simons got a lot of
						Azure experience, everything from setting up testing
						environments for Microservices and writing and updating
						Terraform scripts.
					</p>
					<p
						class=" mb-3 flex-1 p-6 text-base text-white md:text-2xl"
					>
						<span class="font-bold">Tech & Tools: </span>
						.NET Core, C#, React, REST, RabbitMQ, Docker, Terraform,
						Azure Service Bus, Azure Keyvault, Azure table storage
					</p>
				</li>
				<li class="ms-4 p-4">
					<div
						class="absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-gray-200 dark:border-gray-900 dark:bg-gray-700"
					></div>
					<time
						class="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500"
						>April 2021</time
					>
					<h3 class="  dark:text-white">
						<span class="text-orange text-lg font-bold"
							>Bilvision AB</span
						>
					</h3>
					<p
						class="p-2 text-base font-normal text-gray-500 dark:text-gray-400"
					>
						Simon started to work at Bilvision when there were only
						three devs in 2012. Nine years later, in 2021 when Simon
						left Bilvision, there were 17. Through the journey of
						working at Bilvision, he had many different roles and
						responsibilities. Frontend developer, DevOps engineer,
						team lead, and others depending on the need.
					</p>
					<p
						class="p-2 text-base font-normal text-gray-500 dark:text-gray-400"
					>
						Bilvision was a service that from the beginning was
						created by the Swedish postal service, so the language
						Simon first started out with was VB.NET, and VB.NET was
						used primarily at Bilivision for the first years, and
						was still used in some applications when Simon left the
						company.
					</p>
					<p
						class="p-2 text-base font-normal text-gray-500 dark:text-gray-400"
					>
						At Bilvision there was a lot of focus on the customers.
						All from involving them in developing new applications
						to helping customers understand and solve their needs.
						Also, support and keeping in touch with customers was a
						big part of Simon's work.
					</p>
					<p
						class="p-2 text-base font-normal text-gray-500 dark:text-gray-400"
					>
						One of Simon's responsibilities was setting up
						environments for both SQLServer as well as setting up
						servers for handling web applications. He was
						responsible for the uptime and development of the
						Bilvision BI application which was written in C# .NET
						with KendoUI, Bootstrap, and JQuery in the frontend. The
						BI domain used SSAS to calculate data and show it to the
						user. There were also SSIS/SSRS environments used to
						generate and send reports
					</p>
					<p
						class="0 p-2 font-thin text-gray-300 md:text-2xl dark:text-gray-400"
					>
						During Simon’s time at Bilvision, a smaller company was
						acquired. The company had a React-based application that
						was hosted in AWS. Simon got the role as both team lead
						and the role as a frontend developer.
					</p>
					<p
						class="p-2 text-base font-normal text-gray-500 dark:text-gray-400"
					>
						Simon was also involved in both hiring and mentoring new
						colleagues, helping and learning new developers how
						everything worked at Bilvision.
					</p>
					<p
						class=" mb-3 flex-1 p-6 text-base text-white md:text-2xl"
					>
						<span class="font-bold">Tech & Tools: </span>
						Elasticsearch, C#.NET, Bootstrap, JQuery, MSSQL, SSIS/SSRS/SSAS,
						Microsoft Server, AWS,
					</p>
				</li>
			</ol>
		</div>
	</main>
</div>

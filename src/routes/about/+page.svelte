<script lang="ts">
	import PageHeader from '$lib/nav/PageHeader.svelte';
	import * as m from '$lib/paraglide/messages';

	import type { PageData } from './$types';
	import { fade } from 'svelte/transition';
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

<div class="flex h-screen items-center justify-center">
	<PageHeader header={m.aboutMe()} headerTagLine={m.aboutTagline()}></PageHeader>
</div>

<div class="flex items-center justify-center text-white">
	<main transition:fade={{ delay: 400, duration: 1200 }} class="w-3/4">
		<div class="md:p-12">
			<h1 class="bold p-2 text-3xl font-normal tracking-tight text-white md:text-8xl">
				Whats my history?
			</h1>

			<ol class="relative border-s border-gray-200 md:p-10 dark:border-gray-700">
				<li class="mb-10 ms-4">
					<div
						class="absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-gray-200 dark:border-gray-900 dark:bg-gray-700"
					></div>
					<time class="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500"
						>May 2022</time
					>
					<h3 class=" text-orange text-lg font-semibold dark:text-white">You Company?</h3>
					<p class="text-base font-normal text-gray-500 dark:text-gray-400">
						Contact me and let me know what I can help you with!
					</p>
				</li>
				<li class="mb-10 ms-4">
					<div
						class="absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-gray-200 dark:border-gray-900 dark:bg-gray-700"
					></div>
					<time class="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500"
						>May 2022</time
					>
					<h3 class=" text-orange text-lg font-semibold dark:text-white">Annevo AB</h3>
					<p class="text-base font-normal text-gray-500 dark:text-gray-400">
						Consulting firm based in Gothenburg.
					</p>
					<ol class="relative border-s border-gray-200 p-3 md:p-10 dark:border-gray-700">
						<div
							class="absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-gray-200 dark:border-gray-900 dark:bg-gray-700"
						></div>
						<time class="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500"
							>June 2022</time
						>
						<h3 class=" text-orange text-lg font-semibold dark:text-white">365ID</h3>
						<p class="text-base font-normal text-gray-500 dark:text-gray-400">
							365ID delivers ID verification using physical scanners, App, and SDK. Simon's role
							revolved primarily around preparing the backend for the release and continued
							development of the App and SDK. His responsibilities included enhancing and
							maintaining current software, as well as setting up new Microservices. One big part
							was adding a microservice for handling billing and purchases. It was implemented using
							C#.NET, Entity Framework, and Azure Service bus.
						</p>
						<p class=" mb-3 flex-1 p-6 text-base text-white md:text-2xl">
							<span class="font-bold">Tech & Tools: </span>
							.NET Core, C#, Azure Service Bus, MSSQL, Entity Framework, Octopus Deploy, Windows Services,
							gRPC, GraphQL
						</p>
					</ol>
				</li>
				<li class="ms-4">
					<div
						class="absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-gray-200 dark:border-gray-900 dark:bg-gray-700"
					></div>
					<time class="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500"
						>June 2021</time
					>
					<h3 class="text-orange text-lg font-semibold dark:text-white">Jetshop/Norce</h3>
					<p class="p-2 text-base font-normal text-gray-500 dark:text-gray-400">
						A part of the Jetshop Checkout team. Jetshop delivers webshop SaaS for businesses in all
						sizes and the checkout team was responsible for the checkout part of the service, mainly
						an monolithic webforms project but also multiple microservices written in .NET 5. During
						Simon's time at Jetshop he set up and integrated both the payment option Vipps and
						shipping selector Ingrid, both of them using REST calls. The Jetshop services moved from
						RabbitMQ over to Azure ServiceBus which gave him experience in setting up Azure and
						queue services.
					</p>
					<p class="p-2 text-base font-normal text-gray-500 dark:text-gray-400">
						Thanks to Jetshops NoOps philosophy Simons got a lot of Azure experience, everything
						from setting up testing environments for Microservices and writing and updating
						Terraform scripts.
					</p>
					<p class=" mb-3 flex-1 p-6 text-base text-white md:text-2xl">
						<span class="font-bold">Tech & Tools: </span>
						.NET Core, C#, React, REST, RabbitMQ, Docker, Terraform, Azure Service Bus, Azure Keyvault,
						Azure table storage
					</p>
				</li>
				<li class="ms-4 p-4">
					<div
						class="absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-gray-200 dark:border-gray-900 dark:bg-gray-700"
					></div>
					<time class="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500"
						>April 2021</time
					>
					<h3 class="  dark:text-white">
						<span class="text-orange text-lg font-bold">Bilvision AB</span>
					</h3>
					<p class="p-2 text-base font-normal text-gray-500 dark:text-gray-400">
						Simon started to work at Bilvision when there were only three devs in 2012. Nine years
						later, in 2021 when Simon left Bilvision, there were 17. Through the journey of working
						at Bilvision, he had many different roles and responsibilities. Frontend developer,
						DevOps engineer, team lead, and others depending on the need.
					</p>
					<p class="p-2 text-base font-normal text-gray-500 dark:text-gray-400">
						Bilvision was a service that from the beginning was created by the Swedish postal
						service, so the language Simon first started out with was VB.NET, and VB.NET was used
						primarily at Bilivision for the first years, and was still used in some applications
						when Simon left the company.
					</p>
					<p class="p-2 text-base font-normal text-gray-500 dark:text-gray-400">
						At Bilvision there was a lot of focus on the customers. All from involving them in
						developing new applications to helping customers understand and solve their needs. Also,
						support and keeping in touch with customers was a big part of Simon's work.
					</p>
					<p class="p-2 text-base font-normal text-gray-500 dark:text-gray-400">
						One of Simon's responsibilities was setting up environments for both SQLServer as well
						as setting up servers for handling web applications. He was responsible for the uptime
						and development of the Bilvision BI application which was written in C# .NET with
						KendoUI, Bootstrap, and JQuery in the frontend. The BI domain used SSAS to calculate
						data and show it to the user. There were also SSIS/SSRS environments used to generate
						and send reports
					</p>
					<p class="0 p-2 font-thin text-gray-300 md:text-2xl dark:text-gray-400">
						During Simon’s time at Bilvision, a smaller company was acquired. The company had a
						React-based application that was hosted in AWS. Simon got the role as both team lead and
						the role as a frontend developer.
					</p>
					<p class="p-2 text-base font-normal text-gray-500 dark:text-gray-400">
						Simon was also involved in both hiring and mentoring new colleagues, helping and
						learning new developers how everything worked at Bilvision.
					</p>
					<p class=" mb-3 flex-1 p-6 text-base text-white md:text-2xl">
						<span class="font-bold">Tech & Tools: </span>
						Elasticsearch, C#.NET, Bootstrap, JQuery, MSSQL, SSIS/SSRS/SSAS, Microsoft Server, AWS,
					</p>
				</li>
			</ol>
		</div>
	</main>
</div>

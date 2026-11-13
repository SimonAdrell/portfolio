<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import keyboard from '$lib/assets/workingHands.webp';
	import { agents, batches, facts, howIBuild, ingredients, nutrition, steps } from '$lib/recipe';

	const nav = [
		{ href: '#ingredients', text: m.navIngredients },
		{ href: '#method', text: m.navMethod },
		{ href: '#stove', text: m.navStove },
		{ href: '#served', text: m.navServed },
		{ href: '#order', text: m.navOrder }
	];
	const dishGroups = [
		{ title: m.stoveHowTitle, dishes: howIBuild },
		{ title: m.stoveWhatTitle, dishes: agents }
	];
</script>

<svelte:head>
	<title>{m.recipeMetaTitle()}</title>
	<meta name="description" content={m.recipeMetaDescription()} />
</svelte:head>

<header class="page-x bar">
	<a href="#top" class="cbs-wordmark cbs-wordmark-md home" aria-label={m.recipeWordmarkLabel()}
		>{m.recipeTitleSite()}<span class="cbs-blaze" aria-hidden="true"></span></a
	>
	<nav aria-label={m.recipeNavLabel()}>
		<ul class="nav-list">
			{#each nav as item (item.href)}
				<li><a class="nav-link" href={item.href}>{item.text()}</a></li>
			{/each}
		</ul>
	</nav>
</header>

<main id="top" class="page-x wrap">
	<article class="card">
		<span aria-hidden="true" class="tape"></span>

		<section class="row hero">
			<div class="hero-text">
				<span class="cbs-label"
					><span class="cbs-blaze" aria-hidden="true"></span>{m.recipeKicker()}</span
				>
				<h1 class="title">{m.recipeTitle()}</h1>
				<p class="lead">{m.recipeIntro()}</p>
				<dl class="facts">
					{#each facts as fact (fact.name)}
						<div>
							<dt class="cbs-label">{fact.name()}</dt>
							<dd>{fact.value()}</dd>
						</div>
					{/each}
				</dl>
			</div>
			<figure class="photo">
				<img src={keyboard} alt={m.photoAlt()} width="1200" height="900" />
				<figcaption class="cbs-caption">{m.photoCaption()}</figcaption>
			</figure>
		</section>

		<div class="row two">
			<section id="ingredients" class="col" aria-labelledby="ingredients-title">
				<h2 id="ingredients-title" class="h2">{m.ingredientsTitle()}</h2>
				<ul class="plain">
					{#each ingredients as it (it.name)}
						<li class="ing">
							<span>{it.name()}</span><span class="ing-tail"
								><span class="ing-dots" aria-hidden="true"></span><span class="sr">:</span>
								<span class="ing-amt"
									>{#if it.was}<s>{it.was()}</s>
									{/if}{it.amount()}</span
								></span
							>
						</li>
					{/each}
				</ul>
				<span class="cbs-handnote cbs-handnote-up note-up"
					><svg class="cbs-handnote-arrow" viewBox="0 0 24 34" aria-hidden="true"
						><path d="M12 32c-4-10-4-20 0-28"></path><path d="M5 10l7-7 6 8"></path></svg
					>{m.ingredientsNote()}</span
				>
			</section>

			<section id="method" class="col" aria-labelledby="method-title">
				<h2 id="method-title" class="h2">{m.methodTitle()}</h2>
				<ol class="plain steps">
					{#each steps as step, i (step)}
						<li class="step">
							<span class="step-n" aria-hidden="true">{i + 1}</span>
							<p>{step()}</p>
						</li>
					{/each}
				</ol>
				<p class="tip">
					<span class="cbs-label tip-label">{m.methodTipLabel()}</span>{m.methodTip()}
				</p>
			</section>
		</div>

		<section id="stove" class="stack" aria-labelledby="stove-title">
			<div class="cbs-section">
				<span class="cbs-label"
					><span class="cbs-blaze" aria-hidden="true"></span>{m.stoveLabel()}</span
				>
				<h2 id="stove-title" class="h2">{m.stoveTitle()}</h2>
				<p class="muted body intro">{m.stoveIntro()}</p>
			</div>
			{#each dishGroups as group (group.title)}
				<h3 class="h3">{group.title()}</h3>
				<ul class="plain grid">
					{#each group.dishes as dish (dish.name)}
						<li class="item">
							<span class={['cbs-tag', dish.live ? 'cbs-tag-forest' : 'cbs-tag-outline']}
								>{#if dish.live}<span class="cbs-tag-dot" aria-hidden="true"
									></span>{/if}{dish.tag()}</span
							>
							<h4 class="h3">{dish.name()}</h4>
							<p class="muted body">{dish.text()}</p>
						</li>
					{/each}
				</ul>
			{/each}
		</section>

		<section id="served" class="stack" aria-labelledby="served-title">
			<div class="cbs-section">
				<span class="cbs-label"
					><span class="cbs-blaze" aria-hidden="true"></span>{m.servedLabel()}</span
				>
				<h2 id="served-title" class="h2">{m.servedTitle()}</h2>
			</div>
			<ul class="plain grid">
				{#each batches as batch (batch.name)}
					<li class="item">
						<span class="cbs-stamp"
							><span class="cbs-stamp-word">{batch.stamp()}</span><span class="cbs-stamp-meta"
								>{batch.meta()}</span
							></span
						>
						<h3 class="h3">{batch.name()}</h3>
						<p class="muted body">{batch.text()}</p>
					</li>
				{/each}
			</ul>
		</section>

		<div class="row two">
			<section class="nut" aria-labelledby="nut-title">
				<h2 id="nut-title" class="nut-title">{m.nutTitle()}</h2>
				<p class="nut-serving">{m.nutServing()}</p>
				<dl>
					{#each nutrition as row (row.name)}
						<div class="nut-row">
							<dt>{row.name()}</dt>
							<dd>{row.value()}</dd>
						</div>
					{/each}
				</dl>
			</section>
			<section class="col notes" aria-labelledby="notes-title">
				<h2 id="notes-title" class="h2">{m.notesTitle()}</h2>
				<p class="body">{m.notesGel()}</p>
				<p class="body">{m.notesNext()}</p>
				<span class="cbs-handnote cbs-handnote-left note-left"
					><svg class="cbs-handnote-arrow" viewBox="0 0 48 24" aria-hidden="true"
						><path d="M46 14c-12 6-28 6-40-2"></path><path d="M12 4 5 12l9 4"></path></svg
					>{m.notesNote()}</span
				>
			</section>
		</div>

		<section id="order" class="order" aria-labelledby="order-title">
			<div class="order-text">
				<h2 id="order-title" class="order-title">{m.orderTitle()}</h2>
				<p class="muted body">{m.orderLine()}</p>
			</div>
			<div class="actions">
				<a class="cbs-btn cbs-btn-highlight" href="mailto:simon@codebysimon.com"
					><span class="cbs-btn-icon"
						><svg
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							aria-hidden="true"
							><path
								d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"
							></path><path d="m21.854 2.147-10.94 10.939"></path></svg
						></span
					>{m.ctaStart()}</a
				>
				<a class="cbs-btn cbs-btn-ghost" href="https://www.linkedin.com/in/simon-adrell"
					>{m.linkedIn()}</a
				>
			</div>
			<p class="contact">simon@codebysimon.com · linkedin.com/in/simon-adrell</p>
			<span class="signature">{m.signature()}</span>
		</section>
	</article>
</main>

<footer class="foot">
	<div class="page-x bar">
		<span class="cbs-wordmark cbs-wordmark-sm"
			>{m.recipeTitleSite()}<span class="cbs-blaze" aria-hidden="true"></span></span
		>
		<p class="small muted">{m.footerLine()}</p>
		<a class="cbs-link small target" href="mailto:simon@codebysimon.com">simon@codebysimon.com</a>
	</div>
</footer>

<style>
	:global(html) {
		scroll-behavior: smooth;
	}
	p,
	h2,
	h3,
	h4,
	dd,
	figure {
		margin: 0;
	}
	.sr {
		position: absolute;
		width: 1px;
		height: 1px;
		margin: -1px;
		overflow: hidden;
		clip: rect(0 0 0 0);
		white-space: nowrap;
	}
	.page-x {
		padding-left: var(--space-8);
		padding-right: var(--space-8);
	}
	.bar {
		max-width: 1120px;
		margin: 0 auto;
		padding-top: var(--space-6);
		padding-bottom: var(--space-6);
		box-sizing: border-box;
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-4);
		align-items: center;
		justify-content: space-between;
	}
	.home,
	.target {
		display: inline-flex;
		align-items: center;
		min-height: 44px;
		text-decoration: none;
	}
	.target {
		text-decoration: underline;
	}
	.nav-list {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-wrap: wrap;
		gap: 0 var(--space-6);
	}
	.nav-link {
		display: inline-flex;
		align-items: center;
		min-height: 44px;
		padding: 0 4px;
		font: 500 13px/16px var(--font-mono);
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--ink);
		text-decoration: none;
	}
	.nav-link:hover {
		text-decoration: underline;
		text-underline-offset: 4px;
	}
	.wrap {
		max-width: 1120px;
		margin: 0 auto;
		padding-top: var(--space-8);
		padding-bottom: 96px;
		box-sizing: border-box;
	}
	.card {
		position: relative;
		box-sizing: border-box;
		padding: var(--space-16) var(--space-12);
		background: var(--surface-raised);
		border-top: 2px solid var(--forest);
		transform: rotate(-0.6deg);
		display: flex;
		flex-direction: column;
		gap: var(--space-20);
	}
	.tape {
		position: absolute;
		top: -16px;
		left: 50%;
		width: 120px;
		height: 28px;
		margin-left: -60px;
		background: var(--surface-tint);
		opacity: 0.85;
		transform: rotate(2deg);
	}
	.row {
		display: flex;
		flex-wrap: wrap;
		align-items: flex-start;
		gap: var(--space-16);
	}
	.hero {
		gap: var(--space-12);
	}
	.hero-text {
		flex: 999 1 420px;
		min-width: 0;
		display: flex;
		flex-direction: column;
		gap: var(--space-6);
		align-items: flex-start;
	}
	.title {
		margin: 0;
		font: 700 64px/1 var(--font-display);
		letter-spacing: -0.02em;
	}
	.lead {
		max-width: 560px;
		font: 400 20px/32px var(--font-sans);
		color: var(--ink-muted);
	}
	.facts {
		margin: 0;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(132px, 1fr));
		gap: var(--space-4) var(--space-6);
		width: 100%;
		padding-top: var(--space-4);
		border-top: 1px solid var(--border);
	}
	.facts div {
		display: flex;
		flex-direction: column;
		gap: var(--space-1);
	}
	.facts dd {
		font: 600 20px/28px var(--font-display);
	}
	.photo {
		flex: 1 1 280px;
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
	}
	.photo img {
		width: 100%;
		height: auto;
		aspect-ratio: 4 / 3;
		object-fit: cover;
		border-radius: var(--radius-lg);
		display: block;
	}
	.col {
		flex: 1 1 360px;
		min-width: 0;
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
	}
	section[id] {
		scroll-margin-top: var(--space-6);
	}
	.h2 {
		font: 600 28px/36px var(--font-display);
	}
	.h3 {
		font: 600 20px/28px var(--font-display);
	}
	.body {
		font: 400 17px/28px var(--font-sans);
	}
	.muted {
		color: var(--ink-muted);
	}
	.small {
		font: 400 14px/20px var(--font-sans);
	}
	.plain {
		list-style: none;
		margin: 0;
		padding: 0;
	}
	.ing {
		display: flex;
		/* a long name pushes the leader and amount onto their own line */
		flex-wrap: wrap;
		align-items: center;
		gap: 0 var(--space-3);
		min-height: 44px;
		font: 400 17px/28px var(--font-sans);
	}
	/* leader and amount wrap together, so the amount keeps its leader */
	.ing-tail {
		position: relative;
		flex: 1 1 auto;
		display: flex;
		align-items: center;
		gap: var(--space-3);
	}
	.ing-dots {
		flex: 1 1 var(--space-6);
		border-bottom: 1px dotted var(--ink-muted);
		align-self: flex-end;
		margin-bottom: var(--space-3);
	}
	.ing-amt {
		font: 500 14px/20px var(--font-mono);
		color: var(--ink-muted);
		text-align: right;
		white-space: nowrap;
	}
	.ing-amt s {
		margin-right: var(--space-2);
	}
	.note-up {
		padding-top: var(--space-2);
	}
	.note-left {
		padding-top: var(--space-4);
	}
	.steps {
		display: flex;
		flex-direction: column;
		gap: var(--space-6);
	}
	.step {
		display: grid;
		grid-template-columns: var(--space-8) minmax(0, 1fr);
		gap: var(--space-4);
		font: 400 17px/28px var(--font-sans);
	}
	.step-n {
		font: 700 28px/28px var(--font-display);
	}
	.tip {
		padding-top: var(--space-4);
		border-top: 1px solid var(--border);
		font: 400 15px/24px var(--font-sans);
	}
	.tip-label {
		margin-right: var(--space-2);
	}
	.stack {
		display: flex;
		flex-direction: column;
		gap: var(--space-8);
	}
	.intro {
		max-width: 640px;
	}
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
		gap: var(--space-12) var(--space-8);
	}
	.item {
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
		align-items: flex-start;
	}
	.stack > .h3:not(:first-of-type) {
		padding-top: var(--space-4);
	}
	.nut {
		flex: 0 1 320px;
		min-width: 0;
		display: flex;
		flex-direction: column;
	}
	.nut-title {
		padding-bottom: var(--space-1);
		border-bottom: 8px solid var(--ink);
		font: 700 28px/32px var(--font-display);
	}
	.nut-serving {
		padding: var(--space-1) 0;
		border-bottom: 4px solid var(--ink);
		font: 400 14px/20px var(--font-sans);
	}
	.nut dl {
		margin: 0;
	}
	.nut-row {
		display: flex;
		justify-content: space-between;
		gap: var(--space-4);
		padding: var(--space-1) 0;
		border-bottom: 1px solid var(--ink);
		font: 400 15px/24px var(--font-sans);
	}
	.nut-row:last-child {
		border-bottom: 0;
	}
	.nut-row dt {
		font-weight: 700;
	}
	.nut-row dd {
		text-align: right;
	}
	.notes p {
		max-width: 560px;
	}
	.order {
		border-top: 2px dashed var(--ink-muted);
		padding-top: var(--space-12);
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-6) var(--space-12);
		align-items: center;
		justify-content: space-between;
	}
	.order-text {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
		min-width: 0;
	}
	.order-title {
		font: 600 40px/44px var(--font-display);
		letter-spacing: -0.01em;
	}
	.actions {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-3);
	}
	.contact {
		width: 100%;
		font: 500 14px/20px var(--font-mono);
		overflow-wrap: anywhere;
	}
	.signature {
		width: 100%;
		text-align: right;
		padding-top: var(--space-4);
		font: 400 104px/0.6 var(--font-hand);
		color: var(--ink);
		-webkit-text-stroke: 0.012em currentColor;
	}
	.foot {
		border-top: 1px solid var(--border);
	}
	.foot .bar {
		padding-top: var(--space-8);
		padding-bottom: var(--space-8);
	}
	.cbs-link:hover {
		color: var(--button-highlight-bg-hover);
	}
	@media (max-width: 640px) {
		:global(html) {
			scroll-behavior: auto;
		}
		.page-x {
			padding-left: var(--space-4);
			padding-right: var(--space-4);
		}
		.card {
			transform: none;
			padding: var(--space-8) var(--space-4);
			gap: var(--space-16);
		}
		.title {
			font-size: 44px;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		:global(html) {
			scroll-behavior: auto;
		}
	}
</style>

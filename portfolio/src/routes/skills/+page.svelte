<script lang="ts">
	import type { PageData } from './$types';
	import { fade } from 'svelte/transition';
	import * as m from '$lib/paraglide/messages';
	import PageHeader from '$lib/nav/PageHeader.svelte';

	export let data: PageData;
</script>

<div class="flex h-screen items-center justify-center">
	<PageHeader header={m.mySkills()} headerTagLine={m.mySkillsTagLine()}></PageHeader>
</div>

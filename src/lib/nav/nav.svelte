<script context="module">
	import * as m from '$lib/paraglide/messages';
	import { base } from '$app/paths';
	export const navOptions = [
		{ page: m.aboutMe(), href: base + '/about' },
		{ page: m.mySkills(), href: base + '/skills' },
		{ page: m.contact(), href: base + '/contact' }
	];
</script>

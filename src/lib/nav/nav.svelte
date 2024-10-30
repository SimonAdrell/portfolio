<script context="module">
	import * as m from '$lib/paraglide/messages';

	// main navigation for the application

	// these are our 'pages' to navigate through (in order for this export to work the script tag MUST include context="module")
	export const navOptions = [
		{ page: m.aboutMe(), href: '/about' },
		{ page: m.mySkills(), href: '/skills' },
		{ page: m.contact(), href: '/' }
	];
</script>

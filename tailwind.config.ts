import aspectRatio from '@tailwindcss/aspect-ratio';
import containerQueries from '@tailwindcss/container-queries';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: {
				'orange': '#FF9900',
				'primary': 'hsl(101, 50%, 90%)',
				'primaryDark': 'hsl(101, 50%, 10%)',
				'secondary': 'hsl(101, 50%, 10%)',
				'secondaryDark': 'hsl(101, 50%, 90%)',
				'tertiary': 'hsl(161, 80%, 20%)',
				'tertiaryDark': 'hsl(161, 80%, 20%)',
				'accent': 'hsl(101, 52%, 95%)',
				'accentDark': 'hsl(101, 52%, 15%)',
			},
			fontFamily: {
				logo: '"Courier New"',
				SimonsHandwriting: ['SimonsHandwriting-Regular']
			}
		}
	},

	plugins: [typography, forms, containerQueries, aspectRatio]
} as Config;

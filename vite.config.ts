import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
	preview: {
		allowedHosts: ['svelte-project-qgfv.onrender.com'],
	},
	plugins: [
		tailwindcss(),
		sveltekit(),
	],
});

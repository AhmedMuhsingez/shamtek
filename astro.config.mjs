// @ts-check

import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
	vite: {
		plugins: [tailwindcss()],
	},

	output: "server",
	adapter: node({
		mode: "standalone",
	}),

	i18n: {
		locales: [
			{ path: "ar", codes: ["ar", "ar-SY"] },
			{ path: "en", codes: ["en", "en-US"] },
			{ path: "tr", codes: ["tr", "tr-TR"] },
		],
		defaultLocale: "ar",
		routing: {
			prefixDefaultLocale: true,
		},
	},

	integrations: [react()],
});

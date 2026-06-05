// @ts-check

import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
	vite: {
		plugins: [tailwindcss()],
	},

	// Fully static demo build (no backend) — deployable as static files on Vercel.
	output: "static",

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

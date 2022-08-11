import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueI18n from '@intlify/vite-plugin-vue-i18n';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'url';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue(), 
	vueI18n({
		include: resolve(dirname(fileURLToPath(import.meta.url)), './src/locales'),
	 })],
	optimizeDeps: { exclude: ["swiper/vue", "swiper/types"] },
	resolve: {
		alias: { find: "@/*", replacement: "./*" },
		extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".d.ts"],
	},
});

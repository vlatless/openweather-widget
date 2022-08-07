import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue()],
	optimizeDeps: { exclude: ["swiper/vue", "swiper/types"] },
	resolve: {
		alias: { find: "@/*", replacement: "./*" },
		extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".d.ts"],
	},
});

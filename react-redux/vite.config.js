import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite"; // Import Tailwind CSS plugin

export default defineConfig({
	plugins: [react(), tailwindcss()], // Add Tailwind CSS plugin
});

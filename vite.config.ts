import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  envDir: path.resolve(__dirname, 'credential'),
  server:{
    host: true,
    port: 5173
  },
  plugins: [react()],
})

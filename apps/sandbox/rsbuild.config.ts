import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";

export default defineConfig({
  html: {
    title: "React Render Bench Sandbox",
  },
  plugins: [pluginReact()],
  server: {
    port: 3001,
    strictPort: true,
  },
});

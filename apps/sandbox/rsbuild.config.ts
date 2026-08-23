import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";

export default defineConfig({
  html: {
    title: "React Render Bench Sandbox",
  },
  plugins: [pluginReact()],
  resolve: {
    alias: {
      "react-dom/client$": "react-dom/profiling",
    },
  },
  server: {
    port: 3001,
    strictPort: true,
  },
});

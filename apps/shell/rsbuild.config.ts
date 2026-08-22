import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";

export default defineConfig({
  html: {
    title: "React Render Bench",
  },
  plugins: [pluginReact()],
  server: {
    port: 3000,
    strictPort: true,
  },
});

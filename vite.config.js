import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import glsl from "vite-plugin-glsl";

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
        glsl({
            include: [
                "**/*.glsl",
                "**/*.wgsl",
                "**/*.vert",
                "**/*.frag",
                "**/*.vs",
                "**/*.fs",
            ],
            warnDuplicatedImports: true,
            defaultExtension: "glsl",
            minify: false,
            watch: true,
        }),
    ],
});

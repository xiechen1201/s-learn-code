import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import pluginJson from "@rollup/plugin-json";
import pluginTerser from "@rollup/plugin-terser";
import pluginCleanup from "rollup-plugin-cleanup";
import pluginDelete from "rollup-plugin-delete";
import { nodeResolve } from "@rollup/plugin-node-resolve";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
    input: resolve(__dirname, "./src/main.js"),

    output: {
        format: "es",
        dir: resolve(__dirname, "./dist")
    },

    external: (id, parentId, isResolved) => {
        if (id === "vue") return true;
    },

    // 使用插件
    plugins: [
        pluginJson(),
        nodeResolve(),
        pluginDelete({ targets: resolve(__dirname, "./dist") })
    ]
};
